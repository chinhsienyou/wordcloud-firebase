---
title: 安裝本地AI-Ollama
description: 在本地運行開源 AI 模型
tags: 
  - ollama
  - ai
  - local-llm
created: 2026-04-15
status: active
---

# 05-安裝本地AI-Ollama

在本地運行開源 AI 模型，無需依賴雲端服務。

## 什麼是 Ollama？

Ollama 讓你：
- 在本地運行大語言模型
- 完全隱私保護
- 無需付款
- 支援多個模型

## 安裝步驟

### 1. 下載 Ollama

訪問 [ollama.ai](https://ollama.ai) 下載適合你系統的版本。

### 2. 安裝（macOS）

```bash
# 使用 Homebrew 安裝
brew install ollama

# 驗證安裝
ollama --version
```

### 3. 下載模型

```bash
# 下載 Llama 2 模型（7B 參數）
ollama pull llama2

# 下載 Mistral 模型（更輕量級）
ollama pull mistral

# 列出已安裝的模型
ollama list
```

## 使用方法

### 啟動 Ollama 服務

```bash
ollama serve
```

服務將在 `http://localhost:11434` 運行。

### 與 Claude Code 整合

在你的項目中使用 Ollama API：

```bash
curl http://localhost:11434/api/generate -d '{
  "model": "llama2",
  "prompt": "你好世界"
}'
```

## 常見問題

### Q: 模型下載很慢怎麼辦？

Ollama 會自動繼續下載。如果中斷，再次運行相同命令即可恢復。

### Q: 我的電腦配置不夠怎麼辦？

推薦使用：
- CPU：4 核心以上
- RAM：8GB 以上
- 磁碟空間：30GB 以上（用於模型存儲）

### Q: 哪個模型最適合初學者？

**Mistral** 是很好的起點，速度快且資源佔用少。

## 推薦模型

| 模型 | 大小 | 速度 | 質量 |
|------|------|------|------|
| Mistral | 7B | ⭐⭐⭐⭐⭐ | ⭐⭐⭐⭐ |
| Llama 2 | 7B/13B | ⭐⭐⭐⭐ | ⭐⭐⭐⭐ |
| Neural Chat | 7B | ⭐⭐⭐⭐ | ⭐⭐⭐ |
