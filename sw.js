const CACHE_NAME = 'larpuls-shell-v1'
const APP_SHELL = ['/', '/manifest.webmanifest', '/icon.svg', '/icon-192.png', '/icon-512.png']

self.addEventListener('install', (event) => {
  event.waitUntil(
    caches.open(CACHE_NAME).then(async (cache) => {
      const shellResponse = await fetch('/')
      if (!shellResponse.ok) throw new Error(`App-skalet svarade med ${shellResponse.status}.`)

      const shellHtml = await shellResponse.clone().text()
      const bundleAssets = [...shellHtml.matchAll(/(?:src|href)="([^"]*\/assets\/[^"]+)"/g)]
        .map((match) => match[1])

      await cache.put('/', shellResponse)
      await cache.addAll([...APP_SHELL.filter((path) => path !== '/'), ...bundleAssets])
      await self.skipWaiting()
    }),
  )
})

self.addEventListener('activate', (event) => {
  event.waitUntil(
    caches.keys()
      .then((keys) => Promise.all(
        keys
          .filter((key) => key.startsWith('larpuls-shell-') && key !== CACHE_NAME)
          .map((key) => caches.delete(key)),
      ))
      .then(() => self.clients.claim()),
  )
})

self.addEventListener('fetch', (event) => {
  const request = event.request
  const url = new URL(request.url)

  if (request.method !== 'GET' || url.origin !== self.location.origin || url.pathname === '/sw.js') {
    return
  }

  if (request.mode === 'navigate') {
    event.respondWith(
      fetch(request)
        .then((response) => {
          if (response.ok) {
            const copy = response.clone()
            return caches.open(CACHE_NAME).then((cache) => cache.put('/', copy)).then(() => response)
          }
          return response
        })
        .catch(async () => {
          const cachedPage = await caches.match('/', { ignoreVary: true })
          return cachedPage ?? new Response('Lärpuls är tillfälligt otillgänglig offline.', {
            status: 503,
            headers: { 'Content-Type': 'text/plain; charset=utf-8' },
          })
        }),
    )
    return
  }

  event.respondWith(
    caches.match(request, { ignoreVary: true }).then(async (cached) => {
      if (cached) return cached

      try {
        const response = await fetch(request)
        if (response.ok) {
          await caches.open(CACHE_NAME).then((cache) => cache.put(request, response.clone()))
        }
        return response
      } catch (error) {
        console.error('Lärpuls kunde inte hämta en resurs offline.', error)
        return new Response('Den här resursen är inte tillgänglig offline ännu.', {
          status: 503,
          headers: { 'Content-Type': 'text/plain; charset=utf-8' },
        })
      }
    }),
  )
})
