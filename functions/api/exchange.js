/**
 * Coze OAuth PKCE - Step 3: 用授权码换取 Token
 * 路径: /api/exchange
 * 前端传入 code 和 code_verifier，后端调用 Coze API 换取 Access Token
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
    const { code, code_verifier } = body;

    if (!code || !code_verifier) {
      return new Response(
        JSON.stringify({ success: false, error: 'Missing code or code_verifier' }),
        { status: 400, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
      );
    }

    // 调用 Coze API 换取 Token
    const response = await fetch(CONFIG.COZE_TOKEN_URL, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        grant_type: 'authorization_code',
        code: code,
        client_id: CONFIG.CLIENT_ID,
        redirect_uri: CONFIG.REDIRECT_URI,
        code_verifier: code_verifier,
      }),
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
