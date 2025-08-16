'use client';

import React from 'react';

const Explorepage = () => {
  // Mock data adapted for Lijithad Islamic categories
  const categories = [
    { label: 'All', icon: '🌐' },
    { label: 'Islamic News', icon: '📰' },
    { label: 'Quran', icon: '📖' },
    { label: 'Hadis', icon: '✨' },
    { label: 'Dua', icon: '🙏' },
    { label: 'Halal Living', icon: '🍲' },
    { label: 'Islamic History', icon: '🕌' },
    { label: 'Ramadan', icon: '🌙' },
  ];

  const recommendedCommunities = [
    { name: 'IslamicScholars', members: '45k members', description: 'Discuss latest fatwas and scholarly insights.', image: '/islamicscholars.jpg' },
    { name: 'QuranRecitation', members: '120k members', description: 'Learn and share Quran recitation techniques.', image: '/quranrecitation.jpg' },
    { name: 'HadisDaily', members: '78k members', description: 'Daily Hadis reflections and discussions.', image: '/hadisdaily.jpg' },
    { name: 'HalalRecipes', members: '90k members', description: 'Share and explore Halal recipes.', image: '/halalrecipes.jpg' },
    { name: 'DuaCorner', members: '30k members', description: 'Post and learn powerful Duas.', image: '/duacorner.jpg' },
  ];

  const moreLikeIslamicNews = [
    { name: 'IslamicEvents', members: '25k members', description: 'Stay updated on Islamic events worldwide.', image: '/islamicevents.jpg' },
    { name: 'ShariaFinance', members: '15k members', description: 'Discuss Sharia-compliant financial options.', image: '/shariafinance.jpg' },
    { name: 'MuslimTravel', members: '20k members', description: 'Halal travel tips and destinations.', image: '/muslimtravel.jpg' },
  ];

  const customFeeds = [
    { name: 'r/QuranMemorization', image: '/quranmemorization.jpg' },
    { name: 'r/HadisWisdom', image: '/hadiswisdom.jpg' },
    { name: 'r/IslamicCharity', image: '/islamiccharity.jpg' },
    { name: 'r/HalalLifestyle', image: '/hallallifestyle.jpg' },
  ];

  return (
    <div className="min-h-screen bg-gray-50 pt-14">
      {/* Top padding to account for fixed topbar (h-14) */}
      <div className="max-w-6xl mx-auto p-4">
        <h1 className="text-2xl font-bold mb-4 text-green-600">Explore Lijithad Communities</h1>

        {/* Categories */}
        <div className="flex flex-wrap gap-2 mb-6">
          {categories.map((category) => (
            <button
              key={category.label}
              className="flex items-center px-3 py-1 text-sm bg-white border border-gray-200 rounded-full hover:bg-gray-50 text-gray-700"
            >
              <span className="mr-1">{category.icon}</span>
              {category.label}
            </button>
          ))}
        </div>

        {/* Recommended for You */}
        <div className="mb-6">
          <h2 className="text-lg font-semibold mb-2 text-gray-900">Recommended for you</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {recommendedCommunities.map((community) => (
              <div key={community.name} className="bg-white p-4 rounded-lg shadow">
                <img src={community.image} alt={community.name} className="w-12 h-12 rounded-full mb-2" />
                <h3 className="font-semibold text-gray-900">{community.name}</h3>
                <p className="text-sm text-gray-500">{community.members}</p>
                <p className="text-sm text-gray-700">{community.description}</p>
                <button className="mt-2 px-4 py-1 bg-green-500 text-white rounded-full text-sm hover:bg-green-600 transition-colors">
                  Join
                </button>
              </div>
            ))}
          </div>
          <button className="mt-2 text-green-600 text-sm hover:underline">Show more</button>
        </div>

        {/* More like Islamic News */}
        <div className="mb-6">
          <h2 className="text-lg font-semibold mb-2 text-gray-900">More like Islamic News</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {moreLikeIslamicNews.map((community) => (
              <div key={community.name} className="bg-white p-4 rounded-lg shadow">
                <img src={community.image} alt={community.name} className="w-12 h-12 rounded-full mb-2" />
                <h3 className="font-semibold text-gray-900">{community.name}</h3>
                <p className="text-sm text-gray-500">{community.members}</p>
                <p className="text-sm text-gray-700">{community.description}</p>
                <button className="mt-2 px-4 py-1 bg-green-500 text-white rounded-full text-sm hover:bg-green-600 transition-colors">
                  Join
                </button>
              </div>
            ))}
          </div>
        </div>

        {/* Custom Feeds */}
        <div>
          <h2 className="text-lg font-semibold mb-2 text-gray-900">More Islamic Content</h2>
          <div className="grid grid-cols-4 gap-2">
            {customFeeds.map((feed) => (
              <div key={feed.name} className="bg-white p-2 rounded-lg shadow flex items-center">
                <img src={feed.image} alt={feed.name} className="w-8 h-8 rounded-full mr-2" />
                <span className="text-sm text-gray-700">{feed.name}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Explorepage;