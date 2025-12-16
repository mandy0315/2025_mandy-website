import { defineCollection, defineContentConfig, z } from "@nuxt/content";

export default defineContentConfig({
  collections: {
    blog: defineCollection({
      source: "blog/*.md",
      type: "page",
      schema: z.object({
        title: z.string(),
        description: z.string(),
        category: z.string(),
        tags: z.array(z.string()),
        navigation: z.boolean(),
        image: z.string(),
        date: z.string(),
      }),
    }),
    notes: defineCollection({
      source: "notes/*.md",
      type: "page",
      schema: z.object({
        title: z.string(),
        description: z.string(),
        category: z.string(),
        tags: z.array(z.string()),
        navigation: z.boolean(),
        image: z.string(),
        date: z.string(),
      }),
    }),
    works: defineCollection({
      source: "works/*.json",
      type: "data",
      schema: z.object({
        id: z.string(),
        category: z.enum(["vision", "ui", "web"]),
        type: z.enum(["commercial", "personal"]),
        title: z.string(),
        description: z.string(),
        skills: z.array(z.string()),
        link: z.string().nullable(),
        image: z.string(),
        client: z.string().nullable(),
        date: z.string().nullable(),
        status: z.enum(["completed", "pending"]),
      }),
    }),
  },
});
