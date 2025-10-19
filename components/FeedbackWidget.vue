<template>
  <div>
    <!-- Minimized Widget (Icon State) -->
    <Transition name="fade">
      <div
        v-if="!isExpanded"
        ref="iconRef"
        class="fixed z-50 bg-blue-600 hover:bg-blue-700 text-white rounded-full p-3 flex items-center justify-center cursor-pointer select-none transition-all duration-300"
        :style="{ 
          left: position.x + 'px', 
          top: position.y + 'px' 
        }"
        @click="toggleExpanded"
        @mousedown="startDrag"
        @touchstart="startDrag"
      >
        <svg 
          width="24" 
          height="24" 
          viewBox="0 0 24 24" 
          fill="none" 
          xmlns="http://www.w3.org/2000/svg"
          class="text-white"
        >
          <path 
            d="M7.5 8C8.32843 8 9 7.32843 9 6.5C9 5.67157 8.32843 5 7.5 5C6.67157 5 6 5.67157 6 6.5C6 7.32843 6.67157 8 7.5 8Z" 
            fill="currentColor"
          />
          <path 
            d="M16.5 8C17.3284 8 18 7.32843 18 6.5C18 5.67157 17.3284 5 16.5 5C15.6716 5 15 5.67157 15 6.5C15 7.32843 15.6716 8 16.5 8Z" 
            fill="currentColor"
          />
          <path 
            d="M12 14C9.79086 14 8 12.2091 8 10H16C16 12.2091 14.2091 14 12 14Z" 
            fill="currentColor"
          />
        </svg>
      </div>
    </Transition>

    <!-- Expanded Widget (Full State) -->
    <Transition name="fade">
      <div
        v-if="isExpanded"
        ref="widgetRef"
        class="feedback-widget fixed z-50 bg-white shadow-xl rounded-xl p-4 flex flex-col items-center gap-2 border border-gray-200 select-none transition-all duration-300"
        :style="{ 
          left: position.x + 'px', 
          top: position.y + 'px' 
        }"
        @mousedown="startDrag"
        @touchstart="startDrag"
      >
    <!-- Header with close button -->
    <div class="w-full flex justify-between items-center mb-2">
      <div 
        class="text-gray-400"
       
      >
      <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"><path fill="currentColor" d="m12 2l4.243 4.243l-1.415 1.414L12 4.828L9.172 7.657L7.757 6.243zM2 12l4.243-4.243l1.414 1.415L4.828 12l2.829 2.828l-1.414 1.415zm20 0l-4.243 4.243l-1.414-1.415L19.172 12l-2.829-2.828l1.414-1.415zm-10 2a2 2 0 1 1 0-4a2 2 0 0 1 0 4m0 8l-4.243-4.243l1.415-1.414L12 19.172l2.828-2.829l1.415 1.414z"/></svg>
    </div>
      <button 
        @click="toggleExpanded"
        class="text-gray-400 hover:text-gray-600 transition-colors p-1"
      >
        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M18 6L6 18M6 6L18 18" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
        </svg>
      </button>
    </div>
    
    <div v-if="!step">
      <div class="text-base font-semibold mb-2  text-center">
        Was this page helpful?
      </div>
      <div
        v-if="props.type === 'like_dislike'"
        class="flex justify-center gap-4"
      >
        <button
          @click="select('like')"
          class="hover:scale-110 transition-transform"
        >
          <span class="text-3xl">👍</span>
        </button>
        <button
          @click="select('dislike')"
          class="hover:scale-110 transition-transform"
        >
          <span class="text-3xl">👎</span>
        </button>
      </div>
      <div
        v-else-if="props.type === 'emojis'"
        class="flex justify-center gap-2"
      >
        <button
          v-for="emoji in emojiOptions"
          :key="emoji.value"
          @click="selectEmoji(emoji)"
          class="hover:scale-110 transition-transform text-3xl"
          :aria-label="emoji.desc"
        >
          {{ emoji.label }}
        </button>
      </div>
    </div>
    <div v-else-if="step === 'feedback'" class="w-full">
      <div class="text-base font-semibold mb-2 text-center">
        We'd love to know more!
      </div>
      <textarea
        v-model="feedback"
        rows="3"
        class="w-full rounded border border-gray-300 p-2 text-sm focus:outline-none focus:ring-2 focus:ring-primary"
        placeholder="Tell us how we can improve..."
      ></textarea>
      <div class="flex gap-2 justify-between mt-2">
        <button
          @click="submit"
          class="bg-black text-white px-4 py-1 rounded transition-colors"
        >
          Submit
        </button>
        <button @click="reset" class="text-gray-500 hover:underline">
          Cancel
        </button>
      </div>
    </div>
    <div
      v-else-if="step === 'success'"
      class="flex items-center gap-3 py-2 animate-fade-in"
      role="status"
      aria-live="polite"
      aria-label="Feedback submitted successfully"
    >
      <div class="text-xl" aria-hidden="true">
        ✨
      </div>
      <div>
        <div class="text-sm font-medium text-green-600 dark:text-green-400">
          Thank you for your feedback!
        </div>
        <div class="text-xs text-gray-500 mt-1">
          Your input helps us improve.
        </div>
      </div>
    </div>
      </div>
    </Transition>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted, onUnmounted } from "vue";

