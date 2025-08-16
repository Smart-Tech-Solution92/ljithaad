'use client';

import React, { useEffect, useState } from 'react';

// Define your tags array with icons and labels (updated for Islamic content)
const tags = [
  { label: 'Quran recitation tips', icon: '📖' },
  { label: 'Hadis of the day', icon: '✨' },
  { label: 'Islamic news updates', icon: '📰' },
  { label: 'Dua for daily life', icon: '🙏' },
  { label: 'Halal recipes', icon: '🍲' },
  { label: 'Islamic history facts', icon: '🕌' },
  { label: 'Quran translation benefits', icon: '🌍' },
  { label: 'Ramadan preparation', icon: '🌙' },
  { label: 'Islamic finance advice', icon: '💸' },
  { label: 'Hadis on kindness', icon: '❤️' },
  { label: 'Tafsir insights', icon: '📚' },
  { label: 'Zakat calculation guide', icon: '💰' },
  { label: 'Islamic parenting tips', icon: '👪' },
  { label: 'Hajj preparation tips', icon: '🕋' },
  { label: 'Islamic art styles', icon: '🎨' },
  { label: 'Sunnah skincare', icon: '🧴' },
  { label: 'Quran memorization methods', icon: '🧠' },
  { label: 'Islamic scholars Q&A', icon: '❓' },
  { label: 'Eid celebration ideas', icon: '🎉' },
  { label: 'Halal travel destinations', icon: '✈️' },
  { label: 'Islamic books recommendations', icon: '📖' },
  { label: 'Dua for success', icon: '🌟' },
  { label: 'Hadis on patience', icon: '⏳' },
  { label: 'Islamic fitness routines', icon: '🏃' },
  { label: 'Quran reading apps', icon: '📱' },
  { label: 'Islamic charity ideas', icon: '🤲' },
  { label: 'Sunnah sleep habits', icon: '😴' },
  { label: 'Islamic marriage advice', icon: '💞' },
  { label: 'Halal investment options', icon: '💵' },
  { label: 'Islamic poetry', icon: '✍️' },
];

// Split tags into 4 rows
const splitIntoRows = (arr: typeof tags, rows: number) => {
  const perRow = Math.ceil(arr.length / rows);
  return Array.from({ length: rows }, (_, i) =>
    arr.slice(i * perRow, (i + 1) * perRow)
  );
};

const tagRows = splitIntoRows(tags, 4);

const LijithadAnswersPage = () => {
  const [isVisible, setIsVisible] = useState(false);

  // Trigger the animation after component mounts
  useEffect(() => {
    setIsVisible(true);
  }, []);

  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center p-4">
      <div className="bg-white rounded-lg shadow-xl p-6 sm:p-10 w-full max-w-4xl text-center">
        {/* Header */}
        <h1 className="text-3xl sm:text-4xl font-bold text-green-600 mb-5 font-sans">
          Lijithad Answers
        </h1>

        {/* Tagline */}
        <p className="text-base sm:text-lg text-gray-700 mb-10 max-w-2xl mx-auto leading-relaxed">
          Got a question? Ask it and get answers, perspectives, and guidance from the Lijithad community
        </p>

        {/* Tags Section with Continuous Right-to-Left Animation */}
        <div className="space-y-2 mb-10 overflow-hidden">
          {tagRows.map((row, rowIndex) => (
            <div
              key={rowIndex}
              className="flex animate-marquee whitespace-nowrap"
              style={{ animationDelay: `${rowIndex * 0.5}s` }}
            >
              {/* Duplicate tags for seamless looping */}
              {[...row, ...row].map((tag, index) => (
                <button
                  key={`${rowIndex}-${index}`}
                  className="flex items-center space-x-1.5 px-3 py-1.5 bg-gray-100 text-gray-800 rounded-full text-xs font-medium hover:bg-gray-200 transition-colors duration-200 shadow-sm border border-gray-200 mx-1"
                >
                  {tag.icon && <span className="text-sm">{tag.icon}</span>}
                  <span>{tag.label}</span>
                </button>
              ))}
            </div>
          ))}
        </div>

        {/* Learn More Link Section with Animation */}
        <div className="max-w-2xl mx-auto flex justify-start">
          <a
            href="#" // Replace with actual link
            className={`
              text-green-600 hover:underline font-semibold text-sm flex items-center
              transform transition-transform duration-700 ease-out
              ${isVisible ? 'translate-x-0 opacity-100' : 'translate-x-full opacity-0'}
            `}
          >
            Learn how Lijithad Answers works
            <span className="ml-1">→</span>
          </a>
        </div>
      </div>

      {/* Inline CSS for Marquee Animation */}
      <style jsx>{`
        @keyframes marquee {
          0% {
            transform: translateX(0);
          }
          100% {
            transform: translateX(-50%);
          }
        }
        .animate-marquee {
          display: flex;
          animation: marquee 20s linear infinite;
        }
        .animate-marquee:hover {
          animation-play-state: paused;
        }
      `}</style>
    </div>
  );
};

export default LijithadAnswersPage;