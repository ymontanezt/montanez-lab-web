if (!self.define) {
  let e,
    a = {}
  const s = (s, i) => (
    (s = new URL(s + '.js', i).href),
    a[s] ||
      new Promise(a => {
        if ('document' in self) {
          const e = document.createElement('script')
          ;((e.src = s), (e.onload = a), document.head.appendChild(e))
        } else ((e = s), importScripts(s), a())
      }).then(() => {
        let e = a[s]
        if (!e) throw new Error(`Module ${s} didn’t register its module`)
        return e
      })
  )
  self.define = (i, c) => {
    const n = e || ('document' in self ? document.currentScript.src : '') || location.href
    if (a[n]) return
    let t = {}
    const d = e => s(e, n),
      f = { module: { uri: n }, exports: t, require: d }
    a[n] = Promise.all(i.map(e => f[e] || d(e))).then(e => (c(...e), t))
  }
}
define(['./workbox-5f3e40ee'], function (e) {
  'use strict'
  ;(importScripts(),
    self.skipWaiting(),
    e.clientsClaim(),
    e.precacheAndRoute(
      [
        { url: '/_next/app-build-manifest.json', revision: 'cb0e70db1bb390ed0a2bd270ad069107' },
        { url: '/_next/dynamic-css-manifest.json', revision: 'd751713988987e9331980363e24189ce' },
        { url: '/_next/static/chunks/192-bfd7c44b6a824a09.js', revision: 'jh-AefhH45C8daYyuA-G-' },
        { url: '/_next/static/chunks/201.275ee1c999c29b43.js', revision: '275ee1c999c29b43' },
        { url: '/_next/static/chunks/215.b7f4431399ec4f52.js', revision: 'b7f4431399ec4f52' },
        {
          url: '/_next/static/chunks/2170a4aa-f220f188891353c6.js',
          revision: 'jh-AefhH45C8daYyuA-G-',
        },
        { url: '/_next/static/chunks/235.ed553c395ca041c2.js', revision: 'ed553c395ca041c2' },
        { url: '/_next/static/chunks/288-cd4c06d870a9b570.js', revision: 'jh-AefhH45C8daYyuA-G-' },
        { url: '/_next/static/chunks/3.a131e0764f319cba.js', revision: 'a131e0764f319cba' },
        { url: '/_next/static/chunks/303-811c8a72b8f57f27.js', revision: 'jh-AefhH45C8daYyuA-G-' },
        { url: '/_next/static/chunks/31.9bb1f7e19eac57aa.js', revision: '9bb1f7e19eac57aa' },
        { url: '/_next/static/chunks/375.04acdadf9fa8241d.js', revision: '04acdadf9fa8241d' },
        { url: '/_next/static/chunks/377-08fb33f48acf18bd.js', revision: 'jh-AefhH45C8daYyuA-G-' },
        { url: '/_next/static/chunks/438.24228e8f805ea4e6.js', revision: '24228e8f805ea4e6' },
        { url: '/_next/static/chunks/444.10a6a567da23672e.js', revision: '10a6a567da23672e' },
        { url: '/_next/static/chunks/455-7dc6ed41f9fe763c.js', revision: 'jh-AefhH45C8daYyuA-G-' },
        { url: '/_next/static/chunks/480.5f7214bf122d8a90.js', revision: '5f7214bf122d8a90' },
        {
          url: '/_next/static/chunks/4bd1b696-b0eb9e5f0facefb8.js',
          revision: 'jh-AefhH45C8daYyuA-G-',
        },
        { url: '/_next/static/chunks/522.ea81e4b8af5903dd.js', revision: 'ea81e4b8af5903dd' },
        { url: '/_next/static/chunks/545.b74cb95d76c0bd91.js', revision: 'b74cb95d76c0bd91' },
        { url: '/_next/static/chunks/622-a4476321a5de739c.js', revision: 'jh-AefhH45C8daYyuA-G-' },
        { url: '/_next/static/chunks/63-4aabca9d49d4f9b4.js', revision: 'jh-AefhH45C8daYyuA-G-' },
        { url: '/_next/static/chunks/684-528518003925a9d0.js', revision: 'jh-AefhH45C8daYyuA-G-' },
        { url: '/_next/static/chunks/693-d63351c62ef8c7fa.js', revision: 'jh-AefhH45C8daYyuA-G-' },
        {
          url: '/_next/static/chunks/7508b87c-dda69d76c89b89c5.js',
          revision: 'jh-AefhH45C8daYyuA-G-',
        },
        { url: '/_next/static/chunks/807.043d1772e7c090b8.js', revision: '043d1772e7c090b8' },
        { url: '/_next/static/chunks/865-149a2ae6738e6d13.js', revision: 'jh-AefhH45C8daYyuA-G-' },
        { url: '/_next/static/chunks/874-fca5d28b33547be8.js', revision: 'jh-AefhH45C8daYyuA-G-' },
        { url: '/_next/static/chunks/891-6d9df5b2dbf64492.js', revision: 'jh-AefhH45C8daYyuA-G-' },
        {
          url: '/_next/static/chunks/app/_not-found/page-3e3bddd58513aba8.js',
          revision: 'jh-AefhH45C8daYyuA-G-',
        },
        {
          url: '/_next/static/chunks/app/admin/layout-61cac5c13ddc4cab.js',
          revision: 'jh-AefhH45C8daYyuA-G-',
        },
        {
          url: '/_next/static/chunks/app/admin/page-54ea193d6961e164.js',
          revision: 'jh-AefhH45C8daYyuA-G-',
        },
        {
          url: '/_next/static/chunks/app/api/send-email/route-c93235647c20e79d.js',
          revision: 'jh-AefhH45C8daYyuA-G-',
        },
        {
          url: '/_next/static/chunks/app/error-d74df3eae9a5ae83.js',
          revision: 'jh-AefhH45C8daYyuA-G-',
        },
        {
          url: '/_next/static/chunks/app/layout-7164afeda075672b.js',
          revision: 'jh-AefhH45C8daYyuA-G-',
        },
        {
          url: '/_next/static/chunks/app/loading-85b12af2fc310d0e.js',
          revision: 'jh-AefhH45C8daYyuA-G-',
        },
        {
          url: '/_next/static/chunks/app/not-found-762eaab6e58ef421.js',
          revision: 'jh-AefhH45C8daYyuA-G-',
        },
        {
          url: '/_next/static/chunks/app/page-4f46660792219e22.js',
          revision: 'jh-AefhH45C8daYyuA-G-',
        },
        {
          url: '/_next/static/chunks/app/servicios/%5Bslug%5D/page-09c27730e24312a5.js',
          revision: 'jh-AefhH45C8daYyuA-G-',
        },
        {
          url: '/_next/static/chunks/app/test-env/page-b52af9373cc4191e.js',
          revision: 'jh-AefhH45C8daYyuA-G-',
        },
        {
          url: '/_next/static/chunks/dd8162e8-17389cbd908a7587.js',
          revision: 'jh-AefhH45C8daYyuA-G-',
        },
        {
          url: '/_next/static/chunks/framework-c36158592fb88135.js',
          revision: 'jh-AefhH45C8daYyuA-G-',
        },
        { url: '/_next/static/chunks/main-42ec4fa3218f414d.js', revision: 'jh-AefhH45C8daYyuA-G-' },
        {
          url: '/_next/static/chunks/main-app-795592465d19994a.js',
          revision: 'jh-AefhH45C8daYyuA-G-',
        },
        {
          url: '/_next/static/chunks/pages/_app-8e94039938385921.js',
          revision: 'jh-AefhH45C8daYyuA-G-',
        },
        {
          url: '/_next/static/chunks/pages/_error-7b2d139042a6a5ab.js',
          revision: 'jh-AefhH45C8daYyuA-G-',
        },
        {
          url: '/_next/static/chunks/polyfills-42372ed130431b0a.js',
          revision: '846118c33b2c0e922d7b3a7676f81f6f',
        },
        {
          url: '/_next/static/chunks/webpack-42e4d58751d4a898.js',
          revision: 'jh-AefhH45C8daYyuA-G-',
        },
        { url: '/_next/static/css/31d56ce5b12f527f.css', revision: '31d56ce5b12f527f' },
        { url: '/_next/static/css/38152fa0adf71bf3.css', revision: '38152fa0adf71bf3' },
        {
          url: '/_next/static/jh-AefhH45C8daYyuA-G-/_buildManifest.js',
          revision: '3743afdffba36a352a9d72b91d069e53',
        },
        {
          url: '/_next/static/jh-AefhH45C8daYyuA-G-/_ssgManifest.js',
          revision: 'b6652df95db52feb4daf4eca35380933',
        },
        {
          url: '/_next/static/media/021bc4481ed92ece-s.woff2',
          revision: '0f5cb8880dd308345f58cecdc5fc5041',
        },
        {
          url: '/_next/static/media/04c24f78ad5a47d8-s.woff2',
          revision: 'b8e2d34878304af0af7552f727e9cca8',
        },
        {
          url: '/_next/static/media/13a314e63820922b-s.woff2',
          revision: '6e493671117e231571a1746987fbaa18',
        },
        {
          url: '/_next/static/media/37da3febcafd463e-s.woff2',
          revision: '6ffaf41555a2cfd84d55fb08dcb642d7',
        },
        {
          url: '/_next/static/media/3f69592b2fe603c7-s.woff2',
          revision: '84568c0a37620328592a78e9ad069d77',
        },
        {
          url: '/_next/static/media/403511e41efd5e81-s.woff2',
          revision: '7f28d9acd0a8a4c1464195d229d07842',
        },
        {
          url: '/_next/static/media/4f05ba3a6752a328-s.p.woff2',
          revision: 'ea21cc6e4b393851204d1a3160ad6abc',
        },
        {
          url: '/_next/static/media/51f6eedf9be77cd7-s.woff2',
          revision: '0533fc3fb6d983441a399f94eb182d81',
        },
        {
          url: '/_next/static/media/5d258b355fefebcb-s.p.woff2',
          revision: '17d59ecbda2abf92f999569b2072185c',
        },
        {
          url: '/_next/static/media/6325a8417175c41d-s.woff2',
          revision: 'a3fd0c427e31c0cadb48607ee8c7876b',
        },
        {
          url: '/_next/static/media/6d9d93fc6431e29f-s.woff2',
          revision: 'b6775ea1c82d22db77ed55049aaffad2',
        },
        {
          url: '/_next/static/media/99b7f73d5af7c3e2-s.woff2',
          revision: 'e94b5e20c27aefc321077e0493d637fa',
        },
        {
          url: '/_next/static/media/c1a1fe1e2bf9b2ee-s.woff2',
          revision: '5e13deb3df6f4ad52a1ed482edd90bc1',
        },
        {
          url: '/_next/static/media/d6fc113833db48fe-s.woff2',
          revision: 'ea21aa8efaf84307316a1633d34995d1',
        },
        {
          url: '/_next/static/media/e1df014bb05b8510-s.woff2',
          revision: '8027aefd3d59e5fa3da8e3d65e05a4b7',
        },
        { url: '/browserconfig.xml', revision: 'b5bb9313ab727bc7a62d2eaff3a1fd6d' },
        { url: '/dental-scanner-workflow.png', revision: 'f9033fee8acfd9bd0e7ad377fbc7ff2e' },
        { url: '/dental-team-laboratory.png', revision: 'b938e3113e61c49adbc0ff5057e30de0' },
        { url: '/dental-technician-portrait.png', revision: '21c152a5916cd67a2c7d132f39eac61e' },
        { url: '/female-orthodontist-portrait.png', revision: 'c84700e3b7bf1a37c4a00ddfe3ea265d' },
        { url: '/gallery-placeholder.svg', revision: 'ed4183319e5c0e8ecccb06344c0aaf73' },
        { url: '/index.html', revision: 'a10115cf5ec5c7d7ec6d05d886c98a02' },
        { url: '/logo-placeholder.svg', revision: '5d5d30c7cb1cbe8c2ff1a297f99e7127' },
        { url: '/male-implant-specialist.png', revision: '773b48b8deb50e71d4f3d799bee79896' },
        { url: '/manifest.json', revision: '2d1d42fead815de8b3214a68db958441' },
        { url: '/modern-dental-lab.png', revision: '3a19732b9a00451821db83720961dee9' },
        { url: '/placeholder-logo.svg', revision: '1e16dc7df824652c5906a2ab44aef78c' },
        { url: '/professional-female-dentist.png', revision: '4bc18bf72c0c7bc8eca2b39d45ade4be' },
        { url: '/professional-male-dentist.png', revision: 'aa894c7682fd8a8bb64091e0afc1f1bc' },
        { url: '/robots.txt', revision: 'fb2305b0ad9e6830768f9d457210f1c4' },
        { url: '/service-placeholder.svg', revision: '85325f02b24515d5e8c35f7e24ac0001' },
        { url: '/sitemap.xml', revision: '0be28324c6c99df6eebd8625263ff9b7' },
        { url: '/user-placeholder.svg', revision: '602ad439aea330e77df3010e800c4085' },
      ],
      { ignoreURLParametersMatching: [] }
    ),
    e.cleanupOutdatedCaches(),
    e.registerRoute(
      '/',
      new e.NetworkFirst({
        cacheName: 'start-url',
        plugins: [
          {
            cacheWillUpdate: async ({ request: e, response: a, event: s, state: i }) =>
              a && 'opaqueredirect' === a.type
                ? new Response(a.body, { status: 200, statusText: 'OK', headers: a.headers })
                : a,
          },
        ],
      }),
      'GET'
    ),
    e.registerRoute(
      /^https:\/\/fonts\.(?:gstatic)\.com\/.*/i,
      new e.CacheFirst({
        cacheName: 'google-fonts-webfonts',
        plugins: [new e.ExpirationPlugin({ maxEntries: 4, maxAgeSeconds: 31536e3 })],
      }),
      'GET'
    ),
    e.registerRoute(
      /^https:\/\/fonts\.(?:googleapis)\.com\/.*/i,
      new e.StaleWhileRevalidate({
        cacheName: 'google-fonts-stylesheets',
        plugins: [new e.ExpirationPlugin({ maxEntries: 4, maxAgeSeconds: 604800 })],
      }),
      'GET'
    ),
    e.registerRoute(
      /\.(?:eot|otf|ttc|ttf|woff|woff2|font.css)$/i,
      new e.StaleWhileRevalidate({
        cacheName: 'static-font-assets',
        plugins: [new e.ExpirationPlugin({ maxEntries: 4, maxAgeSeconds: 604800 })],
      }),
      'GET'
    ),
    e.registerRoute(
      /\.(?:jpg|jpeg|gif|png|svg|ico|webp)$/i,
      new e.StaleWhileRevalidate({
        cacheName: 'static-image-assets',
        plugins: [new e.ExpirationPlugin({ maxEntries: 64, maxAgeSeconds: 86400 })],
      }),
      'GET'
    ),
    e.registerRoute(
      /\/_next\/image\?url=.+$/i,
      new e.StaleWhileRevalidate({
        cacheName: 'next-image',
        plugins: [new e.ExpirationPlugin({ maxEntries: 64, maxAgeSeconds: 86400 })],
      }),
      'GET'
    ),
    e.registerRoute(
      /\.(?:js)$/i,
      new e.StaleWhileRevalidate({
        cacheName: 'static-js-assets',
        plugins: [new e.ExpirationPlugin({ maxEntries: 32, maxAgeSeconds: 86400 })],
      }),
      'GET'
    ),
    e.registerRoute(
      /\.(?:css|less)$/i,
      new e.StaleWhileRevalidate({
        cacheName: 'static-style-assets',
        plugins: [new e.ExpirationPlugin({ maxEntries: 32, maxAgeSeconds: 86400 })],
      }),
      'GET'
    ),
    e.registerRoute(
      /^https:\/\/.*\.(?:json|xml)$/i,
      new e.StaleWhileRevalidate({
        cacheName: 'api-cache',
        plugins: [new e.ExpirationPlugin({ maxEntries: 16, maxAgeSeconds: 86400 })],
      }),
      'GET'
    ))
})