const props = defineProps({
  type: {
    type: String,
    default: "like_dislike",
    validator: (v: string) => ["like_dislike", "emojis"].includes(v),
  },
  token: {
    type: String,
    required: true,
  },
  url: {
    type: String,
    required: true,
  },
});

const { submitFeedback, isSubmitting } = useFeedback({
  url: props.url,
  token: props.token,
  type: props.type as 'like_dislike' | 'emojis'
});

const emojiOptions = [
  { value: 2, label: "😃", desc: "Very helpful" },
  { value: 1, label: "🙂", desc: "Helpful" },
  { value: 0, label: "😐", desc: "Neutral" },
  { value: -1, label: "😕", desc: "Confusing" },
  { value: -2, label: "😡", desc: "Not helpful" },
];

const step = ref<"like" | "dislike" | "feedback" | "success" | null>(null);
const feedback = ref("");
const selected = ref<"like" | "dislike" | null | number>(null);

// Widget state
const isExpanded = ref(false);

// Drag functionality
const isDragging = ref(false);
const position = ref({ x: 0, y: 0 });
const dragStart = ref({ x: 0, y: 0 });
const widgetRef = ref<HTMLElement>();
const iconRef = ref<HTMLElement>();

// Initialize position
onMounted(() => {
  if (typeof window !== 'undefined') {
    // Try to load saved position from localStorage
    const savedPosition = localStorage.getItem('feedback-widget-position');
    const savedExpanded = localStorage.getItem('feedback-widget-expanded');
    
    if (savedPosition) {
      try {
        const parsed = JSON.parse(savedPosition);
        position.value = {
          x: Math.max(0, Math.min(parsed.x, window.innerWidth - 320)),
          y: Math.max(0, Math.min(parsed.y, window.innerHeight - 200))
        };
      } catch (e) {
        // If parsing fails, use default position
        setDefaultPosition();
      }
    } else {
      setDefaultPosition();
    }
    
    // Load expanded state (default false for icon mode)
    isExpanded.value = savedExpanded === 'true' ? false : false; // Always start minimized
    
    // Snap to edges on window resize
    window.addEventListener('resize', handleResize);
  }
});

function setDefaultPosition() {
  if (typeof window !== 'undefined') {
    position.value = {
      x: window.innerWidth - 30, // Half hidden on right edge
      y: window.innerHeight / 2 - 30  // Center vertically
    };
  }
}

onUnmounted(() => {
  if (typeof window !== 'undefined') {
    window.removeEventListener('resize', handleResize);
  }
});

function handleResize() {
  if (typeof window !== 'undefined') {
    const padding = isExpanded.value ? 20 : 0;
    const widgetWidth = isExpanded.value ? 400 : 60;
    const widgetHeight = isExpanded.value ? 300 : 60;
    const maxX = isExpanded.value ? window.innerWidth - widgetWidth - padding : window.innerWidth - 60;
    const maxY = isExpanded.value ? window.innerHeight - widgetHeight - padding : window.innerHeight - 60;
    
    position.value.x = Math.max(0, Math.min(position.value.x, maxX));
    position.value.y = Math.max(0, Math.min(position.value.y, maxY));
  }
}

