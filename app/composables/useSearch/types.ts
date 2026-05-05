/**
 * 文章資料結構
 */
export interface PostItem {
  title: string;
  description: string;
  path: string;
}

/**
 * 頁面資料結構
 */
export interface PageItem {
  title: string;
  path: string;
}

/**
 * 作品資料結構
 */
export interface WorkItem {
  title: string;
  path: string;
  category: "vision" | "ui" | "web";
}
