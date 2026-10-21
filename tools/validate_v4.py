from pathlib import Path
from collections import Counter
import json
p=Path(__file__).resolve().parents[1]/'data/atlas.json'
d=json.loads(p.read_text())
ids={x['id'] for x in d['antibiotics']};pids={x['id'] for x in d['pathogens']};sids={x['id'] for x in d['syndromes']};gids={x['id'] for x in d['groups']};refs=set(d['guides'])
assert len(ids)==len(d['antibiotics'])
assert len(pids)==len(d['pathogens'])
assert len(sids)==len(d['syndromes'])
assert all(x['groupId'] in gids for x in d['pathogens'])
seen=set()
for r in d['relations']:
 key=(r['antibiotic'],r['pathogen'])
 assert key not in seen,key
 seen.add(key)
 assert key[0] in ids and key[1] in pids and r['status'] in {'active','conditional','none','unknown'}
 assert all(k in refs for k in r.get('referenceKeys',[]))
for s in d['syndromes']:
 assert all(k in pids for k in s['pathogenIds']),s['name']
 assert all(k in refs for k in s['referenceKeys'])
for l in d['lessons']:
 assert all(k in refs for k in l['refs'])
print('Validated V4: ',len(ids),'antibiotics,',len(pids),'microorganisms,',len(sids),'syndromes,',len(seen),'relations,',len(refs),'sources')
print('States:',Counter(r['status'] for r in d['relations']))