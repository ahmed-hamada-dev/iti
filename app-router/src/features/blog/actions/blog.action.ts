"use server";

import prisma from "@/lib/db";
import { revalidatePath } from "next/cache";
import { blogSchema, BlogInput } from "../validation/blog.zod";
import { Blog } from "@prisma/client";
import { APIResponse } from "@/types/api";
import { requireAuth } from "@/lib/requireAuth";

export async function createBlog(input: BlogInput): Promise<APIResponse<Blog>> {
  const session = await requireAuth();

  const result = blogSchema.safeParse(input);
  if (!result.success) {
    return { success: false, message: result.error.issues[0].message };
  }

  try {
    const blog = await prisma.blog.create({
      data: {
        title: result.data.title,
        content: result.data.content,
        image: result.data.image,
        authorId: session.user.id,
      },
    });

    revalidatePath("/blogs");
    return {
      success: true,
      data: blog,
      message: "Blog created successfully",
    };
  } catch (error) {
    return { success: false, message: "Failed to create blog" };
  }
}

export async function updateBlog(
  id: string,
  input: BlogInput,
): Promise<APIResponse<Blog>> {
  const session = await requireAuth();

  const result = blogSchema.safeParse(input);
  if (!result.success) {
    return { success: false, message: result.error.issues[0].message };
  }

  try {
    const blog = await prisma.blog.findUnique({ where: { id } });
    if (!blog) {
      return { success: false, message: "Blog not found" };
    }

    if (blog.authorId !== session.user.id) {
      return { success: false, message: "Forbidden" };
    }

    const updatedBlog = await prisma.blog.update({
      where: { id },
      data: {
        title: result.data.title,
        content: result.data.content,
        image: result.data.image,
      },
    });

    revalidatePath("/blogs");
    revalidatePath(`/blogs/${id}`);
    return {
      success: true,
      data: updatedBlog,
      message: "Blog updated successfully",
    };
  } catch (error) {
    return { success: false, message: "Failed to update blog" };
  }
}

export async function deleteBlog(id: string): Promise<APIResponse> {
  const session = await requireAuth();

  try {
    const blog = await prisma.blog.findUnique({ where: { id } });
    if (!blog) {
      return { success: false, message: "Blog not found" };
    }

    if (blog.authorId !== session.user.id) {
      return { success: false, message: "Forbidden" };
    }

    await prisma.blog.delete({ where: { id } });

    revalidatePath("/blogs");
    return { success: true, message: "Blog deleted successfully" };
  } catch (error) {
    return { success: false, message: "Failed to delete blog" };
  }
}
