import { cache } from "react";
import prisma from "@/lib/db";

export const getAllBlogs = cache(async () => {
  return prisma.blog.findMany({
    include: {
      author: {
        select: {
          id: true,
          name: true,
          image: true,
        },
      },
    },
    orderBy: { createdAt: "desc" },
  });
});

export type GetAllBlogs = Awaited<ReturnType<typeof getAllBlogs>>;
