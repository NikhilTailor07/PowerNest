// src/pages/MyMatches.jsx
import React, { useState } from 'react';
import { RiSearchLine } from 'react-icons/ri';

const MyMatches = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [filter, setFilter] = useState('all');

  const matches = [
    { id: 1, name: 'Investor A', status: 'viewed' },
    { id: 2, name: 'Investor B', status: 'viewed' },
    { id: 3, name: 'Investor C', status: 'viewed' },
  ];

  const filteredMatches = matches.filter((match) => {
    const matchesSearch = match.name.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesFilter = filter === 'all' || match.status === filter;
    return matchesSearch && matchesFilter;
  });

  return (
    <div className="w-full max-w-4xl mx-auto  space-y-4">
      <div className="p-[1.5px] bg-gradient-to-b from-[#5E6385] to-[#5E6385]/0 rounded-xl shadow-md">
        <div className="bg-[#0C0D17] text-white rounded-xl px-4 py-5 space-y-3">
          {/* Title + Controls */}
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
            <h2 className="text-lg font-medium">My Matches</h2>

            <div className="flex flex-col sm:flex-row gap-3 w-full sm:w-auto sm:items-center">
              {/* Search */}
              <div className="relative w-full sm:w-48">
                <input
                  type="text"
                  value={searchTerm}
                  onC          hange={(e) => setSearchTerm(e.target.value)}
                  placeholder="Search..."
                  className="w-full px-3 py-1.5 pl-9 rounded-md bg-[#1a1a2e] border border-[#333] text-sm text-white focus:outline-none"
                />
                <RiSearchLine className="absolute top-2.5 left-2.5 text-gray-400 w-4 h-4" />
              </div>

              {/* Filter */}
              <select
                value={filter}
                onChange={(e) => setFilter(e.target.value)}
                className="px-3 py-1.5 rounded-md bg-[#1a1a2e] border border-[#333] text-sm text-white focus:outline-none w-full sm:w-32"
              >
                <option value="all">Filter</option>
                <option value="active">Active</option>
                <option value="pending">Pending</option>
              </select>
            </div>
          </div>

          {/* Match Cards */}
             <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2">
  {filteredMatches.length > 0 ? (
    filteredMatches.map((match) => (
      <div
        key={match.id}
        className="bg-[#1e1e2e] rounded-md p-4 border border-[#2e2e40] hover:border-[#5E6385] flex flex-col justify-between min-h-[180px]"
      style={{
     background: 'linear-gradient(to bottom, #000000,rgb(10, 13, 56))', // This line applies the gradient
  }}
      >
        {/* Top: Logo + Name + Match % */}
        <div className="items-left">
          <div className="flex items-center   gap-3">
              <div className="w-10 h-10 bg-gray-600 rounded-full"></div>
            <h3 className="text-base font-semibold">{match.name}</h3>
         </div>

          {/* Middle: Status */}
         <div className="flex justify-between items-start mt-4 text-sm">
  {/* Left: Match Status */}
  <div className="text-gray-400 capitalize">
    <p className="font-medium">Match Status</p>
    <p className="text-white font-semibold">{match.status}</p>
  </div>

  {/* Right: Sector Match */}
  <div className="text-right text-gray-400 capitalize">
    <p className="font-medium">Sector Match</p>
    <p className="text-white font-semibold">{match.matchPercent || '82%'}</p>
  </div>
</div>

        </div>

        

        {/* Bottom: Request Intro */}
        <div className="pt-4">
          <button className="text-sm bg-[#102361] hover:bg-[#0C0D17] border border-[#333] px-4 py-1.5 rounded-md text-white">
            Request Intro
          </button>
        </div>
      </div>
    ))
  ) : (
    <p className="text-gray-400 col-span-full text-sm">No matches found.</p>
  )}
</div>

        </div>
      </div>
    </div>
  );
};

export default MyMatches;
