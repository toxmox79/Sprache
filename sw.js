const CACHE="bb-languages-v4-3000";
const CORE=["./","./index.html","./manifest.json","./icon-192.png","./icon-512.png","./icon-maskable-192.png","./icon-maskable-512.png","./apple-touch-icon.png","./favicon-32.png","./favicon-16.png"];
self.addEventListener("install",e=>{self.skipWaiting();e.waitUntil(caches.open(CACHE).then(c=>c.addAll(CORE)))});
self.addEventListener("activate",e=>{e.waitUntil(caches.keys().then(keys=>Promise.all(keys.filter(k=>k!==CACHE).map(k=>caches.delete(k)))).then(()=>self.clients.claim()))});
self.addEventListener("fetch",e=>{
 if(e.request.method!=="GET")return;
 const u=new URL(e.request.url);
 const isData=u.hostname==="raw.githubusercontent.com"||u.hostname==="cdn.jsdelivr.net";
 if(isData){e.respondWith(caches.open(CACHE).then(async c=>{const hit=await c.match(e.request);if(hit)return hit;try{const r=await fetch(e.request);if(r.ok)c.put(e.request,r.clone());return r}catch(err){return hit||Response.error()}}));return}
 e.respondWith(caches.match(e.request).then(r=>r||fetch(e.request).then(resp=>{const cp=resp.clone();caches.open(CACHE).then(c=>c.put(e.request,cp));return resp})));
});