from pathlib import Path
import json
base=Path(__file__).parent
db=json.loads((base/'data/knowledge.json').read_text())
pa=json.loads((base/'data/palette.json').read_text())
assert len(db['antibiotics'])==20
assert len(db['pathogens'])==16
assert len(db['syndromes'])==8
assert len(db['spectrum'])==114
A={a['id'] for a in db['antibiotics']};P={p['id'] for p in db['pathogens']}
assert all(r['antibiotic'] in A and r['pathogen'] in P and r['status'] in ['active','conditional','none'] for r in db['spectrum'])
assert len({(r['antibiotic'],r['pathogen']) for r in db['spectrum']})==114
assert len(pa['groups'])==8 and len(pa['family'])==6
assert all(isinstance(v,str) and v.startswith('#') and len(v)==7 for v in list(pa['groups'].values())+list(pa['family'].values()))
print('ATB Atlas V3: VALID 20 ATB / 16 microorganisms / 8 syndromes / 114 relations / 14 palette slots')