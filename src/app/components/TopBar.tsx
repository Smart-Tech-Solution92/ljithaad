'use client';

import Link from 'next/link';
import SearchIcon from '@mui/icons-material/Search';
import AddIcon from '@mui/icons-material/Add';
import SmsIcon from '@mui/icons-material/Sms';
import NotificationsNoneIcon from '@mui/icons-material/NotificationsNone';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import EditIcon from '@mui/icons-material/Edit';
import DraftsIcon from '@mui/icons-material/Drafts';
import StarIcon from '@mui/icons-material/Star';
import AttachMoneyIcon from '@mui/icons-material/AttachMoney';
import StarBorderIcon from '@mui/icons-material/StarBorder';
import Brightness4Icon from '@mui/icons-material/Brightness4';
import ExitToAppIcon from '@mui/icons-material/ExitToApp';
import CampaignIcon from '@mui/icons-material/Campaign';
import SettingsIcon from '@mui/icons-material/Settings';
import { useState } from 'react';

const TopBar = () => {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const username = 'u/Current-credit3498'; // Mock username

  return (
    <header className="fixed top-0 left-0 right-0 bg-white z-50 flex items-center px-4 py-2 h-14 shadow-sm">
      <div className="flex items-center w-full mx-auto justify-between">
        {/* Logo on the left */}
        <Link href="/" className="flex items-center mr-4">
          <img
            src="/images/llogo.png"
            alt="Reddit Logo"
            className="w-6 h-6 mr-2"
          />
          <span className="font-bold text-lg text-orange-500 hidden sm:inline">
            Ljithad
          </span>
        </Link>

        {/* Centered search bar with icon */}
        <div className="flex-1 flex justify-center px-2 max-w-lg sm:max-w-xl md:max-w-2xl">
          <div className="flex items-center bg-gray-100 border border-gray-200 rounded-2xl p-1 w-full">
            <SearchIcon className="text-gray-500 text-lg mx-2" />
            <input
              type="text"
              placeholder="Search ljithad"
              className="p-1 bg-transparent border-none outline-none w-full text-sm"
            />
          </div>
        </div>

        {/* Icons and buttons on the right */}
        <div className="flex items-center space-x-2 ml-4">
          {/* Ads Icon */}
          <button
            className="p-1 rounded-full border-2 border-gray-200 bg-white hover:bg-gray-100"
            title="Ads"
          >
            <img
              src="/adsicon.png"
              alt="Ads"
              className="w-6 h-6 rounded-full"
            />
          </button>

          {/* Open Chat Icon */}
          <button
            className="p-1 text-gray-500 hover:text-gray-700"
            title="Open Chat"
          >
            <SmsIcon className="text-xl" />
          </button>

          {/* + Create Button */}
          <button
            className="flex items-center px-3 py-1 text-sm font-bold text-black rounded-md hover:bg-gray-100 hidden sm:flex"
          >
            <AddIcon className="mr-1" />
            Create
          </button>

          {/* Notification Icon */}
          <button
            className="p-1 text-gray-500 hover:text-gray-700"
            title="Notifications"
          >
            <NotificationsNoneIcon className="text-xl" />
          </button>

          {/* Profile Avatar with Dropdown */}
          <div className="relative">
            <button
              onClick={() => setIsDropdownOpen(!isDropdownOpen)}
              className="p-1 rounded-full border-2 border-gray-200 bg-white hover:bg-gray-100"
              title="Profile"
            >
              <img
                src="/avaterprofile.png"
                alt="Profile"
                className="w-7 h-7 rounded-full"
              />
            </button>
            {isDropdownOpen && (
              <div className="absolute right-0 mt-2 w-48 bg-white border border-gray-200 rounded-lg shadow-lg z-50">
                <ul className="py-1 text-sm text-gray-700">
                  <li>
                    <Link
                      href="/profile"
                      className="flex items-center px-4 py-2 hover:bg-gray-100"
                      onClick={() => setIsDropdownOpen(false)}
                    >
                      <AccountCircleIcon className="mr-2 text-gray-500" />
                      View Profile {username}
                    </Link>
                  </li>
                  <li>
                    <button
                      className="flex items-center w-full px-4 py-2 hover:bg-gray-100"
                      onClick={() => setIsDropdownOpen(false)}
                    >
                      <EditIcon className="mr-2 text-gray-500" />
                      Edit Avatar
                    </button>
                  </li>
                  <li>
                    <button
                      className="flex items-center w-full px-4 py-2 hover:bg-gray-100"
                      onClick={() => setIsDropdownOpen(false)}
                    >
                      <DraftsIcon className="mr-2 text-gray-500" />
                      Drafts
                    </button>
                  </li>
                  <li>
                    <button
                      className="flex items-center w-full px-4 py-2 hover:bg-gray-100"
                      onClick={() => setIsDropdownOpen(false)}
                    >
                      <StarIcon className="mr-2 text-gray-500" />
                      Achievements (5 unlocked)
                    </button>
                  </li>
                  <li>
                    <button
                      className="flex items-center w-full px-4 py-2 hover:bg-gray-100"
                      onClick={() => setIsDropdownOpen(false)}
                    >
                      <AttachMoneyIcon className="mr-2 text-gray-500" />
                      Earn (earn cash on ljithad)
                    </button>
                  </li>
                  <li>
                    <button
                      className="flex items-center w-full px-4 py-2 hover:bg-gray-100"
                      onClick={() => setIsDropdownOpen(false)}
                    >
                      <StarBorderIcon className="mr-2 text-gray-500" />
                      Premium
                    </button>
                  </li>
                  <li>
                    <button
                      className="flex items-center w-full px-4 py-2 hover:bg-gray-100"
                      onClick={() => setIsDropdownOpen(false)}
                    >
                      <Brightness4Icon className="mr-2 text-gray-500" />
                      Dark Mode
                    </button>
                  </li>
                  <hr className="border-t border-gray-200 my-1" />
                  <li>
                    <button
                      className="flex items-center w-full px-4 py-2 hover:bg-gray-100"
                      onClick={() => setIsDropdownOpen(false)}
                    >
                      <CampaignIcon className="mr-2 text-gray-500" />
                      Advertise on Ljithad
                    </button>
                  </li>
                  <li>
                    <button
                      className="flex items-center w-full px-4 py-2 hover:bg-gray-100"
                      onClick={() => setIsDropdownOpen(false)}
                    >
                      <StarBorderIcon className="mr-2 text-gray-500" />
                      Try Ljithad Pro BETA
                    </button>
                  </li>
                  <li>
                    <button
                      className="flex items-center w-full px-4 py-2 hover:bg-gray-100"
                      onClick={() => setIsDropdownOpen(false)}
                    >
                      <SettingsIcon className="mr-2 text-gray-500" />
                      Settings
                    </button>
                  </li>
                  <li>
                    <button
                      className="flex items-center w-full px-4 py-2 hover:bg-gray-100 text-red-500"
                      onClick={() => setIsDropdownOpen(false)}
                    >
                      <ExitToAppIcon className="mr-2 text-red-500" />
                      Logout
                    </button>
                  </li>


                </ul>
              </div>
            )}
          </div>
        </div>
      </div>
    </header>
  );
};

export default TopBar;