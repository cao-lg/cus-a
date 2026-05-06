import DefaultTheme from 'vitepress/theme'
import type { Theme } from 'vitepress'
import QuizComponent from './QuizComponent.vue'
import './style.css'

export default {
  extends: DefaultTheme,
  enhanceApp({ app }) {
    app.component('QuizComponent', QuizComponent)
  },
} satisfies Theme
