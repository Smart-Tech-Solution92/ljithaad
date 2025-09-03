"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";
import {
  Home as HomeIcon,
  Popular as PopularIcon,
  All as AllIcon,
  Create as CreateIcon,
  Help as HelpIcon,
  Coins as CoinsIcon,
  Premium as PremiumIcon,
  Policy as PolicyIcon,
  Person as PersonIcon,
  Logout as LogoutIcon,
  ExpandMore as ExpandMoreIcon,
  ExpandLess as ExpandLessIcon,
  Settings as SettingsIcon,
} from "@mui/icons-material";

// Custom icons to match Reddit's design
const RedditIcon = ({ className }: { className?: string }) => (
  <svg className={className} viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
    <g>
      <circle fill="#FF4500" cx="10" cy="10" r="10"></circle>
      <path fill="#FFF" d="M16.67,10A1.46,1.46,0,0,0,14.2,9a7.12,7.12,0,0,0-3.85-1.23L11,4.65,13.14,5.1a1,1,0,1,0,.13-0.61L10.82,4a0.31,0.31,0,0,0-.37.24L9.71,7.71a7.14,7.14,0,0,0-3.9,1.23A1.46,1.46,0,1,0,4.5,12.33a2.87,2.87,0,0,0,0,.44c0,2.24,2.61,4.06,5.83,4.06s5.83-1.82,5.83-4.06a2.87,2.87,0,0,0,0-.44A1.46,1.46,0,0,0,16.67,10Zm-10,1a1,1,0,1,1,1,1A1,1,0,0,1,6.67,11Zm5.81,2.75a3.84,3.84,0,0,1-2.47.77,3.84,3.84,0,0,1-2.47-.77,0.27,0.27,0,0,1,.38-0.38A3.27,3.27,0,0,0,10,14a3.28,3.28,0,0,0,2.09-.61A0.27,0.27,0,1,1,12.48,13.79Zm-0.18-1.71a1,1,0,1,1,1-1A1,1,0,0,1,12.3,12.08Z"></path>
    </g>
  </svg>
);

