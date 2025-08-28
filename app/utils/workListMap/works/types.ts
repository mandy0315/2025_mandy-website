export interface WorkItem {
  id: string;
  category: "ui" | "vision" | "web";
  type: "commercial" | "personal";
  title: string;
  description: string;
  link: string | null;
  image: string | null;
  client: string | null;
  skills: string[];
  date: number | null;
  status: "completed" | "pending";
}
