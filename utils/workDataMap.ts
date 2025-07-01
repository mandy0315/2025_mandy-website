import UIData from "@/public/json/works/ui.json";
import VisionData from "@/public/json/works/vision.json";
import WebData from "@/public/json/works/web.json";

export const workCategories = ["ui", "vision", "web"] as const;
type WorkCategories = (typeof workCategories)[number];
export interface WorkItem {
  id: string;
  /** string="ui" | "vision" | "web" */
  category: string;
  /** string="commercial" | "personal" */
  type: string;
  title: string;
  description: string;
  link: string | null;
  image: string | null;
  client: string | null;
  skills: string[];
  date: number | null;
  /** string:"commercial" | "personal" */
  status: string;
}

export const workDataMap = new Map<WorkCategories, WorkItem[]>([
  ["web", WebData],
  ["ui", UIData],
  ["vision", VisionData],
]);
