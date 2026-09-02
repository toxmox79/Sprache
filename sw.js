const CACHE="bb-languages-v15-startfix";
const CORE=[
 "./","./index.html","./manifest.json",
 "./icon-192.png","./icon-512.png",
 "./icon-maskable-192.png","./icon-maskable-512.png",
 "./apple-touch-icon.png","./favicon-32.png","./favicon-16.png"
];

self.addEventListener("install",event=>{
 self.skipWaiting();
 event.waitUntil(caches.open(CACHE).then(c=>c.addAll(CORE)).catch(()=>{}));
});
self.addEventListener("activate",event=>{
 event.waitUntil(
  caches.keys()
   .then(keys=>Promise.all(keys.filter(k=>k!==CACHE).map(k=>caches.delete(k))))
   .then(()=>self.clients.claim())
 );
});
async function networkFirst(request){
 const cache=await caches.open(CACHE);
 try{
  const r=await fetch(request,{cache:"no-store"});
  if(r&&r.ok)cache.put(request,r.clone());
  return r;
 }catch(e){
  return (await cache.match(request))||(await cache.match("./index.html"))||Response.error();
 }
}
async function cacheFirst(request){
 const cache=await caches.open(CACHE);
 const hit=await cache.match(request);
 if(hit)return hit;
 try{
  const r=await fetch(request);
  if(r&&r.ok)cache.put(request,r.clone());
  return r;
 }catch(e){return Response.error()}
}
self.addEventListener("fetch",event=>{
 if(event.request.method!=="GET")return;
 const u=new URL(event.request.url);
 if(event.request.mode==="navigate"||u.pathname.endsWith("/index.html")){
  event.respondWith(networkFirst(event.request));return;
 }
 if(u.hostname==="en.wiktionary.org"){
  event.respondWith(fetch(event.request));return;
 }
 if(u.hostname==="raw.githubusercontent.com"||u.hostname==="cdn.jsdelivr.net"||u.hostname==="unpkg.com"){
  event.respondWith(cacheFirst(event.request));return;
 }
 event.respondWith(cacheFirst(event.request));
});