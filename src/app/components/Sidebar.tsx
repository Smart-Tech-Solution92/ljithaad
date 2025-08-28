"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";
import HomeIcon from "@mui/icons-material/Home";
import ExploreIcon from "@mui/icons-material/Explore";
import GroupIcon from "@mui/icons-material/Group";
import MenuOpenIcon from "@mui/icons-material/MenuOpen";
import MenuIcon from "@mui/icons-material/Menu";
import PersonIcon from "@mui/icons-material/Person";
import SettingsIcon from "@mui/icons-material/Settings";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import KeyboardArrowRightIcon from "@mui/icons-material/KeyboardArrowRight";
import AddIcon from "@mui/icons-material/Add";

const Sidebar = () => {
  const [activeNav, setActiveNav] = useState("Home");
  const [isCollapsed, setIsCollapsed] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [communitiesOpen, setCommunitiesOpen] = useState(true);
  const [topicsOpen, setTopicsOpen] = useState(true);

  const router = useRouter();

  const navItems = [
    { label: "Home", icon: HomeIcon, path: "/" },
    { label: "Explore", icon: ExploreIcon, path: "/explore" },
  ];

  // 🕌 Islamic Subreddits / Topics
  const islamicTopics = [
    { label: "Quran", path: "/topics/quran", emoji: "📖" },
    { label: "Hadith", path: "/topics/hadith", emoji: "📝" },
    { label: "Islamic History", path: "/topics/history", emoji: "🏛️" },
    { label: "Fiqh & Fatwa", path: "/topics/fiqh", emoji: "⚖️" },
    { label: "Halal Finance", path: "/topics/finance", emoji: "💰" },
    { label: "Lifestyle", path: "/topics/lifestyle", emoji: "🌙" },
    { label: "Dawah & Learning", path: "/topics/dawah", emoji: "📢" },
  ];

  // Communities you might follow
  const userCommunities = [
    { name: "r/islam", icon: "🕌" },
    { name: "r/Muslim", icon: "🌙" },
    { name: "r/Quran", icon: "📖" },
    { name: "r/Hadith", icon: "📝" },
    { name: "r/IslamicHistory", icon: "🏛️" },
  ];

  return (
    <>
      {/* Mobile Menu Button */}
      <button
        className="lg:hidden fixed top-0 left-0 z-50 p-2 bg-white text-gray-600"
        onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
      >
        {isMobileMenuOpen ? <MenuOpenIcon /> : <MenuIcon />}
      </button>

      {/* Sidebar */}
      <aside
        className={`
          bg-white shadow-md
          ${isCollapsed ? "w-16" : "w-80"}
          max-h-screen overflow-y-auto
          fixed lg:sticky top-0
          transform transition-transform duration-300
          ${isMobileMenuOpen ? "translate-x-0" : "-translate-x-full"}
          lg:translate-x-0
        `}
      >
        <nav className="pt-12 lg:pt-4">
          <ul className="list-none p-0 m-0">
            {/* Collapse Toggle */}
            <li
              className="flex items-center px-2 py-3 cursor-pointer mb-2 hover:bg-gray-100 rounded-lg mx-2"
              onClick={() => setIsCollapsed(!isCollapsed)}
            >
              {isCollapsed ? (
                <MenuIcon fontSize="small" className="text-gray-600" />
              ) : (
                <MenuOpenIcon fontSize="small" className="text-gray-600" />
              )}
            </li>

            {/* Main Nav */}
            {navItems.map((item) => {
              const isActive = activeNav === item.label;
              const IconComponent = item.icon;

              return (
                <li
                  key={item.label}
                  onClick={() => {
                    setActiveNav(item.label);
                    if (item.path) router.push(item.path);
                    setIsMobileMenuOpen(false);
                  }}
                  className={`
                    flex items-center py-3 font-medium text-sm rounded-lg cursor-pointer
                    transition-all duration-200 mx-2 my-1
                    ${isCollapsed ? "justify-center px-0" : "px-6"}
                    ${
                      isActive
                        ? "bg-green-100 text-green-700"
                        : "bg-transparent text-gray-600 hover:bg-gray-100"
                    }
                  `}
                >
                  <span className={`text-xl ${isCollapsed ? "mr-0" : "mr-4"}`}>
                    <IconComponent fontSize="small" />
                  </span>
                  {!isCollapsed && item.label}
                </li>
              );
            })}

            {/* Divider */}
            <hr className="border-t border-gray-200 my-4 mx-4" />

            {/* Communities */}
            <li
              className={`flex items-center justify-between py-2 cursor-pointer hover:bg-gray-100 rounded-lg mx-2 ${
                isCollapsed ? "justify-center px-0" : "px-6"
              }`}
              onClick={() => setCommunitiesOpen(!communitiesOpen)}
            >
              <div className="flex items-center">
                <span className={`text-xl ${isCollapsed ? "mr-0" : "mr-4"}`}>
                  <GroupIcon fontSize="small" />
                </span>
                {!isCollapsed && (
                  <>
                    <span className="text-sm font-medium">Communities</span>
                    <span className="ml-auto text-sm text-gray-400">
                      {communitiesOpen ? (
                        <KeyboardArrowDownIcon fontSize="small" />
                      ) : (
                        <KeyboardArrowRightIcon fontSize="small" />
                      )}
                    </span>
                  </>
                )}
              </div>
            </li>

            {communitiesOpen && !isCollapsed && (
              <div className="pl-6 pr-2">
                {userCommunities.map((community, index) => (
                  <div
                    key={index}
                    className="flex items-center py-2 text-gray-700 text-sm cursor-pointer hover:bg-gray-100 rounded-lg pl-2"
                    onClick={() => router.push(`/${community.name}`)}
                  >
                    <span className="mr-3">{community.icon}</span>
                    <span>{community.name}</span>
                  </div>
                ))}
              </div>
            )}

            {/* Divider */}
            <hr className="border-t border-gray-200 my-4 mx-4" />

            {/* Topics */}
            <li
              className={`flex items-center justify-between py-2 cursor-pointer hover:bg-gray-100 rounded-lg mx-2 ${
                isCollapsed ? "justify-center px-0" : "px-6"
              }`}
              onClick={() => setTopicsOpen(!topicsOpen)}
            >
              <span className="text-sm font-medium">Islamic Topics</span>
              {!isCollapsed && (
                <span className="ml-auto text-sm text-gray-400">
                  {topicsOpen ? (
                    <KeyboardArrowDownIcon fontSize="small" />
                  ) : (
                    <KeyboardArrowRightIcon fontSize="small" />
                  )}
                </span>
              )}
            </li>

            {topicsOpen && !isCollapsed && (
              <ul className="list-none pl-8 mt-1 mb-2">
                {islamicTopics.map((topic) => (
                  <li
                    key={topic.label}
                    className="py-1 text-gray-600 text-sm hover:bg-gray-100 rounded-lg pl-2 cursor-pointer"
                    onClick={() => {
                      setActiveNav(topic.label);
                      router.push(topic.path);
                      setIsMobileMenuOpen(false);
                    }}
                  >
                    {topic.emoji} {topic.label}
                  </li>
                ))}
              </ul>
            )}

            {/* Divider */}
            <hr className="border-t border-gray-200 my-4 mx-4" />

            {/* Profile & Settings */}
            <li
              className={`flex items-center py-2 cursor-pointer hover:bg-gray-100 rounded-lg mx-2 ${
                isCollapsed ? "justify-center px-0" : "px-6"
              }`}
              onClick={() => router.push("/profile")}
            >
              <span className={`text-xl ${isCollapsed ? "mr-0" : "mr-4"}`}>
                <PersonIcon fontSize="small" />
              </span>
              {!isCollapsed && (
                <div className="flex flex-col">
                  <span className="text-sm font-medium">Your Profile</span>
                  <span className="text-xs text-gray-500">u/username</span>
                </div>
              )}
            </li>

            <li
              className={`flex items-center py-2 cursor-pointer hover:bg-gray-100 rounded-lg mx-2 ${
                isCollapsed ? "justify-center px-0" : "px-6"
              }`}
              onClick={() => router.push("/settings")}
            >
              <span className={`text-xl ${isCollapsed ? "mr-0" : "mr-4"}`}>
                <SettingsIcon fontSize="small" />
              </span>
              {!isCollapsed && <span className="text-sm">Settings</span>}
            </li>
          </ul>
        </nav>
      </aside>

      {/* Mobile overlay */}
      {isMobileMenuOpen && (
        <div
          className="lg:hidden fixed inset-0 bg-black bg-opacity-50 z-30"
          onClick={() => setIsMobileMenuOpen(false)}
        ></div>
      )}
    </>
  );
};

export default Sidebar;