function startDrag(event: MouseEvent | TouchEvent) {
  isDragging.value = true;
  
  const clientX = 'touches' in event ? event.touches[0].clientX : event.clientX;
  const clientY = 'touches' in event ? event.touches[0].clientY : event.clientY;
  
  dragStart.value = {
    x: clientX - position.value.x,
    y: clientY - position.value.y
  };
  
  document.addEventListener('mousemove', onDrag);
  document.addEventListener('mouseup', stopDrag);
  document.addEventListener('touchmove', onDrag);
  document.addEventListener('touchend', stopDrag);
}

function onDrag(event: MouseEvent | TouchEvent) {
  if (!isDragging.value) return;
  
  event.preventDefault();
  
  const clientX = 'touches' in event ? event.touches[0].clientX : event.clientX;
  const clientY = 'touches' in event ? event.touches[0].clientY : event.clientY;
  
  const newX = clientX - dragStart.value.x;
  const newY = clientY - dragStart.value.y;
  
  // Constrain to viewport
  if (typeof window !== 'undefined') {
    const padding = isExpanded.value ? 20 : 0;
    const widgetWidth = isExpanded.value ? 400 : 60;
    const widgetHeight = isExpanded.value ? 300 : 60;
    const maxX = isExpanded.value ? window.innerWidth - widgetWidth - padding : window.innerWidth;
    const maxY = isExpanded.value ? window.innerHeight - widgetHeight - padding : window.innerHeight;
    
    position.value.x = Math.max(isExpanded.value ? 0 : -30, Math.min(newX, maxX));
    position.value.y = Math.max(isExpanded.value ? 0 : -30, Math.min(newY, maxY));
  }
}

function stopDrag() {
  isDragging.value = false;
  
  document.removeEventListener('mousemove', onDrag);
  document.removeEventListener('mouseup', stopDrag);
  document.removeEventListener('touchmove', onDrag);
  document.removeEventListener('touchend', stopDrag);
  
  // Snap to nearest edge after dragging
  snapToEdge();
}

function snapToEdge() {
  if (typeof window === 'undefined') return;
  
  const padding = 20;
  const widgetWidth = isExpanded.value ? 400 : 60;
  const widgetHeight = isExpanded.value ? 300 : 60;
  const windowWidth = window.innerWidth;
  const windowHeight = window.innerHeight;
  
  const centerX = position.value.x + widgetWidth / 2;
  const centerY = position.value.y + widgetHeight / 2;
  
  // Determine which edge is closest
  const distLeft = centerX;
  const distRight = windowWidth - centerX;
  const distTop = centerY;
  const distBottom = windowHeight - centerY;
  
  const minHorizontal = Math.min(distLeft, distRight);
  const minVertical = Math.min(distTop, distBottom);
  
  // Snap to horizontal edges (left/right)
  if (minHorizontal < minVertical) {
    if (distLeft < distRight) {
      // Snap to left
      position.value.x = isExpanded.value ? padding : -30;
    } else {
      // Snap to right
      position.value.x = isExpanded.value ? windowWidth - widgetWidth - padding : windowWidth - 30;
    }
    // Keep vertical position within bounds
    position.value.y = Math.max(
      isExpanded.value ? padding : 0,
      Math.min(position.value.y, windowHeight - widgetHeight - (isExpanded.value ? padding : 0))
    );
  } else {
    // Snap to vertical edges (top/bottom)
    if (distTop < distBottom) {
      // Snap to top
      position.value.y = isExpanded.value ? padding : -30;
    } else {
      // Snap to bottom
      position.value.y = isExpanded.value ? windowHeight - widgetHeight - padding : windowHeight - 30;
    }
    // Keep horizontal position within bounds
    position.value.x = Math.max(
      isExpanded.value ? padding : 0,
      Math.min(position.value.x, windowWidth - widgetWidth - (isExpanded.value ? padding : 0))
    );
  }
  
  savePosition();
}

