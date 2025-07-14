import React from 'react';
import AI_AgentPic from '../../assets/AI_AgentPic.png'; // update if needed

function ConnectNowCard() {
  return (
    <div className="mt-6 p-4 rounded-2xl shadow-md flex flex-col items-center text-center relative"
      style={{
        background: 'radial-gradient(ellipse at bottom, #121882 0%, #010101 100%)',
      }}
    >
      <img
        src={AI_AgentPic}
        alt="AI Agent"
        className="w- h-16 mb-3"
      />

      <p className="text-sm text-gray-300 px-2">
        Connect with our AI Agent to share about your startup
      </p>

      {/* Glow effect wrapper */}
      <div className="relative w-full mt-4">
        <div className="absolute inset-0 bg-blue-500 rounded-xl blur-md opacity-30 z-0"></div>
        <button
          className="relative z-10 w-full bg-blue-600 hover:bg-blue-700 text-white font-medium py-2 px-4 rounded-xl transition duration-200"
        >
          Connect Now
        </button>
      </div>
    </div>
  );
}

export default ConnectNowCard;
