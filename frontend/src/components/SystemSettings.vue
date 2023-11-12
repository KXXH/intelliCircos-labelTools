<template>
  <Teleport to="body">
    <div class="settings">
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
        <button @click="onSave">保存（刷新生效）</button>
      </div>
    </div>
  </Teleport>
</template>

<script setup>
import { defineProps, defineEmits, ref } from 'vue'
import { useVModel } from '@vueuse/core'

const props = defineProps(['settings'])
const emits = defineEmits(['update:settings'])
const settings = useVModel(props, 'settings', emits)

const start = ref(settings.value.start)
const end = ref(settings.value.end)
const host = ref(settings.value.host)

function onSave() {
  settings.value = {
    start: start.value,
    end: end.value,
    host: host.value
  }
}
</script>

<style scoped>
.settings {
  position: fixed;
  top: 50vh;
  left: 50vw;
  transform: translate(-50%, -50%);
  width: 400px;
  height: 300px;
  border: 1px solid #ccc;
  border-radius: 0.5rem;
  padding: 1rem;
  background-color: #fff;
  display: flex;
  flex-direction: column;
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
  gap: 1rem;
}

.settings__item {
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
  flex: 1 0 50%;
  box-sizing: border-box;
  padding: 10px;
}
</style>
