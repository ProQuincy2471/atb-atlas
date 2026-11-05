/* INFEORA V46 · Validate supplementary pharmacological evidence without browser.
 * Fail closed on orphan citations, duplicate drug IDs or malformed adult regimens.
 */
'use strict';
const fs=require('node:fs'),path=require('node:path'),vm=require('node:vm');
const root=path.resolve(__dirname,'..');
const sourceFiles=[
 'data/pharm-clinical-amr-2026.js',
 'data/pharm-clinical-virology-2026.js',
 'data/pharm-clinical-fungi-parasites-2026.js',
 'data/pharm-clinical-viral-opportunistic-2026.js'
];
const ctx={window:{},console};vm.createContext(ctx);
for(const f of sourceFiles){const code=fs.readFileSync(path.join(root,f),'utf8');vm.runInContext(code,ctx,{filename:f,timeout:10000})}
const R=ctx.window.INFEORA_PHARM_CLINICAL;
const errors=[],sources=R.sources,drugs=R.drugs,additions=R.additions;
const ensure=(test,msg)=>{if(!test)errors.push(msg)};
const base=JSON.parse(fs.readFileSync(path.join(root,'data/atlas.json'),'utf8')).antibiotics.map(x=>x.id);
const other=[
 ['v24-antivirals.js',55],['v24-antifungals.js',25],['v24-antiparasitics.js',42]
].flatMap(([filename,min])=>{
 const src=fs.readFileSync(path.join(root,filename),'utf8');
 const ids=[...src.matchAll(/\["([^"]+)","([^"]+)","([^"]+)"/g)].map(x=>x[1]);
 ensure(ids.length>=min,filename+': fewer existing drugs than expected '+ids.length);
 return ids;
});
const old=[...base,...other],names=new Set(old);
ensure(old.length===235,'Original 235 inventory unexpectedly changed: '+old.length);
ensure(additions.length===26,'Expected 26 novel entries, found '+additions.length);
for(const add of additions){
 ensure(add.id&&add.name&&add.family&&add.kingdom,'Malformed new drug '+JSON.stringify(add));
 ensure(!names.has(add.id),'Duplicate new drug ID '+add.id);
 names.add(add.id);
}
ensure(names.size===261,'Total distinct 261 drugs expected; found '+names.size);
let doses=0;
for(const [id,r] of Object.entries(drugs)){
 ensure(names.has(id),'Curated supplement refers to absent ID '+id);
 ensure(Array.isArray(r.sourceKeys),'Missing per-drug citation array '+id);
 const seenDose=new Set();
 for(const d of r.doses||[]){
  doses++;
  const key=[d.t,d.ad].join('|');
  ensure(!seenDose.has(key),'Duplicated regimen '+id+' '+d.t);
  seenDose.add(key);
  ensure(typeof d.ad==='string'&&d.ad.length>8,'Incomplete drug regimen '+id+' '+d.t);
  ensure(typeof d.t==='string'&&d.t.length>8,'Missing clinical indication '+id);
  ensure(!!sources[d.sourceKey],'Dose lacks traceable source '+id+' '+d.t+' ['+d.sourceKey+']');
  ensure((r.sourceKeys||[]).includes(d.sourceKey),'Drug-level citations omit dose source '+id+' '+d.sourceKey);
 }
 for(const key of r.sourceKeys||[])ensure(!!sources[key],'Unknown drug citation '+id+' '+key);
}
for(const [key,s] of Object.entries(sources)){
 ensure(s.url&&/^https:\/\//.test(s.url)&&s.label,'Invalid reference '+key);
}
function requireRegimen(id,part){
 const v=drugs[id]?.doses||[];
 ensure(v.some(x=>(x.ad+' '+x.t).includes(part)),'Expected evidence-based regimen missing: '+id+' '+part);
}
requireRegimen('cefiderocol','2 g IV');
requireRegimen('pivmecilinam','370 mg');
requireRegimen('pivmecilinam','185 mg');
requireRegimen('artemeter-lumefantrina','días 2–5');
requireRegimen('bictegravir-lenacapavir','Días 1 y 2');
requireRegimen('nirmatrelvir-ritonavir','eGFR');
const piv=drugs['pivmecilinam'].doses;
ensure(piv.some(x=>x.sourceKey==='IDSA26')&&piv.some(x=>x.sourceKey==='FDA_PIV'),'FDA versus IDSA pivmecillinam provenance collapsed');
const out={version:'V46',existing:old.length,new:additions.length,total:names.size,curatedProfiles:Object.keys(drugs).length,curatedRegimens:doses,sourceCount:Object.keys(sources).length,clinicalGaps:names.size-Object.keys(drugs).length,sourceFiles,errorCount:errors.length,errors};
fs.mkdirSync(path.join(root,'qa','results-pharm'),{recursive:true});
fs.writeFileSync(path.join(root,'qa','results-pharm','source-audit.json'),JSON.stringify(out,null,2));
console.log('PHARM DATA AUDIT',JSON.stringify({...out,errors:errors.slice(0,30)}));
if(errors.length)process.exitCode=1;
