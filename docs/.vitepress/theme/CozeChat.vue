<template>
  <ClientOnly>
    <div id="coze-chat-container" style="width: 100%; min-height: 700px;">
      <!-- 加载状态 -->
      <div v-if="loading" class="coze-loading">
        <div class="coze-loading-spinner"></div>
        <p>正在连接 AI 助手...</p>
      </div>
      <!-- 错误状态 -->
      <div v-if="error" class="coze-error">
        <p>连接失败：{{ error }}</p>
        <button @click="retry">重试</button>
      </div>
    </div>
  </ClientOnly>
</template>

<script setup>
import { ref, onMounted, onBeforeUnmount } from 'vue'

// ==================== 配置区 ====================
// OAuth Token 服务地址 - 使用同域名 Pages Function
// 本地开发时自动切换到 localhost，生产环境使用相对路径
const OAUTH_SERVICE_URL = typeof window !== 'undefined' && window.location.hostname === 'localhost'
  ? 'http://localhost:8788/api'  // Wrangler pages dev 端口
  : '/api'  // 生产环境同域名

// 学生身份标识（实际应用中可以从登录系统获取）
// 每个学生使用不同的标识，实现会话隔离和独立计费
const getUserId = () => {
  // 尝试从 localStorage 获取已保存的用户标识
  let userId = localStorage.getItem('coze_user_id')
  if (!userId) {
    // 生成匿名标识（基于时间戳+随机数）
    userId = 'student_' + Date.now() + '_' + Math.random().toString(36).substr(2, 9)
    localStorage.setItem('coze_user_id', userId)
  }
  return userId
}

// ==================== 状态 ====================
const loading = ref(true)
const error = ref(null)
let sdkLoaded = false
let chatClient = null

// ==================== 获取 OAuth Token ====================
async function fetchOAuthToken() {
  const userId = getUserId()
  const response = await fetch(`${OAUTH_SERVICE_URL}/token?user=${encodeURIComponent(userId)}`, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
    },
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

// ==================== 初始化聊天组件 ====================
async function initChat() {
  try {
    loading.value = true
    error.value = null

    // 1. 获取 OAuth Token
    const tokenData = await fetchOAuthToken()
    console.log('[CozeChat] Token obtained for session:', tokenData.sessionName)

    // 2. 加载 SDK
    await loadSDK()

    // 3. 初始化 WebChatClient
    const userId = getUserId()
    chatClient = new window.CozeWebSDK.WebChatClient({
      config: {
        type: 'bot',
        bot_id: '7629158444695699498',
        isIframe: true,
      },
      auth: {
        type: 'token',
        token: tokenData.accessToken,
        // Token 刷新回调（当 Token 过期时自动调用）
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

    console.log('[CozeChat] Initialized successfully')
    loading.value = false

  } catch (e) {
    console.error('[CozeChat] Init error:', e)
    error.value = e.message
    loading.value = false
  }
}

// ==================== 重试 ====================
function retry() {
  initChat()
}

// ==================== 生命周期 ====================
onMounted(() => {
  if (typeof window === 'undefined') return
  // 延迟加载确保 DOM 就绪
  setTimeout(initChat, 500)
})

onBeforeUnmount(() => {
  sdkLoaded = false
  if (chatClient) {
    // 清理聊天组件（如果 SDK 支持）
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
