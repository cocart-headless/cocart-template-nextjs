import Link from "next/link";
import Image from "next/image";
import type { Post } from "@/lib/wordpress.d";
import { Card, CardContent, CardHeader } from "@/components/ui/card";

interface PostCardProps {
  post: Post;
}

export function PostCard({ post }: PostCardProps) {
  const featuredMedia = post._embedded?.["wp:featuredmedia"]?.[0];
  const author = post._embedded?.author?.[0];
  const date = new Date(post.date).toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });

  return (
    <Card className="overflow-hidden group">
      <Link href={`/posts/${post.slug}`}>
        {featuredMedia && (
          <div className="relative aspect-video overflow-hidden">
            <Image
              src={featuredMedia.source_url}
              alt={featuredMedia.alt_text || post.title.rendered}
              fill
              className="object-cover transition-transform group-hover:scale-105"
              sizes="(max-width: 768px) 100vw, 50vw"
            />
          </div>
        )}
      </Link>

      <CardHeader className="pb-2">
        <Link href={`/posts/${post.slug}`}>
          <h2
            className="font-semibold text-lg leading-tight hover:underline line-clamp-2"
            dangerouslySetInnerHTML={{ __html: post.title.rendered }}
          />
        </Link>
        <p className="text-sm text-muted-foreground">
          {author?.name && <span>{author.name} · </span>}
          {date}
        </p>
      </CardHeader>

      <CardContent>
        <div
          className="text-sm text-muted-foreground line-clamp-3"
          dangerouslySetInnerHTML={{ __html: post.excerpt.rendered }}
        />
      </CardContent>
    </Card>
  );
}
