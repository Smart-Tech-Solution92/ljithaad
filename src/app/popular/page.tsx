'use client'; // This component uses client-side interactivity

import { ChevronDown, ExternalLink } from 'lucide-react';

interface NewsCard {
  title: string;
  subtitle: string;
  category: string;
  image: string;
  categoryIcon: string;
}

interface Post {
  id: string;
  category: string;
  username: string;
  timeAgo: string;
  content: string;
  link?: string;
  image?: string;
  categoryIcon: string;
}

// Hardcoded Data (updated for Islamic content)
const newsCards: NewsCard[] = [
  {
    title: 'New Fatwa Issued',
    subtitle: 'Scholars release guidance on modern financial transactions',
    category: 'Islamic News',
    image: '/images/hadis.jpeg',
    categoryIcon: '📰',
  },
  {
    title: 'Quran Recitation Event',
    subtitle: 'Global online event to recite Surah Al-Baqarah',
    category: 'Quran',
    image: '/quranrec.jpeg',
    categoryIcon: '📖',
  },
  {
    title: 'Hadis of the Day',
    subtitle: 'Reflection on the Prophet’s teachings on charity',
    category: 'Hadis',
    image: '/images/hadis.jpeg',
    categoryIcon: '✨',
  },
  {
    title: 'Islamic Finance Update',
    subtitle: 'New developments in Sharia-compliant banking',
    category: 'Islamic News',
    image: '/islamicfin.jpg',
    categoryIcon: '📰',
  },
];

const posts: Post[] = [
  {
    id: '1',
    category: 'Quran',
    username: 'u/QuranLover',
    timeAgo: '3 hr. ago',
    content:
      'Learned today that Surah Al-Fatiha is called the "Mother of the Quran" due to its comprehensive meaning. Reflect on its verses for daily guidance.',
    link: 'https://www.islamicinsights.org/quran-surah-al-fatiha/',
    image: '/quranlover.jpeg',
    categoryIcon: '📖',
  },
  {
    id: '2',
    category: 'Hadis',
    username: 'u/HadisSeeker',
    timeAgo: '4 hr. ago',
    content: 'Which Hadis inspires your daily acts of kindness?',
    image: '/hadisseeker.jpg',
    categoryIcon: '✨',
  },
];

const sidebarPost = {
  category: 'Islamic News',
  username: 'u/IslamicScholar',
  timeAgo: '2 days ago',
  content: 'Which Islamic principle guides your financial decisions?',
  image: '/islamicscolar.jpg',
};

