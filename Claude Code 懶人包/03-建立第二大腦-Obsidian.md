---
title: 建立第二大腦-Obsidian
description: 使用 Obsidian 建立個人知識管理系統
tags: 
  - obsidian
  - pkm
  - knowledge-management
created: 2026-04-15
status: active
---

# 03-建立第二大腦-Obsidian

使用 Obsidian 建立個人知識管理系統，與 Claude Code 深度整合。

## 什麼是 Obsidian？

Obsidian 是一個本地知識庫應用，特點：
- 完全本地存儲（私隱安全）
- 雙向連結（創建知識網絡）
- 強大的外掛生態
- 支援 Markdown

## 安裝步驟

### 1. 下載 Obsidian

訪問 [obsidian.md](https://obsidian.md) 下載適合你系統的版本。

### 2. 建立 Vault（保險庫）

1. 開啟 Obsidian
2. 選擇 "Create new vault"
3. 輸入 Vault 名稱（如：`Claude Code 懶人包`）
4. 選擇存儲位置

### 3. 啟用推薦外掛

進入 Settings → Community plugins，搜尋並安裝：
- **Dataview** - 動態資料查詢
- **Obsidian Git** - 版本控制
- **Quick Capture** - 快速筆記
- **Templater** - 筆記模板

## 基礎使用

### 建立筆記

使用 `Ctrl+N` 或 `Cmd+N` 快速建立新筆記。

### 雙向連結

```markdown
[[筆記名稱]] - 建立指向其他筆記的連結
```

### 標籤

```markdown
#標籤名稱 - 為筆記加上分類標籤
```

## 與 Claude Code 整合

1. 在 Claude Code 中使用 NotebookLM MCP
2. 在 Obsidian 中存儲研究筆記
3. 透過 Obsidian Git 同步到 GitHub

## 常見問題

### Q: 如何備份 Vault？

最簡單的方式是使用 Obsidian Git 外掛定期提交到 GitHub。

### Q: 我可以在多個設備上使用同一個 Vault 嗎？

是的，可以透過 iCloud、Dropbox 或 Obsidian Sync 服務同步。
