/**
 * Coze OAuth PKCE - Step 2: 处理回调
 * 路径: /api/callback
 * Coze 授权后重定向到这里，携带 code 和 state
 */

const CONFIG = {
  CLIENT_ID: '08132108551868645245976669353120.app.coze',
  REDIRECT_URI: 'https://cus-a.pages.dev/api/callback',
  COZE_TOKEN_URL: 'https://api.coze.cn/api/permission/oauth2/token',
};

export async function onRequest(context) {
  const url = new URL(context.request.url);
  const code = url.searchParams.get('code');
  const state = url.searchParams.get('state');
  const error = url.searchParams.get('error');
  const errorDescription = url.searchParams.get('error_description');

  // 构建回调页面 HTML
  let html = '';

  if (error) {
    html = `
<!DOCTYPE html>
<html>
<head>
  <meta charset="UTF-8">
  <title>授权失败</title>
  <style>
    body { font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif; display: flex; justify-content: center; align-items: center; min-height: 100vh; margin: 0; background: #f5f5f5; }
    .card { background: white; padding: 40px; border-radius: 12px; box-shadow: 0 2px 12px rgba(0,0,0,0.1); text-align: center; max-width: 400px; }
    .error { color: #f56c6c; font-size: 48px; margin-bottom: 16px; }
    h2 { margin: 0 0 12px; color: #333; }
    p { color: #666; margin: 0 0 24px; }
    button { background: #409eff; color: white; border: none; padding: 12px 32px; border-radius: 6px; cursor: pointer; font-size: 14px; }
    button:hover { background: #66b1ff; }
  </style>
</head>
<body>
  <div class="card">
    <div class="error">✕</div>
    <h2>授权失败</h2>
    <p>${errorDescription || error}</p>
    <button onclick="window.close()">关闭窗口</button>
  </div>
</body>
</html>`;
  } else if (!code) {
    html = `
<!DOCTYPE html>
<html>
<head>
  <meta charset="UTF-8">
  <title>授权失败</title>
  <style>
    body { font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif; display: flex; justify-content: center; align-items: center; min-height: 100vh; margin: 0; background: #f5f5f5; }
    .card { background: white; padding: 40px; border-radius: 12px; box-shadow: 0 2px 12px rgba(0,0,0,0.1); text-align: center; max-width: 400px; }
    .error { color: #f56c6c; font-size: 48px; margin-bottom: 16px; }
    h2 { margin: 0 0 12px; color: #333; }
    p { color: #666; margin: 0 0 24px; }
    button { background: #409eff; color: white; border: none; padding: 12px 32px; border-radius: 6px; cursor: pointer; font-size: 14px; }
    button:hover { background: #66b1ff; }
  </style>
</head>
<body>
  <div class="card">
    <div class="error">✕</div>
    <h2>授权失败</h2>
    <p>未收到授权码，请重试</p>
    <button onclick="window.close()">关闭窗口</button>
  </div>
</body>
</html>`;
  } else {
    // 成功获取 code，返回给前端处理
    html = `
<!DOCTYPE html>
<html>
<head>
  <meta charset="UTF-8">
  <title>授权成功</title>
  <style>
    body { font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif; display: flex; justify-content: center; align-items: center; min-height: 100vh; margin: 0; background: #f5f5f5; }
    .card { background: white; padding: 40px; border-radius: 12px; box-shadow: 0 2px 12px rgba(0,0,0,0.1); text-align: center; max-width: 400px; }
    .success { color: #67c23a; font-size: 48px; margin-bottom: 16px; }
    h2 { margin: 0 0 12px; color: #333; }
    p { color: #666; margin: 0 0 24px; }
  </style>
</head>
<body>
  <div class="card">
    <div class="success">✓</div>
    <h2>授权成功</h2>
    <p>正在获取访问令牌...</p>
  </div>
  <script>
    // 将 code 和 state 传递给父窗口
    if (window.opener) {
      window.opener.postMessage({
        type: 'coze-oauth-callback',
        code: '${code}',
        state: '${state}'
      }, '*');
    }
    // 3秒后自动关闭
    setTimeout(() => window.close(), 3000);
  </script>
</body>
</html>`;
  }

  return new Response(html, {
    status: 200,
    headers: { 'Content-Type': 'text/html; charset=utf-8' },
  });
}
