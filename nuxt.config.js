// load package file and configure .env file
const pkg = require('./package');
require('dotenv').config();

module.exports = {
  mode: 'spa', // spa, universal

  /*
  **  Server configuration
   */
  server: {
    port: 3000, // default: 3000
    host: 'localhost', // default: localhost,
    timing: false
  },

  /*
  ** Env
  */
  env: {
    version: pkg.version,
    build: process.env.NODE_ENV
  },

  /*
  ** Headers of the page
  */
  head: {
    title: pkg.name,
    meta: [
      { charset: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1' },
      { hid: 'description', name: 'description', content: pkg.description },
      { hid: 'og:type', property: 'og:type', content: 'website' },
      { hid: 'og:title', property: 'og:title', content: "Freiheit statt Freizeit" },
      { hid: 'og:description', property: 'og:description', content: "Mach jetzt mit beim Entwickeln einer zivilgesellschaftlichen Grundeinkommenslösung #civicbge" },
      { hid: 'og:image', property: 'og:image', content: process.env.APP_BASE + '/bge-meta-image.jpg' },
      { hid: 'twitter:card', property: 'twitter:card', content: 'summary_large_image' }, // 'summary'
      { hid: 'twitter:title', property: 'twitter:title', content:  "Freiheit statt Freizeit" },
      { hid: 'twitter:description', property: 'twitter:description', content: "Mach jetzt mit beim Entwickeln einer zivilgesellschaftlichen Grundeinkommenslösung #civicbge" },
      { hid: 'twitter:image', property: 'twitter:image', content: process.env.APP_BASE + '/bge-meta-image.jpg' },
    ],
    link: [
      { rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' }
    ]
  },

  /*
   ** Global CSS
   */
  css: [
    // add custom css
    '@/assets/scss/styles.scss',
    // add bootstrap css
    //'@/node_modules/bootstrap/dist/css/bootstrap.min.css',
    // add fontawesome css
    '@fortawesome/fontawesome-svg-core/styles.css',
    '@fortawesome/fontawesome-free/css/brands.min.css',
    '@fortawesome/fontawesome-free/css/solid.min.css',
    '@fortawesome/fontawesome-free/css/regular.min.css',
    '@fortawesome/fontawesome-free/css/fontawesome.min.css',
  ],

  /*
  ** Plugins to load before mounting the App
  */
  plugins: [
    '~/plugins/fontawesome.js',
    '~/plugins/i18n.js',
    { src: '~/plugins/persistedstorage.js', ssr: false },
    { src: '~/plugins/vue-masonry.js', ssr: false },
    { src: '~/plugins/global.js' },
  ],

  /*
  ** Nuxt.js modules
  */
  modules: [
    // Doc: https://github.com/nuxt-community/axios-module#usage
    '@nuxtjs/axios',
    // defines environment variables in file
    ['@nuxtjs/dotenv', { filename: '.env'}],
    // Doc: https://bootstrap-vue.js.org/docs/; add bootstrap with custom css
    ['bootstrap-vue/nuxt', { bootstrapCSS: false, bootstrapVueCSS: false}],
    // client init
    'nuxt-client-init-module',
    // parse markdown content files
    '@nuxtjs/markdownit',
    // Google Analytics
    //['@nuxtjs/google-analytics', {
    //  id: 'UA-136229774-2',
    //  set: [{ field: 'anonymizeIp', value: true }] // !
    //}]
  ],

  /*
  ** Axios module configuration
  */
  axios: {
    // See https://github.com/nuxt-community/axios-module#options
  },

  /*
  ** Markdownit module configuration
  ** See https://github.com/markdown-it/markdown-it
  */
  markdownit: {
    preset: 'default',
    html: true,
    linkify: true,
    breaks: true,
  },

  /*
  ** Router configuration
  */
  router: {
    base: '/',
    linkActiveClass: 'active',
    linkExactActiveClass: 'exact-active',

    // handles routes in different languages
    middleware: 'i18n'
  },

  /*
  ** Set up parameter values for every dynamic route in static mode.
  */
  generate: {
    routes: [
      '/', '/en', '/fr',
      '/about', '/en/about', '/fr/about',
      '/contact', '/en/contact', '/fr/contact',
      '/impressum', '/en/impressum', '/fr/impressum',
      '/data-protection', '/en/data-protection', '/fr/data-protection',
      '/server-unreachable', '/en/server-unreachable', '/fr/server-unreachable',
      '/test/test-api', '/en/test/test-api','/fr/test/test-api',
      '/test/typography', '/en/test/typography','/fr/test/typography',
      '/test/form-elements', '/en/test/form-elements','/fr/test/form-elements',
      '/test/grid-spacing', '/en/test/grid-spacing','/fr/test/grid-spacing',
    ]
  },

  /*
  ** Build configuration
  */
  build: {
    /*
    ** You can extend webpack config here
    */
    extend(config, ctx) {
      // disable uglify, does not support ES6 -_-
      config.plugins = config.plugins.filter((plugin) => plugin.constructor.name !== 'UglifyJsPlugin');

      // debug settings
      if (ctx.isDev) {
        config.devtool = ctx.isClient ? 'eval-source-map' : 'inline-source-map';
      }
    }
  },

  /*
  ** Customize the loading progress-bar and SPA spinner
  */
  loading: {
    color: '#BF9C50',
    height: '2px',
    duration: 5000
  },

  loadingIndicator: {
    name: 'cube-grid',
    color: '#BF9C50',
    background: 'transparent'
  },

  /*
  ** Layout transition
  */
  layoutTransition: {
    name: 'fading',
    mode: ''
  },
  /*
  ** Page transition
  */
  pageTransition: {
    name: 'fading',
    mode: ''
  },
};
