<template>
  <Transition
    v-for="ad in sidebarAds"
    :key="ad.id"
    enter-active-class="transition-all duration-300 ease-out"
    enter-from-class="opacity-0 translate-x-full"
    enter-to-class="opacity-100 translate-x-0"
    leave-active-class="transition-all duration-200 ease-in"
    leave-from-class="opacity-100 translate-x-0"
    leave-to-class="opacity-0 translate-x-full"
  >
    <div
      v-if="visibleAds.has(ad.id)"
      class="fixed right-0 top-1/2 -translate-y-1/2 z-40 bg-card rounded-l-lg shadow-2xl border border-border overflow-hidden"
    >
      <button
        @click="closeAd(ad.id)"
        class="absolute top-2 left-2 z-10 w-8 h-8 rounded-full bg-background/80 hover:bg-background flex items-center justify-center transition-colors"
        aria-label="إغلاق الإعلان"
      >
        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" class="text-foreground">
          <path d="M18 6L6 18M6 6L18 18" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" />
        </svg>
      </button>
      <div class="relative">
        <img
          :src="ad.imageUrl || ad.image"
          :alt="`إعلان ${ad.show}`"
          class="w-auto h-auto object-contain max-w-xs max-h-[80vh]"
          @load="handleAdView(ad.id)"
        />
        <a 
          v-if="ad.link" 
          :href="ad.link" 
          target="_blank" 
          rel="noopener noreferrer"
          class="absolute bottom-2 left-1/2 -translate-x-1/2 z-20 border-2 border-border text-foreground bg-background/90 hover:bg-muted hover:text-foreground backdrop-blur-sm px-4 py-2 rounded-lg transition-all hover:shadow-lg text-sm font-medium whitespace-nowrap"
          @click="handleAdClick(ad.id)"
        >
          اعرف المزيد
        </a>
      </div>
    </div>
  </Transition>
</template>

<script setup lang="ts">
import { ref, computed, onMounted, watch } from 'vue'
import { useAds } from '~/composables/useAds'

interface Props {
  url: string
  token: string
}

const props = defineProps<Props>()

const { ads, fetchAds, incrementViews, closeAd: closeAdAction } = useAds({
  url: props.url,
  token: props.token
})

const visibleAds = ref<Set<string>>(new Set())
const viewedAds = ref<Set<string>>(new Set())

const sidebarAds = computed(() => ads.value.filter(ad => ad.show.toLowerCase() === 'sidebar'))

const handleAdView = async (adId: string) => {
  if (viewedAds.value.has(adId)) return
  viewedAds.value.add(adId)
  await incrementViews(adId)
}

const handleAdClick = async (adId: string) => {
  await handleAdView(adId)
}

const closeAd = (adId: string) => {
  closeAdAction(adId)
  visibleAds.value.delete(adId)
}

const showAdsWithDelay = () => {
  sidebarAds.value.forEach(ad => {
    const delay = (ad.delay || 0) * 1000
    setTimeout(() => {
      if (ads.value.find(a => a.id === ad.id)) {
        visibleAds.value.add(ad.id)
      }
    }, delay)
  })
}

onMounted(async () => {
  await fetchAds()
  showAdsWithDelay()
})

watch(ads, (newAds) => {
  const adIds = new Set(newAds.map(ad => ad.id))
  visibleAds.value.forEach(id => {
    if (!adIds.has(id)) {
      visibleAds.value.delete(id)
    }
  })
  showAdsWithDelay()
}, { deep: true })
</script>

