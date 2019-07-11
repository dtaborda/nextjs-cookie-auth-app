export const arrayBufferToBase64 = async (buffer: any) => {
  let binary = '';
  const buf = await buffer.arrayBuffer();
  const bytes = [].slice.call(new Uint8Array(buf));
  bytes.forEach((b:any) => binary += String.fromCharCode(b));
  const btoa = require('btoa');
  return btoa(binary);
  // if (!process.browser) {
  //   const btoa = require('btoa');
  //   return btoa(binary);
  // }
  // return window.btoa(binary);
};

export const base64Flag = 'data:image/jpeg;base64,';
