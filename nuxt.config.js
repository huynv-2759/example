export default {
  // Global page headers: https://go.nuxtjs.dev/config-head
  head: {
    title: 'Job manage',
    htmlAttrs: {
      lang: 'en'
    },
    meta: [
      { charset: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1' },
      { hid: 'description', name: 'description', content: 'Project demo todo web nuxtjs' },
      { name: 'format-detection', content: 'telephone=no' }
    ],
    link: [
      { rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' },
    ]
  },

  // Global CSS: https://go.nuxtjs.dev/config-css
  css: [
  ],

  // Plugins to run before rendering page: https://go.nuxtjs.dev/config-plugins
  plugins: [
    '@/plugins/axios.js',
  ],

  // Auto import components: https://go.nuxtjs.dev/config-components
  components: true,

  // Modules for dev and build (recommended): https://go.nuxtjs.dev/config-modules
  buildModules: [
    // https://go.nuxtjs.dev/eslint
    '@nuxtjs/eslint-module',
    // https://go.nuxtjs.dev/stylelint
    '@nuxtjs/stylelint-module',
  ],

  // Modules: https://go.nuxtjs.dev/config-modules
  // modules: [
  //   // https://go.nuxtjs.dev/axios
  //   '@nuxtjs/axios',
  // ],

  // // Axios module configuration: https://go.nuxtjs.dev/config-axios
  // axios: {},

  // Build Configuration: https://go.nuxtjs.dev/config-build
  build: {
  },
  modules: [
    // Doc: https://github.com/nuxt-community/axios-module#usage
    '@nuxtjs/axios',
    // Doc: https://github.com/bootstrap-vue/bootstrap-vue
    'bootstrap-vue/nuxt',
    '@nuxtjs/auth'
  ],

 /*
  ** Axios module configuration
  */
  axios: {
    baseURL: 'http://127.0.0.1:8000/api/',
    debug: process.env.DEBUG || false,
    proxyHeaders: false,
    credentials: false,
  },

  auth: {
    strategies: {
      local: {
        endpoints: {
          login: {
            url: 'login-user',
            method: 'post',
            propertyName: 'access',
          },
          user: {
            url: 'get-user-infomation',
            method: 'get',
            propertyName: 'users'
          },
          tokenRequired: true,
          logout: false
        }
      },
      watchLoggedIn: true,
      redirect: {
        login: '/login',
        logout: '/',
        callback: '/login',
        home: '/'
      }
    }
  },
  // router: {
  //   middleware: 'auth'
  // }
}
