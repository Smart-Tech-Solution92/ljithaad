"use client";

import React from "react";
import Link from "next/link";

const Sidebar: React.FC = () => {
  return (
    <aside className="hidden md:block w-64 bg-white border-r border-gray-200 h-screen sticky top-0 p-4">
      {/* Logo */}
      <div className="mb-6">
        <h1 className="text-xl font-bold text-orange-600">Reddit Clone</h1>
      </div>

      {/* Navigation */}
      <nav className="space-y-2">
        <Link
          href="/"
          className="flex items-center space-x-2 p-2 rounded-md hover:bg-gray-100 transition"
        >
          <span>🏠</span>
          <span className="text-sm font-medium">Home</span>
        </Link>

        <Link
          href="/popular"
          className="flex items-center space-x-2 p-2 rounded-md hover:bg-gray-100 transition"
        >
          <span>🔥</span>
          <span className="text-sm font-medium">Popular</span>
        </Link>

        <Link
          href="/all"
          className="flex items-center space-x-2 p-2 rounded-md hover:bg-gray-100 transition"
        >
          <span>🌍</span>
          <span className="text-sm font-medium">All</span>
        </Link>
      </nav>

      {/* Divider */}
      <div className="border-t border-gray-200 my-4"></div>

      {/* Communities */}
      <div>
        <h2 className="text-xs font-semibold text-gray-500 uppercase mb-2">
          Communities
        </h2>
        <ul className="space-y-1">
          <li>
            <Link
              href="/r/reactjs"
              className="block p-2 rounded-md hover:bg-gray-100 text-sm"
            >
              r/reactjs
            </Link>
          </li>
          <li>
            <Link
              href="/r/nextjs"
              className="block p-2 rounded-md hover:bg-gray-100 text-sm"
            >
              r/nextjs
            </Link>
          </li>
          <li>
            <Link
              href="/r/programming"
              className="block p-2 rounded-md hover:bg-gray-100 text-sm"
            >
              r/programming
            </Link>
          </li>
        </ul>
      </div>

      {/* Create Community Button */}
      <div className="mt-6">
        <Link
          href="/create-community"
          className="w-full block text-center bg-orange-500 text-white py-2 rounded-md font-medium hover:bg-orange-600 transition"
        >
          Create Community
        </Link>
      </div>
    </aside>
  );
};

export default Sidebar;
