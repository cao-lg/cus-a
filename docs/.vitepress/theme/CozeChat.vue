<template>
  <ClientOnly>
    <div id="coze-chat-container" style="width: 100%; min-height: 700px;">
      <!-- 未登录状态 -->
      <div v-if="!isLoggedIn && !loading" class="coze-login">
        <div class="coze-login-icon">🤖</div>
        <h3>AI 学习助手</h3>
        <p>请先登录你的 Coze 账号，即可与"小数老师"对话</p>
        <button class="coze-login-btn" @click="startOAuth" :disabled="oauthLoading">
          {{ oauthLoading ? '正在跳转...' : '登录 Coze 账号' }}
        </button>
        <p class="coze-login-tip">登录后，你的对话数据将用于学习画像分析</p>
      </div>

      <!-- 加载状态 -->
      <div v-if="loading" class="coze-loading">
        <div class="coze-loading-spinner"></div>
        <p>{{ loadingText }}</p>
      </div>

      <!-- 错误状态 -->
      <div v-if="error && !loading" class="coze-error">
        <p>{{ error }}</p>
        <button @click="retry">重试</button>
      </div>

      <!-- 已登录，显示聊天区域 -->
      <div v-if="isLoggedIn && !loading && !error" ref="chatArea" style="width: 100%; height: 700px;"></div>
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

// ==================== 状态 ====================
const loading = ref(false)
const loadingText = ref('加载中...')
const error = ref(null)
const isLoggedIn = ref(false)
const oauthLoading = ref(false)
const chatArea = ref(null)
let chatClient = null
let oauthWindow = null
let codeVerifier = ''
let oauthState = ''

// ==================== 检查登录状态 ====================
function checkLoginStatus() {
  const token = localStorage.getItem('coze_access_token')
  const expiresAt = localStorage.getItem('coze_token_expires')

  if (!token) return false

  // 检查是否过期（提前5分钟刷新）
  if (expiresAt && Date.now() >= parseInt(expiresAt) - 5 * 60 * 1000) {
    // Token 即将过期，尝试刷新
    refreshToken()
    return true
  }

  return true
}

// ==================== 刷新 Token ====================
async function refreshToken() {
  const refreshToken = localStorage.getItem('coze_refresh_token')
  if (!refreshToken) {
    logout()
    return
  }

  try {
    const response = await fetch(`${API_BASE}/token`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        grant_type: 'refresh_token',
        refresh_token: refreshToken,
      }),
    })

    const data = await response.json()
    if (data.success) {
      saveToken(data)
    } else {
      logout()
    }
  } catch (e) {
    console.error('Refresh token failed:', e)
    logout()
  }
}

// ==================== 保存 Token ====================
function saveToken(tokenData) {
  localStorage.setItem('coze_access_token', tokenData.access_token)
  localStorage.setItem('coze_refresh_token', tokenData.refresh_token)
  // expires_in 是 Unix 时间戳（秒），转换为毫秒
  const expiresAt = tokenData.expires_in * 1000
  localStorage.setItem('coze_token_expires', expiresAt.toString())
}

// ==================== 清除登录状态 ====================
function logout() {
  localStorage.removeItem('coze_access_token')
  localStorage.removeItem('coze_refresh_token')
  localStorage.removeItem('coze_token_expires')
  isLoggedIn.value = false
}

// ==================== 开始 OAuth 流程 ====================
async function startOAuth() {
  try {
    oauthLoading.value = true
    error.value = null

    // 1. 获取授权 URL
    const response = await fetch(`${API_BASE}/auth`)
    const data = await response.json()

    if (!data.success) {
      throw new Error(data.error || '获取授权链接失败')
    }

    codeVerifier = data.code_verifier
    oauthState = data.state

    // 2. 打开授权窗口
    oauthWindow = window.open(data.auth_url, 'coze-oauth', 'width=600,height=700')

    // 3. 监听回调消息
    window.addEventListener('message', handleOAuthCallback)

  } catch (e) {
    error.value = e.message
    oauthLoading.value = false
  }
}

