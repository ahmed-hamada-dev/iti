import BlogList from "@/features/blog/components/BlogList";
import { getAllBlogs } from "@/features/blog/data/get-all-blogs";

export const revalidate = 360;

export default async function BlogsPage() {
  const blogs = await getAllBlogs();

  return (
    <div className="min-h-screen bg-bg-primary">
      <BlogList blogs={blogs} />
    </div>
  );
}
