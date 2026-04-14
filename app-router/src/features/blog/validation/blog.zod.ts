import { z } from "zod"

export const blogSchema = z.object({
  title: z.string().min(1, "Title is required").max(200, "Title too long"),
  content: z.string().min(1, "Content is required"),
  image: z.string().url("Must be a valid URL").optional().or(z.literal("")),
})

export type BlogInput = z.infer<typeof blogSchema>
