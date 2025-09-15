"use client";
import { useEffect, useState } from "react";
import PostCard from "./PostCard";

interface PostData {
  id: string;
  image: string | null;
  title: string;
  subreddit: string;
  description: string;
  author: string;
  timestamp: string;
  upvotes: number;
  comments: number;
  subredditIcon?: string | undefined;
}

const Feed = () => {
  const [posts, setPosts] = useState<PostData[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchPosts() {
      try {
        const res = await fetch("http://localhost:3000/api/post");
        if (!res.ok) throw new Error(`HTTP ${res.status}`);

        const json = await res.json();

        const mappedPosts: PostData[] = json.posts.map((p: any) => {
          return {
            id: p._id,
            title: p.title,
            subreddit: p.channelSlug,
            description: p.content?.slice(0, 200) || "",
            author: p.createdBy.username,
            timestamp: new Date(p.createdAt).toLocaleString(),
            upvotes: p.likes.length,
            comments: 0, 
            image: p.images?.[0] || null,
            subredditIcon:
              p.subredditIcon ||
              "https://www.redditstatic.com/desktop2x/img/favicon/android-icon-192x192.png",
          };
        });

        setPosts(mappedPosts);
      } catch (err) {
        console.error("Error fetching posts:", err);
      } finally {
        setLoading(false);
      }
    }

    fetchPosts();
  }, []);

  return (
    <main className="flex flex-col items-center w-full min-h-screen overflow-y-auto bg-gray-100 py-4 px-2 sm:px-4 md:px-6 lg:px-8 xl:px-12">
      <div className="w-full max-w-full sm:max-w-lg md:max-w-xl lg:max-w-2xl xl:max-w-3xl space-y-4">
        {loading ? (
          <p className="text-gray-600 text-center">Loading posts...</p>
        ) : posts.length > 0 ? (
          posts.map((post) => (
            <div key={post.id} className="w-full">
              <PostCard {...post} />
            </div>
          ))
        ) : (
          <p className="text-gray-600 text-center">No posts found.</p>
        )}
      </div>
    </main>
  );
};

export default Feed;
