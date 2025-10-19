<template>
  <div class="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100">
    <!-- Hero Section -->
    <div class="container mx-auto px-6 py-16">
      <div class="text-center">
        <h1 class="text-5xl font-bold text-gray-900 mb-6">
          Nuxt Feedback Layer
        </h1>
        <p class="text-xl text-gray-600 mb-8 max-w-3xl mx-auto">
          A beautiful, animated feedback widget system for your Nuxt applications. 
          Collect user feedback with like/dislike buttons or emoji ratings.
        </p>
        
        <div class="flex justify-center gap-4 mb-12">
          <NuxtLink 
            to="/test" 
            class="bg-blue-600 hover:bg-blue-700 text-white px-8 py-3 rounded-lg font-semibold transition-colors"
          >
            View Demo
          </NuxtLink>
          <a 
            href="https://github.com/Tafa3ul-Group/feedbacksystem" 
            target="_blank"
            class="bg-gray-800 hover:bg-gray-900 text-white px-8 py-3 rounded-lg font-semibold transition-colors"
          >
            View on GitHub
          </a>
        </div>
      </div>

      <!-- Features Grid -->
      <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-16">
        <div class="bg-white rounded-xl p-6 shadow-lg">
          <div class="text-3xl mb-4">🎯</div>
          <h3 class="text-xl font-semibold mb-2">Multiple Types</h3>
          <p class="text-gray-600">Choose between like/dislike buttons or emoji rating system.</p>
        </div>
        
        <div class="bg-white rounded-xl p-6 shadow-lg">
          <div class="text-3xl mb-4">🎨</div>
          <h3 class="text-xl font-semibold mb-2">Beautiful Animations</h3>
          <p class="text-gray-600">Smooth transitions and micro-interactions using Motion-v.</p>
        </div>
        
        <div class="bg-white rounded-xl p-6 shadow-lg">
          <div class="text-3xl mb-4">📱</div>
          <h3 class="text-xl font-semibold mb-2">Mobile Responsive</h3>
          <p class="text-gray-600">Works perfectly on all devices and screen sizes.</p>
        </div>
        
        <div class="bg-white rounded-xl p-6 shadow-lg">
          <div class="text-3xl mb-4">🔧</div>
          <h3 class="text-xl font-semibold mb-2">Easy Integration</h3>
          <p class="text-gray-600">Simple composable-based API for custom implementations.</p>
        </div>
        
        <div class="bg-white rounded-xl p-6 shadow-lg">
          <div class="text-3xl mb-4">💾</div>
          <h3 class="text-xl font-semibold mb-2">PocketBase Ready</h3>
          <p class="text-gray-600">Built-in integration with PocketBase backend.</p>
        </div>
        
        <div class="bg-white rounded-xl p-6 shadow-lg">
          <div class="text-3xl mb-4">⚡</div>
          <h3 class="text-xl font-semibold mb-2">Nuxt Layer</h3>
          <p class="text-gray-600">Easy to extend and customize for your needs.</p>
        </div>
      </div>

      <!-- Quick Start -->
      <div class="bg-white rounded-xl p-8 shadow-lg">
        <h2 class="text-2xl font-bold text-center mb-6">Quick Start</h2>
        
        <div class="space-y-6">
          <div>
            <h3 class="text-lg font-semibold mb-2">1. Install the layer</h3>
            <pre class="bg-gray-900 text-green-400 p-4 rounded-lg overflow-x-auto"><code>npm install nuxt-feedback-layer</code></pre>
          </div>
          
          <div>
            <h3 class="text-lg font-semibold mb-2">2. Add to nuxt.config.ts</h3>
            <pre class="bg-gray-900 text-blue-300 p-4 rounded-lg overflow-x-auto"><code>export default defineNuxtConfig({
  extends: ['nuxt-feedback-layer']
})</code></pre>
          </div>
          
          <div>
            <h3 class="text-lg font-semibold mb-2">3. Use in your pages</h3>
            <pre class="bg-gray-900 text-yellow-300 p-4 rounded-lg overflow-x-auto"><code>&lt;FeedbackWidget 
  url="your-pocketbase-url"
  token="your-project-token"
/&gt;</code></pre>
          </div>
        </div>
      </div>
    </div>

    <!-- Demo Widget -->
    <FeedbackWidget :token="token" :url="url" />
  </div>
</template>

<script lang="ts" setup>
const url = "https://pocketbase-oc08cc8g8gccgkwsw8wsw8s8.dudes.studio";
const token = "k4y443tmvx4k52u";

useHead({
  title: 'Nuxt Feedback Layer - Beautiful Feedback Widgets for Nuxt',
  meta: [
    { 
      name: 'description', 
      content: 'A Nuxt layer providing beautiful, animated feedback widgets with like/dislike buttons and emoji ratings. Easy to integrate with PocketBase backend.' 
    }
  ]
});
</script>
