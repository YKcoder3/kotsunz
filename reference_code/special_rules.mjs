/**
 * KOTSUNZ new450 v4: PURE REFERENCE FUNCTION, not merged into production.
 * Host must validate intent, rank, damage and round state; clients cannot submit damage numbers.
 * Use exactly one active skill and one gauge per player per question.
 */
export const TIER_COST = Object.freeze({ small: 25, medium: 55, large: 90 });
export const RARITY_BONUS = Object.freeze({ 'おつ':0, '普通':0, 'レア':1, 'スーパーレア':1, 'レジェンド':2 });
const TABLE = Object.freeze({
  attack: { base: {small:3,medium:5,large:8}, max:{small:5,medium:8,large:11} },
  defense: { base: {small:4,medium:8,large:12},max:{small:6,medium:11,large:15} },
  recover: { base: {small:6,medium:11,large:16},max:{small:9,medium:15,large:20} }
});
const RECOVER_FIRST = Object.freeze({small:3,medium:5,large:7});
const RECOVER_LOWHP = Object.freeze({small:2,medium:3,large:4});
const RECOVER_NEXT_SHIELD = Object.freeze({small:1,medium:2,large:3});
const MIRROR_CAP = Object.freeze({small:1,medium:2,large:3});
const clamp = (x, min, max) => Math.min(max, Math.max(min, x));
function assertInt(x, name) { if (!Number.isInteger(x) || x < 0) throw new Error(`Invalid ${name}`); }
export function scaledPower({role,tier,rarity,stage=1,level=1}) {
  if (!(role in TABLE) || !(tier in TIER_COST)) throw new Error('Unknown role/tier');
  if (!Object.hasOwn(RARITY_BONUS,rarity)) throw new Error('Unknown rarity');
  if (![1,2,3].includes(stage)) throw new Error('Invalid stage');
  assertInt(level,'level');
  const extra = RARITY_BONUS[rarity] + (stage-1) + Math.min(2,Math.floor(level/12));
  return Math.min(TABLE[role].max[tier],TABLE[role].base[tier]+extra);
}
export function spreadReflectedDamage(total, opponentIds = [], round = 0) {
  assertInt(total,'reflected total');
  if (total === 0 || opponentIds.length === 0) return {};
  const ids = [...new Set(opponentIds)].sort();
  const result = Object.fromEntries(ids.map(id=>[id,Math.floor(total/ids.length)]));
  const start = ((round % ids.length)+ids.length)%ids.length;
  for (let n=0;n<total%ids.length;n++) result[ids[(start+n)%ids.length]]++;
  return result;
}
/**
 * @param {object} args
 * skill: an exact skill object from special_skills_450.json
 * correct/first: host verified (first must imply correct)
 * incomingDamage: sum of host-computed normal damage + other attackers' skill damage BEFORE defending
 * previousMirrorBlocked and previousMirrorExpiryRound: from host-tracked prior rounds, not client
 */
export function resolveSpecial({
  skill,tier,stage=1,rarity='普通',level=1,gaugeAtStart,correct=false,first=false,
  incomingDamage=0,hpBefore=100,maxHp=100,previouslyKO=false,
  previousMirrorBlocked=0,previousMirrorExpiryRound=-1,round=0,opponentIds=[]
}) {
  for (const [key,n] of Object.entries({gaugeAtStart,incomingDamage,hpBefore,maxHp,previousMirrorBlocked,round})) assertInt(n,key);
  if (first&&!correct) throw new Error('First must also be correct');
  const output={accepted:false,activated:false,cost:0,role:null,reason:'invalid_intent',
    attackBonus:0,damageBlocked:0,recoverHeal:0,firstHealBonus:0,lowHpHealBonus:0,
    temporaryNextRoundShield:0,finalHp:clamp(hpBefore-incomingDamage,0,maxHp),
    mirrorDamageByOpponent:{},nextMirrorBlocked:0,nextMirrorExpiryRound:-1};
  if (!skill || !TIER_COST[tier] || !TABLE[skill.role] || stage < skill.unlockedAtStage || previouslyKO) return output;
  if (gaugeAtStart < TIER_COST[tier]) return {...output,reason:'insufficient_start_meter'};
  output.accepted=true;output.role=skill.role;
  const isActive=(skill.role==='defense')||(skill.role==='attack'&&correct&&first)||(skill.role==='recover'&&correct);
  if (!isActive) return {...output,reason:'activation_condition_not_met'};
  output.activated=true;output.reason='activated';output.cost=TIER_COST[tier];
  const power=scaledPower({role:skill.role,tier,rarity,stage,level});
  if(skill.role==='attack') output.attackBonus=power;
  if(skill.role==='defense') {
    output.damageBlocked=Math.min(power,incomingDamage);
    output.finalHp=clamp(hpBefore-(incomingDamage-output.damageBlocked),0,maxHp);
    if(skill.family==='mirror') {
      const prev=round<=previousMirrorExpiryRound ? previousMirrorBlocked : 0;
      if(first&&correct) {
        const reflected=Math.min(MIRROR_CAP[tier],Math.floor((prev+output.damageBlocked)*.5));
        output.mirrorDamageByOpponent=spreadReflectedDamage(reflected,opponentIds,round);
        output.nextMirrorBlocked=0;output.nextMirrorExpiryRound=-1;
      } else {
        output.nextMirrorBlocked=Math.min(6,prev+output.damageBlocked);
        output.nextMirrorExpiryRound=round+2;
      }
    }
  }
  if(skill.role==='recover') {
    output.firstHealBonus=first?RECOVER_FIRST[tier]:0;
    output.lowHpHealBonus=(hpBefore/maxHp)<=.35?RECOVER_LOWHP[tier]:0;
    output.recoverHeal=power+output.firstHealBonus+output.lowHpHealBonus;
    const hpAfterDamage=hpBefore-incomingDamage;
    output.finalHp=clamp(hpAfterDamage+output.recoverHeal,0,maxHp);
    output.temporaryNextRoundShield=Math.min(RECOVER_NEXT_SHIELD[tier],Math.max(0,output.recoverHeal-Math.max(0,maxHp-hpAfterDamage)));
  }
  return output;
}
/** v3 meter gains unchanged; cost is charged from starting balance only. */
export function computeMeter({startingMeter,triggeredCost=0,correct,first=false,correctStreak=0,firstStreak=0,preferred=false,weak=false,attributeAdvantage=false}) {
  assertInt(startingMeter,'startingMeter');assertInt(triggeredCost,'triggeredCost');
  if(triggeredCost>startingMeter) throw new Error('Cannot finance skill from this question gain');
  if(first&&!correct) throw new Error('First must imply correct');
  if(preferred&&weak) throw new Error('Cannot be both favorite and weak');
  let gain=0,penalty=0;
  if(correct) {
    gain=14+(first?8:0);
    gain+=correctStreak>=3?6:correctStreak===2?3:0;
    gain+=firstStreak>=3?7:firstStreak===2?4:0;
    gain+=preferred?(4+(first?5:0)):weak?(8+(first?3:0)):0;
    if(attributeAdvantage)gain+=2;
    gain=Math.min(34,gain);
  } else penalty=preferred?4:weak?3:2;
  return {gaugeAfterRound:clamp(startingMeter-triggeredCost+gain-penalty,0,100),gain,penalty,cost:triggeredCost};
}
