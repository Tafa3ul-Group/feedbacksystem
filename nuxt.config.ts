// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  compatibilityDate: '2025-05-15',
  devtools: { enabled: true },
  modules: ['@nuxtjs/tailwindcss', 'motion-v/nuxt'],
  
  
  // Export components globally for consuming projects
  components: [
    {
      path: '~/components',
      global: true
    }
  ],

  // Auto-import composables
  imports: {
    dirs: ['composables']
  }
})