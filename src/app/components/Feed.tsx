// src/app/components/Feed.tsx
'use client';

import PostCard from "./PostCard";

interface PostData {
    id: string;
    image: string;
    title: string;
    subreddit: string;
    description: string;
    author: string;
    timestamp: string;
    upvotes: number;
    downvotes: number;
    comments: number;
    subredditIcon?: string;
}

const posts: PostData[] = [
    {
        id: '1',
        image: "/images/closedphoto.jpeg", // Updated to absolute path
        title: "The Beauty of Sujood: A Moment of Closeness to Allah",
        subreddit: "Islam",
        description: "Reflecting on the serenity and humility found in prostration during Salah, a moment to connect deeply with Allah.",
        author: "MuslimSeeker",
        timestamp: "2 hours ago",
        upvotes: 1234,
        downvotes: 50,
        comments: 215,
        subredditIcon: "/images/profile1.jpg", // Updated to absolute path
    },
    {
        id: '2',
        image: "/images/hadis.jpeg",
        title: "Hadith of the Day: Kindness to Others",
        subreddit: "Hadith",
        description: "The Prophet (PBUH) said: 'The best of you are those who are best to their families.' (Tirmidhi)",
        author: "HadithLover",
        timestamp: "5 hours ago",
        upvotes: 876,
        downvotes: 300,
        comments: 450,
        subredditIcon: "/images/rmdp.jpg",
    },
    {
        id: '3',
        image: "/images/rmd.jpg", // Updated to absolute path
        title: "Ramadan Preparation Tips for 2026",
        subreddit: "Islam",
        description: "Start preparing your heart and mind for Ramadan with these practical tips for spiritual growth.",
        author: "FastingGuide",
        timestamp: "1 day ago",
        upvotes: 567,
        downvotes: 120,
        comments: 180,
          subredditIcon: "/images/rmdp.jpg",
    },
    {
        id: '4',
        image: "/images/virtu.jpg", // Will handle empty image below
        title: "Virtues of Surah Al-Kahf on Fridays",
        subreddit: "Quran",
        description: "Recite Surah Al-Kahf every Friday to be protected from the trials of Dajjal, as taught by the Prophet (PBUH).",
        author: "QuranicWisdom",
        timestamp: "3 days ago",
        upvotes: 2100,
        downvotes: 80,
        comments: 320,
        subredditIcon: "/images/virtu.jpg",
    },
];

const Feed = () => (
    <main
        className="flex flex-col items-center w-full min-h-screen overflow-y-auto bg-gray-100 py-4 px-2 sm:px-4 md:px-6 lg:px-8 xl:px-12"
    >
        <div className="w-full max-w-full sm:max-w-lg md:max-w-xl lg:max-w-2xl xl:max-w-3xl space-y-4">
            {posts.map((post) => (
                <div key={post.id} className="w-full">
                    <PostCard
                        id={post.id}
                        image={post.image}
                        title={post.title}
                        subreddit={post.subreddit}
                        description={post.description}
                        author={post.author}
                        timestamp={post.timestamp}
                        upvotes={post.upvotes}
                        downvotes={post.downvotes}
                        comments={post.comments}
                        subredditIcon={post.subredditIcon}
                    />
                </div>
            ))}
        </div>
    </main>
);

export default Feed;