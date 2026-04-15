---
title: 設定Gemini免費API
description: 使用 Google Gemini API 在 Claude Code 項目中集成 AI 功能
tags: 
  - gemini
  - google-ai
  - api
created: 2026-04-15
status: active
---

# 06-設定Gemini免費API

使用 Google Gemini API 在 Claude Code 項目中集成先進的 AI 功能。

## 什麼是 Gemini API？

Google Gemini 是 Google 最新的多模態 AI 模型，可以：
- 處理文本、圖像和音頻
- 快速響應
- 免費額度可用

## 前置條件

- Google 帳號
- Claude Code 已安裝

## 設定步驟

### 1. 建立 Google Cloud 專案

1. 訪問 [Google Cloud Console](https://console.cloud.google.com)
2. 建立新專案
3. 專案名稱：`Claude Code Gemini`

### 2. 啟用 Gemini API

1. 在 Cloud Console 搜尋 "Generative Language API"
2. 點擊 "Enable"
3. 等待 API 啟用

### 3. 建立 API 金鑰

1. 前往 "Credentials"
2. 點擊 "Create Credentials" → "API Key"
3. 複製生成的 API 金鑰

### 4. 設定環境變數

建立 `.env.local` 檔案：

```env
GEMINI_API_KEY=your_api_key_here
```

### 5. 安裝 SDK

```bash
npm install @google/generative-ai
```

## 基本使用

### 初始化客戶端

```javascript
import { GoogleGenerativeAI } from "@google/generative-ai";

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);
const model = genAI.getGenerativeModel({ model: "gemini-pro" });
```

### 生成文本

```javascript
const result = await model.generateContent("你好，請介紹一下自己");
console.log(result.response.text());
```

## 免費配額

Gemini API 提供免費額度：
- **文本生成**：每分鐘 60 個請求
- **圖像分析**：每天 1000 次調用
- **無限制期間**：2026 年底前

## 常見問題

### Q: 如何監控 API 使用情況？

在 Google Cloud Console 的 "Quotas" 頁面查看。

### Q: 我超過免費額度怎麼辦？

設定計費警告：
1. Cloud Console → Billing
2. 設定預算警報

### Q: Gemini 支援哪些語言？

Gemini 支援 100+ 種語言，包括繁體中文。

## 進階功能

### 多模態輸入（文字 + 圖像）

```javascript
const image = { 
  inlineData: { 
    data: base64ImageData, 
    mimeType: "image/jpeg" 
  } 
};
const result = await model.generateContent([
  "分析這張圖片",
  image
]);
```

### Streaming 模式

```javascript
const stream = await model.generateContentStream("寫一篇文章");
for await (const chunk of stream.stream) {
  process.stdout.write(chunk.text());
}
```
