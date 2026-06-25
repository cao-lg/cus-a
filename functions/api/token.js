/**
 * Coze OAuth JWT Token Service - Cloudflare Pages Function
 * 路径: /api/token
 *
 * 用私钥签名 JWT，调用 Coze API 换取 Access Token
 * 每个学生用 session_name 隔离对话
 */

const CONFIG = {
  CLIENT_ID: '1187497903501',
  PRIVATE_KEY_PEM: `-----BEGIN PRIVATE KEY-----
MIIEvwIBADANBgkqhkiG9w0BAQEFAASCBKkwggSlAgEAAoIBAQC+fTprzjHOMrFt
DGZdaBreaDX9lZ3RXMWgciiY3a2DPyIJD7CxabgNPiV65MLtf2MJayGcA+J8h1oU
JPUipcC58glEdFTah36zQpuEg9ePCUT1HNqyeViOz6wCvjF+dq6RA+H4P3T4ncx3
Mn4dwVJISt/ftquBlEsdyMlgxJS5i5iH9/Qa/GSdiJDNGAks6Ncrcu1vVykqcyzG
ETtZRkSEKsDpbMgrABjXhtY8XJfCTH65nk2kiBTm4G0Zf32ea/KtH0x1+/NQOLYD
R6BSH9wfD9IqF5wSIMyR+bp14xaqPMDlq6cmEOHfla9shcUApeVwqvwi/gZyOrdh
T7+PKwkZAgMBAAECggEAFzc1bcqfRNFmUNNETYmAzs7WF64KoifDmTqYiorn2PlS
iVatcu3exdRnZnsna6ENHap+GeDaU1F+r7pSWvLnEnJ2YS6pYcnGLgxF3mhgFtlr
G1F1MO+7lIooXVw3NYG65EccHPCE7cDzmKphdvhm8hMYBlChxeTgI8TjECVdN+Ce
8L0oCAM2i2uGHawYF0YOoJu95koCTArvPAyNn0ouaW10mmYZt63tNDiGwq0GaQ40
3ES7pRq6rq0gB2VG92AhH0R9Jz6fc3+CTSKB7CvMmi7PY+uDP4yaGdnVK0dQgcKh
ikwaOAmAJIUOn4eB8rGJTgbU9I5bA4dTvuk6boTlpQKBgQDjN9yJ4B+VC8gwFsB+
URwoOi0Hyp5kpKhR2RvYL1odWxUUF4jCdeUMbZUm3RWcQQLB/jlkPvR1QN0yg+tD
PnJ39mQIP4+M1iNgsvw6M0Xu2K8vtM3HVeXRzGqL7jamOHM073L3XY2b7e9ljyz2
yPDXKJ+XV0LwETLZXK0y+D513QKBgQDWnlUpj7vmiaX7iWhaUD6QZHoRZGXty3S9
tip/n0SNKNk5yxC4yK0d9QOsoBVbSX/Xl3Qz7cQHEHfrlfIgR8n2tOrEyTl9KDvx
+YfF9qsLG2ZYaaxJWeT7UW6uaxGLEYqe7in9n3LE59fydWSd+WqeASSkfjB0zBYh
E83QrqGibQKBgQCYbJTpeQw2tByrBdhD5K163uvuWiI/aaXwojBnqfxNzRgqzk7U
BLqOx8RSueURWRs8gAqIESN0tPquNIjSJ0Yq64LXdawa0lwRNoC1mkfDnmCHJEcW
/ayaPQMMs9S9VQkT7b2163BfthHuk0mak9ncvEezArrIyQDPh7g4hQeBkQKBgQCL
8aZ6eVz+0JbI1CqVaWnCYaIvIRZN3rL62YQQv9vFZ/NtefonY8Num0uQDrqeUejo
vbtp+QovyQ9JMPc3EViiZAoJ02SHNesQt7NO5K9XiMBNumo7UkC7l7fiR7Kiygdn
5si+tm/x8XOgh+faEr7w1LH+CMK0BjgPzYgRIS4IaQKBgQCy/I9x64dWAXd255Wr
gpoO5jucYmaXvZLW2cTXoCVGVQdxfPxXeE3dC/MDClbI/FfK0JGArvzU/1kKk5g+
dgXFwBD6jce2wfce8iSGsSVP2zbdohcKfhgmr21gv3I+7kreqglMdXcFyWoVb7mr
WIFglp0G1v/b2DhFu/L3tfTp/Q==
-----END PRIVATE KEY-----`,
  PUBLIC_KEY_ID: 'ThobzNJTDzvx0z7Arjwwp1cumCkmxgi4GuMo5f_k9-4',
  COZE_API_BASE: 'https://api.coze.cn',
};

