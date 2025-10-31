<template>
  <Transition
    enter-active-class="transition-all duration-300 ease-out"
    enter-from-class="opacity-0 -translate-y-full"
    enter-to-class="opacity-100 translate-y-0"
    leave-active-class="transition-all duration-200 ease-in"
    leave-from-class="opacity-100 translate-y-0"
    leave-to-class="opacity-0 -translate-y-full"
  >
    <div
      v-if="currentBannerAd && visibleAds.has(currentBannerAd.id)"
      class="fixed top-0 left-0 right-0 flex justify-center  items-center z-10 w-full"
    >
   
      
        <button
          @click="closeAd(currentBannerAd.id)"
          class="absolute top-2 right-2 z-50 w-6 h-6 rounded-full bg-black/10 hover:bg-black/90 backdrop-blur-sm flex items-center justify-center transition-colors shadow-lg border border-white/20"
          aria-label="إغلاق الإعلان"
        >
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" class="text-white">
            <path d="M18 6L6 18M6 6L18 18" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round" />
          </svg>
        </button>
        <div class="flex justify-center items-center w-full">
          <a 
            v-if="currentBannerAd.link" 
            :href="currentBannerAd.link" 
            target="_blank" 
            rel="noopener noreferrer"
            class="flex justify-center items-center w-full"
            @click="handleAdClick(currentBannerAd.id)"
          >
            <img
              :src="currentBannerAd.imageUrl || currentBannerAd.image"
              :alt="`إعلان ${currentBannerAd.show}`"
              class="h-14 w-full object-cover"
              @load="handleAdView(currentBannerAd.id)"
            />
          </a>
          <img
            v-else
            :src="currentBannerAd.imageUrl || currentBannerAd.image"
            :alt="`إعلان ${currentBannerAd.show}`"
            class="h-14 w-full object-cover"
            @load="handleAdView(currentBannerAd.id)"
          />
        </div>
      
    </div>
  </Transition>
</template>

<script setup lang="ts">


interface Props {
  url: string
  token: string
  rotationTime?: number // وقت التبديل بالثواني (افتراضي: 5 ثواني)
}

const props = withDefaults(defineProps<Props>(), {
  rotationTime: 5000
})

const { ads, fetchAds, incrementViews, closeAd: closeAdAction } = useAds({
  url: props.url,
  token: props.token
})

const visibleAds = ref<Set<string>>(new Set())
const viewedAds = ref<Set<string>>(new Set())

const bannerAds = computed(() => ads.value.filter(ad => {
  const showType = ad.show.toLowerCase()
  return showType === 'banar' || showType === 'banner'
}))

const currentBannerIndex = ref(0)
const currentBannerAd = computed(() => {
  if (bannerAds.value.length === 0) return null
  return bannerAds.value[currentBannerIndex.value % bannerAds.value.length]
})

let bannerRotationInterval: ReturnType<typeof setInterval> | null = null

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
  
  if (currentBannerAd.value && currentBannerAd.value.id === adId) {
    const remainingBanners = bannerAds.value.filter(ad => ad.id !== adId)
    if (remainingBanners.length > 0 && remainingBanners[0]) {
      const nextBannerId = remainingBanners[0].id
      const foundIndex = bannerAds.value.findIndex(ad => ad.id === nextBannerId)
      if (foundIndex !== -1) {
        currentBannerIndex.value = foundIndex
        const nextAd = bannerAds.value[currentBannerIndex.value]
        if (nextAd && ads.value.find(a => a.id === nextAd.id)) {
          visibleAds.value.add(nextAd.id)
        }
      }
    } else {
      stopBannerRotation()
    }
  }
}

const startBannerRotation = () => {
  if (bannerRotationInterval) {
    clearInterval(bannerRotationInterval)
  }
  
  if (bannerAds.value.length > 1) {
    bannerRotationInterval = setInterval(() => {
      const currentAd = bannerAds.value[currentBannerIndex.value]
      if (currentAd) {
        visibleAds.value.delete(currentAd.id)
      }
      
      currentBannerIndex.value = (currentBannerIndex.value + 1) % bannerAds.value.length
      
      const nextAd = bannerAds.value[currentBannerIndex.value]
      if (nextAd) {
        visibleAds.value.add(nextAd.id)
      }
    }, props.rotationTime)
  }
}

const stopBannerRotation = () => {
  if (bannerRotationInterval) {
    clearInterval(bannerRotationInterval)
    bannerRotationInterval = null
  }
}

const showAdsWithDelay = () => {
  if (bannerAds.value.length > 0) {
    const firstBanner = bannerAds.value[0]
    if (firstBanner) {
      const delay = (firstBanner.delay || 0) * 1000
      setTimeout(() => {
        if (ads.value.find(a => a.id === firstBanner.id)) {
          visibleAds.value.add(firstBanner.id)
          currentBannerIndex.value = 0
          startBannerRotation()
        }
      }, delay)
    }
  }
}

onMounted(async () => {
  await fetchAds()
  showAdsWithDelay()
})

onBeforeUnmount(() => {
  stopBannerRotation()
})

watch(ads, (newAds) => {
  const adIds = new Set(newAds.map(ad => ad.id))
  visibleAds.value.forEach(id => {
    if (!adIds.has(id)) {
      visibleAds.value.delete(id)
    }
  })
  stopBannerRotation()
  showAdsWithDelay()
}, { deep: true })
</script>

