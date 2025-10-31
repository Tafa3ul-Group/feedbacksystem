<template>
  <div class="space-y-4">
    <!-- Header -->
    <div class="text-center">
      <h3 class="text-lg font-semibold text-foreground mb-2">
        نود أن نعرف المزيد!
      </h3>
      <p class="text-sm text-muted-foreground">
        أخبرنا كيف يمكننا تحسين تجربتك
      </p>
    </div>
    
    <!-- Form -->
    <div class="space-y-4">
      <div>
        <label for="feedback-textarea" class="block text-sm font-medium text-foreground mb-2">
          تعليقك (اختياري)
        </label>
        <textarea
          id="feedback-textarea"
          v-model="feedback"
          rows="4"
          class="w-full rounded-lg border border-input p-3 text-sm focus:outline-none focus:ring-2 focus:ring-ring focus:border-transparent resize-none bg-background text-foreground placeholder-muted-foreground transition-all duration-200"
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
          class="px-4 py-2 text-sm font-medium text-secondary-foreground hover:text-foreground hover:bg-secondary disabled:opacity-50 focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 rounded-lg transition-all duration-200"
        >
          إلغاء
        </button>
        
        <button
          @click="$emit('submit')"
          :disabled="isSubmitting"
          class="px-4 py-2 bg-primary hover:bg-primary/90 disabled:bg-muted text-primary-foreground text-sm font-medium rounded-lg transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 disabled:cursor-not-allowed flex items-center gap-2"
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
