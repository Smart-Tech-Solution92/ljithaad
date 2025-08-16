"use client"; // Essential for hooks to work in Next.js 13+

import { useState } from "react";
import { Switch } from "antd";

const CreateCustomFeed: React.FC = () => {
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [isPrivate, setIsPrivate] = useState(false);
  const [showOnProfile, setShowOnProfile] = useState(true);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Handle form submission logic here
    console.log({ name, description, isPrivate, showOnProfile });
  };

  return (
    <div className="max-w-md mx-auto p-6 bg-white rounded-2xl shadow-2xl min-h-screen">
      <h1 className="text-xl font-semibold text-gray-900 mb-6">Create custom feed</h1>

      <form onSubmit={handleSubmit} className="space-y-6">
        <div>
          <div className="relative">
            <label htmlFor="name" className="block font-medium text-gray-900 mb-1">
              Name<span className="text-red-500">*</span>
            </label>
            <input
              type="text"
              id="name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              maxLength={50}
              className="w-full px-4 py-3 bg-gray-100 rounded-xl border-2 border-transparent transition-colors duration-150 placeholder-gray-500 focus:outline-none focus:bg-white focus:border-blue-500"
              placeholder="Name*"
              required
            />
            <div className="absolute right-3 top-[50%] transform -translate-y-[20%] text-sm text-gray-400">
              {name.length}/50
            </div>
          </div>
        </div>

        <div>
          <div className="relative">
            <label htmlFor="description" className="block font-medium text-gray-900 mb-1">
              Description
            </label>
            <textarea
              id="description"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              maxLength={500}
              rows={4}
              className="w-full px-4 py-3 bg-gray-100 rounded-xl border-2 border-transparent transition-colors duration-150 placeholder-gray-500 focus:outline-none focus:bg-white focus:border-blue-500 resize-none"
              placeholder="Description"
            />
            <div className="absolute right-3 bottom-3 text-sm text-gray-400">
              {description.length}/500
            </div>
          </div>
        </div>

        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <div>
              <h3 className="font-medium text-gray-900">Make private</h3>
              <p className="text-sm text-gray-500">Only viewable by you</p>
            </div>
            <Switch
              checked={isPrivate}
              onChange={(checked) => setIsPrivate(checked)}
              className={isPrivate ? "bg-blue-600" : "bg-gray-200"}
            />
          </div>

          <div className="flex items-center justify-between">
            <div>
              <h3 className="font-medium text-gray-900">Show on profile</h3>
              <p className="text-sm text-gray-500">Display this feed on your profile so others can find it</p>
            </div>
            <Switch
              checked={showOnProfile}
              onChange={(checked) => setShowOnProfile(checked)}
              className={showOnProfile ? "bg-blue-600" : "bg-gray-200"}
            />
          </div>
        </div>

        <div className="flex gap-3 pt-2">
          <button
            type="button"
            className="flex-1 px-4 py-3 text-gray-700 bg-gray-100 rounded-xl font-medium hover:bg-gray-200 transition-colors duration-150 focus:outline-none focus:ring-2 focus:ring-gray-500 focus:ring-offset-2"
          >
            Cancel
          </button>
          <button
            type="submit"
            className="flex-1 px-4 py-3 text-white bg-blue-600 rounded-xl font-medium hover:bg-blue-700 transition-colors duration-150 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed"
            disabled={!name.trim()}
          >
            Submit
          </button>
        </div>
      </form>
    </div>
  );
};

export default CreateCustomFeed;