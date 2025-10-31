<template>
  <div>
    <!-- Minimized Widget (Icon State) -->
    <Transition enter-active-class="transition-all duration-300 ease-out"
      enter-from-class="opacity-0 scale-75 translate-y-2" enter-to-class="opacity-100 scale-100 translate-y-0"
      leave-active-class="transition-all duration-200 ease-in" leave-from-class="opacity-100 scale-100 translate-y-0"
      leave-to-class="opacity-0 scale-75 translate-y-2">
      <FeedbackIcon v-if="!isExpanded" @toggle="enhancedToggleExpanded" />
    </Transition>

    <!-- Expanded Widget (Full State) -->
    <Transition enter-active-class="transition-all duration-300 ease-out"
      enter-from-class="opacity-0 scale-90 translate-y-4" enter-to-class="opacity-100 scale-100 translate-y-0"
      leave-active-class="transition-all duration-200 ease-in" leave-from-class="opacity-100 scale-100 translate-y-0"
      leave-to-class="opacity-0 scale-90 translate-y-4">
      <div v-if="isExpanded" ref="widgetRef"
        class="fixed z-50 w-80 max-w-[calc(100vw-32px)] bg-card/90 backdrop-blur-xl shadow-2xl rounded-2xl border border-border/50 select-none transition-all duration-300 hover:shadow-3xl bottom-20 right-4"
        role="dialog" aria-labelledby="feedback-title" aria-modal="true">
        <!-- Header Section -->
        <div class="flex items-center justify-between p-4 border-b border-border/50">
          <div class="flex items-center gap-3">
            <div
              class="w-8 h-8 rounded-lg flex items-center justify-center text-primary">
              <svg width="28" height="28" viewBox="0 0 263 244" fill="none" xmlns="http://www.w3.org/2000/svg" class="text-primary">
                <path
                  d="M18.7424 33.7433C29.0935 33.7433 37.4847 26.1896 37.4847 16.8716C37.4847 7.55365 29.0935 0 18.7424 0C8.39124 0 0 7.55365 0 16.8716C0 26.1896 8.39124 33.7433 18.7424 33.7433Z"
                  fill="currentColor" />
                <path
                  d="M74.9974 33.7433C85.3485 33.7433 93.7397 26.1896 93.7397 16.8716C93.7397 7.55365 85.3485 0 74.9974 0C64.6462 0 56.255 7.55365 56.255 16.8716C56.255 26.1896 64.6462 33.7433 74.9974 33.7433Z"
                  fill="currentColor" />
                <path
                  d="M131.224 33.7433C141.576 33.7433 149.967 26.1896 149.967 16.8716C149.967 7.55365 141.576 0 131.224 0C120.873 0 112.482 7.55365 112.482 16.8716C112.482 26.1896 120.873 33.7433 131.224 33.7433Z"
                  fill="currentColor" />
                <path
                  d="M187.479 33.7433C197.831 33.7433 206.222 26.1896 206.222 16.8716C206.222 7.55365 197.831 0 187.479 0C177.128 0 168.737 7.55365 168.737 16.8716C168.737 26.1896 177.128 33.7433 187.479 33.7433Z"
                  fill="currentColor" />
                <path
                  d="M243.706 33.7433C254.058 33.7433 262.449 26.1896 262.449 16.8716C262.449 7.55365 254.058 0 243.706 0C233.355 0 224.964 7.55365 224.964 16.8716C224.964 26.1896 233.355 33.7433 243.706 33.7433Z"
                  fill="currentColor" />
                <path
                  d="M18.7424 86.2298C29.0935 86.2298 37.4847 78.676 37.4847 69.358C37.4847 60.0401 29.0935 52.4863 18.7424 52.4863C8.39124 52.4863 0 60.0401 0 69.358C0 78.676 8.39124 86.2298 18.7424 86.2298Z"
                  fill="currentColor" />
                <path
                  d="M243.706 86.2298C254.058 86.2298 262.449 78.676 262.449 69.358C262.449 60.0401 254.058 52.4863 243.706 52.4863C233.355 52.4863 224.964 60.0401 224.964 69.358C224.964 78.676 233.355 86.2298 243.706 86.2298Z"
                  fill="currentColor" />
                <path
                  d="M18.7424 138.744C29.0935 138.744 37.4847 131.191 37.4847 121.873C37.4847 112.555 29.0935 105.001 18.7424 105.001C8.39124 105.001 0 112.555 0 121.873C0 131.191 8.39124 138.744 18.7424 138.744Z"
                  fill="currentColor" />
                <path
                  d="M131.224 138.744C141.576 138.744 149.967 131.191 149.967 121.873C149.967 112.555 141.576 105.001 131.224 105.001C120.873 105.001 112.482 112.555 112.482 121.873C112.482 131.191 120.873 138.744 131.224 138.744Z"
                  fill="currentColor" />
                <path
                  d="M187.479 138.744C197.831 138.744 206.222 131.191 206.222 121.873C206.222 112.555 197.831 105.001 187.479 105.001C177.128 105.001 168.737 112.555 168.737 121.873C168.737 131.191 177.128 138.744 187.479 138.744Z"
                  fill="currentColor" />
                <path
                  d="M243.706 138.744C254.058 138.744 262.449 131.191 262.449 121.873C262.449 112.555 254.058 105.001 243.706 105.001C233.355 105.001 224.964 112.555 224.964 121.873C224.964 131.191 233.355 138.744 243.706 138.744Z"
                  fill="currentColor" />
                <path
                  d="M18.7424 191.231C29.0935 191.231 37.4847 183.677 37.4847 174.36C37.4847 165.042 29.0935 157.488 18.7424 157.488C8.39124 157.488 0 165.042 0 174.36C0 183.677 8.39124 191.231 18.7424 191.231Z"
                  fill="currentColor" />
                <path
                  d="M74.9974 191.231C85.3485 191.231 93.7397 183.677 93.7397 174.36C93.7397 165.042 85.3485 157.488 74.9974 157.488C64.6462 157.488 56.255 165.042 56.255 174.36C56.255 183.677 64.6462 191.231 74.9974 191.231Z"
                  fill="currentColor" />
                <path
                  d="M18.7424 243.718C29.0935 243.718 37.4847 236.164 37.4847 226.846C37.4847 217.528 29.0935 209.974 18.7424 209.974C8.39124 209.974 0 217.528 0 226.846C0 236.164 8.39124 243.718 18.7424 243.718Z"
                  fill="currentColor" />
              </svg>

            </div>
        
          </div>
          <button @click="enhancedToggleExpanded"
            class="p-2 rounded-lg hover:bg-muted transition-colors focus:outline-none focus:ring-2 focus:ring-ring"
            aria-label="إغلاق نافذة التعليقات">
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"
              class="text-muted-foreground">
              <path d="M18 6L6 18M6 6L18 18" stroke="currentColor" stroke-width="2" stroke-linecap="round"
                stroke-linejoin="round" />
            </svg>
          </button>
        </div>

        <!-- Content Section -->
        <div class="p-4">
          <!-- Selection Step -->
          <div v-if="!step">
            <FeedbackSelection :type="props.type" @select="select" @select-emoji="selectEmoji" />
          </div>

          <!-- Feedback Form Step -->
          <FeedbackForm v-else-if="step?.type === 'feedback'" v-model:feedback="feedback" :is-submitting="isSubmitting"
            @submit="submit" @cancel="reset" />

          <!-- Success Step -->
          <FeedbackSuccess v-else-if="step?.type === 'success'" />
        </div>
      </div>
    </Transition>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted, computed } from 'vue'
