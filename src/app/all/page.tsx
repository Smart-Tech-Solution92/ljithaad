'use client';
import { useState, useRef, useEffect } from 'react';
import { ChevronDown } from "lucide-react";
import TopBar from "../components/TopBar";
import Feed from "../components/Feed";

export default function Home() {
  const [sortOpen, setSortOpen] = useState(false);
  const [viewOpen, setViewOpen] = useState(false);
  const [selectedSort, setSelectedSort] = useState('Hot');
  const [selectedView, setSelectedView] = useState('Card');
  const sortRef = useRef<HTMLDivElement>(null);
  const viewRef = useRef<HTMLDivElement>(null);

  // Close dropdowns when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (sortRef.current && !sortRef.current.contains(event.target as Node)) {
        setSortOpen(false);
      }
      if (viewRef.current && !viewRef.current.contains(event.target as Node)) {
        setViewOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col">
      {/* Fixed TopBar */}
      <TopBar />

      {/* Main Content Layout */}
      <div className="flex flex-col lg:flex-row max-w-7xl mx-auto px-2 sm:px-4 py-4 flex-grow">
        {/* Main Feed */}
        <div className="flex-1 lg:mr-4">
          {/* Sorting and View Options */}
          <div className="bg-white rounded-md shadow-sm p-2 mb-4 flex flex-wrap items-center gap-4">
            {/* Sort Dropdown */}
            <div className="relative" ref={sortRef}>
              <button 
                className="flex items-center space-x-1 px-3 py-1 text-sm font-medium rounded-md hover:bg-gray-100"
                onClick={() => setSortOpen(!sortOpen)}
              >
                <span>{selectedSort}</span>
                <ChevronDown className={`w-4 h-4 text-gray-500 transition-transform ${sortOpen ? 'rotate-180' : ''}`} />
              </button>
              {sortOpen && (
                <div className="absolute z-10 mt-1 w-40 bg-white rounded-md shadow-lg border border-gray-200">
                  {['Hot', 'New', 'Top', 'Rising'].map((option) => (
                    <button
                      key={option}
                      className={`w-full text-left px-4 py-2 text-sm hover:bg-gray-100 ${selectedSort === option ? 'bg-blue-50 text-blue-600' : ''}`}
                      onClick={() => {
                        setSelectedSort(option);
                        setSortOpen(false);
                      }}
                    >
                      {option}
                    </button>
                  ))}
                </div>
              )}
            </div>

            {/* View Dropdown */}
            <div className="relative" ref={viewRef}>
              <button 
                className="flex items-center space-x-1 px-3 py-1 text-sm font-medium rounded-md hover:bg-gray-100"
                onClick={() => setViewOpen(!viewOpen)}
              >
                <span>{selectedView} View</span>
                <ChevronDown className={`w-4 h-4 text-gray-500 transition-transform ${viewOpen ? 'rotate-180' : ''}`} />
              </button>
              {viewOpen && (
                <div className="absolute z-10 mt-1 w-40 bg-white rounded-md shadow-lg border border-gray-200">
                  {['Card', 'Compact', 'Classic'].map((option) => (
                    <button
                      key={option}
                      className={`w-full text-left px-4 py-2 text-sm hover:bg-gray-100 ${selectedView === option ? 'bg-blue-50 text-blue-600' : ''}`}
                      onClick={() => {
                        setSelectedView(option);
                        setViewOpen(false);
                      }}
                    >
                      {option} View
                    </button>
                  ))}
                </div>
              )}
            </div>
          </div>

          {/* Feed Content */}
          <Feed viewMode={selectedView.toLowerCase()} />
        </div>

        {/* Right Sidebar */}
        <div className="lg:w-80 mt-4 lg:mt-0 lg:ml-4 flex flex-col">
          

          {/* Footer with Reddit Rules - Positioned at bottom right */}
          <div className="bg-white rounded-md shadow-sm p-4 mt-auto">
            <div className="space-y-2 text-xs text-gray-500">
              <h3 className="font-semibold text-gray-700">Ljithad Rules</h3>
              <ul className="space-y-1">
                <li><a href="#" className="hover:underline">Privacy Policy</a></li>
                <li><a href="#" className="hover:underline">User Agreement</a></li>
                <li><a href="#" className="hover:underline">Accessibility</a></li>
              </ul>
              <p className="pt-2 border-t border-gray-200 mt-2">
                Golden Age Technology, Inc. © 2025. All rights reserved.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}