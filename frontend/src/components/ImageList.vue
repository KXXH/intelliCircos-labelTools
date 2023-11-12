<template>
  <div class="image-list" ref="listRef">
    <div
      class="image-list__item"
      v-for="image in props.images"
      :key="image.id"
      :class="{
        'image-list__item--active': image.id === props.currentImageId
      }"
      @click="onItemClick(image.id)"
    >
      <div class="image-list__item__name">
        {{ image.name }}
      </div>
      <div class="image-list__item__status">
        <span v-if="image.tagged">✅</span>
        <span v-else>❌</span>
      </div>
    </div>
  </div>
</template>

<script setup>
import { defineEmits, watch, ref, nextTick } from 'vue'
import { useDebounceFn } from '@vueuse/core'
const props = defineProps(['images', 'currentImageId'])
const emits = defineEmits(['update:currentImageId'])
function onItemClick(imageId) {
  emits('update:currentImageId', imageId)
}

const listRef = ref(null)
const updateScroll = useDebounceFn(() => {
  const activeItem = listRef.value.querySelector(`.image-list__item--active`)
  if (activeItem) {
    const listRect = listRef.value.getBoundingClientRect()
    const itemRect = activeItem.getBoundingClientRect()
    if (itemRect.top < listRect.top) {
      listRef.value.scrollTo(
        0,
        activeItem.offsetTop - 30 // add offset
      )
      // listRef.value.scrollTop = activeItem.offsetTop - 30 // add offset
    } else if (itemRect.bottom > listRect.bottom) {
      listRef.value.scrollTo(
        0,
        activeItem.offsetTop - listRect.height + itemRect.height // adjust scroll distance
      )
    }
  }
}, 200)
watch(
  () => props.currentImageId,
  () => {
    nextTick(() => {
      updateScroll()
    })
  }
)
</script>

<style scoped>
.image-list {
  display: flex;
  flex-direction: column;
  overflow: auto;
  scroll-behavior: smooth;
}

.image-list__item {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 0.25rem 10px;
  height: 30px;
  /* border: 1px solid #ccc; */
}

.image-list__item--active {
  background-color: #ccc !important;
}

.image-list__item:hover {
  background-color: #eee;
}

.image-list__item__name {
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
  max-width: 25ch;
}
</style>
