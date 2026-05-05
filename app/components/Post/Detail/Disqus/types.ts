/**
 * Disqus 單一頁面資訊
 */
export interface DisqusPage {
  identifier: string;
  url: string;
  title: string;
}

/**
 * Disqus 重設設定
 */
export interface DisqusResetConfig {
  reload: boolean;
  config: () => void;
}

/**
 * Disqus 實例
 */
export interface DisqusInstance {
  reset: (config: DisqusResetConfig) => void;
}

/**
 * Disqus 設定
 */
export interface DisqusConfig {
  page: DisqusPage;
  callbacks: DisqusPage;
}
