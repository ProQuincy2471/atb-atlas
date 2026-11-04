/* INFEORA offline cache v3.
 * JS, CSS, JSON and HTML must use network-first: cached scripts from older
 * releases cannot silently override a newer index.html.
 * Successful responses remain available offline after a visit.
 */
const CACHE = 'infeora-v3';
const OFFLINE_HOME = new URL('./infeora/', self.registration.scope).href;

self.addEventListener('install', event => {
  event.waitUntil(self.skipWaiting());
});

self.addEventListener('activate', event => {
  event.waitUntil(
    caches.keys()
      .then(keys => Promise.all(keys
        .filter(key => key.startsWith('infeora-') && key !== CACHE)
        .map(key => caches.delete(key))))
      .then(() => self.clients.claim())
  );
});

function remember(event, request, response) {
  if (response.ok) {
    const copy = response.clone();
    event.waitUntil(caches.open(CACHE)
      .then(cache => cache.put(request, copy))
      .catch(() => {}));
  }
  return response;
}

async function networkFirst(event) {
  const request = event.request;
  try {
    const response = await fetch(request, {cache: 'no-cache'});
    if (response.status >= 500) {
      const cached = await caches.match(request);
      if (cached) return cached;
    }
    return remember(event, request, response);
  } catch (_) {
    return (await caches.match(request)) ||
      (request.mode === 'navigate' ? await caches.match(OFFLINE_HOME) : null) ||
      Response.error();
  }
}

async function cacheFirst(event) {
  const request = event.request;
  const cached = await caches.match(request);
  if (cached) return cached;
  try {
    return remember(event, request, await fetch(request));
  } catch (_) {
    return Response.error();
  }
}

self.addEventListener('fetch', event => {
  const request = event.request;
  if (request.method !== 'GET') return;
  const url = new URL(request.url);
  if (url.origin !== self.location.origin) return;

  // Pages, scripts, styles and data are always revalidated while online.
  if (request.mode === 'navigate' || /\.(?:js|css|json|webmanifest)$/.test(url.pathname)) {
    event.respondWith(networkFirst(event));
    return;
  }

  // Images and other stable local assets can load immediately from cache.
  event.respondWith(cacheFirst(event));
});
