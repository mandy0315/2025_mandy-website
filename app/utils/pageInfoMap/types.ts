/**
 * 頁面資訊 Map 結構
 */
export interface PageInfoMap {
  path: string;
  title: string;
  name: string;
  childrens?: {
    [key: string]: {
      path: string;
      title: string;
      name: string;
    };
  };
}
