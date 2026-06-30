// Spark Field Estimator service worker
// v53: project name alignment and visible edit pencil + robust GitHub Pages + iOS offline app shell cache.
const CACHE_NAME = 'spark-field-estimator-v53';
const SCOPE = self.registration.scope;
const toURL = (path) => new URL(path, SCOPE).href;
const APP_SHELL = [
  './',
  './index.html',
  './manifest.json',
  './jszip.min.js',
  './icon-180.png',
  './icon-192.png',
  './icon-512.png'
].map(toURL);
const OPTIONAL = [
  'https://cdn.jsdelivr.net/npm/xlsx-js-style@1.2.0/dist/xlsx.bundle.js'
];

async function putInCache(cache, url){
  try{
    const response = await fetch(new Request(url, {cache:'reload'}));
    if(response && (response.ok || response.type === 'opaque')){
      await cache.put(url, response.clone());
    }
  }catch(e){}
}

async function cacheAppShell(){
  const cache = await caches.open(CACHE_NAME);
  await Promise.allSettled([...APP_SHELL, ...OPTIONAL].map(url => putInCache(cache, url)));
}

self.addEventListener('install', event => {
  event.waitUntil((async()=>{
    await cacheAppShell();
    await self.skipWaiting();
  })());
});

self.addEventListener('activate', event => {
  event.waitUntil((async()=>{
    const keys = await caches.keys();
    await Promise.all(keys.filter(k => k !== CACHE_NAME).map(k => caches.delete(k)));
    await cacheAppShell();
    await self.clients.claim();
  })());
});

self.addEventListener('message', event => {
  const data = event.data || {};
  if(data.type === 'SKIP_WAITING') self.skipWaiting();
  if(data.type === 'CACHE_URL' && data.url){
    event.waitUntil((async()=>{
      const cache = await caches.open(CACHE_NAME);
      await putInCache(cache, new URL(data.url, SCOPE).href);
    })());
  }
  if(data.type === 'CACHE_URLS' && Array.isArray(data.urls)){
    event.waitUntil((async()=>{
      const cache = await caches.open(CACHE_NAME);
      await Promise.allSettled(data.urls.map(u => putInCache(cache, new URL(u, SCOPE).href)));
      await cacheAppShell();
    })());
  }
});

async function cachedAppShell(request){
  return (await caches.match(request, {ignoreSearch:true})) ||
         (await caches.match(toURL('./'), {ignoreSearch:true})) ||
         (await caches.match(toURL('./index.html'), {ignoreSearch:true})) ||
         new Response('<!doctype html><html><head><meta name="viewport" content="width=device-width,initial-scale=1"><title>Offline</title></head><body style="font-family:system-ui;padding:24px"><h2>Spark Field Estimator is offline</h2><p>The app shell was not fully cached yet. Go online, open the app once, wait 15 seconds, then try again offline.</p></body></html>', {headers:{'Content-Type':'text/html; charset=utf-8'}});
}

self.addEventListener('fetch', event => {
  const request = event.request;
  if(request.method !== 'GET') return;

  if(request.mode === 'navigate'){
    event.respondWith((async()=>{
      try{
        const response = await fetch(request);
        const cache = await caches.open(CACHE_NAME);
        if(response && response.ok){
          cache.put(request, response.clone()).catch(()=>{});
          cache.put(toURL('./'), response.clone()).catch(()=>{});
          cache.put(toURL('./index.html'), response.clone()).catch(()=>{});
        }
        return response;
      }catch(e){
        return cachedAppShell(request);
      }
    })());
    return;
  }

  event.respondWith((async()=>{
    const cached = await caches.match(request, {ignoreSearch:true});
    if(cached) return cached;
    try{
      const response = await fetch(request);
      const cache = await caches.open(CACHE_NAME);
      if(response && (response.ok || response.type === 'opaque')) cache.put(request, response.clone()).catch(()=>{});
      return response;
    }catch(e){
      return new Response('', {status:504, statusText:'Offline'});
    }
  })());
});
