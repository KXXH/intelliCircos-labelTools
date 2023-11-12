import { ref } from 'vue'
import { defineStore } from 'pinia'

export const useSettingsStore = defineStore('settings', () => {
  const settings = ref({
    start: 0,
    end: 0,
    host: 'http://127.0.0.1:5000'
  })

  function setSettings(newSettings) {
    settings.value = Object.assign({}, settings.value, newSettings)
    saveSettingsToLocalStorage()
  }

  function saveSettingsToLocalStorage() {
    localStorage.setItem('settings', JSON.stringify(settings.value))
  }

  function restoreSettingsFromLocalStorage() {
    const settingsFromLocalStorage = JSON.parse(localStorage.getItem('settings'))
    if (settingsFromLocalStorage) {
      setSettings(settingsFromLocalStorage)
    }
  }

  return {
    settings,
    setSettings,
    restoreSettingsFromLocalStorage
  }
})
