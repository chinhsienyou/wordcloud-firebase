---
title: 連接 NotebookLM
description: 在 Claude Code 中整合 Google NotebookLM
tags: 
  - notebooklm
  - integration
  - ai-tools
created: 2026-04-15
status: active
---

# 01-連接 NotebookLM

在 Claude Code 中整合 Google NotebookLM，實現 AI 筆記與知識管理。

## 什麼是 NotebookLM？

NotebookLM 是 Google 的 AI 助手，可以幫助你：
- 整理和分析文件
- 自動生成摘要和筆記
- 進行多源資料查詢

## 前置條件

- 有效的 Google 帳號
- Claude Code 已安裝

## 連接步驟

### 1. 登入 NotebookLM

```bash
nlm login
```

### 2. 授權 Claude Code 存取

按照瀏覽器中的授權提示完成 OAuth 流程。

### 3. 建立第一個筆記本

在 NotebookLM 網站上建立新筆記本，或使用 CLI：

```bash
nlm notebook create "我的第一個筆記本"
```

## 常用命令

```bash
# 列出所有筆記本
nlm notebook list

# 查詢筆記本內容
nlm notebook query "查詢內容" --notebook-id <ID>

# 新增來源
nlm source add --notebook-id <ID> --url https://example.com
```

## 常見問題

### Q: 我忘記了我的 NotebookLM 密碼

請訪問 [Google 帳號恢復](https://accounts.google.com/signin/recovery)。

### Q: 如何切換 Google 帳號？

```bash
nlm login switch <profile-name>
```
