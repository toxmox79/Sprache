const CACHE="bb-languages-v17-full-decode";
const CORE=[
 "./","./index.html","./manifest.json",
 "./icon-192.png","./icon-512.png","./icon-maskable-192.png","./icon-maskable-512.png",
 "./apple-touch-icon.png","./favicon.ico","./favicon-32.png","./favicon-16.png"
];
self.addEventListener("install",e=>{
 self.skipWaiting();
 e.waitUntil(caches.open(CACHE).then(c=>c.addAll(CORE)).catch(()=>{}));
});
self.addEventListener("activate",e=>{
 e.waitUntil(caches.keys().then(keys=>Promise.all(keys.filter(k=>k!==CACHE).map(k=>caches.delete(k)))).then(()=>self.clients.claim()));
});
async function networkFirst(req){
 const c=await caches.open(CACHE);
 try{const r=await fetch(req,{cache:"no-store"});if(r&&r.ok)c.put(req,r.clone());return r}
 catch(e){return (await c.match(req))||(await c.match("./index.html"))||Response.error()}
}
async function cacheFirst(req){
 const c=await caches.open(CACHE),hit=await c.match(req);if(hit)return hit;
 try{const r=await fetch(req);if(r&&r.ok)c.put(req,r.clone());return r}catch(e){return Response.error()}
}
self.addEventListener("fetch",e=>{
 if(e.request.method!=="GET")return;
 const u=new URL(e.request.url);
 if(e.request.mode==="navigate"||u.pathname.endsWith("/index.html")){e.respondWith(networkFirst(e.request));return}
 if(u.hostname==="en.wiktionary.org"){e.respondWith(fetch(e.request));return}
 if(u.hostname==="raw.githubusercontent.com"||u.hostname==="cdn.jsdelivr.net"||u.hostname==="unpkg.com"){e.respondWith(cacheFirst(e.request));return}
 e.respondWith(cacheFirst(e.request));
});