export default function Component() {
  return (
    <div className="min-h-screen bg-gray-50">
      {/* News Cards Section - Horizontal Scroll */}
      <div className="bg-white border-b">
        <div className="max-w-7xl mx-auto px-2 sm:px-4 py-2 sm:py-4">
          <div className="flex overflow-x-auto snap-x gap-4 pb-4 hide-scrollbar">
            {newsCards.map((card, index) => (
              <div
                key={index}
                className="relative flex-shrink-0 cursor-pointer rounded-lg shadow-md hover:shadow-lg transition-shadow bg-white snap-center"
                style={{ width: '256px' }} // w-64 (256px) to fit ~4 cards on desktop
              >
                <div className="p-2 sm:p-4">
                  <div className="absolute inset-0 bg-black bg-opacity-40" />
                  <div className="relative text-white">
                    <h3 className="font-bold text-base sm:text-lg mb-1 line-clamp-2">{card.title}</h3>
                    <p className="text-xs sm:text-sm opacity-90 mb-2 line-clamp-2">{card.subtitle}</p>
                    <div className="flex items-center text-xs sm:text-sm">
                      <span className="mr-1">{card.categoryIcon}</span>
                      <span className="font-medium">{card.category}</span>
                      <span className="ml-2 opacity-75">and more</span>
                    </div>
                  </div>
                </div>
                {card.image && (
                  <img
                    src={index === 0 ? '/image_f2aa00.jpg' : card.image}
                    alt={card.title}
                    className="w-full h-32 sm:h-40 object-cover mt-2 rounded-b-lg"
                  />
                )}
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-2 sm:px-4 py-2 sm:py-6">
        {/* Filter Bar */}
        <div className="flex flex-col sm:flex-row items-center gap-2 sm:gap-4 mb-2 sm:mb-6">
          <button className="flex items-center gap-2 px-3 py-1 sm:px-4 sm:py-2 rounded-md hover:bg-gray-100 transition-colors text-gray-700 text-sm sm:text-base">
            Best <ChevronDown className="h-4 w-4" />
          </button>
          <button className="flex items-center gap-2 px-3 py-1 sm:px-4 sm:py-2 rounded-md hover:bg-gray-100 transition-colors text-gray-700 text-sm sm:text-base">
            All Categories <ChevronDown className="h-4 w-4" />
          </button>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-4 gap-2 sm:gap-4">
          {/* Main Feed */}
          <div className="lg:col-span-3 space-y-2 sm:space-y-4">
            {posts.map((post) => (
              <div key={post.id} className="bg-white rounded-lg shadow-md p-2 sm:p-6">
                <div>
                  <div className="flex items-start gap-2 sm:gap-4">
                    <div className="h-6 sm:h-8 w-6 sm:w-8 flex-shrink-0 rounded-full bg-green-500 text-white text-xs sm:text-sm flex items-center justify-center">
                      {post.categoryIcon}
                    </div>
                    <div className="flex-1">
                      <div className="flex items-center gap-1 sm:gap-2 mb-1 sm:mb-2">
                        <span className="font-medium text-xs sm:text-sm">{post.username}</span>
                        <span className="text-gray-500 text-xs sm:text-sm">• {post.timeAgo}</span>
                        <button className="ml-auto px-2 sm:px-3 py-1 bg-green-500 text-white text-xs sm:text-sm rounded-full hover:bg-green-600 transition-colors">
                          Join
                        </button>
                      </div>
                      <p className="text-gray-900 mb-2 sm:mb-4 leading-relaxed text-sm sm:text-base">{post.content}</p>
                      {post.link && (
                        <a
                          href={post.link}
                          className="text-green-600 hover:underline text-xs sm:text-sm flex items-center gap-1 mb-2 sm:mb-4"
                          target="_blank"
                          rel="noopener noreferrer"
                        >
                          {post.link}
                          <ExternalLink className="h-3 w-3" />
                        </a>
                      )}
                    </div>
                  </div>
                  {post.image && (
                    <div className="mt-2 sm:mt-4">
                      <img
                        src={post.image}
                        alt="Post image"
                        className="w-full h-32 sm:h-48 md:h-64 object-cover rounded-lg"
                      />
                    </div>
                  )}
                </div>
              </div>
            ))}
          </div>

          {/* Sidebar */}
          <div className="lg:col-span-1">
            <div className="bg-white rounded-lg shadow-md p-2 sm:p-4">
              <div>
                <div className="flex items-start gap-2 sm:gap-3">
                  <div className="h-6 sm:h-8 w-6 sm:w-8 flex-shrink-0 rounded-full bg-blue-500 text-white text-xs sm:text-sm flex items-center justify-center">
                    🤖
                  </div>
                  <div className="flex-1">
                    <div className="flex items-center gap-1 sm:gap-2 mb-1 sm:mb-2">
                      <span className="font-medium text-xs sm:text-sm">{sidebarPost.username}</span>
                      <span className="text-gray-500 text-xs sm:text-sm">• {sidebarPost.timeAgo}</span>
                    </div>
                    <p className="text-gray-900 text-xs sm:text-sm mb-2 sm:mb-4">{sidebarPost.content}</p>
                  </div>
                  <div className="flex-shrink-0 mt-2 sm:mt-4">
                    <img
                      src={sidebarPost.image}
                      alt="Sidebar post"
                      className="w-full h-32 sm:h-40 md:h-48 object-cover rounded"
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}