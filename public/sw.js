if (!self.define) {
  let e,
    s = {}
  const a = (a, t) => (
    (a = new URL(a + '.js', t).href),
    s[a] ||
      new Promise(s => {
        if ('document' in self) {
          const e = document.createElement('script')
          ;((e.src = a), (e.onload = s), document.head.appendChild(e))
        } else ((e = a), importScripts(a), s())
      }).then(() => {
        let e = s[a]
        if (!e) throw new Error(`Module ${a} didn’t register its module`)
        return e
      })
  )
  self.define = (t, i) => {
    const c = e || ('document' in self ? document.currentScript.src : '') || location.href
    if (s[c]) return
    let n = {}
    const r = e => a(e, c),
      d = { module: { uri: c }, exports: n, require: r }
    s[c] = Promise.all(t.map(e => d[e] || r(e))).then(e => (i(...e), n))
  }
}
define(['./workbox-5f3e40ee'], function (e) {
  'use strict'
  ;(importScripts(),
    self.skipWaiting(),
    e.clientsClaim(),
    e.precacheAndRoute(
      [
        { url: '/_next/app-build-manifest.json', revision: 'dd8ae1e1f567c7a96fda9b868363c9b4' },
        {
          url: '/_next/static/Zq9GUNEzpZdxxhrEGXt48/_buildManifest.js',
          revision: '51df45138b78b4af97f4591fdead094c',
        },
        {
          url: '/_next/static/Zq9GUNEzpZdxxhrEGXt48/_ssgManifest.js',
          revision: 'b6652df95db52feb4daf4eca35380933',
        },
        { url: '/_next/static/chunks/160.b78061e1f5e35af9.js', revision: 'b78061e1f5e35af9' },
        { url: '/_next/static/chunks/201.6249b9070fe11615.js', revision: '6249b9070fe11615' },
        { url: '/_next/static/chunks/215.e3a7cc16917afbe9.js', revision: 'e3a7cc16917afbe9' },
        {
          url: '/_next/static/chunks/2170a4aa-f220f188891353c6.js',
          revision: 'Zq9GUNEzpZdxxhrEGXt48',
        },
        { url: '/_next/static/chunks/235.7d2a019e0871d466.js', revision: '7d2a019e0871d466' },
        { url: '/_next/static/chunks/303-62519c8e2f90d817.js', revision: 'Zq9GUNEzpZdxxhrEGXt48' },
        { url: '/_next/static/chunks/352-7ba27a654928defb.js', revision: 'Zq9GUNEzpZdxxhrEGXt48' },
        { url: '/_next/static/chunks/370-5ea06e70dbc7afce.js', revision: 'Zq9GUNEzpZdxxhrEGXt48' },
        { url: '/_next/static/chunks/375.9007075176ad1d9f.js', revision: '9007075176ad1d9f' },
        { url: '/_next/static/chunks/432-64f93371afca11c1.js', revision: 'Zq9GUNEzpZdxxhrEGXt48' },
        { url: '/_next/static/chunks/438.24228e8f805ea4e6.js', revision: '24228e8f805ea4e6' },
        { url: '/_next/static/chunks/444.10a6a567da23672e.js', revision: '10a6a567da23672e' },
        { url: '/_next/static/chunks/480.c405b52b77f26350.js', revision: 'c405b52b77f26350' },
        {
          url: '/_next/static/chunks/4bd1b696-da185dd89127ea2b.js',
          revision: 'Zq9GUNEzpZdxxhrEGXt48',
        },
        { url: '/_next/static/chunks/51.9ff38612885446d6.js', revision: '9ff38612885446d6' },
        { url: '/_next/static/chunks/522.76c2b30b2abafd1c.js', revision: '76c2b30b2abafd1c' },
        { url: '/_next/static/chunks/541-94e486a1a8b34b3f.js', revision: 'Zq9GUNEzpZdxxhrEGXt48' },
        { url: '/_next/static/chunks/545.b74cb95d76c0bd91.js', revision: 'b74cb95d76c0bd91' },
        { url: '/_next/static/chunks/578.26c3a0d4efc67dea.js', revision: '26c3a0d4efc67dea' },
        { url: '/_next/static/chunks/622-a4476321a5de739c.js', revision: 'Zq9GUNEzpZdxxhrEGXt48' },
        { url: '/_next/static/chunks/63-703913ba2020acce.js', revision: 'Zq9GUNEzpZdxxhrEGXt48' },
        { url: '/_next/static/chunks/684-88febdde56deb1e0.js', revision: 'Zq9GUNEzpZdxxhrEGXt48' },
        { url: '/_next/static/chunks/719.19b8cbe408dc0bdb.js', revision: '19b8cbe408dc0bdb' },
        {
          url: '/_next/static/chunks/7508b87c-dda69d76c89b89c5.js',
          revision: 'Zq9GUNEzpZdxxhrEGXt48',
        },
        { url: '/_next/static/chunks/859-61afacf33ddbb938.js', revision: 'Zq9GUNEzpZdxxhrEGXt48' },
        { url: '/_next/static/chunks/865-149a2ae6738e6d13.js', revision: 'Zq9GUNEzpZdxxhrEGXt48' },
        { url: '/_next/static/chunks/874-fca5d28b33547be8.js', revision: 'Zq9GUNEzpZdxxhrEGXt48' },
        { url: '/_next/static/chunks/891-f6d802653c9e28a1.js', revision: 'Zq9GUNEzpZdxxhrEGXt48' },
        {
          url: '/_next/static/chunks/app/_not-found/page-536c9b1cd3928858.js',
          revision: 'Zq9GUNEzpZdxxhrEGXt48',
        },
        {
          url: '/_next/static/chunks/app/admin/layout-96d4a9832615f383.js',
          revision: 'Zq9GUNEzpZdxxhrEGXt48',
        },
        {
          url: '/_next/static/chunks/app/admin/page-194b7174abdbd8f8.js',
          revision: 'Zq9GUNEzpZdxxhrEGXt48',
        },
        {
          url: '/_next/static/chunks/app/api/send-email/route-e20edaafce401521.js',
          revision: 'Zq9GUNEzpZdxxhrEGXt48',
        },
        {
          url: '/_next/static/chunks/app/error-253db19c31835d09.js',
          revision: 'Zq9GUNEzpZdxxhrEGXt48',
        },
        {
          url: '/_next/static/chunks/app/layout-e3cdd5175e888321.js',
          revision: 'Zq9GUNEzpZdxxhrEGXt48',
        },
        {
          url: '/_next/static/chunks/app/loading-85fa02887c132649.js',
          revision: 'Zq9GUNEzpZdxxhrEGXt48',
        },
        {
          url: '/_next/static/chunks/app/not-found-4347d11288ce984a.js',
          revision: 'Zq9GUNEzpZdxxhrEGXt48',
        },
        {
          url: '/_next/static/chunks/app/page-f206748b3ea1b46e.js',
          revision: 'Zq9GUNEzpZdxxhrEGXt48',
        },
        {
          url: '/_next/static/chunks/app/servicios/%5Bslug%5D/page-8d5cc0b23f664ad6.js',
          revision: 'Zq9GUNEzpZdxxhrEGXt48',
        },
        {
          url: '/_next/static/chunks/dd8162e8-17389cbd908a7587.js',
          revision: 'Zq9GUNEzpZdxxhrEGXt48',
        },
        {
          url: '/_next/static/chunks/framework-c36158592fb88135.js',
          revision: 'Zq9GUNEzpZdxxhrEGXt48',
        },
        { url: '/_next/static/chunks/main-42ec4fa3218f414d.js', revision: 'Zq9GUNEzpZdxxhrEGXt48' },
        {
          url: '/_next/static/chunks/main-app-f29eaf12d18aa43c.js',
          revision: 'Zq9GUNEzpZdxxhrEGXt48',
        },
        {
          url: '/_next/static/chunks/pages/_app-8e94039938385921.js',
          revision: 'Zq9GUNEzpZdxxhrEGXt48',
        },
        {
          url: '/_next/static/chunks/pages/_error-7b2d139042a6a5ab.js',
          revision: 'Zq9GUNEzpZdxxhrEGXt48',
        },
        {
          url: '/_next/static/chunks/polyfills-42372ed130431b0a.js',
          revision: '846118c33b2c0e922d7b3a7676f81f6f',
        },
        {
          url: '/_next/static/chunks/webpack-d13d6ff201354023.js',
          revision: 'Zq9GUNEzpZdxxhrEGXt48',
        },
        { url: '/_next/static/css/38152fa0adf71bf3.css', revision: '38152fa0adf71bf3' },
        { url: '/_next/static/css/4646ae8322318dcc.css', revision: '4646ae8322318dcc' },
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
            cacheWillUpdate: async ({ request: e, response: s, event: a, state: t }) =>
              s && 'opaqueredirect' === s.type
                ? new Response(s.body, { status: 200, statusText: 'OK', headers: s.headers })
                : s,
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
