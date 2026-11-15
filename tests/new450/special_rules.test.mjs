import {test} from 'node:test';
import assert from 'node:assert/strict';
import {resolveSpecial,scaledPower,computeMeter,spreadReflectedDamage} from '../../reference_code/special_rules.mjs';
const sk=(role,family=role)=>({skillId:'testing',role,family,unlockedAtStage:1});
const base={gaugeAtStart:100,correct:true,first:false,incomingDamage:10,hpBefore:30,maxHp:100,tier:'small',stage:1,level:1,rarity:'普通',round:1};
test('ATTACK only fires on 1st correct; other correct = no cost',()=>{
 const fail=resolveSpecial({...base,skill:sk('attack')});
 assert.equal(fail.activated,false);assert.equal(fail.cost,0);
 const pass=resolveSpecial({...base,first:true,skill:sk('attack')});
 assert.equal(pass.activated,true);assert.equal(pass.attackBonus,3);assert.equal(pass.cost,25);
});
test('DEFENCE activates even wrong and even slow, does block damage',()=>{
 const out=resolveSpecial({...base,skill:sk('defense'),correct:false,first:false});
 assert.equal(out.activated,true);assert.equal(out.cost,25);assert.equal(out.damageBlocked,4);assert.equal(out.finalHp,24);
});
test('DEFENCE still pays if no damage',()=>{
 const out=resolveSpecial({...base,skill:sk('defense'),incomingDamage:0,correct:false});
 assert.equal(out.activated,true);assert.equal(out.cost,25);assert.equal(out.damageBlocked,0);
});
test('RECOVER heals correct even not first, first gets extra',()=>{
 const low=resolveSpecial({...base,skill:sk('recover')});
 const first=resolveSpecial({...base,first:true,skill:sk('recover')});
 assert.equal(low.recoverHeal,8); // 6+2 low HP
 assert.equal(first.recoverHeal,11); // same +3 first
 assert.equal(first.finalHp,31);assert.equal(low.cost,25);
});
test('RECOVER is not triggered by wrong answer',()=>{
 const out=resolveSpecial({...base,skill:sk('recover'),correct:false});
 assert.equal(out.cost,0);assert.equal(out.recoverHeal,0);
});
test('RECOVER prevents same-round KO when net health is positive',()=>{
 const out=resolveSpecial({...base,skill:sk('recover'),hpBefore:2,incomingDamage:8});
 assert.equal(out.finalHp,2);assert.equal(out.activated,true);
});
test('KO from earlier rounds cannot be revived',()=>{
 const out=resolveSpecial({...base,skill:sk('recover'),previouslyKO:true,hpBefore:0});
 assert.equal(out.activated,false);assert.equal(out.finalHp,0);
});
test('MIRROR can reflect previously blocked REAL damage only',()=>{
 const firstRound=resolveSpecial({...base,skill:sk('defense','mirror'),correct:false,round:1});
 assert.equal(firstRound.damageBlocked,4);assert.equal(firstRound.nextMirrorBlocked,4);
 const next=resolveSpecial({...base,skill:sk('defense','mirror'),first:true,round:2,incomingDamage:0,
    previousMirrorBlocked:firstRound.nextMirrorBlocked,previousMirrorExpiryRound:firstRound.nextMirrorExpiryRound,opponentIds:['P3','P2']});
 assert.equal(Object.values(next.mirrorDamageByOpponent).reduce((a,b)=>a+b,0),1);
 const impossible=resolveSpecial({...base,skill:sk('defense','mirror'),first:true,round:2,incomingDamage:0,opponentIds:['P2']});
 assert.equal(Object.values(impossible.mirrorDamageByOpponent).reduce((a,b)=>a+b,0),0);
});
test('MIRROR does not chain, counter expired after two rounds',()=>{
 const o=resolveSpecial({...base,skill:sk('defense','mirror'),first:true,incomingDamage:0,round:7,
 previousMirrorBlocked:6,previousMirrorExpiryRound:3,opponentIds:['P2']});
 assert.deepEqual(o.mirrorDamageByOpponent,{});
});
test('Rarity/stage/level increases effect with integer tier cap',()=>{
 assert.equal(scaledPower({role:'defense',tier:'small',rarity:'レジェンド',stage:3,level:30}),6);
 assert.equal(scaledPower({role:'recover',tier:'large',rarity:'普通',stage:1,level:1}),16);
});
test('Shared gauge cannot be spent from later award',()=>{
 assert.throws(()=>computeMeter({startingMeter:20,triggeredCost:25,correct:true,first:true}),/Cannot finance/);
 assert.equal(computeMeter({startingMeter:55,triggeredCost:55,correct:true,first:true}).gaugeAfterRound,22);
});
test('Defence wrong spends skill cost AND loses normal wrong gauge',()=>{
 assert.equal(computeMeter({startingMeter:90,triggeredCost:25,correct:false}).gaugeAfterRound,63);
});
test('Gain clamped 0..100; reflected damage distributes integers',()=>{
 assert.equal(computeMeter({startingMeter:99,triggeredCost:0,correct:true,first:true}).gaugeAfterRound,100);
 assert.equal(Object.values(spreadReflectedDamage(3,['b','a','c'],5)).reduce((a,b)=>a+b,0),3);
});
