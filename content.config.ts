import { defineCollection, defineContentConfig, z } from "@nuxt/content";

export default defineContentConfig({
  collections: {
    blog: defineCollection({
      source: "blog/*.md",
      type: "page",
      schema: z.object({
        title: z.string(),
        description: z.string(),
        categories: z.array(z.string()),
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
        categories: z.array(z.string()),
        navigation: z.boolean(),
        image: z.string(),
        date: z.string(),
      }),
    }),
  },
});
