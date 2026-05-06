import DefaultTheme from 'vitepress/theme'
import type { Theme } from 'vitepress'

import './style.css'

export default {
  extends: DefaultTheme,
  enhanceApp({ app }) {
    // 确保自定义样式在 SSR 和客户端都正确加载
  },
} satisfies Theme
