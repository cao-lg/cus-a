import DefaultTheme from 'vitepress/theme'
import type { Theme } from 'vitepress'
import QuizComponent from './QuizComponent.vue'
import CozeChat from './CozeChat.vue'
import './style.css'

export default {
  extends: DefaultTheme,
  enhanceApp({ app }) {
    app.component('QuizComponent', QuizComponent)
    app.component('CozeChat', CozeChat)
  },
} satisfies Theme
