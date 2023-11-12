<template>
  <div class="header">
    <span class="header__title">
      {{ imageStore.currentImage?.name }}
    </span>
    <div>
      进度：{{ imageStore.images.filter((item) => item.tagged).length }} /
      {{ imageStore.images.length }}
    </div>
    <div @click="() => (showSettings = !showSettings)">⚙️</div>
    <SystemSettings
      v-if="showSettings"
      :settings="settingsStore.settings"
      @update:settings="
        ($event) => {
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
  display: flex;
  justify-content: space-between;
  gap: 20px;
  padding: 0 10px;
}

.header__title {
  flex: 1;
  text-align: center;
}
</style>
