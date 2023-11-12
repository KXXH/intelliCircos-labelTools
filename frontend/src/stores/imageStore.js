// store.js

import { ref, computed } from 'vue'
import { getImages, getImageTag, saveImageTag } from '../service/api'
import { defineStore } from 'pinia'

export const useImageStore = defineStore('image', () => {
  const images = ref([])
  const currentImageId = ref(0)
  const currentImage = computed(() => images.value[currentImageId.value])

  const currentTag = ref('')
  let originalTag = ''

  async function fetchImages(opts = {}) {
    const { start = 0, end = 0 } = opts
    images.value = await getImages()

    // splice images
    if (start || end) {
      images.value = images.value.slice(start, end === 0 ? undefined : end)
    }

    // find first untagged image
    const firstUntagged = images.value.findIndex((image) => !image.tagged)
    await setCurrentImage(images.value[Math.max(0, firstUntagged)])
  }

  async function setCurrentImage(image) {
    await tagCurrentImage(currentTag.value)
    currentImageId.value = image.id
    currentTag.value = await getImageTag(images.value[image.id].name)
    originalTag = currentTag.value
  }

  async function tagCurrentImage(tag) {
    if (originalTag === tag) return
    await saveImageTag(currentImage.value.name, tag)
    currentImage.value.tagged = tag !== ''
  }

  return {
    images,
    currentImageId,
    currentTag,
    currentImage,
    fetchImages,
    setCurrentImage,
    tagCurrentImage
  }
})