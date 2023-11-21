<template>
  <Teleport to="body">
    <Transition enter-from-class="settings--hide" leave-to-class="settings--hide">
      <div v-if="show" class="settings">
        <div class="settings__title">设置</div>
        <div class="settings__body">
          <div class="settings_item">
            <div>起始位置（0表示不限制）</div>
            <div>
              <input type="number" v-model="start" />
            </div>
          </div>
          <div class="settings_item">
            <div>结束位置（0表示不限制）</div>
            <div>
              <input type="number" v-model="end" />
            </div>
          </div>
          <div class="settings_item">
            <div>后端域名</div>
            <div>
              <input type="text" v-model="host" />
            </div>
          </div>
        </div>
        <div class="settings__footer">
          <button class="settings__footer-action btn-confirm" @click="onSave">
            保存（刷新生效）
          </button>
          <button class="settings__footer-action btn-cancel" @click="() => (show = false)">
            取消
          </button>
          <div class="text-xs c-gray-500">Build Version: {{ version }}</div>
        </div>
      </div>
    </Transition>
    <Transition enter-from-class="settings__mask--hide" leave-to-class="settings__mask--hide">
      <div v-if="show" class="settings__mask" @click="onSave"></div>
    </Transition>
  </Teleport>
</template>

<script setup>
import { defineProps, defineEmits, ref, watch } from 'vue'
import { useVModel } from '@vueuse/core'

const props = defineProps(['settings', 'show'])
const emits = defineEmits(['update:settings', 'update:show'])
const settings = useVModel(props, 'settings', emits)
const show = useVModel(props, 'show', emits)

const start = ref(settings.value.start)
const end = ref(settings.value.end)
const host = ref(settings.value.host)

const version = window.__INTELLICIRCOS_LABELTOOL_FRONTEND_VERSION__

function onSave() {
  settings.value = {
    start: start.value,
    end: end.value,
    host: host.value
  }
}

watch(
  () => props.settings,
  () => {
    start.value = props.settings.start
    end.value = props.settings.end
    host.value = props.settings.host
  }
)
</script>

<style scoped>
.settings {
  @apply fixed top-1/2 left-1/2 flex flex-col transform z-101 transition-all duration-300;
  --un-translate-x: -50%;
  --un-translate-y: -50%;
  width: 400px;
  height: 250px;
  border: 1px solid #ccc;
  border-radius: 0.5rem;
  padding: 1rem;
  background-color: #fff;
}

.settings__title {
  font-size: 1.5rem;
  font-weight: bold;
  margin-bottom: 1rem;
}

.settings__body {
  flex: 1;
  display: flex;
  /* flex-direction: column; */
  flex-wrap: wrap;
  gap: 0.5rem 1rem;
}

.settings__item {
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
  flex: 1 0 50%;
  box-sizing: border-box;
  padding: 10px;
}

.settings__mask {
  @apply fixed top-0 left-0 w-full h-full bg-black z-100 transition-opacity duration-300;
  --mask-opacity: 0.6;
  opacity: var(--mask-opacity);
}

.settings__mask--hide {
  --mask-opacity: 0;
}

.settings--hide {
  opacity: 0;
  --un-scale-x: 0;
  --un-scale-y: 0;
}

.settings__footer {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-top: 1rem;
}

.settings__footer-action {
  @apply cursor-pointer c-white rounded px-10px py-5px border-0 transition duration-200;
}

.btn-confirm {
  @apply bg-blue-500;
}

.btn-confirm:hover {
  @apply bg-blue-600;
}

.btn-cancel {
  @apply bg-gray-500;
}

.btn-cancel:hover {
  @apply bg-gray-600;
}
</style>
