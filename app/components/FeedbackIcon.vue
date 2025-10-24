<template>
  <div ref="iconRef"
    class="fixed z-50 w-12 h-20 bg-gray-800 dark:bg-gray-900 rounded-t-lg rounded-b-lg flex flex-col items-center justify-between py-2 cursor-pointer select-none transition-all duration-300 group bottom-4 right-4"
    :class="{
      'hover:bg-gray-700 dark:hover:bg-gray-800 hover:scale-105': !isActive,
      'bg-gray-700 dark:bg-gray-800 scale-105': isActive,
      'shadow-lg hover:shadow-xl': !isActive,
      'shadow-xl': isActive
    }" @click="handleClick" @mouseenter="handleMouseEnter" @mouseleave="handleMouseLeave" role="button"
    :aria-label="'فتح نافذة التعليقات'" tabindex="0" @keydown.enter="handleClick" @keydown.space.prevent="handleClick">
      <div class="flex items-center justify-center">
        <svg width="20" height="30" viewBox="0 0 191 176" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M141.306 175.444H92.5374L141.306 0H190.075L141.306 175.444Z" fill="#23AD6D" />
          <path
            d="M61.5 114.5C52.069 105.069 44 88 44 88C44 88 35.931 105.069 26.5 114.5C17.069 123.931 0 132 0 132C0 132 17.069 140.069 26.5 149.5C35.931 158.931 44 176 44 176C44 176 52.069 158.931 61.5 149.5C70.931 140.069 88 132 88 132C88 132 70.931 123.931 61.5 114.5Z"
            fill="#23AD6D" />
        </svg>
      </div>
      
      <!-- خط فاصل -->
      <div class="w-6 h-px bg-gray-600 dark:bg-gray-400 opacity-50"></div>

      <div class="flex items-center justify-center">
      <svg width="16" height="16" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"
        class="text-white/70 transition-colors duration-200" :class="{
          'group-hover:text-white': !isActive,
          'text-white': isActive
        }" aria-hidden="true">
        <!-- Speech Bubble Icon -->
        <path
          d="M21 15C21 15.5304 20.7893 16.0391 20.4142 16.4142C20.0391 16.7893 19.5304 17 19 17H7L3 21V5C3 4.46957 3.21071 3.96086 3.58579 3.58579C3.96086 3.21071 4.46957 3 5 3H19C19.5304 3 20.0391 3.21071 20.4142 3.58579C20.7893 3.96086 21 4.46957 21 5V15Z"
          stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" fill="none" />
        <path d="M8 9H16M8 13H12" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" />
      </svg>
    </div>

    <!-- Active State Indicator (Left Border) -->
    <div v-if="isActive" class="absolute left-0 top-0 bottom-0 w-0.5 bg-green-400 rounded-l-lg"></div>
  </div>
</template>

<script setup lang="ts">
import { ref, computed } from 'vue'

// إضافة emit function
const emit = defineEmits<{
  toggle: []
}>()

const iconRef = ref<HTMLElement>()

// متغيرات للحالات المختلفة
const isActive = ref(false)
const isHovered = ref(false)

// نص الأداء (يمكن تخصيصه)
const performanceText = computed(() => {
  // يمكن تغيير هذا النص حسب الحاجة
  return '34 ms'
})

// دالة للتعامل مع النقر
function handleClick(event: MouseEvent | TouchEvent) {
  // منع السلوك الافتراضي
  event.preventDefault()
  event.stopPropagation()

  // تفعيل الحالة النشطة مؤقتاً
  isActive.value = true

  // إرسال حدث التبديل
  emit('toggle')

  // إعادة تعيين الحالة النشطة بعد فترة قصيرة
  setTimeout(() => {
    isActive.value = false
  }, 200)
}

// دوال للتعامل مع hover
function handleMouseEnter() {
  isHovered.value = true
}

function handleMouseLeave() {
  isHovered.value = false
}
</script>
