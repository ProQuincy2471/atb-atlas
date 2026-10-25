/* INFEORA — service worker: el atlas funciona sin conexión después de la primera visita.
   Páginas: red primero (si no hay red, la copia guardada). Scripts, estilos, datos e imágenes:
   copia guardada al instante y actualización en segundo plano. Subir CACHE al publicar cambios grandes. */
const CACHE='infeora-v1';
const CORE=['./','./infeora/','./manifest.webmanifest','./assets/app/icon-192.png','./assets/app/icon-512.png','./assets/app/infeora-logo.svg'];
self.addEventListener('install',e=>{e.waitUntil(caches.open(CACHE).then(c=>c.addAll(CORE)).then(()=>self.skipWaiting()))});
self.addEventListener('activate',e=>{e.waitUntil(caches.keys().then(ks=>Promise.all(ks.filter(k=>k.startsWith('infeora-')&&k!==CACHE).map(k=>caches.delete(k)))).then(()=>self.clients.claim()))});
self.addEventListener('fetch',e=>{
 const r=e.request;if(r.method!=='GET')return;const u=new URL(r.url);
 if(u.origin!==location.origin){ // fuentes de Google: guardar para uso sin conexión
  if(/fonts\.(googleapis|gstatic)\.com$/.test(u.hostname))e.respondWith(caches.open(CACHE).then(c=>c.match(r).then(hit=>hit||fetch(r).then(res=>{c.put(r,res.clone());return res}))));
  return;
 }
 if(r.mode==='navigate'){e.respondWith(fetch(r).then(res=>{const cp=res.clone();caches.open(CACHE).then(c=>c.put(r,cp));return res}).catch(()=>caches.match(r).then(h=>h||caches.match('./infeora/'))));return}
 e.respondWith(caches.open(CACHE).then(c=>c.match(r).then(hit=>{const net=fetch(r).then(res=>{if(res.ok)c.put(r,res.clone());return res}).catch(()=>hit);return hit||net})));
});
