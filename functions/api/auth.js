/**
 * Coze OAuth PKCE - Step 1: 生成授权 URL
 * 路径: /api/auth
 * 生成 code_verifier, code_challenge，返回 Coze 授权页面 URL
 */

const CONFIG = {
  CLIENT_ID: '08132108551868645245976669353120.app.coze',
  REDIRECT_URI: 'https://cus-a.pages.dev/api/callback',
  COZE_AUTH_BASE: 'https://www.coze.cn/api/permission/oauth2/authorize',
};

// 生成随机字符串
function generateCodeVerifier(length = 128) {
  const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789-._~';
  let result = '';
  for (let i = 0; i < length; i++) {
    result += chars.charAt(Math.floor(Math.random() * chars.length));
  }
  return result;
}

// SHA-256 + Base64URL
async function generateCodeChallenge(verifier) {
  const encoder = new TextEncoder();
  const data = encoder.encode(verifier);
  const hash = await crypto.subtle.digest('SHA-256', data);
  return arrayBufferToBase64Url(hash);
}

function arrayBufferToBase64Url(buffer) {
  const bytes = new Uint8Array(buffer);
  let binary = '';
  for (let i = 0; i < bytes.byteLength; i++) {
    binary += String.fromCharCode(bytes[i]);
  }
  const base64 = btoa(binary);
  return base64.replace(/\+/g, '-').replace(/\//g, '_').replace(/=+$/, '');
}

export async function onRequest(context) {
  const corsHeaders = {
    'Access-Control-Allow-Origin': '*',
    'Access-Control-Allow-Methods': 'GET, OPTIONS',
    'Access-Control-Allow-Headers': 'Content-Type',
  };

  if (context.request.method === 'OPTIONS') {
    return new Response(null, { status: 204, headers: corsHeaders });
  }

  try {
    // 生成 PKCE 参数
    const codeVerifier = generateCodeVerifier();
    const codeChallenge = await generateCodeChallenge(codeVerifier);
    const state = crypto.randomUUID();

    // 构建授权 URL
    const authUrl = new URL(CONFIG.COZE_AUTH_BASE);
    authUrl.searchParams.set('response_type', 'code');
    authUrl.searchParams.set('client_id', CONFIG.CLIENT_ID);
    authUrl.searchParams.set('redirect_uri', CONFIG.REDIRECT_URI);
    authUrl.searchParams.set('state', state);
    authUrl.searchParams.set('code_challenge', codeChallenge);
    authUrl.searchParams.set('code_challenge_method', 'S256');

    return new Response(
      JSON.stringify({
        success: true,
        auth_url: authUrl.toString(),
        code_verifier: codeVerifier,
        state: state,
      }),
      {
        status: 200,
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
      }
    );
  } catch (error) {
    console.error('Auth error:', error);
    return new Response(
      JSON.stringify({ success: false, error: error.message }),
      {
        status: 500,
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
      }
    );
  }
}
