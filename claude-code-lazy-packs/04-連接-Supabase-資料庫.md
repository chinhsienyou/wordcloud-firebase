# 04-連接-Supabase-資料庫

在 Claude Code 項目中使用 Supabase 作為後端資料庫。

## 什麼是 Supabase？

Supabase 是開源的 Firebase 替代方案，提供：
- PostgreSQL 資料庫
- 即時資料庫同步
- 使用者認證
- Row Level Security (RLS)

## 前置條件

- Supabase 帳號（免費註冊：[supabase.com](https://supabase.com)）
- Node.js 和 npm

## 設定步驟

### 1. 建立新專案

1. 登入 Supabase 控制台
2. 點擊 "New project"
3. 輸入專案名稱和密碼
4. 選擇區域
5. 等待專案初始化

### 2. 取得連接資訊

在專案設定中找到：
- Project URL
- Anon Public Key
- Service Role Key

### 3. 在本地設定環境變數

建立 `.env.local` 檔案：

```env
SUPABASE_URL=your_project_url
SUPABASE_ANON_KEY=your_anon_key
```

### 4. 安裝 Supabase 客戶端

```bash
npm install @supabase/supabase-js
```

## 基本使用

### 連接到 Supabase

```javascript
import { createClient } from '@supabase/supabase-js'

const supabase = createClient(
  process.env.SUPABASE_URL,
  process.env.SUPABASE_ANON_KEY
)
```

### 執行查詢

```javascript
const { data, error } = await supabase
  .from('table_name')
  .select('*')
  .eq('id', 1)
```

## 常見問題

### Q: 如何重設 Anon Key？

在專案 Settings → API 中重新生成密鑰。

### Q: Supabase 免費方案的限制是什麼？

詳見 [Supabase 定價頁面](https://supabase.com/pricing)。
