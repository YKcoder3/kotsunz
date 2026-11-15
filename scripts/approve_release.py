#!/usr/bin/env python3
"""Only mark character images publishable after documented 21-sheet rights and 450-character reviews.
Usage: python scripts/approve_release.py --check
       python scripts/approve_release.py --approve --reviewer "Name"
This validates review records, NOT the legal accuracy of what a human writes into them.
"""
import argparse,csv,json,datetime,pathlib,sys
ROOT=pathlib.Path(__file__).resolve().parents[1]
DATA=ROOT/'data'

def csv_rows(fname):
    with (DATA/fname).open('r',encoding='utf-8-sig',newline='') as f: return list(csv.DictReader(f))

def populated(row,fields): return all((row.get(k) or '').strip() for k in fields)

def failures():
    errors=[]
    sources=csv_rows('source_rights_21.csv')
    review=csv_rows('release_review_450.csv')
    if len(sources)!=21: errors.append(f'Source rights rows: expected 21, got {len(sources)}')
    if len(review)!=450: errors.append(f'Character reviews: expected 450, got {len(review)}')
    for s in sources:
        prefix=f"Sheet {s.get('sheetNumber','?')}"
        fields=['creator','creationMethod','creationDate','generationToolOrContract','termsOrLicenseURL','sourceEvidence','reviewer','reviewDate']
        if not populated(s,fields): errors.append(prefix+': missing source rights evidence/reviewer/date')
        for name in ['referenceMaterialsRightsConfirmed','commercialUseAllowed','webPublishingAllowed','derivativesAllowed']:
            if (s.get(name) or '').strip().lower()!='yes': errors.append(prefix+': '+name+' is not yes')
        if (s.get('licenseStatus') or '').lower()!='approved':errors.append(prefix+': licenseStatus not approved')
    actual_ids={c['characterId'] for c in json.loads((DATA/'characters_450.json').read_text(encoding='utf-8'))}
    check_ids={r['characterId'] for r in review}
    if check_ids!=actual_ids: errors.append('review character IDs differ from character master')
    for r in review:
        prefix=r.get('characterId','?')
        if not populated(r,['evidence','reviewer','reviewDate']): errors.append(prefix+': missing review evidence/reviewer/date')
        for name in ['sourceArtMatched','stage1QA','stage2QA','stage3QA','smartphoneQA','originalitySimilarityReview','trademarkNameReview','storySkillNamesReview','issueResolution']:
            if (r.get(name) or '').strip().lower()!='approved': errors.append(prefix+': '+name+' not approved')
    return errors

def main():
    parser=argparse.ArgumentParser()
    group=parser.add_mutually_exclusive_group(required=True)
    group.add_argument('--check',action='store_true')
    group.add_argument('--approve',action='store_true')
    parser.add_argument('--reviewer',default='')
    args=parser.parse_args()
    errors=failures()
    if errors:
        print(f'NOT READY: {len(errors)} incomplete review items')
        for message in errors[:25]:print(' - '+message)
        if len(errors)>25:print(f' ... and {len(errors)-25} more')
        return 1
    print('REVIEW RECORDS COMPLETE: 21 source sheets and 450 characters')
    print('WARNING: review data existence is not independent proof of legal clearance.')
    if args.check:return 0
    if not args.reviewer.strip():
        print('ERROR: --reviewer "Responsible person" is required for approval')
        return 2
    path=DATA/'characters_450.json'
    chars=json.loads(path.read_text(encoding='utf-8'))
    for c in chars:
        c['publishable']=True
        c['copyrightStatus']='rights_review_completed'
        c['artReviewStatus']='approved'
    path.write_text(json.dumps(chars,ensure_ascii=False,indent=2)+'\n',encoding='utf-8')
    # Keep human-readable catalog in sync after review completion.
    import csv
    summary=DATA/'character_review_450.csv'
    if summary.exists():
        with summary.open(encoding='utf-8-sig',newline='') as f:
            rr=list(csv.DictReader(f)); fields=list(rr[0]) if rr else []
        for row in rr:
            row['publishable']='True'
            row['copyrightStatus']='rights_review_completed'
        with summary.open('w',encoding='utf-8-sig',newline='') as f:
            w=csv.DictWriter(f,fieldnames=fields);w.writeheader();w.writerows(rr)
    report_path=ROOT/'qa/build_report.json'
    if report_path.exists():
        build=json.loads(report_path.read_text(encoding='utf-8'))
        build['rightsAndArtReview']='completed_according_to_review_records'
        build['warning']='Human review evidence must be retained; automated checks cannot independently guarantee legal non-infringement.'
        report_path.write_text(json.dumps(build,ensure_ascii=False,indent=2)+'\n',encoding='utf-8')
    report={'approvedAt':datetime.datetime.now(datetime.timezone.utc).isoformat(),
            'approvedBy':args.reviewer,'status':'evidence_checked_publication_approved',
            'sourceSheetsReviewed':21,'characterFamiliesReviewed':450,
            'notice':'Based on reviewer provided records; does not certify legal status independently'}
    out=ROOT/'qa/release_approval.json';out.write_text(json.dumps(report,ensure_ascii=False,indent=2)+'\n',encoding='utf-8')
    print('APPROVED: Updated 450 publishable flags and wrote qa/release_approval.json')
    return 0

if __name__=='__main__':sys.exit(main())
