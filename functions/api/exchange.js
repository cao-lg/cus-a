/**
 * Coze OAuth PKCE - Token 交换 & 刷新
 * 路径: /api/exchange
 * 支持两种模式：
 *   1. authorization_code: 用授权码换取 Token
 *   2. refresh_token: 用 refresh_token 刷新 Token
 */

const CONFIG = {
  CLIENT_ID: '08132108551868645245976669353120.app.coze',
  REDIRECT_URI: 'https://cus-a.pages.dev/api/callback',
  COZE_TOKEN_URL: 'https://api.coze.cn/api/permission/oauth2/token',
};

export async function onRequest(context) {
  const corsHeaders = {
    'Access-Control-Allow-Origin': '*',
    'Access-Control-Allow-Methods': 'POST, OPTIONS',
    'Access-Control-Allow-Headers': 'Content-Type',
  };

  if (context.request.method === 'OPTIONS') {
    return new Response(null, { status: 204, headers: corsHeaders });
  }

  if (context.request.method !== 'POST') {
    return new Response(
      JSON.stringify({ error: 'Method not allowed' }),
      { status: 405, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
    );
  }

  try {
    const body = await context.request.json();
    const { grant_type } = body;

    let requestBody;

    if (grant_type === 'refresh_token') {
      // 刷新 Token 模式
      const { refresh_token } = body;
      if (!refresh_token) {
        return new Response(
          JSON.stringify({ success: false, error: 'Missing refresh_token' }),
          { status: 400, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
        );
      }

      requestBody = {
        grant_type: 'refresh_token',
        refresh_token: refresh_token,
        client_id: CONFIG.CLIENT_ID,
      };
    } else {
      // 授权码模式
      const { code, code_verifier } = body;
      if (!code || !code_verifier) {
        return new Response(
          JSON.stringify({ success: false, error: 'Missing code or code_verifier' }),
          { status: 400, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
        );
      }

      requestBody = {
        grant_type: 'authorization_code',
        code: code,
        client_id: CONFIG.CLIENT_ID,
        redirect_uri: CONFIG.REDIRECT_URI,
        code_verifier: code_verifier,
      };
    }

    const response = await fetch(CONFIG.COZE_TOKEN_URL, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(requestBody),
    });

    const tokenData = await response.json();

    if (!response.ok) {
      throw new Error(tokenData.error_description || tokenData.error || `HTTP ${response.status}`);
    }

    return new Response(
      JSON.stringify({
        success: true,
        access_token: tokenData.access_token,
        expires_in: tokenData.expires_in,
        refresh_token: tokenData.refresh_token,
      }),
      {
        status: 200,
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
      }
    );
  } catch (error) {
    console.error('Exchange error:', error);
    return new Response(
      JSON.stringify({ success: false, error: error.message }),
      {
        status: 500,
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
      }
    );
  }
}
