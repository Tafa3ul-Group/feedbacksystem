<template>
  <div>
    <!-- Popup Ads -->
    <AdPopup :url="url" :token="token" />
    
    <!-- Banner Ads -->
    <AdBanner :url="url" :token="token" :rotation-time="rotationTime" />
    
    <!-- Sidebar Ads -->
    <AdSidebar :url="url" :token="token" />
  </div>
</template>

<script setup lang="ts">
interface Props {
  url: string
  token: string
  rotationTime?: number // وقت التبديل للبانر بالثواني (افتراضي: 5000)
}

const props = withDefaults(defineProps<Props>(), {
  rotationTime: 5000
})
</script>