function savePosition() {
  if (typeof window !== 'undefined') {
    try {
      localStorage.setItem('feedback-widget-position', JSON.stringify(position.value));
    } catch (e) {
      // Handle localStorage errors silently
      console.warn('Could not save widget position to localStorage');
    }
  }
}

function toggleExpanded() {
  const wasExpanded = isExpanded.value;
  isExpanded.value = !isExpanded.value;
  
  // Save expanded state
  if (typeof window !== 'undefined') {
    try {
      localStorage.setItem('feedback-widget-expanded', isExpanded.value.toString());
    } catch (e) {
      console.warn('Could not save widget expanded state to localStorage');
    }
    
    // Adjust position smoothly when expanding/collapsing
    const padding = 20;
    const widgetWidth = isExpanded.value ? 400 : 60;
    const widgetHeight = isExpanded.value ? 300 : 60;
    const windowWidth = window.innerWidth;
    const windowHeight = window.innerHeight;
    
    // Determine current edge position
    const isOnRight = position.value.x > windowWidth / 2;
    const isOnBottom = position.value.y > windowHeight / 2;
    
    if (isExpanded.value) {
      // Expanding: move away from edge with padding
      if (isOnRight) {
        position.value.x = Math.max(0, windowWidth - widgetWidth - padding);
      } else {
        position.value.x = padding;
      }
      
      if (isOnBottom) {
        position.value.y = Math.max(0, windowHeight - widgetHeight - padding);
      } else {
        position.value.y = Math.max(padding, Math.min(position.value.y, windowHeight - widgetHeight - padding));
      }
    } else {
      // Collapsing: snap back to edge (half hidden)
      if (isOnRight) {
        position.value.x = windowWidth - 30;
      } else {
        position.value.x = -30;
      }
      
      // Keep vertical position similar
      position.value.y = Math.max(0, Math.min(position.value.y, windowHeight - 60));
    }
    
    savePosition();
  }
}

function select(type: "like" | "dislike") {
  selected.value = type;
  step.value = "feedback";
}

function selectEmoji(emoji: { value: number; label: string; desc: string }) {
  selected.value = emoji.value;
  step.value = "feedback";
}

async function submit() {
  const score = props.type === "like_dislike" 
    ? (selected.value === "like" ? 1 : 0)
    : selected.value as number;

  const success = await submitFeedback({
    comment: feedback.value,
    score
  });

  if (success) {
    step.value = "success";
    setTimeout(() => {
      reset();
      // Close widget after showing success message
      setTimeout(() => {
        toggleExpanded();
      }, 500);
    }, 2000);
  }
}

function reset() {
  step.value = null;
  feedback.value = "";
  selected.value = null;
}
</script>

<style scoped>
/* Transition animations */
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.3s ease, transform 0.3s ease;
}

.fade-enter-from {
  opacity: 0;
  transform: scale(0.8);
}

.fade-leave-to {
  opacity: 0;
  transform: scale(0.8);
}

.fade-enter-to,
.fade-leave-from {
  opacity: 1;
  transform: scale(1);
}

.animate-fade-in {
  animation: fadeIn 0.3s ease-in-out;
}

@keyframes fadeIn {
  from {
    opacity: 0;
    transform: scale(0.95);
  }
  to {
    opacity: 1;
    transform: scale(1);
  }
}

.feedback-widget {
  width: 400px;
  max-width: calc(100vw - 48px);
  touch-action: none;
  will-change: transform;
}

.feedback-icon {
  width: 60px;
  height: 60px;
  touch-action: none;
  transition: transform 0.2s ease, box-shadow 0.2s ease;
  box-shadow: -2px 2px 8px rgba(0, 0, 0, 0.15);
}

.feedback-icon:hover {
  transform: translateX(-5px); /* Slide out slightly on hover */
  box-shadow: -4px 4px 16px rgba(0, 0, 0, 0.25);
}

.drag-handle {
  transition: background-color 0.2s ease;
}

.drag-handle:hover {
  background-color: #9CA3AF;
}

/* Prevent text selection during drag */
.select-none {
  -webkit-user-select: none;
  -moz-user-select: none;
  -ms-user-select: none;
  user-select: none;
}
</style>