const Sidebar = () => {
  const [activeNav, setActiveNav] = useState("Home");
  const [communitiesExpanded, setCommunitiesExpanded] = useState(true);
  const router = useRouter();

  // Sample communities data
  const topCommunities = [
    { name: "AskReddit", members: "41.5m", icon: "A" },
    { name: "funny", members: "36.7m", icon: "f" },
    { name: "gaming", members: "33.5m", icon: "g" },
    { name: "aww", members: "30.8m", icon: "a" },
    { name: "pics", members: "29.9m", icon: "p" },
    { name: "science", members: "28.4m", icon: "s" },
    { name: "worldnews", members: "27.2m", icon: "w" },
    { name: "movies", members: "26.8m", icon: "m" },
    { name: "news", members: "25.1m", icon: "n" },
    { name: "Showerthoughts", members: "23.6m", icon: "S" },
  ];

  const resources = [
    { label: "Help Center", icon: HelpIcon, path: "/help" },
    { label: "Reddit Coins", icon: CoinsIcon, path: "/coins" },
    { label: "Reddit Premium", icon: PremiumIcon, path: "/premium" },
    { label: "Communities", icon: null, path: "/subreddits" },
    { label: "About Reddit", icon: null, path: "/about" },
    { label: "Advertise", icon: null, path: "/advertise" },
    { label: "Careers", icon: null, path: "/careers" },
    { label: "Terms", icon: null, path: "/terms" },
    { label: "Content Policy", icon: PolicyIcon, path: "/contentpolicy" },
    { label: "Privacy Policy", icon: PolicyIcon, path: "/privacypolicy" },
    { label: "Mod Policy", icon: PolicyIcon, path: "/modpolicy" },
  ];

  return (
    <aside className="w-64 bg-white h-screen flex flex-col fixed lg:sticky top-0 left-0 z-40 border-r border-gray-200 overflow-y-auto">
      {/* Logo */}
      <div className="p-4 border-b border-gray-200">
        <div className="flex items-center cursor-pointer" onClick={() => router.push("/")}>
          <RedditIcon className="w-8 h-8 mr-2" />
          <span className="font-bold text-lg text-black">reddit</span>
        </div>
      </div>

      {/* Navigation */}
      <nav className="flex-1 overflow-y-auto py-2 text-sm">
        {/* Feeds Section */}
        <div className="mb-3 px-2">
          <h3 className="px-2 text-xs font-medium text-gray-500 uppercase tracking-wide mb-1">
            Feeds
          </h3>
          <ul>
            {[
              { name: "Home", icon: HomeIcon, path: "/" },
              { name: "Popular", icon: PopularIcon, path: "/r/popular" },
            ].map((feed) => {
              const IconComponent = feed.icon;
              const isActive = activeNav === feed.name;
              return (
                <li
                  key={feed.name}
                  className={`flex items-center py-2 px-2 rounded-md cursor-pointer transition
                    ${
                      isActive
                        ? "bg-gray-100 text-black font-medium"
                        : "text-gray-700 hover:bg-gray-100"
                    }`}
                  onClick={() => {
                    setActiveNav(feed.name);
                    router.push(feed.path);
                  }}
                >
                  <IconComponent className="mr-3 text-gray-600" fontSize="small" />
                  {feed.name}
                </li>
              );
            })}
          </ul>
        </div>

        {/* Communities Section */}
        <div className="mb-3 px-2">
          <div 
            className="flex items-center justify-between px-2 py-1 rounded-md cursor-pointer hover:bg-gray-100"
            onClick={() => setCommunitiesExpanded(!communitiesExpanded)}
          >
            <h3 className="text-xs font-medium text-gray-500 uppercase tracking-wide">
              Top Communities
            </h3>
            {communitiesExpanded ? (
              <ExpandLessIcon fontSize="small" className="text-gray-500" />
            ) : (
              <ExpandMoreIcon fontSize="small" className="text-gray-500" />
            )}
          </div>
          
          {communitiesExpanded && (
            <ul className="mt-1">
              {topCommunities.map((community, index) => (
                <li
                  key={community.name}
                  onClick={() => router.push(`/r/${community.name}`)}
                  className="flex items-center py-2 px-2 text-gray-700 hover:bg-gray-100 rounded-md cursor-pointer"
                >
                  <span className="text-xs font-medium mr-2 text-gray-500">{index + 1}</span>
                  <div className="w-6 h-6 rounded-full bg-red-500 flex items-center justify-center text-xs text-white font-bold mr-3">
                    {community.icon}
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="truncate">r/{community.name}</p>
                  </div>
                </li>
              ))}
              
              <li
                onClick={() => router.push("/subreddits")}
                className="flex items-center py-2 px-2 text-blue-500 hover:bg-gray-100 rounded-md cursor-pointer text-xs font-medium mt-2"
              >
                View All
              </li>
              
              <li
                onClick={() => router.push("/subreddits/create")}
                className="flex items-center py-2 px-2 text-gray-700 hover:bg-gray-100 rounded-md cursor-pointer mt-1"
              >
                <CreateIcon fontSize="small" className="mr-3 text-gray-600" />
                Create Community
              </li>
            </ul>
          )}
        </div>

        {/* Resources Section */}
        <div className="mb-6 px-2">
          <h3 className="px-2 text-xs font-medium text-gray-500 uppercase tracking-wide mb-1">
            Resources
          </h3>
          <ul>
            {resources.map((res) => {
              const IconComponent = res.icon;
              return (
                <li
                  key={res.label}
                  onClick={() => router.push(res.path)}
                  className="flex items-center py-1 px-2 text-gray-600 hover:bg-gray-100 rounded-md cursor-pointer text-xs"
                >
                  {IconComponent && <IconComponent fontSize="small" className="mr-3 text-gray-500" />}
                  <span className={!IconComponent ? "ml-6" : ""}>{res.label}</span>
                </li>
              );
            })}
          </ul>
        </div>
      </nav>

      {/* User footer */}
      <div className="p-4 border-t border-gray-200">
        <div
          className="flex items-center space-x-3 cursor-pointer hover:bg-gray-100 p-2 rounded-md"
          onClick={() => router.push("/user/testuser")}
        >
          <div className="w-8 h-8 rounded-full bg-orange-500 flex items-center justify-center text-white">
            <PersonIcon fontSize="small" />
          </div>
          <div className="flex-1 min-w-0">
            <p className="text-sm font-medium truncate">u/testuser</p>
            <p className="text-xs text-gray-500">1.2k karma</p>
          </div>
        </div>
        
        <div className="flex items-center mt-3 text-xs text-gray-500">
          <div className="flex items-center cursor-pointer hover:underline mr-4">
            <SettingsIcon fontSize="small" className="mr-1" />
            <span>Settings</span>
          </div>
          <div className="flex items-center cursor-pointer hover:underline">
            <LogoutIcon fontSize="small" className="mr-1" />
            <span>Logout</span>
          </div>
        </div>
        
        <div className="mt-4 text-xs text-gray-400">
          <p>campany Inc © 2023. All rights reserved.</p>
        </div>
      </div>
    </aside>
  );
};

export default Sidebar;