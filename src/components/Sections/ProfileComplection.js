import React from 'react';
import { RiHistoryLine, RiUserSearchLine, RiUserHeartLine } from 'react-icons/ri';
import MyMatches from './MyMatches';

const ProfileCompletion = ({ percentage = 50, stats = {} }) => {
  return (
    <div className="w-full max-w-7xl mx-auto space-y-6">
      {/* ✅ Top: Profile Completion Card (unchanged) */}
      <div className="p-[2px] bg-gradient-to-l from-[#5E638500] via-[#5E6385] to-[#5E638500] rounded-xl shadow-md">
        <div className="bg-[#0C0D17] dark:bg-gray-900 rounded-xl p-4">
          <div className="mb-2">
            <p
              className="text-sm font-sm dark:text-white"
              style={{ color: 'var(--subtext-color)' }}
            >
              Profile Completion
            </p>
          </div>
          <div className="flex justify-between items-center mb-2">
            <span className="text-2xl font-large text-white">{percentage}%</span>
            <span className="text-sm font-md text-white">Complete the assessment</span>
          </div>
          <div className="w-full bg-gray-200 rounded-full h-2 dark:bg-gray-700">
          <div
            className="bg-blue-600 h-2 rounded-full transition-all duration-500"
            style={{ width: `${percentage}%` }}
          />
        </div>
        </div>
      </div>

      {/* ✅ Bottom: 3 Cards with Gradient Borders */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        {/* Card 1: Matching History */}
        <div className="p-[2px] bg-gradient-to-l from-[#5E6385] to-[#5E6385]/0 rounded-xl shadow-md">
          <div className="bg-[#0C0D17] dark:bg-gray-900 text-white rounded-xl p-4 h-full">
            <div className="mb-4">
              <RiHistoryLine size={24} className="text-white" />
            </div>
            <div className="text-3xl font-bold mb-2">{stats.matchingHistory ?? 0}</div>
            <div className="text-sm text-gray-300">Matching History</div>
          </div>
        </div>

        {/* Card 2: Profile Viewed */}
        <div className="p-[2px] bg-gradient-to-l from-[#5E6385] to-[#5E6385]/0 rounded-xl shadow-md">
          <div className="bg-[#0C0D17] dark:bg-gray-900 text-white rounded-xl p-4 h-full">
            <div className="mb-4">
              <RiUserSearchLine size={24} className="text-white" />
            </div>
            <div className="text-3xl font-bold mb-2">{stats.profileViewed ?? 0}</div>
            <div className="text-sm text-gray-300">Profile Viewed</div>
          </div>
        </div>

        {/* Card 3: Investor Engagements */}
        <div className="p-[2px] bg-gradient-to-l from-[#5E6385] to-[#5E6385]/0 rounded-xl shadow-md">
          <div className="bg-[#0C0D17] dark:bg-gray-900 text-white rounded-xl p-4 h-full">
            <div className="mb-4">
              <RiUserHeartLine size={24} className="text-white" />
            </div>
            <div className="text-3xl font-bold mb-2">{stats.investorEngagements ?? 0}</div>
            <div className="text-sm text-gray-300">Investor Engagements</div>
          </div>
        </div>
      </div>

      <div className="text-right">
    <MyMatches/>
</div>
    </div>
  );
};

export default ProfileCompletion;