import { useFeedbackState } from '~/composables/useFeedbackState'
import FeedbackIcon from './FeedbackIcon.vue'
import FeedbackSelection from './FeedbackSelection.vue'
import FeedbackForm from './FeedbackForm.vue'
import FeedbackSuccess from './FeedbackSuccess.vue'

interface Props {
  type: 'like_dislike' | 'emojis'
  token: string
  url: string
}

const props = withDefaults(defineProps<Props>(), {
  type: 'like_dislike'
})

// Use composables for state management
const { submitFeedback, isSubmitting, error } = useFeedback({
  url: props.url,
  token: props.token,
  type: props.type
})

const {
  step,
  feedback,
  selected,
  isExpanded,
  select,
  selectEmoji,
  reset,
  toggleExpanded,
  setSuccess
} = useFeedbackState()

// Widget reference
const widgetRef = ref<HTMLElement>()

// Initialize
onMounted(() => {
  // Load expanded state (always start minimized)
  const savedExpanded = localStorage.getItem('feedback-widget-expanded')
  isExpanded.value = savedExpanded === 'true' ? false : false
})

// Enhanced submit function with better error handling
async function submit() {
  if (!selected.value) return

  const score = props.type === "like_dislike"
    ? (selected.value === "like" ? 1 : 0)
    : selected.value as number

  try {
    const success = await submitFeedback({
      comment: feedback.value,
      score
    })

    if (success) {
      setSuccess()

      // Auto-close after showing success message
      setTimeout(() => {
        reset()
        setTimeout(() => {
          toggleExpanded()
        }, 500)
      }, 2000)
    } else {
      // Handle submission error - could show error message
      console.error('Failed to submit feedback:', error.value)
    }
  } catch (err) {
    console.error('Unexpected error during feedback submission:', err)
  }
}

// Enhanced toggle with state management
function handleToggleExpanded() {
  toggleExpanded()

  // Save expanded state
  if (typeof window !== 'undefined') {
    try {
      localStorage.setItem('feedback-widget-expanded', isExpanded.value.toString())
    } catch (e) {
      console.warn('Could not save widget expanded state to localStorage')
    }
  }
}

// Use the enhanced toggle function
const enhancedToggleExpanded = handleToggleExpanded
</script>
