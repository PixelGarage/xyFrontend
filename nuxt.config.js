const pkg = require('./package')

module.exports = {
  mode: 'spa',

  /*
   ** Environment variables that will be shared for the client and server-side.
   */
  env: {
    // Application title
    title: 'MyApp',

    // your JSON API server URL :
    jsonApiDevServer: 'http://localhost',
    jsonApiProdServer: 'http://cms.deinbge.ch', // 'https://live-contentacms.pantheonsite.io',
    jsonApiPrefix: 'api',
    clientID: 'cc152d32-fc0f-42e0-84c2-2415eb64f403',
    clientSecret: 'vu3Cl!3nt'
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
    //'~/plugins/vue-logger.js',
    //'~/plugins/fontawesome.js',
    {
      src: '~/plugins/vue-masonry.js',
      ssr: false
    },
 ],
  /*
  ** Nuxt.js modules
  */
  modules: [
    // Doc: https://github.com/nuxt-community/axios-module#usage
    '@nuxtjs/axios',
    // Doc: https://bootstrap-vue.js.org/docs/
    // add bootstrap with custom css
    ['bootstrap-vue/nuxt', {
      css: false
    }],
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
  ** [optional] markdownit options
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

    // check globally if API server is up, to avoid ugly errors pages
    // when its down or when there is no internet connection
    //middleware: 'server-api-available'
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
    }
}
