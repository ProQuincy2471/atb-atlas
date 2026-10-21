from pathlib import Path
import json
p=Path(__file__).resolve().parents[1]/'data'/'knowledge.json'
db=json.loads(p.read_text('utf-8'))
for name in ('antibiotics','pathogens','syndromes'):
 ids=[x['id'] for x in db[name]]
 assert len(ids)==len(set(ids)),f'duplicated in {name}'
D={x['id'] for x in db['antibiotics']}; B={x['id'] for x in db['pathogens']}; S={x['id'] for x in db['syndromes']}; refs=set(db['sources']);pairs=[]
for r in db['spectrum']:
 assert r['antibiotic'] in D and r['pathogen'] in B
 assert r['status'] in ['active','conditional','none']
 assert r['sources'] and set(r['sources'])<=refs
 assert r['note'] and r['review']=='pendiente_revision_editorial'
 pairs.append((r['antibiotic'],r['pathogen']))
assert len(pairs)==len(set(pairs))
for s in db['syndromes']:
 assert set(s['sources'])<=refs
 for x in s['consider']:
  assert x['pathogen'] in B
for r in db['siteRules']:
 assert r['drug'] in D and set(r['syndromes'])<=S and set(r['sources'])<=refs
 assert set(r.get('pathogens',[]))<=B
assert db['editorialStatus'].startswith('BORRADOR')
print('PASS: ',len(D),'antibiotics |',len(B),'microorganisms |',len(S),'syndromes |',len(pairs),'spectrum edges |',len(db['siteRules']),'site rules')

# Clinical invariants that illustrate the intended separation of spectrum and clinical site
def state(drug, pathogen):
 return next((r['status'] for r in db['spectrum'] if r['antibiotic']==drug and r['pathogen']==pathogen), None)
assert state('ertapenem','p-aeruginosa')=='none'
assert state('cefazolina','s-aureus-mrsa')=='none'
assert state('meropenem','e-coli-blee')=='active'
assert state('nitrofurantoina','e-coli-blee')=='conditional'
assert state('meropenem','legionella')=='none'
assert state('metronidazol','b-fragilis')=='conditional'
assert state('vancomicina-iv','b-fragilis') is None # Unreviewed, not false resistance
assert any(r['drug']=='daptomicina' and 'nac' in r['syndromes'] and r['severity']=='blocked' for r in db['siteRules'])
assert any(r['drug']=='nitrofurantoina' and 'pielonefritis' in r['syndromes'] and r['severity']=='blocked' for r in db['siteRules'])
print('PASS: key clinical invariants and unknown-vs-no distinction')