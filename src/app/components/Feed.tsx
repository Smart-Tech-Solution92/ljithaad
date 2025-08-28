'use client';

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
  subredditIcon?: string | null;
}

const subreddits = ["islam", "Muslim", "quran"];

const Feed = () => {
  const [posts, setPosts] = useState<PostData[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchPosts() {
      try {
        const allPosts: PostData[] = [];

        for (const sub of subreddits) {
          const res = await fetch(
            `https://corsproxy.io/?https://www.reddit.com/r/${sub}/hot.json?limit=5`
          );

          if (!res.ok) throw new Error(`HTTP ${res.status}`);
          const json = await res.json();

          const subredditPosts = json.data.children.map((p: any) => {
            const d = p.data;

            // pick image (either preview or url)
            let image: string | null = null;
            if (d.preview?.images?.[0]?.source?.url) {
              image = d.preview.images[0].source.url.replace(/&amp;/g, "&");
            } else if (
              d.url_overridden_by_dest?.match(/\.(jpg|jpeg|png|gif)$/i)
            ) {
              image = d.url_overridden_by_dest;
            }

            return {
              id: d.id,
              title: d.title,
              subreddit: d.subreddit,
              description: d.selftext?.slice(0, 200) || "",
              author: d.author,
              timestamp: new Date(d.created_utc * 1000).toLocaleString(),
              upvotes: d.ups,
              comments: d.num_comments,
              image,
              subredditIcon:
                d.icon_img ||
                d.community_icon?.split("?")[0] ||
                "https://www.redditstatic.com/desktop2x/img/favicon/android-icon-192x192.png",
            } as PostData;
          });

          allPosts.push(...subredditPosts);
        }

        setPosts(allPosts);
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
