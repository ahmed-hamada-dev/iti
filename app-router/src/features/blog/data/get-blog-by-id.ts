import { cache } from "react";
import prisma from "@/lib/db";

export const getBlogById = cache(async (id: string) => {
  return prisma.blog.findUnique({
    where: { id },
    include: {
      author: {
        select: {
          id: true,
          name: true,
          image: true,
        },
      },
    },
  });
});

export type GetBlogById = Awaited<ReturnType<typeof getBlogById>>;
