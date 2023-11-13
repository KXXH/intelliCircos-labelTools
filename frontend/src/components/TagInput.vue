<template>
  <div class="tag-input">
    <textarea class="tag-input__textarea" v-model="tag" ref="textarea"></textarea>
    <div class="tag-input__hint">
      <p>快捷键</p>
      <p>q: line</p>
      <p>w: scatter</p>
      <p>e: heatmap</p>
      <p>r: bar</p>
      <p>t: link</p>
      <p>y: tile</p>
      <p>u: glyph</p>
      <p>i: ideogram</p>
      <p>o: unknown</p>
      <p>Tab: split</p>
      <p>Delete: remove</p>
    </div>
  </div>
</template>

<script setup>
import { useVModel, onKeyStroke } from '@vueuse/core'
import { defineProps, defineEmits, ref, nextTick } from 'vue'
const props = defineProps(['tag'])
const emits = defineEmits(['update:tag'])
const tag = useVModel(props, 'tag', emits)

const textarea = ref(null)

function findLastMatch(str, regex) {
  let lastMatchIndex = -1
  let lastMatchLength = 0
  let match
  while ((match = regex.exec(str)) !== null) {
    lastMatchIndex = match.index
    lastMatchLength = match[0].length
  }
  return { index: lastMatchIndex, length: lastMatchLength }
}

function insertTag(e, insertValue) {
  e.preventDefault()
  const start = textarea.value.selectionStart
  const end = textarea.value.selectionEnd
  const newText = tag.value.slice(0, start) + insertValue + tag.value.slice(end)
  tag.value = newText
  textarea.value.focus()
  textarea.value.setSelectionRange(start + insertValue.length, start + insertValue.length)
}

function removeTag(e) {
  e.preventDefault()
  const start = textarea.value.selectionStart
  const end = textarea.value.selectionEnd
  let newCursorPos = start
  // 如果是选中的话，就删除选中的
  if (start !== end) {
    const newText = tag.value.slice(0, start) + tag.value.slice(end)
    tag.value = newText
    newCursorPos = start
  }
  // 如果没有选中，检查上一个字符start左边是否紧贴一个tag
  else {
    if (start === 0) return
    const tagRe = /<\w+>/g // 注意这里我们添加了全局搜索标志"g"
    const strBeforeCursor = tag.value.slice(0, start)
    const lastTag = findLastMatch(strBeforeCursor, tagRe)

    if (lastTag.index === -1 || lastTag.index + lastTag.length !== start) {
      // 如果左边不是紧贴一个tag，就删除一个字符
      const newText = tag.value.slice(0, start - 1) + tag.value.slice(end)
      tag.value = newText
      newCursorPos = start - 1
    } else {
      // 如果左边是紧贴一个tag，就删除这个tag
      const newText = tag.value.slice(0, start - lastTag.length) + tag.value.slice(end)
      tag.value = newText
      newCursorPos = start - lastTag.length
    }
  }
  textarea.value.focus()
  nextTick().then(() => {
    textarea.value.setSelectionRange(newCursorPos, newCursorPos)
  })
  // textarea.value.setSelectionRange(newCursorPos, newCursorPos)
}

// 快捷键处理
onKeyStroke('q', (e) => insertTag(e, '<line>'))
onKeyStroke('w', (e) => insertTag(e, '<scatter>'))
onKeyStroke('e', (e) => insertTag(e, '<heatmap>'))
onKeyStroke('r', (e) => insertTag(e, '<bar>'))
onKeyStroke('t', (e) => insertTag(e, '<link>'))
onKeyStroke('y', (e) => insertTag(e, '<tile>'))
onKeyStroke('u', (e) => insertTag(e, '<glyph>'))
onKeyStroke('i', (e) => insertTag(e, '<ideogram>'))
onKeyStroke('o', (e) => insertTag(e, '<unknown>'))
onKeyStroke('Tab', (e) => insertTag(e, '<split>'))
onKeyStroke('Delete', (e) => removeTag(e))
</script>

<style scoped>
.tag-input {
  display: flex;
  flex-direction: row;
  justify-items: center;
  gap: 1rem;
  padding: 1rem;
}

.tag-input__textarea {
  flex: 1;
  resize: none;
}

.tag-input__hint {
  font-size: small;
}
</style>
