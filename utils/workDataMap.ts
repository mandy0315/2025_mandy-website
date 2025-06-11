import UIData from "@/public/json/works/ui.json";
import VisionData from "@/public/json/works/vision.json";
import WebData from "@/public/json/works/web.json";

type WorkDataKeys = "ui" | "vision" | "web";

export const workDataMap = new Map<WorkDataKeys, any>([
  ["ui", UIData],
  ["vision", VisionData],
  ["web", WebData],
]);