function base64UrlEncode(str) {
  const bytes = new TextEncoder().encode(str);
  let binary = '';
  for (let i = 0; i < bytes.length; i++) {
    binary += String.fromCharCode(bytes[i]);
  }
  const base64 = btoa(binary);
  return base64.replace(/\+/g, '-').replace(/\//g, '_').replace(/=+$/, '');
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

function parsePrivateKey(pem) {
  const base64 = pem
    .replace('-----BEGIN PRIVATE KEY-----', '')
    .replace('-----END PRIVATE KEY-----', '')
    .replace(/\s/g, '');
  const binaryStr = atob(base64);
  const bytes = new Uint8Array(binaryStr.length);
  for (let i = 0; i < binaryStr.length; i++) {
    bytes[i] = binaryStr.charCodeAt(i);
  }
  return bytes.buffer;
}

async function importPrivateKey(pem) {
  const keyData = parsePrivateKey(pem);
  return await crypto.subtle.importKey(
    'pkcs8',
    keyData,
    { name: 'RSASSA-PKCS1-v1_5', hash: 'SHA-256' },
    false,
    ['sign']
  );
}

function randomHex(length) {
  const chars = '0123456789abcdef';
  let result = '';
  for (let i = 0; i < length; i++) {
    result += chars[Math.floor(Math.random() * 16)];
  }
  return result;
}

async function signJWT(sessionName) {
  const now = Math.floor(Date.now() / 1000);
  const ttl = 3600;

  const header = {
    alg: 'RS256',
    typ: 'JWT',
    kid: CONFIG.PUBLIC_KEY_ID,
  };

  const jti = `${now}:${randomHex(8)}:${randomHex(16)}`;

  const payload = {
    iss: CONFIG.CLIENT_ID,
    aud: 'api.coze.cn',
    iat: now,
    exp: now + ttl,
    jti: jti,
    session_name: sessionName,
  };

  const headerStr = JSON.stringify(header);
  const payloadStr = JSON.stringify(payload);

  const encodedHeader = base64UrlEncode(headerStr);
  const encodedPayload = base64UrlEncode(payloadStr);
  const signingInput = `${encodedHeader}.${encodedPayload}`;

  const privateKey = await importPrivateKey(CONFIG.PRIVATE_KEY_PEM);
  const signature = await crypto.subtle.sign(
    'RSASSA-PKCS1-v1_5',
    privateKey,
    new TextEncoder().encode(signingInput)
  );

  const encodedSignature = arrayBufferToBase64Url(signature);
  return `${signingInput}.${encodedSignature}`;
}

async function getCozeAccessToken(jwt) {
  const url = `${CONFIG.COZE_API_BASE}/api/permission/oauth2/token`;

  const body = {
    duration_seconds: 86399,
    grant_type: 'urn:ietf:params:oauth:grant-type:jwt-bearer',
  };

  const response = await fetch(url, {
    method: 'POST',
    headers: {
      Authorization: `Bearer ${jwt}`,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(body),
  });

  if (!response.ok) {
    const errorText = await response.text();
    throw new Error(`Coze API error: ${response.status} - ${errorText}`);
  }

  return await response.json();
}

export async function onRequest(context) {
  const { request } = context;
  const url = new URL(request.url);

  const corsHeaders = {
    'Access-Control-Allow-Origin': '*',
    'Access-Control-Allow-Methods': 'GET, POST, OPTIONS',
    'Access-Control-Allow-Headers': 'Content-Type, Authorization',
    'Access-Control-Max-Age': '86400',
  };

  if (request.method === 'OPTIONS') {
    return new Response(null, { status: 204, headers: corsHeaders });
  }

  try {
    let sessionName = url.searchParams.get('user') || 'anonymous';

    if (request.method === 'POST') {
      try {
        const body = await request.json();
        if (body.user) sessionName = body.user;
      } catch (e) {}
    }

    const jwt = await signJWT(sessionName);
    const tokenData = await getCozeAccessToken(jwt);

    return new Response(
      JSON.stringify({
        success: true,
        access_token: tokenData.access_token,
        token_type: tokenData.token_type,
        expires_in: tokenData.expires_in,
        session_name: sessionName,
      }),
      {
        status: 200,
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
      }
    );
  } catch (error) {
    console.error('Token generation error:', error);
    return new Response(
      JSON.stringify({ success: false, error: error.message }),
      {
        status: 500,
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
      }
    );
  }
}
