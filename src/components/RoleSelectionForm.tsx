import React, { useState } from 'react';
import { Lightbulb, DollarSign, HelpCircle } from 'lucide-react';

interface RoleSelectionFormProps {
  onComplete: () => void;
}

const RoleSelectionForm: React.FC<RoleSelectionFormProps> = ({ onComplete }) => {
  const [selectedRole, setSelectedRole] = useState<'founder' | 'investor' | null>(null);

  const handleRoleSelect = (role: 'founder' | 'investor') => {
    setSelectedRole(role);
  };

  const handleGetStarted = () => {
    if (selectedRole) {
      console.log('Selected role:', selectedRole);
      onComplete();
    }
  };

  return (
    <div className="min-h-screen flex">
      {/* Left side - Gradient background with branding */}
      <div className="hidden lg:flex lg:w-1/2 relative overflow-hidden">
        <div 
          className="absolute inset-0 w-full h-full"
          style={{
            background: 'radial-gradient(195.32% 112.27% at 50% 100%, #000000 30.77%, #0C0C4A 44.28%, #0606A9 58.97%, #0000FF 75.08%, #9898FF 91.44%)',
          }}
        />
        <div className="relative z-10 flex flex-col justify-center items-start p-16 text-white">
          <div className="flex items-center mb-12">
            <img src="/image.png" alt="Power Nest Logo" className="w-10 h-10 mr-4" />
            <h1 className="text-2xl font-bold">Power Nest</h1>
          </div>
          <h2 className="text-5xl font-bold leading-tight">
            Let's get to know you
          </h2>
        </div>
      </div>

      {/* Right side - Role Selection */}
      <div className="flex-1 flex items-center justify-center px-8 py-12 bg-black">
        <div className="w-full max-w-lg">
          {/* Mobile branding */}
          <div className="lg:hidden flex items-center mb-8">
            <img src="/image.png" alt="Power Nest Logo" className="w-8 h-8 mr-3" />
            <h1 className="text-xl font-bold text-white">Power Nest</h1>
          </div>

          {/* Help icon */}
          <div className="flex justify-end mb-6">
            <button className="text-gray-400 hover:text-white transition-colors">
              <HelpCircle className="w-6 h-6" />
            </button>
          </div>

          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-white mb-4">Let's get to know you</h2>
            <p className="text-gray-400">
              Are you here to build or invest? Pick your role to tailor the platform for your journey.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
            {/* Founder Option */}
            <button
              onClick={() => handleRoleSelect('founder')}
              className={`relative p-8 rounded-2xl border-2 transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 focus:ring-offset-black ${
                selectedRole === 'founder'
                  ? 'border-blue-500 bg-blue-500/10'
                  : 'border-gray-700 hover:border-gray-600 hover:bg-gray-900/50'
              }`}
            >
              {selectedRole === 'founder' && (
                <div className="absolute top-4 right-4 w-6 h-6 bg-blue-500 rounded-full flex items-center justify-center">
                  <div className="w-2 h-2 bg-white rounded-full"></div>
                </div>
              )}
              <div className="flex flex-col items-center text-center">
                <div className={`w-16 h-16 rounded-2xl flex items-center justify-center mb-4 ${
                  selectedRole === 'founder' ? 'bg-blue-500' : 'bg-gray-800'
                }`}>
                  <Lightbulb className={`w-8 h-8 ${
                    selectedRole === 'founder' ? 'text-white' : 'text-blue-400'
                  }`} />
                </div>
                <h3 className={`text-xl font-bold mb-2 ${
                  selectedRole === 'founder' ? 'text-blue-400' : 'text-white'
                }`}>
                  Founder
                </h3>
                <p className="text-gray-400 text-sm">
                  For entrepreneurs and creators looking to build and grow their ventures
                </p>
              </div>
            </button>

            {/* Investor Option */}
            <button
              onClick={() => handleRoleSelect('investor')}
              className={`relative p-8 rounded-2xl border-2 transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 focus:ring-offset-black ${
                selectedRole === 'investor'
                  ? 'border-blue-500 bg-blue-500/10'
                  : 'border-gray-700 hover:border-gray-600 hover:bg-gray-900/50'
              }`}
            >
              {selectedRole === 'investor' && (
                <div className="absolute top-4 right-4 w-6 h-6 bg-blue-500 rounded-full flex items-center justify-center">
                  <div className="w-2 h-2 bg-white rounded-full"></div>
                </div>
              )}
              <div className="flex flex-col items-center text-center">
                <div className={`w-16 h-16 rounded-2xl flex items-center justify-center mb-4 ${
                  selectedRole === 'investor' ? 'bg-blue-500' : 'bg-gray-800'
                }`}>
                  <DollarSign className={`w-8 h-8 ${
                    selectedRole === 'investor' ? 'text-white' : 'text-gray-400'
                  }`} />
                </div>
                <h3 className={`text-xl font-bold mb-2 ${
                  selectedRole === 'investor' ? 'text-blue-400' : 'text-white'
                }`}>
                  Investor
                </h3>
                <p className="text-gray-400 text-sm">
                  For those seeking investment opportunities and portfolio expansion
                </p>
              </div>
            </button>
          </div>

          <button
            onClick={handleGetStarted}
            disabled={!selectedRole}
            className="w-full bg-blue-600 hover:bg-blue-700 disabled:bg-gray-800 disabled:cursor-not-allowed text-white font-semibold py-4 px-6 rounded-lg transition-colors focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 focus:ring-offset-black"
          >
            Let's get started
          </button>

          <p className="text-center text-gray-500 text-sm mt-4">
            You can always modify your role later in account settings.
          </p>
        </div>
      </div>
    </div>
  );
};

export default RoleSelectionForm;