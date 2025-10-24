// https://nuxt.com/docs/api/configuration/nuxt-config
import tailwindcss from "@tailwindcss/vite";
export default defineNuxtConfig({
  compatibilityDate: '2025-05-15',
  devtools: { enabled: true },
  css: ['~/assets/css/main.css'],
  vite: {
    plugins: [
      tailwindcss(),
    ],
  },

  // Export components globally for consuming projects
  components: [
    {
      path: '~/components',
      global: true,
      pathPrefix: false
    }
  ],

  // Auto-import composables
  imports: {
    dirs: ['composables']
  }
})