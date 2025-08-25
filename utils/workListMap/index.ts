import { webList } from "./works/webList";
import { uiList } from "./works/uiList";
import { visionList } from "./works/visionList";
import type { WorkItem } from "./works/types";

export const workListGroup = new Map<string, WorkItem[]>([
  ["web", webList],
  ["ui", uiList],
  ["vision", visionList],
]);
