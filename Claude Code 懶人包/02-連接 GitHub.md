---
title: 連接 GitHub
description: 在 Claude Code 中設定 GitHub 認證和操作
tags: 
  - github
  - version-control
  - git
created: 2026-04-15
status: active
---

# 02-連接 GitHub

在 Claude Code 中設定 GitHub 認證和操作。

## 前置條件

- GitHub 帳號
- Git 已安裝
- Claude Code 已安裝

## 認證方式

### 1. 使用 SSH 金鑰（推薦）

#### 生成 SSH 金鑰

```bash
ssh-keygen -t ed25519 -C "your_email@example.com"
```

#### 複製公鑰到 GitHub

```bash
cat ~/.ssh/id_ed25519.pub
```

然後：
1. 登入 GitHub
2. 進入 Settings → SSH and GPG keys
3. 點擊 "New SSH key"
4. 貼上複製的公鑰

#### 測試連接

```bash
ssh -T git@github.com
```

### 2. 使用個人存取令牌 (Personal Access Token)

1. 登入 GitHub
2. Settings → Developer settings → Personal access tokens
3. 生成新的 token（需要 `repo` 權限）
4. 在 Claude Code 中使用：

```bash
gh auth login
```

## 常用 GitHub 命令

```bash
# 查看目前狀態
gh status

# 建立新的 Issue
gh issue create --title "Issue 標題" --body "Issue 說明"

# 建立 Pull Request
gh pr create --title "PR 標題" --body "PR 說明"

# 查看 PR
gh pr view <PR_NUMBER>
```

## 常見問題

### Q: SSH 連接失敗

檢查 SSH 金鑰權限：
```bash
chmod 600 ~/.ssh/id_ed25519
chmod 644 ~/.ssh/id_ed25519.pub
```

### Q: 如何清除 GitHub 認證？

```bash
gh auth logout
```
