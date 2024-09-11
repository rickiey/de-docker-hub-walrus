import * as fs from 'fs';
import fetch from 'node-fetch';

// 上传文件函数
async function uploadFile(filePath: string, url: string) {
  try {
    // 读取文件内容
    const fileContent = fs.readFileSync(filePath, 'utf8');

    // 发送 PUT 请求
    const response = await fetch(url, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: fileContent,
    });

    if (response.ok) {
      console.log(`文件上传成功: ${response} ${await response.json()}`);
    } else {
      console.error(`文件上传失败: ${response.status} - ${response.statusText}`);
    }
  } catch (error) {
    console.error(`发生错误: ${error}`);
  }
}

// 示例调用
const filePath = './pnpm-lock.yaml';  // 本地文件路径
const url = 'https://publisher-devnet.walrus.space/v1/store';            // 上传的URL

uploadFile(filePath, url);
