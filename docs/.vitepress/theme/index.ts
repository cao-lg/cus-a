import DefaultTheme from 'vitepress/theme'
import type { Theme } from 'vitepress'
import QuizWidget from './QuizWidget.vue'
import './style.css'

export default {
  extends: DefaultTheme,
  enhanceApp({ app }) {
    app.component('QuizWidget', QuizWidget)
  },
} satisfies Theme
