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
  ** Headers of the page
  */
  head: {
    title: pkg.name,
    meta: [
      { charset: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1' },
      { hid: 'description', name: 'description', content: pkg.description }
    ],
    link: [
      { rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' }
    ]
  },

  /*
   ** Global CSS
   */
  css: [
    // add bootstrap css
    '@/node_modules/bootstrap/dist/css/bootstrap.min.css',
    // add fontawesome css
    //'@fortawesome/fontawesome-svg-core/styles.css',
  ],

  /*
  ** Plugins to load before mounting the App
  */
  plugins: [
    '~/plugins/fontawesome.js',
    '~/plugins/i18n.js',
    { src: '~/plugins/persistedStorage.js', ssr: false },
    { src: '~/plugins/vue-masonry.js', ssr: false },
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
    ['bootstrap-vue/nuxt', { css: false }],
    // client init
    'nuxt-client-init-module',
    // parse markdown content files
    '@nuxtjs/markdownit',
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
      '/contact', '/en/contact', '/fr/contact',
      '/impressum', '/en/impressum', '/fr/impressum',
      '/api-test', '/en/api-test', '/fr/api-test',
      '/server-unreachable', '/en/server-unreachable', '/fr/server-unreachable',
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
        config.devtool = 'source-map';
      }
    }
  },

  /*
  ** Customize the loading progress-bar and SPA spinner
  */
  loading: {
    color: '#fd7e14',
    height: '2px',
    duration: 5000
  },

  loadingIndicator: {
    name: 'cube-grid',
    color: '#fd7e14',
    background: 'transparent'
  },

  /*
  ** Page transition
  */
  transition: {
    name: 'fading',
    mode: ''
  },
}
