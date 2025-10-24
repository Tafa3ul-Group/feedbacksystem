import { ref, readonly } from 'vue'

export interface FeedbackStep {
  type: 'selection' | 'feedback' | 'success'
  data?: any
}

export interface FeedbackState {
  step: FeedbackStep | null
  feedback: string
  selected: 'like' | 'dislike' | number | null
  isExpanded: boolean
}

export interface FeedbackActions {
  select: (type: 'like' | 'dislike') => void
  selectEmoji: (emoji: { value: number; label: string; desc: string }) => void
  submit: () => Promise<void>
  reset: () => void
  toggleExpanded: () => void
}

export const useFeedbackState = () => {
  const step = ref<FeedbackStep | null>(null)
  const feedback = ref('')
  const selected = ref<'like' | 'dislike' | number | null>(null)
  const isExpanded = ref(false)

  const select = (type: 'like' | 'dislike') => {
    selected.value = type
    step.value = { type: 'feedback' }
  }

  const selectEmoji = (emoji: { value: number; label: string; desc: string }) => {
    selected.value = emoji.value
    step.value = { type: 'feedback' }
  }

  const reset = () => {
    step.value = null
    feedback.value = ''
    selected.value = null
  }

  const toggleExpanded = () => {
    isExpanded.value = !isExpanded.value
  }

  const setSuccess = () => {
    step.value = { type: 'success' }
  }

  return {
    // State
    step: readonly(step),
    feedback,
    selected: readonly(selected),
    isExpanded,
    
    // Actions
    select,
    selectEmoji,
    reset,
    toggleExpanded,
    setSuccess
  }
}
