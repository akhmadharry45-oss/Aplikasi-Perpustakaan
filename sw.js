/* Pustaka service worker: kerangka aplikasi tersedia tanpa internet. Data Firebase tidak pernah disimpan di sini. */
var CACHE='pustaka-v2';
var SHELL=['./','./index.html','./manifest.json','./icons/icon-192.png','./icons/icon-512.png'];
self.addEventListener('install',function(e){e.waitUntil(caches.open(CACHE).then(function(c){return c.addAll(SHELL);}).then(function(){return self.skipWaiting();}));});
self.addEventListener('activate',function(e){e.waitUntil(caches.keys().then(function(ks){return Promise.all(ks.filter(function(k){return k!==CACHE;}).map(function(k){return caches.delete(k);}));}).then(function(){return self.clients.claim();}));});
var SKIP=/firestore\.googleapis\.com|identitytoolkit|securetoken|firebaseinstallations|googleapis\.com\/v1|google\.com\/recaptcha/;
self.addEventListener('fetch',function(e){
  var r=e.request;if(r.method!=='GET')return;
  var u=new URL(r.url);if(SKIP.test(u.href)||u.protocol.indexOf('http')!==0)return;
  if(r.mode==='navigate'){
    e.respondWith(fetch(r).then(function(res){var cp=res.clone();caches.open(CACHE).then(function(c){c.put('./index.html',cp);});return res;}).catch(function(){return caches.match('./index.html');}));
    return;
  }
  e.respondWith(caches.match(r).then(function(hit){
    var net=fetch(r).then(function(res){if(res&&(res.status===200||res.type==='opaque')){var cp=res.clone();caches.open(CACHE).then(function(c){c.put(r,cp);});}return res;}).catch(function(){return hit;});
    return hit||net;
  }));
});
