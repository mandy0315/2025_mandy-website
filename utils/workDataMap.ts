import UIData from "@/public/json/works/ui.json";
import VisionData from "@/public/json/works/vision.json";
import WebData from "@/public/json/works/web.json";

type WorkDataKeys = "ui" | "vision" | "web";
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

export const workDataMap = new Map<WorkDataKeys, WorkItem[]>([
  ["ui", UIData],
  ["vision", VisionData],
  ["web", WebData],
]);
