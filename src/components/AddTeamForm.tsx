import React, { useState } from 'react';
import { User, Building, Upload, Plus, X, Edit2, Check } from 'lucide-react';

interface TeamMember {
  id: string;
  name: string;
  role: string;
  linkedin: string;
}

interface AddTeamFormProps {
  onNext: (data: { teamMembers: TeamMember[] }) => void;
  onBack: () => void;
}

const AddTeamForm: React.FC<AddTeamFormProps> = ({ onNext, onBack }) => {
  const [teamMembers, setTeamMembers] = useState<TeamMember[]>([]);
  const [currentMember, setCurrentMember] = useState({
    name: '',
    role: '',
    linkedin: '',
  });
  const [errors, setErrors] = useState<{ name?: string; role?: string; linkedin?: string }>({});

  const generateId = () => Math.random().toString(36).substr(2, 9);

  const validateCurrentMember = (): boolean => {
    const newErrors: { name?: string; role?: string; linkedin?: string } = {};

    if (!currentMember.name.trim()) {
      newErrors.name = 'Name is required';
    }

    if (!currentMember.role.trim()) {
      newErrors.role = 'Role is required';
    }

    if (currentMember.linkedin && !/^https?:\/\/(www\.)?linkedin\.com\//.test(currentMember.linkedin)) {
      newErrors.linkedin = 'Please enter a valid LinkedIn profile URL';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setCurrentMember(prev => ({
      ...prev,
      [name]: value,
    }));

    // Clear error when user starts typing
    if (errors[name as keyof typeof errors]) {
      setErrors(prev => ({
        ...prev,
        [name]: undefined,
      }));
    }
  };

  const handleAddMember = () => {
    if (validateCurrentMember()) {
      const newMember: TeamMember = {
        id: generateId(),
        ...currentMember,
      };
      
      setTeamMembers(prev => [...prev, newMember]);
      setCurrentMember({ name: '', role: '', linkedin: '' });
      setErrors({});
    }
  };

  const handleRemoveMember = (id: string) => {
    setTeamMembers(prev => prev.filter(member => member.id !== id));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onNext({ teamMembers });
  };

  const sidebarSteps = [
    { id: 1, title: 'Basic Info', icon: User, active: false, completed: true },
    { id: 2, title: 'Startup Profile', icon: Building, active: false, completed: true },
    { id: 3, title: 'Upload Documents', icon: Upload, active: false, completed: true },
    { id: 4, title: 'Add your Team', icon: User, active: true, completed: false },
    { id: 5, title: 'Psychological Assessment', icon: User, active: false, completed: false },
  ];

  return (
    <div className="min-h-screen bg-black flex">
      {/* Sidebar */}
      <div className="w-[528px] h-screen bg-gray-800/5 rounded-xl p-5 m-10 mr-0">
        <div className="flex items-center mb-12">
          <img src="/image.png" alt="Power Nest Logo" className="w-10 h-10 mr-4" />
          <h1 className="text-2xl font-bold text-white">Power Nest</h1>
        </div>

        <nav className="space-y-4">
          {sidebarSteps.map((step) => {
            const IconComponent = step.icon;
            return (
              <div
                key={step.id}
                className={`flex items-center p-4 rounded-lg transition-colors ${
                  step.active
                    ? 'bg-blue-600/20 border border-blue-500/30'
                    : step.completed
                    ? 'bg-green-600/20 border border-green-500/30'
                    : 'text-gray-500'
                }`}
              >
                <div className={`w-8 h-8 rounded-full flex items-center justify-center mr-4 ${
                  step.active 
                    ? 'bg-blue-600' 
                    : step.completed 
                    ? 'bg-green-600' 
                    : 'bg-gray-700'
                }`}>
                  {step.completed ? (
                    <Check className="w-4 h-4 text-white" />
                  ) : (
                    <IconComponent className={`w-4 h-4 ${
                      step.active ? 'text-white' : 'text-gray-400'
                    }`} />
                  )}
                </div>
                <span className={`font-medium ${
                  step.active 
                    ? 'text-white' 
                    : step.completed 
                    ? 'text-green-400' 
                    : 'text-gray-400'
                }`}>
                  {step.title}
                </span>
              </div>
            );
          })}
        </nav>
      </div>

      {/* Main Content */}
      <div className="flex-1 p-10 pl-8">
        <div className="max-w-[898px]">
          <div className="mb-12">
            <h2 className="text-4xl font-bold text-white mb-2">Add your Team</h2>
            <p className="text-gray-400">
              Build your team by adding key members. Include their names, roles, and LinkedIn profiles to showcase your team's expertise.
            </p>
          </div>

          {/* Existing Team Members */}
          {teamMembers.length > 0 && (
            <div className="mb-8">
              <h3 className="text-lg font-medium text-white mb-4">Team Members ({teamMembers.length})</h3>
              <div className="space-y-3">
                {teamMembers.map((member) => (
                  <div key={member.id} className="bg-gray-900 rounded-xl p-4 flex items-center justify-between">
                    <div className="flex items-center">
                      <div className="w-10 h-10 bg-blue-600 rounded-full flex items-center justify-center mr-4">
                        <User className="w-5 h-5 text-white" />
                      </div>
                      <div>
                        <div className="flex items-center mb-1">
                          <span className="text-white font-medium mr-2">{member.name}</span>
                          <Edit2 className="w-4 h-4 text-gray-400" />
                        </div>
                        <p className="text-gray-400 text-sm">{member.role}</p>
                        {member.linkedin && (
                          <a 
                            href={member.linkedin} 
                            target="_blank" 
                            rel="noopener noreferrer"
                            className="text-blue-400 text-xs hover:text-blue-300 transition-colors"
                          >
                            LinkedIn Profile
                          </a>
                        )}
                      </div>
                    </div>
                    <button
                      onClick={() => handleRemoveMember(member.id)}
                      className="text-red-400 hover:text-red-300 transition-colors"
                    >
                      <X className="w-5 h-5" />
                    </button>
                  </div>
                ))}
              </div>
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-8">
            {/* Add New Member Section */}
            <div className="bg-gray-900/50 rounded-xl p-6 border border-gray-800">
              <h3 className="text-lg font-medium text-white mb-6">Add Team Member</h3>
              
              {/* Name */}
              <div className="form-group mb-6">
                <label className="block text-lg font-medium text-white mb-2">
                  Name
                </label>
                <input
                  type="text"
                  name="name"
                  value={currentMember.name}
                  onChange={handleInputChange}
                  className={`w-[434px] h-14 bg-gray-900 rounded-xl px-5 py-4 text-white placeholder-gray-500 border transition-colors focus:outline-none focus:ring-2 focus:ring-blue-500 ${
                    errors.name ? 'border-red-500' : 'border-gray-700 hover:border-gray-600'
                  }`}
                  placeholder="Enter Name"
                />
                {errors.name && (
                  <p className="mt-2 text-sm text-red-500">{errors.name}</p>
                )}
              </div>

              {/* Role */}
              <div className="form-group mb-6">
                <label className="block text-lg font-medium text-white mb-2">
                  Role
                </label>
                <input
                  type="text"
                  name="role"
                  value={currentMember.role}
                  onChange={handleInputChange}
                  className={`w-[434px] h-14 bg-gray-900 rounded-xl px-5 py-4 text-white placeholder-gray-500 border transition-colors focus:outline-none focus:ring-2 focus:ring-blue-500 ${
                    errors.role ? 'border-red-500' : 'border-gray-700 hover:border-gray-600'
                  }`}
                  placeholder="Enter Role"
                />
                {errors.role && (
                  <p className="mt-2 text-sm text-red-500">{errors.role}</p>
                )}
              </div>

              {/* LinkedIn */}
              <div className="form-group mb-6">
                <label className="block text-lg font-medium text-white mb-2">
                  LinkedIn
                </label>
                <input
                  type="url"
                  name="linkedin"
                  value={currentMember.linkedin}
                  onChange={handleInputChange}
                  className={`w-[434px] h-14 bg-gray-900 rounded-xl px-5 py-4 text-white placeholder-gray-500 border transition-colors focus:outline-none focus:ring-2 focus:ring-blue-500 ${
                    errors.linkedin ? 'border-red-500' : 'border-gray-700 hover:border-gray-600'
                  }`}
                  placeholder="Enter LinkedIn profile link"
                />
                {errors.linkedin && (
                  <p className="mt-2 text-sm text-red-500">{errors.linkedin}</p>
                )}
              </div>

              {/* Add Button */}
              <button
                type="button"
                onClick={handleAddMember}
                className="w-[120px] h-[52px] bg-white text-black rounded-xl font-medium hover:bg-gray-100 transition-colors focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-black flex items-center justify-center"
              >
                <Plus className="w-4 h-4 mr-2" />
                Add
              </button>
            </div>

            {/* Navigation Buttons */}
            <div className="flex justify-between pt-8">
              <button
                type="button"
                onClick={onBack}
                className="w-[180px] h-[52px] bg-transparent border border-gray-600 text-white rounded-xl font-medium hover:border-gray-500 hover:bg-gray-900/50 transition-colors focus:outline-none focus:ring-2 focus:ring-gray-500"
              >
                Back
              </button>
              <button
                type="submit"
                className="w-[180px] h-[52px] bg-blue-600 text-white rounded-xl font-medium hover:bg-blue-700 transition-colors focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 focus:ring-offset-black"
              >
                Next
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default AddTeamForm;