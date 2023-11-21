// uno.config.ts
import { defineConfig } from 'unocss'
import { presetMini } from 'unocss'
import presetAttributify from '@unocss/preset-attributify'
import presetIcons from '@unocss/preset-icons'
import transformerDirectives from '@unocss/transformer-directives'

export default defineConfig({
  presets: [presetMini(), presetAttributify(), presetIcons()],
  transformers: [transformerDirectives()]
})
