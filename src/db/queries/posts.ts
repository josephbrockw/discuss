import type { Post } from "@prisma/client";
import { db } from "@/db";

export type PostWithData = (
  Post & {
    user: { name: string | null; };
    topic: { slug: string; };
    _count: { comments: number; };
  }
)

export function fetchPostsByTopicSlug(topicSlug: string): Promise<PostWithData[]> {
  return db.post.findMany({
    where: { topic: { slug: topicSlug } },
    include: {
      topic: { select: { slug: true } },
      user: { select: { name: true } },
      _count: { select: { comments: true } },
    }
  });
}

export function fetchTopPosts(): Promise<PostWithData[]> {
  return db.post.findMany({
    orderBy: { comments: { _count: "desc" } },
    include: {
      topic: { select: { slug: true } },
      user: { select: { name: true, image: true } },
      _count: { select: { comments: true } },
    },
    take: 5,
  });
}
