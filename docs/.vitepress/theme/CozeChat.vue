<template>
  <ClientOnly>
    <div id="coze-chat-container" style="width: 100%; min-height: 700px;">
      <!-- 加载状态 -->
      <div v-if="loading" class="coze-loading">
        <div class="coze-loading-spinner"></div>
        <p>{{ loadingText }}</p>
      </div>
      <!-- 错误状态 -->
      <div v-if="error && !loading" class="coze-error">
        <p>{{ error }}</p>
        <button @click="initChat">重试</button>
      </div>
    </div>
  </ClientOnly>
</template>

<script setup>
import { ref, onMounted, onBeforeUnmount } from 'vue'

// ==================== 配置区 ====================
const API_BASE = typeof window !== 'undefined' && window.location.hostname === 'localhost'
  ? 'http://localhost:8788/api'
  : '/api'

const BOT_ID = '7629158444695699498'

// 学生身份标识（用于 session_name 隔离）
const getUserId = () => {
  let userId = localStorage.getItem('coze_student_id')
  if (!userId) {
    userId = 'student_' + Date.now() + '_' + Math.random().toString(36).substr(2, 9)
    localStorage.setItem('coze_student_id', userId)
  }
  return userId
}

// ==================== 状态 ====================
const loading = ref(true)
const loadingText = ref('正在连接 AI 助手...')
const error = ref(null)
let chatClient = null

// ==================== 获取 Token ====================
async function fetchToken() {
  const userId = getUserId()
  const response = await fetch(`${API_BASE}/token?user=${encodeURIComponent(userId)}`, {
    method: 'GET',
    headers: { 'Content-Type': 'application/json' },
  })

  if (!response.ok) {
    const errData = await response.json().catch(() => ({}))
    throw new Error(errData.error || `HTTP ${response.status}`)
  }

  const data = await response.json()
  if (!data.success) {
    throw new Error(data.error || '获取 Token 失败')
  }

  return {
    accessToken: data.access_token,
    expiresIn: data.expires_in,
    sessionName: data.session_name,
  }
}

// ==================== 加载 SDK ====================
function loadSDK() {
  return new Promise((resolve, reject) => {
    if (window.CozeWebSDK) {
      resolve()
      return
    }

    const script = document.createElement('script')
    // 使用中国区域 CDN，让 webpack 自动从同目录加载 chunk 文件（如 499.js）
    script.src = 'https://lf-cdn.coze.cn/obj/unpkg/flow-platform/chat-app-sdk/1.2.0-beta.20/libs/cn/index.js'
    script.onload = () => resolve()
    script.onerror = () => reject(new Error('SDK 加载失败'))
    document.head.appendChild(script)
  })
}

// ==================== 初始化聊天组件 ====================
async function initChat() {
  try {
    loading.value = true
    loadingText.value = '正在连接 AI 助手...'
    error.value = null

    // 1. 获取 Token（后端用私钥签名 JWT 换取）
    const tokenData = await fetchToken()
    console.log('[CozeChat] Token obtained for session:', tokenData.sessionName)

    // 2. 加载 SDK
    await loadSDK()

    // 3. 初始化 WebChatClient
    // 官方推荐 isIframe: false，避免跨域和通信问题
    const userId = getUserId()
    chatClient = new window.CozeWebSDK.WebChatClient({
      config: {
        type: 'bot',
        bot_id: BOT_ID,
        isIframe: false,
      },
      auth: {
        type: 'token',
        token: tokenData.accessToken,
        onRefreshToken: async () => {
          console.log('[CozeChat] Refreshing token...')
          const newToken = await fetchToken()
          return newToken.accessToken
        },
      },
      userInfo: {
        id: userId,
        url: 'https://lf-coze-web-cdn.coze.cn/obj/eden-cn/lm-lgvj/ljhwZthlaukjlkulzlp/coze/coze-logo.png',
        nickname: '学生用户',
      },
      ui: {
        base: {
          icon: 'https://lf-coze-web-cdn.coze.cn/obj/eden-cn/lm-lgvj/ljhwZthlaukjlkulzlp/coze/chatsdk-logo.png',
          layout: 'pc',
          lang: 'zh-CN',
          zIndex: 1000,
        },
        header: {
          isShow: true,
          isNeedClose: false,
        },
        asstBtn: {
          isNeed: true,
        },
        footer: {
          isShow: false,
        },
        chatBot: {
          title: '小数老师',
          uploadable: true,
          width: '100%',
        },
      },
    })

    // 自动展开聊天窗口
    if (chatClient && typeof chatClient.showChatBot === 'function') {
      chatClient.showChatBot()
    }
    console.log('[CozeChat] Initialized successfully')
    loading.value = false

  } catch (e) {
    console.error('[CozeChat] Init error:', e)
    error.value = e.message
    loading.value = false
  }
}

// ==================== 生命周期 ====================
onMounted(() => {
  if (typeof window === 'undefined') return
  // 延迟加载确保 DOM 就绪
  setTimeout(initChat, 500)
})

onBeforeUnmount(() => {
  if (chatClient && typeof chatClient.destroy === 'function') {
    chatClient.destroy()
  }
  chatClient = null
})
</script>

<style scoped>
.coze-loading {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  min-height: 400px;
  color: var(--vp-c-text-2);
}

.coze-loading-spinner {
  width: 40px;
  height: 40px;
  border: 3px solid var(--vp-c-divider);
  border-top-color: var(--vp-c-brand);
  border-radius: 50%;
  animation: spin 1s linear infinite;
  margin-bottom: 16px;
}

@keyframes spin {
  to {
    transform: rotate(360deg);
  }
}

.coze-error {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  min-height: 400px;
  color: var(--vp-c-danger);
  text-align: center;
  padding: 20px;
}

.coze-error button {
  margin-top: 16px;
  padding: 8px 24px;
  background: var(--vp-c-brand);
  color: white;
  border: none;
  border-radius: 6px;
  cursor: pointer;
  font-size: 14px;
}

.coze-error button:hover {
  background: var(--vp-c-brand-dark);
}
</style>
