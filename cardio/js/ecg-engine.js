/* CARDIORA — motor de trazos ECG esquemáticos.
   Cada latido es una suma de gaussianas (P, Q, R, S, T, U) sobre papel milimetrado de 25 mm/s y 10 mm/mV.
   Los trazos son didácticos y deterministas (semilla fija): NO son registros reales de pacientes. */
(function(){
'use strict';
const FS=250; // muestras por segundo
function rng(seed){let s=seed>>>0||1;return()=>{s^=s<<13;s>>>=0;s^=s>>17;s^=s<<5;s>>>=0;return s/4294967296}}
const g=(t,a,mu,sd)=>a*Math.exp(-((t-mu)*(t-mu))/(2*sd*sd));

/* Plantilla de un latido conducido (derivación II). o: pr, qrs (factor de anchura), st (mV), t (mV), tMu, p, pInv, delta, u */
function beat(o){
 o=o||{};const c=[],pr=o.pr==null?0.16:o.pr,w=o.qrs||1,q0=0.09+pr; // q0 = inicio de QRS desde el inicio del latido
 if(o.p!==false)c.push([o.pInv?-0.12:(o.p||0.15),0.09,0.024]);
 if(o.prDep)c.push([-0.05,q0-0.03,0.02]);
 if(o.delta)c.push([0.32,q0+0.012,0.022]);
 c.push([o.qAmp==null?-0.08:o.qAmp,q0+0.012*w,0.007*w]);
 c.push([o.r==null?1.25:o.r,q0+0.03*w,0.0095*w]);
 c.push([o.s==null?-0.28:o.s,q0+0.05*w,0.009*w]);
 if(o.st)c.push([o.st,q0+0.13*w,0.05]);
 c.push([o.t==null?0.3:o.t,o.tMu||q0+0.27*w,o.tSd||0.045]);
 if(o.u)c.push([o.u,(o.tMu||q0+0.27*w)+0.17,0.04]);
 return {comps:c,len:q0+0.4};
}
/* Latido ventricular ancho (sin P). o: r, s, t, polaridad */
function wide(o){o=o||{};const pol=o.pol||1;return {comps:[[pol*(o.r||1.05),0.05,0.035],[-pol*(o.s||0.45),0.11,0.03],[-pol*(o.t||0.35),0.3,0.06]],len:0.5}}
/* Morfologías de V1/V6 para bloqueos de rama */
const MORPH={
 'rbbb-v1':{comps:[[0.15,0.09,0.024],[0.35,0.27,0.01],[-0.45,0.3,0.012],[0.95,0.34,0.016],[-0.22,0.52,0.05]],len:0.65},
 'rbbb-v6':{comps:[[0.15,0.09,0.024],[-0.08,0.262,0.007],[1.05,0.28,0.011],[-0.32,0.33,0.024],[0.28,0.52,0.05]],len:0.65},
 'lbbb-v1':{comps:[[0.15,0.09,0.024],[0.08,0.262,0.008],[-1.35,0.31,0.03],[0.4,0.53,0.06]],len:0.68},
 'lbbb-v6':{comps:[[0.15,0.09,0.024],[0.82,0.29,0.02],[0.92,0.33,0.02],[-0.34,0.54,0.06]],len:0.68}
};
function add(buf,t0,b,scale){scale=scale||1;for(const [a,mu,sd] of b.comps){const lo=Math.max(0,Math.floor((t0+mu-4*sd)*FS)),hi=Math.min(buf.length-1,Math.ceil((t0+mu+4*sd)*FS));for(let i=lo;i<=hi;i++)buf[i]+=g(i/FS,a*scale,t0+mu,sd)}}
function regular(buf,dur,rr,mk,start){for(let t=start==null?0.12:start;t<dur;t+=rr)add(buf,t,mk(t))}

/* Generadores por ritmo. Devuelven un Float32Array en mV. */
const R={
 sinus:(b,d,r)=>regular(b,d,60/(r.rate||75),()=>beat(r.beat)),
 'sinus-arr':(b,d,r)=>{let t=0.1,k=0;while(t<d){add(b,t,beat());t+=0.78+0.22*Math.sin(k++/1.6)}},
 af:(b,d,r,rand)=>{for(let i=0;i<b.length;i++){const t=i/FS;b[i]+=0.045*Math.sin(2*Math.PI*6.1*t+1.3*Math.sin(t*1.7))+0.03*Math.sin(2*Math.PI*8.3*t+0.6)}
  let t=0.15;while(t<d){add(b,t,beat({p:false}));t+=(r.slow?0.75:0.42)+rand()*(r.slow?0.55:0.4)}},
 flutter:(b,d,r)=>{const per=0.2,cond=r.cond||2;for(let i=0;i<b.length;i++){const ph=((i/FS)%per)/per;b[i]+=ph<0.8?0.14-0.32*(ph/0.8):-0.18+0.32*((ph-0.8)/0.2)}
  for(let t=0.05;t<d;t+=per*cond)add(b,t,beat({p:false}))},
 svt:(b,d,r)=>regular(b,d,60/(r.rate||180),()=>beat({p:false,t:0.22,tMu:0.36}),0),
 pac:(b,d)=>{const ts=[0.1,0.9,1.7,2.25,3.15,3.95,4.75,5.3];ts.forEach((t,i)=>add(b,t,beat(i===3||i===7?{p:0.1,pr:0.14}:{})))},
 junctional:(b,d,r)=>regular(b,d,60/(r.rate||50),()=>{const x=beat({p:false});x.comps.push([-0.1,0.36,0.022]);return x}),
 pvc:(b,d)=>{let t=0.1,k=0;while(t<d){add(b,k%4===3?t-0.32:t,k%4===3?wide():beat());t+=0.8;k++}},
 vt:(b,d,r)=>regular(b,d,60/(r.rate||170),()=>wide(),0),
 vf:(b,d,r,rand)=>{const ph=[rand()*6,rand()*6,rand()*6];for(let i=0;i<b.length;i++){const t=i/FS,env=0.55+0.35*Math.sin(t*1.3+ph[0]);b[i]+=env*(0.5*Math.sin(2*Math.PI*4.7*t+ph[1]+Math.sin(t*3))+0.3*Math.sin(2*Math.PI*6.6*t+ph[2])+0.15*Math.sin(2*Math.PI*9.1*t))*(r.fine?0.35:1)}},
 torsades:(b,d)=>{for(let i=0;i<b.length;i++){const t=i/FS;b[i]+=1.1*Math.sin(2*Math.PI*0.32*t+0.3)*Math.sin(2*Math.PI*4.2*t)}},
 asystole:(b,d,r,rand)=>{for(let i=0;i<b.length;i++){const t=i/FS;b[i]+=0.02*Math.sin(2*Math.PI*0.4*t)+0.008*(rand()-0.5)}},
 avb1:(b,d)=>regular(b,d,0.9,()=>beat({pr:0.32})),
 mobitz1:(b,d)=>{const prs=[0.16,0.26,0.32,null];let t=0.05,k=0;while(t<d){const pr=prs[k%4];add(b,t,pr==null?{comps:[[0.15,0.09,0.024]],len:0.2}:beat({pr}));t+=0.78;k++}},
 mobitz2:(b,d)=>{let t=0.05,k=0;while(t<d){add(b,t,k%3===2?{comps:[[0.15,0.09,0.024]],len:0.2}:beat({pr:0.18}));t+=0.72;k++}},
 avb3:(b,d)=>{for(let t=0.02;t<d;t+=0.7)add(b,t,{comps:[[0.15,0.09,0.024]],len:0.2});for(let t=0.45;t<d;t+=1.55)add(b,t,wide({r:0.9,s:0.35,t:0.25}))},
 aivr:(b,d)=>regular(b,d,1.0,()=>wide({r:0.95})),
 paced:(b,d)=>regular(b,d,0.857,()=>{const x=wide({r:0.9,pol:-1});x.comps.unshift([1.4,0.035,0.0022]);return x}),
 morph:(b,d,r)=>regular(b,d,60/(r.rate||70),()=>MORPH[r.m])
};
/* Patrones = ritmo sinusal con un latido modificado */
const P={
 stemi:{rate:80,beat:{st:0.32,t:0.42,s:-0.05}},
 'st-dep':{rate:90,beat:{st:-0.14,t:0.12}},
 'hyperk':{rate:70,beat:{p:0.07,pr:0.2,qrs:1.4,t:0.85,tSd:0.03}},
 'hypok':{rate:70,beat:{t:0.08,u:0.14,st:-0.05}},
 'wpw':{rate:75,beat:{pr:0.09,delta:true,qrs:1.25,t:0.2}},
 'long-qt':{rate:60,beat:{tMu:0.69,t:0.26,tSd:0.06}},
 'pericarditis':{rate:95,beat:{st:0.14,prDep:true,t:0.3}},
 'sinus-brady':{rate:45},'sinus-tachy':{rate:125}
};

function signal(id,opts){
 opts=opts||{};const dur=opts.seconds||6,buf=new Float32Array(Math.ceil(dur*FS)),rand=rng(opts.seed||7);
 const r=Object.assign({},opts);
 if(P[id]){Object.assign(r,P[id]);R.sinus(buf,dur,r,rand)}
 else if(id.startsWith('rbbb')||id.startsWith('lbbb')){r.m=id;R.morph(buf,dur,r,rand)}
 else (R[id]||R.sinus)(buf,dur,r,rand);
 if(id!=='asystole')for(let i=0;i<buf.length;i++)buf[i]+=0.006*(rand()-0.5);
 return buf;
}
/* SVG en milímetros: 1 mm = 1 unidad; 25 mm/s; 10 mm/mV. */
function svg(id,opts){
 opts=opts||{};const dur=opts.seconds||6,h=opts.height||30,W=dur*25,base=h*(opts.baseline||0.6),off=opts.cal===false?0:0.36,buf=signal(id,Object.assign({},opts,{seconds:dur-off}));
 let d='';for(let i=0;i<buf.length;i++){const x=((off+i/FS)*25).toFixed(2),y=(base-buf[i]*10).toFixed(2);d+=(i?'L':'M')+x+' '+y}
 const uid='g'+Math.random().toString(36).slice(2,8);
 const label=opts.lead?`<text x="2" y="5" class="ecg-lead">${opts.lead}</text>`:'';
 const cal=opts.cal===false?'':`<path d="M0.5 ${base} h1.5 v-10 h5 v10 h2" class="ecg-cal"/>`;
 return `<svg class="ecg-svg${opts.animate?' ecg-anim':''}" viewBox="0 0 ${W} ${h}" role="img" aria-label="${opts.aria||'Trazo ECG esquemático'}" preserveAspectRatio="xMidYMid meet">
<defs><pattern id="${uid}s" width="1" height="1" patternUnits="userSpaceOnUse"><path d="M1 0V1H0" class="ecg-g1"/></pattern>
<pattern id="${uid}" width="5" height="5" patternUnits="userSpaceOnUse"><rect width="5" height="5" fill="url(#${uid}s)"/><path d="M5 0V5H0" class="ecg-g5"/></pattern></defs>
<rect width="${W}" height="${h}" class="ecg-paper"/><rect width="${W}" height="${h}" fill="url(#${uid})"/>${cal}${label}
<path d="${d}" class="ecg-trace" pathLength="1"/></svg>`;
}
/* Latido único ampliado con zonas interactivas (onda P, PR, QRS, ST, T, QT) */
function anatomy(){
 const b=beat(),dur=0.9,buf=new Float32Array(Math.ceil(dur*FS));add(buf,0.02,b);
 const sx=t=>t*125,base=34;let d='';for(let i=0;i<buf.length;i++)d+=(i?'L':'M')+sx(i/FS).toFixed(1)+' '+(base-buf[i]*22).toFixed(1);
 const zones=[['p','Onda P',0.04,0.16],['pr','Segmento PR',0.16,0.27],['qrs','Complejo QRS',0.27,0.37],['st','Segmento ST',0.37,0.46],['t','Onda T',0.46,0.65],['qt','Intervalo QT',0.27,0.65,true],['pri','Intervalo PR',0.04,0.27,true]];
 const z=zones.map(([k,n,a,c,low])=>low?`<g class="ecg-zone ecg-zone-int" data-zone="${k}" tabindex="0" role="button" aria-label="${n}"><rect x="${sx(a)}" y="${k==='qt'?47:52}" width="${sx(c)-sx(a)}" height="5" rx="1.5"/><text x="${(sx(a)+sx(c))/2}" y="${k==='qt'?50.8:55.8}">${k==='qt'?'QT':'PR'}</text></g>`
  :`<g class="ecg-zone" data-zone="${k}" tabindex="0" role="button" aria-label="${n}"><rect x="${sx(a)}" y="0" width="${sx(c)-sx(a)}" height="45"/><text x="${(sx(a)+sx(c))/2}" y="6">${k.toUpperCase()}</text></g>`).join('');
 return `<svg class="ecg-anatomy" viewBox="0 0 ${sx(dur)} 58" role="group" aria-label="Latido normal con zonas seleccionables">
<defs><pattern id="anaG" width="5" height="5" patternUnits="userSpaceOnUse"><path d="M5 0V5H0" class="ecg-g5"/></pattern></defs>
<rect width="${sx(dur)}" height="45" class="ecg-paper"/><rect width="${sx(dur)}" height="45" fill="url(#anaG)"/>${z}<path d="${d}" class="ecg-trace"/></svg>`;
}
window.ECG={svg,anatomy,signal,FS};
})();
