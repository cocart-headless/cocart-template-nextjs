import { getPosts } from "@/lib/wordpress";
import { PostCard } from "@/components/posts/post-card";

export const metadata = { title: "Blog" };

export default async function PostsPage() {
  const { posts } = await getPosts(1, 12).catch(() => ({ posts: [], total: 0, totalPages: 1 }));

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-8">Blog</h1>

      {posts.length === 0 ? (
        <p className="text-muted-foreground">No posts found.</p>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {posts.map((post) => (
            <PostCard key={post.id} post={post} />
          ))}
        </div>
      )}
    </div>
  );
}
