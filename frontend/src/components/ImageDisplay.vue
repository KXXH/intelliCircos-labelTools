<template>
  <div class="image-display">
    <img
      class="image-display__image"
      :src="imageBaseURL + (images[currentImageId]?.name ?? 'null')"
      alt=""
      @click="() => showFullImage(images[currentImageId]?.name ?? 'null')"
    />
    <div class="image-display__nav">
      <button
        class="image-display__nav__button image-display__nav__button--prev"
        @click="previousImage"
        :disabled="currentImageId === 0"
      >
        Prev
      </button>
      <button
        class="image-display__nav__button image-display__nav__button--next"
        @click="nextImage"
        :disabled="currentImageId === images.length - 1"
      >
        Next
      </button>
    </div>
  </div>
</template>

<script setup>
import { onKeyStroke } from '@vueuse/core'
import { defineEmits, computed } from 'vue'
import { useSettingsStore } from '../stores/settingsStore'

const settingsStore = useSettingsStore()
const imageBaseURL = computed(() => {
  const host = settingsStore.settings.host
  const path = '/images/'
  return new URL(path, host).href
})

const paperBaseURL = computed(() => {
  const host = settingsStore.settings.host
  const path = '/papers/from_image/'
  return new URL(path, host).href
})

// props
const props = defineProps(['images', 'currentImageId'])

// emits
const emits = defineEmits(['update:currentImageId'])

// 方法
function previousImage() {
  if (props.currentImageId > 0) {
    emits('update:currentImageId', props.currentImageId - 1)
  }
}

function nextImage() {
  if (props.currentImageId < props.images.length - 1) {
    emits('update:currentImageId', props.currentImageId + 1)
  }
}

function showFullImage(imageName) {
  window.open(`${paperBaseURL.value}${imageName}`)
}

// 快捷键处理
onKeyStroke('ArrowUp', previousImage)
onKeyStroke('ArrowDown', nextImage)
</script>

<style scoped>
.image-display {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 1rem;
  background-color: #eee;
}

.image-display__nav {
  display: flex;
  gap: 1rem;
  justify-content: space-between;
  width: 100%;
}

.image-display__nav__button {
  padding: 0.5rem 1rem;
  border-radius: 0.5rem;
  border: 1px solid #ccc;
  background-color: #fff;
  cursor: pointer;
}

.image-display__image {
  flex: 1;
  max-width: 100%;
  max-height: 100%;
  object-fit: contain;
}
</style>
