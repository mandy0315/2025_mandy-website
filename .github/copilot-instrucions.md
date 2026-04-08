# Mandy 個人網站的 Copilot 指示

## 專案概述
這是一個 Nuxt 4 SSG 個人網站，包含部落格、筆記和作品頁面。專案使用 Vue 3 Composition API、TypeScript 和 Tailwind CSS 樣式進行開發。

## 前提條件
- 請使用中文回答
- 進行大規模更動，超過 200 行，請先提出更動計畫文件

## 技術堆疊
- 框架 Nuxt 4(SSG)
- 套件管理 pnpm
- 樣式 TailwindCSS 4
- 語法 Vue 3 
- 狀態管理 Pinia
- 型別檢查 Typescript 嚴格模式
- 工具套件 VueUse
- 建置工具 Vite
- 測試 Vue test utils + Vitest

## 專案結構
- `app/components/`：按功能分類組織
  - `App/` - 應用程式層級元件（Header、Footer、Menu 等全域元件）
  - `Base/` - 基礎可重用元件（Button、Link、Title 等通用元件）
  - `Post/` - 部落格相關功能元件（Card、Detail 等）
  - `Work/` - 作品集相關元件
  - `Home/` - 首頁專用元件
  - `Icon/` - 圖示元件
- `app/composables/`：共用的響應式邏輯
- `app/utils/`：共用的工具
- `app/layouts/`：頁面佈局
- `app/pages/`：基於檔案的頁面路由
- `content/`：Markdown 內容（blog/、notes/、works/）
- `public/`：靜態資源

## 檔案命名
- Components：使用 PascalCase（如 `PostCard.vue`、`BaseButton.vue`）
- Composables：使用 camelCase 並以 `use` 開頭（如 `usePageLoading.ts`）
- Utils：使用 camelCase（如 `formatText.ts`、`assetPath.ts`）
- Content：使用 kebab-case 搭配排序數字（如 `1.how-this-project-was-planned.md`）

## 指引

### 元件指引
- 使用 Vue 3 Composition API 搭配 `<script setup>`
- 所有元件都使用 TypeScript 並具備適當的類型定義
- Props 應使用 `withDefaults` 和 `defineProps` 搭配 TypeScript 介面
- 使用 `computed()` 處理響應式衍生狀態
- 優先使用具名匯入而非預設匯入
```vue
<script setup lang="ts">
// 匯入區塊
// Props 和 emits 定義
// Composables 和響應式狀態
// 計算屬性
// 方法
</script>

<template>
  <!-- 使用 Tailwind classes 的模板 -->
</template>
```

### 樣式指引
- 優先使用 Tailwind 工具類別
- 自定義 CSS 類別應保持最少且語義化
- 響應式設計：採用 mobile-first 方法搭配 `lg:` 斷點
- 使用 CSS Grid 進行佈局（`grid-cols-1`、`lg:grid-cols-7`）
- 色彩配置：支援深色模式，使用 `dark:` 暗黑模式

### 型別指引
- **Props 和複雜型別**：使用 `type`（聯合、條件、映射型別等）
- **資料結構和 API 回應**：使用 `interface`（物件結構更清晰，支援擴展）
- 使用泛型增加型別安全性
- 避免使用 `any`，必要時使用 `unknown`
```typescript
// Props 型別定義（使用 type）
type PostCardProps = {
  path: string
  title: string
  date: string
  category?: string
}

// API 回應資料結構（使用 interface）
interface BlogPost {
  id: string
  title: string
  content: string
  publishedAt: Date
}

interface ApiResponse<T> {
  data: T
  status: number
  message: string
}

// 聯合型別（type 的優勢）
type Status = 'loading' | 'success' | 'error'

// 條件型別（type 的優勢）
type ResponseData<T> = T extends string ? { message: T } : { result: T }
```

### Composables 指引  
- 位於 `app/composables/` 目錄
- 以 `use` 前綴命名
- 回傳響應式狀態和方法
```typescript
export const useCounter = () => {
  const count = ref(0)
  
  const increment = () => count.value++
  const decrement = () => count.value--
  
  return {
    count,
    increment,
    decrement
  }
}
```


## 內容管理

### 部落格文章（content/blog/）
- 使用包含 frontmatter 的 Markdown 檔案
- 檔案名稱加上編號以按時間順序排列
- 檔案裡結構以下
```markdown
---
title: '這個專案怎麼規劃的?【0】'
description: '2020 我的個人網站產生後，經歷 5 年再度回歸初心重新來過，並結合 Blog 與這些年累積技術，這篇文章就來說為何重做？這次做了什麼規劃、技術。'
category: 'Nuxt 個人網站實戰紀錄'
tags: ['Nuxt']
navigation: true
image: /images/posts/個人網站實戰紀錄.jpg
date: 2026-01-13
---
## 回到過去～為什麼會想「重做」而不是「改版」
當我開啟 2020 個人專案，
```

### 筆記（content/notes/）
- 結構與部落格文章一樣
- 專注於技術知識和學習內容

### 作品/作品集（content/works/）
- 使用包含專案中繼資料的 JSON 檔案
- 檔案裡結構以下
```json
{
  "category": "vision",
  "type": "commercial",
  "title": "PChome FB 行銷廣告",
  "description": "廣告偏向生活類商品，商品去背、精修與比例優化，提升整體視覺清晰度；價格資訊透過配色與尺寸強化吸睛效果，並結合具廣告主題性的標題設計。",
  "link": null,
  "image": "/images/works/vision/pchomeBanners.jpg",
  "client": "PChome",
  "skills": [
    "Photoshop"
  ],
  "date": null,
  "status": "completed"
}
```

## 常用模式與最佳實務

### 頁面結構
- 使用 `definePageMeta()` 設定頁面中繼資料
- 使用 `useSeoMeta()` 處理 SEO
- 錯誤處理使用 `throw createError()`
```typescript
definePageMeta({
  layout: 'post'
})

useSeoMeta({
  title: '頁面標題',
  ogDescription: '頁面描述'
})
```

### 響應式設計模式
- 圖片長寬比：`aspect-video` (16:9)、`aspect-square` (1:1)
- 懸停效果：`group` 搭配 `group-hover:`
- 載入狀態：使用 `BaseHoverMask` 元件
- 文字截斷：`line-clamp-2`、`line-clamp-3`

### 資源處理
- 使用 `getAssetPath()` 處理圖片路徑
- 靜態資源放在 `public/` 目錄
- 圖片應包含 `alt` 屬性以符合無障礙標準

## 開發流程建議

### 新增功能時
1. 確認是基礎元件還是功能特定元件
2. 建立適當的 TypeScript 型別定義
3. 考慮響應式設計需求
4. 加入適當的錯誤和載入狀態
5. 遵循現有的命名和組織模式
6. 撰寫相應的測試案例
