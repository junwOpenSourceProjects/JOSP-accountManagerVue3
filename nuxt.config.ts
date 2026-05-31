// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  compatibilityDate: '2025-01-01',
  devtools: { enabled: true },
  
  modules: ['@nuxt/ui'],
  
  app: {
    head: {
      title: '账户管理系统',
      meta: [
        { charset: 'utf-8' },
        { name: 'viewport', content: 'width=device-width, initial-scale=1' },
        { name: 'description', content: '账户管理系统前端' }
      ],
      style: [
        { innerHTML: "body{font-family:'等线','DengXian','Microsoft YaHei',sans-serif}" }
      ]
    }
  },

  css: ['~/assets/css/main.css'],

  runtimeConfig: {
    public: {
      baseURL: process.env.NUXT_PUBLIC_BASE_URL || '/api'
    }
  },

  ui: {
    primary: '#1456f0',
    gray: 'neutral',
    fonts: false
  }
})