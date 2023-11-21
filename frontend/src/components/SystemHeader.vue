<template>
  <div class="header">
    <span class="header__title">
      {{ imageStore.currentImage?.name }}
    </span>
    <div>
      进度：{{ imageStore.images.filter((item) => item.tagged).length }} /
      {{ imageStore.images.length }}
    </div>
    <div class="header__action" @click="() => (showSettings = !showSettings)">
      <div class="i-ph:gear-fill text-xl"></div>
    </div>
    <SystemSettings
      v-model:show="showSettings"
      :settings="settingsStore.settings"
      @update:settings="
        ($event) => {
          console.log($event)
          settingsStore.setSettings($event)
          showSettings = false
        }
      "
    />
  </div>
</template>

<script setup>
import { ref } from 'vue'
import SystemSettings from './SystemSettings.vue'
import { useImageStore } from '../stores/imageStore'
import { useSettingsStore } from '../stores/settingsStore'
const imageStore = useImageStore()
const settingsStore = useSettingsStore()
const showSettings = ref(false)
</script>

<style scoped>
.header {
  @apply flex justify-between gap-20px p-x-20px h-3rem items-center;
  background: linear-gradient(to top, var(--color-primary), var(--color-secondary));
  color: var(--color-text-white);
}

.header__title {
  @apply font-bold text-lg;
  flex: 1;
  text-align: center;
}

.header__action {
  @apply cursor-pointer rounded border-1px border-solid p-5px;
  @apply transition-color duration-300;
  border-color: var(--color-text-white);
}

.header__action:hover {
  @apply bg-white text-black opacity-60;
}

.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.5s ease;
}

.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}
</style>