// ==================== 处理 OAuth 回调 ====================
async function handleOAuthCallback(event) {
  if (event.data?.type !== 'coze-oauth-callback') return

  window.removeEventListener('message', handleOAuthCallback)

  const { code, state } = event.data

  // 验证 state
  if (state !== oauthState) {
    error.value = '安全验证失败，请重试'
    oauthLoading.value = false
    return
  }

  try {
    loadingText.value = '正在获取访问令牌...'
    loading.value = true
    oauthLoading.value = false

    // 4. 用 code 换取 Token
    const response = await fetch(`${API_BASE}/exchange`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        code: code,
        code_verifier: codeVerifier,
      }),
    })

    const tokenData = await response.json()

    if (!tokenData.success) {
      throw new Error(tokenData.error || '获取 Token 失败')
    }

    // 5. 保存 Token
    saveToken(tokenData)
    isLoggedIn.value = true

    // 6. 初始化聊天
    await initChat()

  } catch (e) {
    error.value = e.message
    loading.value = false
    oauthLoading.value = false
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
    // 使用本地 SDK，避免 CDN 被墙
    script.src = '/coze-chat-sdk.js'
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

    const accessToken = localStorage.getItem('coze_access_token')
    if (!accessToken) {
      throw new Error('未找到访问令牌')
    }

    // 加载 SDK
    await loadSDK()

    // 初始化 WebChatClient
    chatClient = new window.CozeWebSDK.WebChatClient({
      config: {
        type: 'bot',
        bot_id: BOT_ID,
        isIframe: true,
      },
      auth: {
        type: 'token',
        token: accessToken,
        onRefreshToken: async () => {
          console.log('[CozeChat] Refreshing token...')
          await refreshToken()
          return localStorage.getItem('coze_access_token')
        },
      },
      userInfo: {
        id: 'student_' + Date.now(),
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

    // 如果是 SDK 加载失败，提示用户
    if (e.message.includes('SDK 加载失败')) {
      error.value = 'SDK 加载失败，请检查网络连接后重试'
    }
  }
}

// ==================== 重试 ====================
function retry() {
  error.value = null
  if (isLoggedIn.value) {
    initChat()
  }
}

// ==================== 生命周期 ====================
onMounted(() => {
  if (typeof window === 'undefined') return

  // 检查是否已登录
  if (checkLoginStatus()) {
    isLoggedIn.value = true
    initChat()
  }
})

onBeforeUnmount(() => {
  window.removeEventListener('message', handleOAuthCallback)
  if (chatClient) {
    chatClient = null
  }
})
</script>

<style scoped>
.coze-login {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  min-height: 500px;
  text-align: center;
  padding: 40px 20px;
}

.coze-login-icon {
  font-size: 64px;
  margin-bottom: 20px;
}

.coze-login h3 {
  margin: 0 0 12px;
  font-size: 24px;
  color: var(--vp-c-text-1);
}

.coze-login p {
  margin: 0 0 24px;
  color: var(--vp-c-text-2);
  font-size: 14px;
  max-width: 320px;
}

.coze-login-btn {
  background: var(--vp-c-brand);
  color: white;
  border: none;
  padding: 12px 40px;
  border-radius: 8px;
  font-size: 16px;
  cursor: pointer;
  transition: background 0.2s;
}

.coze-login-btn:hover:not(:disabled) {
  background: var(--vp-c-brand-dark);
}

.coze-login-btn:disabled {
  opacity: 0.7;
  cursor: not-allowed;
}

.coze-login-tip {
  margin-top: 16px !important;
  font-size: 12px !important;
  color: var(--vp-c-text-3) !important;
}

.coze-loading {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  min-height: 500px;
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
  min-height: 500px;
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
