import React, { useState, useEffect } from 'react';

interface Question {
  id: number;
  question: string;
  options: string[];
}

interface PsychologicalAssessmentProps {
  onComplete: (answers: Record<number, number>) => void;
  onSkip: () => void;
}

const PsychologicalAssessment: React.FC<PsychologicalAssessmentProps> = ({ 
  onComplete, 
  onSkip 
}) => {
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [answers, setAnswers] = useState<Record<number, number>>({});
  const [selectedOption, setSelectedOption] = useState<number | null>(null);

  const questions: Question[] = [
    {
      id: 1,
      question: "Imagine you're leading a team through a challenging project with a tight deadline. A key team member suddenly faces a personal crisis that impacts their work. How would you handle this situation?",
      options: [
        "Offer support and flexibility, adjusting deadlines if necessary.",
        "Prioritize project completion, expecting the team member to manage their personal issues.",
        "Delegate the team member's tasks to others to ensure project continuity.",
        "Encourage the team member to take time off, focusing on their well-being."
      ]
    },
    {
      id: 2,
      question: "When making important business decisions, what approach do you typically take?",
      options: [
        "Gather extensive data and analyze all possible outcomes before deciding.",
        "Trust your intuition and make quick decisions based on experience.",
        "Consult with team members and stakeholders to get diverse perspectives.",
        "Follow established frameworks and proven methodologies."
      ]
    },
    {
      id: 3,
      question: "How do you typically handle conflict within your team?",
      options: [
        "Address it immediately and directly with all parties involved.",
        "Give people time to cool down before facilitating a discussion.",
        "Focus on finding common ground and compromise solutions.",
        "Escalate to higher authority if the conflict persists."
      ]
    },
    {
      id: 4,
      question: "What motivates you most in your professional work?",
      options: [
        "Creating innovative solutions to complex problems.",
        "Building and leading high-performing teams.",
        "Achieving measurable results and hitting targets.",
        "Making a positive impact on society or your industry."
      ]
    },
    {
      id: 5,
      question: "When facing a major setback or failure, how do you typically respond?",
      options: [
        "Analyze what went wrong and develop a detailed recovery plan.",
        "Stay optimistic and motivate the team to keep moving forward.",
        "Take personal responsibility and work harder to fix the situation.",
        "Seek advice from mentors or advisors before taking action."
      ]
    }
  ];

  const progress = ((currentQuestion + 1) / questions.length) * 100;

  const handleOptionSelect = (optionIndex: number) => {
    setSelectedOption(optionIndex);
  };

  const handleNext = () => {
    if (selectedOption !== null) {
      const newAnswers = {
        ...answers,
        [questions[currentQuestion].id]: selectedOption
      };
      setAnswers(newAnswers);

      if (currentQuestion < questions.length - 1) {
        setCurrentQuestion(currentQuestion + 1);
        setSelectedOption(null);
      } else {
        onComplete(newAnswers);
      }
    }
  };

  const currentQ = questions[currentQuestion];

  return (
    <div className="min-h-screen bg-black flex flex-col">
      {/* Header */}
      <div className="flex items-center justify-between p-8">
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

      {/* Progress Bar */}
      <div className="px-8 mb-8">
        <div className="flex items-center justify-between mb-2">
          <span className="text-white text-sm font-medium">{Math.round(progress)}% complete</span>
        </div>
        <div className="w-full bg-gray-800 rounded-full h-2">
          <div 
            className="bg-blue-600 h-2 rounded-full transition-all duration-300 ease-out"
            style={{ width: `${progress}%` }}
          ></div>
        </div>
      </div>

      {/* Main Content */}
      <div className="flex-1 px-8 pb-8">
        <div className="max-w-4xl mx-auto">
          {/* Assessment Header */}
          <div className="mb-12">
            <h2 className="text-4xl font-bold text-white mb-4">Psychological Assessment</h2>
            <p className="text-gray-400 text-lg">
              This assessment helps us understand your leadership style and decision-making approach, enabling us to match you with the most suitable investors and advisors. It takes approximately 10-15 minutes to complete.
            </p>
          </div>

          {/* Question */}
          <div className="mb-12">
            <h3 className="text-xl font-medium text-white mb-8">
              Question {currentQuestion + 1} of {questions.length}
            </h3>
            <p className="text-white text-lg leading-relaxed mb-8">
              {currentQ.question}
            </p>

            {/* Options */}
            <div className="space-y-4">
              {currentQ.options.map((option, index) => (
                <button
                  key={index}
                  onClick={() => handleOptionSelect(index)}
                  className={`w-full p-6 rounded-xl border-2 text-left transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 focus:ring-offset-black ${
                    selectedOption === index
                      ? 'border-blue-500 bg-blue-500/10 text-white'
                      : 'border-gray-700 bg-gray-900 text-gray-300 hover:border-gray-600 hover:bg-gray-800'
                  }`}
                >
                  <div className="flex items-center">
                    <div className={`w-5 h-5 rounded-full border-2 mr-4 flex items-center justify-center ${
                      selectedOption === index
                        ? 'border-blue-500 bg-blue-500'
                        : 'border-gray-500'
                    }`}>
                      {selectedOption === index && (
                        <div className="w-2 h-2 bg-white rounded-full"></div>
                      )}
                    </div>
                    <span className="text-base">{option}</span>
                  </div>
                </button>
              ))}
            </div>
          </div>

          {/* Navigation */}
          <div className="flex justify-between">
            <button
              onClick={onSkip}
              className="w-[180px] h-[52px] bg-transparent border border-gray-600 text-white rounded-xl font-medium hover:border-gray-500 hover:bg-gray-900/50 transition-colors focus:outline-none focus:ring-2 focus:ring-gray-500"
            >
              Skip
            </button>
            <button
              onClick={handleNext}
              disabled={selectedOption === null}
              className="w-[180px] h-[52px] bg-blue-600 text-white rounded-xl font-medium hover:bg-blue-700 disabled:bg-gray-700 disabled:cursor-not-allowed transition-colors focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 focus:ring-offset-black"
            >
              {currentQuestion === questions.length - 1 ? 'Complete' : 'Next'}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PsychologicalAssessment;