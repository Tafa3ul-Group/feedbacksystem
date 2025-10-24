<template>
  <div class="min-h-screen bg-gray-50 p-8">
    <div class="max-w-4xl mx-auto">
      <h1 class="text-3xl font-bold text-gray-900 mb-8">Feedback Layer Test Page</h1>
      
      <div class="grid grid-cols-1 md:grid-cols-2 gap-8">
        <!-- Like/Dislike Widget Demo -->
        <div class="bg-white rounded-lg p-6 shadow-lg">
          <h2 class="text-xl font-semibold mb-4">Like/Dislike Widget</h2>
          <p class="text-gray-600 mb-4">
            This demonstrates the basic thumbs up/down feedback widget.
          </p>
          <div class="relative h-32">
            <FeedbackWidget 
              :token="token" 
              :url="url" 
              type="emojis"
            />
          </div>
        </div>

        <!-- Emoji Widget Demo -->
        <div class="bg-white rounded-lg p-6 shadow-lg">
          <h2 class="text-xl font-semibold mb-4">Emoji Rating Widget</h2>
          <p class="text-gray-600 mb-4">
            This demonstrates the emoji-based rating system.
          </p>
          <div class="relative h-32">
            <FeedbackWidget 
              :token="token" 
              :url="url" 
              type="emojis"
            />
          </div>
        </div>
      </div>

      <!-- Composable Usage Demo -->
      <div class="mt-8 bg-white rounded-lg p-6 shadow-lg">
        <h2 class="text-xl font-semibold mb-4">Composable Usage</h2>
        <p class="text-gray-600 mb-4">
          This demonstrates using the useFeedback composable directly.
        </p>
        
        <div class="flex gap-4 items-center">
          <button
            @click="sendPositiveFeedback"
            :disabled="isSubmitting"
            class="bg-green-500 hover:bg-green-600 disabled:bg-gray-400 text-white px-4 py-2 rounded transition-colors"
          >
            {{ isSubmitting ? 'Sending...' : 'Send Positive Feedback' }}
          </button>
          
          <button
            @click="sendNegativeFeedback"
            :disabled="isSubmitting"
            class="bg-red-500 hover:bg-red-600 disabled:bg-gray-400 text-white px-4 py-2 rounded transition-colors"
          >
            {{ isSubmitting ? 'Sending...' : 'Send Negative Feedback' }}
          </button>
        </div>

        <div v-if="error" class="mt-4 p-3 bg-red-100 text-red-700 rounded">
          {{ error }}
        </div>

        <div v-if="successMessage" class="mt-4 p-3 bg-green-100 text-green-700 rounded">
          {{ successMessage }}
        </div>
      </div>

      <!-- Integration Guide -->
      <div class="mt-8 bg-blue-50 rounded-lg p-6">
        <h2 class="text-xl font-semibold mb-4 text-blue-900">Integration Guide</h2>
        <p class="text-blue-800 mb-4">
          To use this layer in your project, add it to your nuxt.config.ts:
        </p>
        <pre class="bg-blue-900 text-blue-100 p-4 rounded overflow-x-auto text-sm"><code>export default defineNuxtConfig({
  extends: ['nuxt-feedback-layer']
})</code></pre>
        
        <p class="text-blue-800 mt-4 mb-2">
          Then use the FeedbackWidget component anywhere in your app:
        </p>
        <pre class="bg-blue-900 text-blue-100 p-4 rounded overflow-x-auto text-sm"><code>&lt;FeedbackWidget 
  url="your-pocketbase-url"
  token="your-project-token"
  type="like_dislike"
/&gt;</code></pre>
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
const url = "https://pocketbase-oc08cc8g8gccgkwsw8wsw8s8.dudes.studio";
const token = "izdgvr1rzw65qmn";

// Demonstrate composable usage
const { submitFeedback, isSubmitting, error } = useFeedback({
  url,
  token,
  type: 'emojis'
});

const successMessage = ref('');

const sendPositiveFeedback = async () => {
  successMessage.value = '';
  const success = await submitFeedback({
    comment: 'Positive feedback from composable test',
    score: 1
  });
  
  if (success) {
    successMessage.value = 'Positive feedback sent successfully!';
    setTimeout(() => successMessage.value = '', 3000);
  }
};

const sendNegativeFeedback = async () => {
  successMessage.value = '';
  const success = await submitFeedback({
    comment: 'Negative feedback from composable test',
    score: 0
  });
  
  if (success) {
    successMessage.value = 'Negative feedback sent successfully!';
    setTimeout(() => successMessage.value = '', 3000);
  }
};
</script>
