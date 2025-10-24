import { ref, readonly } from 'vue'
import PocketBase from 'pocketbase'

export interface FeedbackOptions {
  url: string
  token: string
  type?: 'like_dislike' | 'emojis'
}

export interface FeedbackData {
  path?: string
  comment?: string
  browser?: string
  device?: string
  product: string
  type: string
  score?: number | string
}

export const useFeedback = (options: FeedbackOptions) => {
  const pb = new PocketBase(options.url)
  
  const isSubmitting = ref(false)
  const error = ref<string | null>(null)
  
  const submitFeedback = async (data: Partial<FeedbackData>) => {
    isSubmitting.value = true
    error.value = null
    
    try {
      const feedbackData: FeedbackData = {
        path: data.path || (typeof window !== 'undefined' ? window.location.pathname : ''),
        comment: data.comment || '',
        browser: typeof navigator !== 'undefined' ? navigator.userAgent : '',
        device: typeof navigator !== 'undefined' ? navigator.platform : '',
        product: options.token,
        type: options.type || 'like_dislike',
        score: data.score
      }
      
      await pb.collection('feedback').create(feedbackData)
      return true
    } catch (e) {
      error.value = 'Failed to submit feedback'
      console.error('Feedback submission error:', e)
      return false
    } finally {
      isSubmitting.value = false
    }
  }
  
  return {
    submitFeedback,
    isSubmitting: readonly(isSubmitting),
    error: readonly(error)
  }
}