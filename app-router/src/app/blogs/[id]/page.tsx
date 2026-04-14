import { notFound } from "next/navigation";
import BlogPageContent from "@/features/blog/components/BlogPageContent";
import { getBlogById } from "@/features/blog/data/get-blog-by-id";

export const revalidate = 0;

export default async function BlogPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;

  const blog = await getBlogById(id);

  if (!blog) {
    notFound();
  }

  return (
    <div className="min-h-screen bg-bg-primary py-8">
      <BlogPageContent blog={blog as any} />
    </div>
  );
}
