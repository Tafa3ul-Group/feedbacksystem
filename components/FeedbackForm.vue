<template>
  <div class="space-y-4">
    <!-- Header -->
    <div class="text-center">
      <h3 class="text-lg font-semibold text-gray-900 dark:text-gray-100 mb-2">
        نود أن نعرف المزيد!
      </h3>
      <p class="text-sm text-gray-500 dark:text-gray-400">
        أخبرنا كيف يمكننا تحسين تجربتك
      </p>
    </div>
    
    <!-- Form -->
    <div class="space-y-4">
      <div>
        <label for="feedback-textarea" class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
          تعليقك (اختياري)
        </label>
        <textarea
          id="feedback-textarea"
          v-model="feedback"
          rows="4"
          class="w-full rounded-lg border border-gray-300 dark:border-gray-600 p-3 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent resize-none bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100 placeholder-gray-500 dark:placeholder-gray-400 transition-all duration-200"
          placeholder="شاركنا أفكارك أو اقتراحاتك..."
          aria-label="تعليق إضافي"
          :disabled="isSubmitting"
        ></textarea>
      </div>
      
      <!-- Actions -->
      <div class="flex gap-3 justify-end">
        <button 
          @click="$emit('cancel')" 
          :disabled="isSubmitting"
          class="px-4 py-2 text-sm font-medium text-gray-700 dark:text-gray-300 hover:text-gray-900 dark:hover:text-gray-100 hover:bg-gray-100 dark:hover:bg-gray-800 disabled:opacity-50 focus:outline-none focus:ring-2 focus:ring-gray-500 focus:ring-offset-2 dark:focus:ring-offset-gray-900 rounded-lg transition-all duration-200"
        >
          إلغاء
        </button>
        
        <button
          @click="$emit('submit')"
          :disabled="isSubmitting"
          class="px-4 py-2 bg-green-600 hover:bg-green-700 disabled:bg-gray-400 text-white text-sm font-medium rounded-lg transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 dark:focus:ring-offset-gray-900 disabled:cursor-not-allowed flex items-center gap-2"
          :aria-label="isSubmitting ? 'جاري الإرسال...' : 'إرسال التعليق'"
        >
          <svg v-if="isSubmitting" class="animate-spin h-4 w-4" viewBox="0 0 24 24">
            <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4" fill="none"/>
            <path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"/>
          </svg>
         
          {{ isSubmitting ? 'جاري الإرسال...' : 'إرسال' }}
        </button>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
interface Props {
  isSubmitting: boolean
}

defineProps<Props>()

const feedback = defineModel<string>('feedback')

defineEmits<{
  submit: []
  cancel: []
}>()
</script>
