<template>
  <div class="w-full flex justify-between items-center mb-4">
    <div class="text-gray-400 dark:text-gray-500" aria-hidden="true">
      <svg xmlns="http://www.w3.org/2000/svg" width="28" height="28" viewBox="0 0 24 24" class="text-blue-500">
        <path fill="currentColor" d="m12 2l4.243 4.243l-1.415 1.414L12 4.828L9.172 7.657L7.757 6.243zM2 12l4.243-4.243l1.414 1.415L4.828 12l2.829 2.828l-1.414 1.415zm20 0l-4.243 4.243l-1.414-1.415L19.172 12l-2.829-2.828l1.414-1.415zm-10 2a2 2 0 1 1 0-4a2 2 0 0 1 0 4m0 8l-4.243-4.243l1.415-1.414L12 19.172l2.828-2.829l1.415 1.414z"/>
      </svg>
    </div>
    <button 
      @click="$emit('close')"
      class="text-gray-400 hover:text-gray-600 dark:text-gray-500 dark:hover:text-gray-300 transition-colors p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 dark:focus:ring-offset-gray-800"
      aria-label="إغلاق نافذة التعليقات"
    >
      <svg width="18" height="18" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M18 6L6 18M6 6L18 18" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
      </svg>
    </button>
  </div>
</template>

<script setup lang="ts">
defineEmits<{
  close: []
}>()
</script>
