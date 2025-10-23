<template>
  <div
    class="flex flex-col items-center gap-4 py-6"
    role="status"
    aria-live="polite"
    aria-label="تم إرسال التعليق بنجاح"
  >
    <!-- Success Icon -->
    <div class="relative">
      <div class="w-16 h-16 bg-gradient-to-br from-green-400 to-green-500 dark:from-green-500 dark:to-green-600 rounded-full flex items-center justify-center shadow-lg">
        <svg width="32" height="32" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" class="text-white">
          <path d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
        </svg>
      </div>
      <!-- Animated ring -->
      <div class="absolute inset-0 rounded-full bg-green-400/30 dark:bg-green-500/30 animate-ping"></div>
    </div>
    
    <!-- Success Message -->
    <div class="text-center space-y-2">
      <h3 class="text-lg font-semibold text-green-600 dark:text-green-400">
        شكراً لك على تعليقك!
      </h3>
      <p class="text-sm text-gray-600 dark:text-gray-400">
        ملاحظاتك تساعدنا على التحسين والتطوير
      </p>
    </div>
    
    <!-- Decorative elements -->
    <div class="flex gap-1">
      <div class="w-1.5 h-1.5 bg-green-400 dark:bg-green-500 rounded-full animate-bounce"></div>
      <div class="w-1.5 h-1.5 bg-green-400 dark:bg-green-500 rounded-full animate-bounce" style="animation-delay: 0.1s"></div>
      <div class="w-1.5 h-1.5 bg-green-400 dark:bg-green-500 rounded-full animate-bounce" style="animation-delay: 0.2s"></div>
    </div>
  </div>
</template>

<script setup lang="ts">
// No props or emits needed for this simple success message component
</script>
