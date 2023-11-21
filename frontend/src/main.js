import './assets/main.css'
import 'virtual:uno.css'
import 'animate.css'

import { createApp } from 'vue'
import { createPinia } from 'pinia'
import { useSettingsStore } from './stores/settingsStore'
import { useImageStore } from './stores/imageStore'
import { setApiClient } from './service/api'
import App from './App.vue'

const app = createApp(App)

app.use(createPinia())

app.mount('#app')

const settingsStore = useSettingsStore()
const imageStore = useImageStore()

settingsStore.restoreSettingsFromLocalStorage()
setApiClient({
  baseURL: settingsStore.settings.host,
  headers: {
    'Content-Type': 'application/json'
  }
})
imageStore.fetchImages(settingsStore.settings)
