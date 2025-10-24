// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  compatibilityDate: '2025-05-15',
  devtools: { enabled: true },
  modules: [],
  
  app: {
    head: {
      script: [
        {
          src: 'https://cdn.jsdelivr.net/npm/@tailwindcss/browser@4',
          tagPosition: 'head'
        }
      ]
    }
  },

})