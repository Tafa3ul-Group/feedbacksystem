<template>
  <motion.div
    class="fixed bottom-6 right-6 z-50 bg-white shadow-xl rounded-xl p-4 flex flex-col items-center gap-2 border border-gray-200"
    :initial="{ opacity: 0, y: 40 }"
    :animate="{ opacity: 1, y: 0 }"
    :transition="{ type: 'spring', stiffness: 200, damping: 20 }"
  >
    <div v-if="!step">
      <div class="text-base font-semibold mb-2 text-center">
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
        <motion.button
          :initial="{ scale: 0 }"
          :animate="{ scale: 1 }"
          :whileHover="{ scale: 1.8, transition: { duration: 0.02 } }"
          :whilePress="{ scale: 0.95 }"
          v-for="emoji in emojiOptions"
          :key="emoji.value"
          @click="selectEmoji(emoji)"
          class="hover:scale-110 transition-transform text-3xl"
          :aria-label="emoji.desc"
        >
          {{ emoji.label }}
        </motion.button>
      </div>
    </div>
    <div v-else-if="step === 'feedback'">
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
    <motion.div
      v-else-if="step === 'success'"
      key="success"
      :initial="{ opacity: 0, scale: 0.95 }"
      :animate="{ opacity: 1, scale: 1 }"
      :transition="{ duration: 0.3 }"
      class="flex items-center gap-3 py-2"
      role="status"
      aria-live="polite"
      aria-label="Feedback submitted successfully"
    >
      <motion.div
        :initial="{ scale: 0 }"
        :animate="{ scale: 1 }"
        :transition="{ delay: 0.1, type: 'spring', visualDuration: 0.4 }"
        class="text-xl"
        aria-hidden="true"
      >
        ✨
      </motion.div>
      <motion.div
        :initial="{ opacity: 0, x: 10 }"
        :animate="{ opacity: 1, x: 0 }"
        :transition="{ delay: 0.2, duration: 0.3 }"
      >
        <div class="text-sm font-medium text-green-600 dark:text-green-400">
          Thank you for your feedback!
        </div>
        <div class="text-xs text-gray-500 mt-1">
          Your input helps us improve.
        </div>
      </motion.div>
    </motion.div>
  </motion.div>
</template>

<script setup lang="ts">
import { ref } from "vue";
import { motion } from "motion-v";
import PocketBase from "pocketbase";

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

const pb = new PocketBase(props.url);

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

function select(type: "like" | "dislike") {
  selected.value = type;
  step.value = "feedback";
}

function selectEmoji(emoji: { value: number; label: string; desc: string }) {
  selected.value = emoji.value;
  step.value = "feedback";
}

async function submit() {
  const data: Record<string, any> = {
    path: window.location.pathname,
    comment: feedback.value,
    browser: navigator.userAgent,
    device: navigator.platform,
    product: props.token,
    type: props.type,
  };
  if (props.type === "like_dislike") {
    data.score = selected.value === "like" ? 1 : 0;
  } else if (props.type === "emojis") {
    data.score = selected.value;
  }
  try {
    await pb.collection("feedback").create(data);
    step.value = "success";
    setTimeout(() => {
      reset();
    }, 2000);
  } catch (e) {
    console.log("Failed to submit feedback!");
  }
}

function reset() {
  step.value = null;
  feedback.value = "";
  selected.value = null;
}
</script>

<style scoped></style>
