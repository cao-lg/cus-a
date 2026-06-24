<template>
  <ClientOnly>
    <div id="coze-chat-container" style="width: 100%; min-height: 700px;">
      <!-- 加载状态 -->
      <div v-if="loading && !useIframe" class="coze-loading">
        <div class="coze-loading-spinner"></div>
        <p>正在连接 AI 助手...</p>
      </div>
      <!-- SDK 错误状态，提供 iframe 降级 -->
      <div v-if="error && !useIframe" class="coze-error">
        <p>SDK 加载失败，正在切换为嵌入模式...</p>
      </div>
      <!-- iframe 嵌入模式 -->
      <iframe
        v-if="useIframe"
        :src="iframeUrl"
        style="width: 100%; height: 700px; border: none; border-radius: 8px;"
        allow="microphone"
      ></iframe>
    </div>
  </ClientOnly>
</template>

<script setup>
import { ref, onMounted, onBeforeUnmount } from 'vue'

// ==================== 配置区 ====================
const OAUTH_SERVICE_URL = typeof window !== 'undefined' && window.location.hostname === 'localhost'
  ? 'http://localhost:8788/api'
  : '/api'

// Coze 智能体配置
const BOT_ID = '7629158444695699498'
const COZE_STORE_URL = 'https://www.coze.cn/s/UBIvPa89h2I'

// 学生身份标识
const getUserId = () => {
  let userId = localStorage.getItem('coze_user_id')
  if (!userId) {
    userId = 'student_' + Date.now() + '_' + Math.random().toString(36).substr(2, 9)
    localStorage.setItem('coze_user_id', userId)
  }
  return userId
}

// ==================== 状态 ====================
const loading = ref(true)
const error = ref(null)
const useIframe = ref(false)
const iframeUrl = ref(COZE_STORE_URL)
let chatClient = null

// ==================== 获取 OAuth Token ====================
async function fetchOAuthToken() {
  const userId = getUserId()
  const response = await fetch(`${OAUTH_SERVICE_URL}/token?user=${encodeURIComponent(userId)}`, {
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
    script.src = 'https://lf-cdn.coze.cn/obj/unpkg/flow-platform/chat-app-sdk/latest/libs/cn/index.js'
    script.onload = () => resolve()
    script.onerror = () => reject(new Error('SDK 加载失败'))
    document.head.appendChild(script)
  })
}

// ==================== 初始化 WebChatClient ====================
async function initWebChatClient() {
  const tokenData = await fetchOAuthToken()
  console.log('[CozeChat] Token obtained for session:', tokenData.sessionName)

  await loadSDK()

  const userId = getUserId()
  chatClient = new window.CozeWebSDK.WebChatClient({
    config: {
      type: 'bot',
      bot_id: BOT_ID,
      isIframe: true,
    },
    auth: {
      type: 'token',
      token: tokenData.accessToken,
      onRefreshToken: async () => {
        console.log('[CozeChat] Refreshing token...')
        const newToken = await fetchOAuthToken()
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
        isNeed: false,
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

  console.log('[CozeChat] WebChatClient initialized successfully')
  loading.value = false
}

// ==================== 降级到 iframe ====================
function fallbackToIframe() {
  console.log('[CozeChat] Falling back to iframe mode')
  useIframe.value = true
  loading.value = false
  error.value = null
}

// ==================== 主初始化逻辑 ====================
async function initChat() {
  try {
    loading.value = true
    error.value = null
    useIframe.value = false

    // 先尝试 WebChatClient SDK 模式
    await initWebChatClient()
  } catch (e) {
    console.error('[CozeChat] SDK mode failed:', e)

    // 如果是 SDK 加载失败，降级到 iframe
    if (e.message.includes('SDK 加载失败')) {
      fallbackToIframe()
    } else {
      // 其他错误（如 Token 获取失败）
      error.value = e.message
      loading.value = false
    }
  }
}

// ==================== 生命周期 ====================
onMounted(() => {
  if (typeof window === 'undefined') return
  setTimeout(initChat, 500)
})

onBeforeUnmount(() => {
  if (chatClient) {
    chatClient = null
  }
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
