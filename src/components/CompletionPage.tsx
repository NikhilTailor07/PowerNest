import React, { useEffect, useState } from 'react';

interface CompletionPageProps {
  onGoToDashboard: () => void;
}

const CompletionPage: React.FC<CompletionPageProps> = ({ onGoToDashboard }) => {
  const [progress, setProgress] = useState(0);
  const targetProgress = 70;

  useEffect(() => {
    const timer = setTimeout(() => {
      const interval = setInterval(() => {
        setProgress(prev => {
          if (prev >= targetProgress) {
            clearInterval(interval);
            return targetProgress;
          }
          return prev + 2;
        });
      }, 50);
    }, 500);

    return () => clearTimeout(timer);
  }, [targetProgress]);

  return (
    <div className="min-h-screen bg-black flex items-center justify-center px-8 py-12">
      <div className="text-center">
        {/* Header */}
        <div className="flex items-center justify-center mb-16">
          <img src="/image.png" alt="Power Nest Logo" className="w-10 h-10 mr-4" />
          <h1 className="text-2xl font-bold text-white">Power Nest</h1>
        </div>

        {/* Circular Progress */}
        <div className="relative mb-12">
          <svg className="w-64 h-64 transform -rotate-90" viewBox="0 0 100 100">
            {/* Background circle */}
            <circle
              cx="50"
              cy="50"
              r="40"
              stroke="currentColor"
              strokeWidth="8"
              fill="none"
              className="text-gray-800"
            />
            {/* Progress circle */}
            <circle
              cx="50"
              cy="50"
              r="40"
              stroke="currentColor"
              strokeWidth="8"
              fill="none"
              strokeDasharray={`${2 * Math.PI * 40}`}
              strokeDashoffset={`${2 * Math.PI * 40 * (1 - progress / 100)}`}
              className="text-blue-600 transition-all duration-1000 ease-out"
              strokeLinecap="round"
            />
          </svg>
          
          {/* Progress text */}
          <div className="absolute inset-0 flex flex-col items-center justify-center">
            <span className="text-6xl font-bold text-white mb-2">{progress}%</span>
            <span className="text-gray-400 text-lg">Profile Completed</span>
          </div>
        </div>

        {/* Message */}
        <p className="text-gray-400 text-xl mb-12 max-w-md mx-auto">
          Your matches will appear shortly
        </p>

        {/* Action Button */}
        <button
          onClick={onGoToDashboard}
          className="w-[220px] h-[52px] bg-blue-600 text-white rounded-xl font-medium hover:bg-blue-700 transition-colors focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 focus:ring-offset-black"
        >
          Go to dashboard
        </button>
      </div>
    </div>
  );
};

export default CompletionPage;