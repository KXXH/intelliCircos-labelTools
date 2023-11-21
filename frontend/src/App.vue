<script setup>
import ImageDisplay from './components/ImageDisplay.vue'
import ImageList from './components/ImageList.vue'
import TagInput from './components/TagInput.vue'
import SystemHeader from './components/SystemHeader.vue'
import { useImageStore } from './stores/imageStore'

const imageStore = useImageStore()
async function onImageIDChange(imageId) {
  await imageStore.setCurrentImage({ id: imageId })
}
</script>

<template>
  <header>
    <SystemHeader />
  </header>
  <main>
    <div class="container">
      <ImageList
        class="left-panel"
        :images="imageStore.images"
        :current-image-id="imageStore.currentImageId"
        @update:current-image-id="onImageIDChange"
      />
      <div class="right-panel">
        <ImageDisplay
          class="image-display"
          :images="imageStore.images"
          :current-image-id="imageStore.currentImageId"
          @update:current-image-id="onImageIDChange"
        />
        <TagInput v-model:tag="imageStore.currentTag" class="tag-input" />
      </div>
    </div>
  </main>
</template>

<style scoped>
header {
  width: 100vw;
}

main {
  flex: 1;
  overflow-y: auto;
}
.container {
  display: flex;
  flex-direction: row;
  height: 100%;
  overflow-y: auto;
}
.left-panel {
  border: 1px solid #ccc;
}

.right-panel {
  display: flex;
  flex-direction: column;
  flex: 1;
  gap: 1rem;
  align-items: center;
  margin: 0 auto;
}

.image-display {
  @apply px-5;
  flex: 1;
  width: 100%;
  max-width: 800px;
}

.tag-input {
  width: 100%;
  @apply px-5;
}
</style>
