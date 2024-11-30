// 使用相对路径加载 crypto-js 库

const CRYPTO_JS_URL = 'https://d5fc8f86b30b610f0c6d385bb727f577.r2.cloudflarestorage.com/crypto-js/assets/crypto-js.js';
async function loadCryptoJs() {
  const response = await fetch(CRYPTO_JS_URL);
  const cryptoJsScript = await response.text();
  eval(cryptoJsScript);
}
// 解密函数，使用 AES-CFB 模式
function decryptDataWithCryptoJS(encryptedDataHex, keyHex, ivHex) {
  const encryptedData = CryptoJS.enc.Hex.parse(encryptedDataHex);
  const key = CryptoJS.enc.Hex.parse(keyHex);
  const iv = CryptoJS.enc.Hex.parse(ivHex);

  // 使用 AES-CFB 解密
  const decrypted = CryptoJS.AES.decrypt(
    { ciphertext: encryptedData },
    key,
    { iv: iv, mode: CryptoJS.mode.CFB }
  );

  // 返回解密后的文本
  const decryptedText = decrypted.toString(CryptoJS.enc.Utf8);
  return decryptedText;
}

// 监听 HTTP 请求
addEventListener('fetch'，event => {
  event.respondWith(handleRequest(event.request));
});

async function handleRequest(request) {
    await loadCryptoJs();
  // 假设这是你的加密数据和密钥
  const encryptedData = '4265a9c353cd8624fd2bc7b5d75d2f18b1b5e66ccd37e2dfa628bcb8f73db2f14ba98bc6a1d8d0d1c7ff1ef0823b11264d0addaba2bd6a30bdefe06f4ba994ed';
  const key = '65151f8d966bf596';  // 密钥（16 字节）
  const iv = '88ca0f0ea1ecf975';  // 初始化向量（16 字节）

  // 解密操作
  const decryptedData = decryptDataWithCryptoJS(encryptedData, key, iv);

  // 返回解密后的数据作为 HTTP 响应
  return new Response(decryptedData, { status: 200 });
}
