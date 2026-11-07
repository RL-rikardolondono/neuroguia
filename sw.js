// NeuroGuIA: permite instalarla en el celular. Las pantallas se piden siempre a internet primero.
const C="neuroguia-v2";
self.addEventListener("install",e=>{e.waitUntil(caches.open(C).then(c=>c.addAll(["./","index.html","config.js","manifest.json","icono-192.png"])));self.skipWaiting();});
self.addEventListener("activate",e=>{e.waitUntil(caches.keys().then(k=>Promise.all(k.filter(x=>x!==C).map(x=>caches.delete(x)))));self.clients.claim();});
self.addEventListener("fetch",e=>{const u=new URL(e.request.url);if(e.request.method!=="GET"||u.origin!==location.origin)return;
  e.respondWith(fetch(e.request).then(r=>{const cp=r.clone();caches.open(C).then(c=>c.put(e.request,cp));return r;}).catch(()=>caches.match(e.request)));});
// Avisos en el celular (medicamentos, novedades de la IPS y del colegio)
self.addEventListener("push",e=>{let d={};try{d=e.data.json();}catch(x){d={titulo:"NeuroGuIA",cuerpo:e.data?e.data.text():""};}
  e.waitUntil(self.registration.showNotification(d.titulo||"NeuroGuIA",{body:d.cuerpo||"",icon:"icono-192.png",badge:"icono-192.png",data:{url:d.url||"/"}}));});
self.addEventListener("notificationclick",e=>{e.notification.close();e.waitUntil(clients.matchAll({type:"window"}).then(l=>{for(const c of l){if("focus" in c)return c.focus();}return clients.openWindow(e.notification.data?.url||"/");}));});
