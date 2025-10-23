<template>
  <div class="space-y-6">
    <!-- Title Section -->
    <div class="text-center">
      <h3 class="text-lg font-semibold text-gray-900 dark:text-gray-100 mb-2">
        هل كانت هذه الصفحة مفيدة؟
      </h3>
      <p class="text-sm text-gray-500 dark:text-gray-400">
        تقييمك يساعدنا على تحسين تجربتك
      </p>
    </div>
    
    <!-- Like/Dislike Buttons -->
    <div
      v-if="type === 'like_dislike'"
      class="flex justify-center gap-6"
      role="group"
      aria-label="تقييم فائدة الصفحة"
    >
      <button
        @click="$emit('select', 'like')"
        class="group flex flex-col items-center gap-3 p-4 rounded-xl hover:bg-green-50 dark:hover:bg-green-900/20 transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-offset-2 dark:focus:ring-offset-gray-900"
        aria-label="إعجاب - هذه الصفحة مفيدة"
      >
        <div class="w-12 h-12 bg-green-100 dark:bg-green-900/30 rounded-full flex items-center justify-center group-hover:bg-green-200 dark:group-hover:bg-green-900/50 transition-colors">
          <span class="text-2xl group-hover:animate-bounce" role="img" aria-label="إبهام لأعلى">👍</span>
        </div>
        <div class="text-sm font-medium text-gray-700 dark:text-gray-300">مفيد</div>
      </button>
      
      <button
        @click="$emit('select', 'dislike')"
        class="group flex flex-col items-center gap-3 p-4 rounded-xl hover:bg-red-50 dark:hover:bg-red-900/20 transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-offset-2 dark:focus:ring-offset-gray-900"
        aria-label="عدم إعجاب - هذه الصفحة غير مفيدة"
      >
        <div class="w-12 h-12 bg-red-100 dark:bg-red-900/30 rounded-full flex items-center justify-center group-hover:bg-red-200 dark:group-hover:bg-red-900/50 transition-colors">
          <span class="text-2xl group-hover:animate-bounce" role="img" aria-label="إبهام لأسفل">👎</span>
        </div>
        <div class="text-sm font-medium text-gray-700 dark:text-gray-300">غير مفيد</div>
      </button>
    </div>
    
    <!-- Emoji Options -->
    <div
      v-else-if="type === 'emojis'"
      class="grid grid-cols-5 gap-3"
      role="group"
      aria-label="تقييم الصفحة بالإيموجي"
    >
      <button
        v-for="emoji in emojiOptions"
        :key="emoji.value"
        @click="$emit('selectEmoji', emoji)"
        class="group flex flex-col items-center gap-2 p-3 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-800 transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 dark:focus:ring-offset-gray-900"
        :aria-label="emoji.desc"
      >
        <div class="text-2xl group-hover:animate-pulse">{{ emoji.label }}</div>
        <div class="text-xs text-gray-500 dark:text-gray-400 font-medium text-center">{{ emoji.desc }}</div>
      </button>
    </div>
  </div>
</template>

<script setup lang="ts">
interface EmojiOption {
  value: number
  label: string
  desc: string
}

interface Props {
  type: 'like_dislike' | 'emojis'
}

const props = defineProps<Props>()

defineEmits<{
  select: [type: 'like' | 'dislike']
  selectEmoji: [emoji: EmojiOption]
}>()

const emojiOptions: EmojiOption[] = [
  { value: 2, label: "😃", desc: "Very helpful" },
  { value: 1, label: "🙂", desc: "Helpful" },
  { value: 0, label: "😐", desc: "Neutral" },
  { value: -1, label: "😕", desc: "Confusing" },
  { value: -2, label: "😡", desc: "Not helpful" },
]
</script>
