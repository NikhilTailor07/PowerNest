import React from 'react';
import { Clock, FileText, AlertCircle, Wifi, RefreshCw, Lock } from 'lucide-react';

interface AssessmentIntroductionProps {
  onStartAssessment: () => void;
  onSkip: () => void;
}

const AssessmentIntroduction: React.FC<AssessmentIntroductionProps> = ({ 
  onStartAssessment, 
  onSkip 
}) => {
  return (
    <div className="min-h-screen bg-black flex items-center justify-center px-8 py-12">
      <div className="w-full max-w-4xl">
        {/* Header */}
        <div className="flex items-center justify-between mb-12">
          <div className="flex items-center">
            <img src="/image.png" alt="Power Nest Logo" className="w-10 h-10 mr-4" />
            <h1 className="text-2xl font-bold text-white">Power Nest</h1>
          </div>
          <button className="text-gray-400 hover:text-white transition-colors">
            <div className="w-6 h-6 border border-gray-400 rounded-full flex items-center justify-center">
              <span className="text-xs">?</span>
            </div>
          </button>
        </div>

        {/* Main Content */}
        <div className="text-center mb-12">
          <h2 className="text-4xl font-bold text-white mb-6">Before You Begin the Assessment</h2>
          <p className="text-gray-400 text-lg max-w-3xl mx-auto leading-relaxed">
            You're about to start a short assessment to help us better understand your preferences and goals. 
            Please read the instructions carefully before proceeding:
          </p>
        </div>

        {/* Assessment Details */}
        <div className="mb-12">
          <h3 className="text-2xl font-bold text-white mb-8">Assessment Details:</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="flex items-start">
              <FileText className="w-6 h-6 text-blue-400 mr-4 mt-1 flex-shrink-0" />
              <div>
                <p className="text-white font-medium mb-1">
                  <span className="font-bold">Total Questions:</span> 20
                </p>
              </div>
            </div>
            
            <div className="flex items-start">
              <Clock className="w-6 h-6 text-blue-400 mr-4 mt-1 flex-shrink-0" />
              <div>
                <p className="text-white font-medium mb-1">
                  <span className="font-bold">Total Duration:</span> 15 minutes
                </p>
              </div>
            </div>
            
            <div className="flex items-start">
              <Clock className="w-6 h-6 text-blue-400 mr-4 mt-1 flex-shrink-0" />
              <div>
                <p className="text-white font-medium mb-1">
                  <span className="font-bold">Time per Question:</span> You'll see a timer for each question
                </p>
              </div>
            </div>
            
            <div className="flex items-start">
              <FileText className="w-6 h-6 text-blue-400 mr-4 mt-1 flex-shrink-0" />
              <div>
                <p className="text-white font-medium mb-1">
                  <span className="font-bold">Question Type:</span> Multiple choice (single option only)
                </p>
              </div>
            </div>
            
            <div className="flex items-start">
              <RefreshCw className="w-6 h-6 text-blue-400 mr-4 mt-1 flex-shrink-0" />
              <div>
                <p className="text-white font-medium mb-1">
                  <span className="font-bold">Navigation:</span> You cannot go back to previous questions
                </p>
              </div>
            </div>
            
            <div className="flex items-start">
              <AlertCircle className="w-6 h-6 text-blue-400 mr-4 mt-1 flex-shrink-0" />
              <div>
                <p className="text-white font-medium mb-1">
                  <span className="font-bold">Auto-submit:</span> The test will auto-submit if time runs out
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Important Notes */}
        <div className="mb-12">
          <h3 className="text-2xl font-bold text-white mb-8">Important Note:</h3>
          <div className="space-y-4">
            <div className="flex items-start">
              <Wifi className="w-6 h-6 text-yellow-400 mr-4 mt-1 flex-shrink-0" />
              <p className="text-white">Ensure you have a stable internet connection.</p>
            </div>
            
            <div className="flex items-start">
              <RefreshCw className="w-6 h-6 text-yellow-400 mr-4 mt-1 flex-shrink-0" />
              <p className="text-white">Avoid refreshing or closing the page.</p>
            </div>
            
            <div className="flex items-start">
              <Lock className="w-6 h-6 text-yellow-400 mr-4 mt-1 flex-shrink-0" />
              <p className="text-white">This test can only be taken once.</p>
            </div>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="flex justify-center gap-6">
          <button
            onClick={onSkip}
            className="w-[180px] h-[52px] bg-transparent border border-gray-600 text-white rounded-xl font-medium hover:border-gray-500 hover:bg-gray-900/50 transition-colors focus:outline-none focus:ring-2 focus:ring-gray-500"
          >
            Skip
          </button>
          <button
            onClick={onStartAssessment}
            className="w-[220px] h-[52px] bg-blue-600 text-white rounded-xl font-medium hover:bg-blue-700 transition-colors focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 focus:ring-offset-black"
          >
            Start the Assessment
          </button>
        </div>
      </div>
    </div>
  );
};

export default AssessmentIntroduction;