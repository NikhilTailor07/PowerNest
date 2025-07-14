import React, { useState } from 'react';
import { User, Building, Phone, Globe, Linkedin, ChevronDown } from 'lucide-react';

interface BasicInfoData {
  fullName: string;
  startupName: string;
  phoneNumber: string;
  countryCode: string;
  country: string;
  website: string;
  linkedin: string;
}

interface BasicInfoFormProps {
  onNext: (data: BasicInfoData) => void;
  onBack: () => void;
}

const BasicInfoForm: React.FC<BasicInfoFormProps> = ({ onNext, onBack }) => {
  const [formData, setFormData] = useState<BasicInfoData>({
    fullName: '',
    startupName: '',
    phoneNumber: '',
    countryCode: '+91',
    country: '',
    website: '',
    linkedin: '',
  });

  const [errors, setErrors] = useState<Partial<BasicInfoData>>({});

  const countries = [
    'United States',
    'India',
    'United Kingdom',
    'Canada',
    'Australia',
    'Germany',
    'France',
    'Singapore',
    'Japan',
    'South Korea',
  ];

  const countryCodes = [
    { code: '+1', country: 'US' },
    { code: '+91', country: 'IN' },
    { code: '+44', country: 'UK' },
    { code: '+61', country: 'AU' },
    { code: '+49', country: 'DE' },
    { code: '+33', country: 'FR' },
    { code: '+65', country: 'SG' },
    { code: '+81', country: 'JP' },
    { code: '+82', country: 'KR' },
  ];

  const validateForm = (): boolean => {
    const newErrors: Partial<BasicInfoData> = {};

    if (!formData.fullName.trim()) {
      newErrors.fullName = 'Full name is required';
    }

    if (!formData.startupName.trim()) {
      newErrors.startupName = 'Startup name is required';
    }

    if (!formData.phoneNumber.trim()) {
      newErrors.phoneNumber = 'Phone number is required';
    } else if (!/^\d{10,15}$/.test(formData.phoneNumber.replace(/\s/g, ''))) {
      newErrors.phoneNumber = 'Please enter a valid phone number';
    }

    if (!formData.country) {
      newErrors.country = 'Country is required';
    }

    if (formData.website && !/^https?:\/\/.+\..+/.test(formData.website)) {
      newErrors.website = 'Please enter a valid website URL';
    }

    if (formData.linkedin && !/^https?:\/\/(www\.)?linkedin\.com\//.test(formData.linkedin)) {
      newErrors.linkedin = 'Please enter a valid LinkedIn profile URL';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value,
    }));

    // Clear error when user starts typing
    if (errors[name as keyof BasicInfoData]) {
      setErrors(prev => ({
        ...prev,
        [name]: undefined,
      }));
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (validateForm()) {
      onNext(formData);
    }
  };

  const sidebarSteps = [
    { id: 1, title: 'Basic Info', icon: User, active: true },
    { id: 2, title: 'Startup Profile', icon: Building, active: false },
    { id: 3, title: 'Upload Documents', icon: Globe, active: false },
    { id: 4, title: 'Add your Team', icon: User, active: false },
    { id: 5, title: 'Psychological Assessment', icon: User, active: false },
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
                    : 'text-gray-500'
                }`}
              >
                <div className={`w-8 h-8 rounded-full flex items-center justify-center mr-4 ${
                  step.active ? 'bg-blue-600' : 'bg-gray-700'
                }`}>
                  <IconComponent className={`w-4 h-4 ${
                    step.active ? 'text-white' : 'text-gray-400'
                  }`} />
                </div>
                <span className={`font-medium ${
                  step.active ? 'text-white' : 'text-gray-400'
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
            <h2 className="text-4xl font-bold text-white mb-2">Basic Info</h2>
            <p className="text-gray-400">
              Let's start with some basic information about you and your startup.
            </p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-8">
            {/* Full Name */}
            <div className="form-group">
              <label className="block text-lg font-medium text-white mb-2">
                Full Name
              </label>
              <input
                type="text"
                name="fullName"
                value={formData.fullName}
                onChange={handleInputChange}
                className={`w-[434px] h-14 bg-gray-900 rounded-xl px-5 py-4 text-white placeholder-gray-500 border transition-colors focus:outline-none focus:ring-2 focus:ring-blue-500 ${
                  errors.fullName ? 'border-red-500' : 'border-gray-700 hover:border-gray-600'
                }`}
                placeholder="Enter your Full Name"
              />
              {errors.fullName && (
                <p className="mt-2 text-sm text-red-500">{errors.fullName}</p>
              )}
            </div>

            {/* Startup Name */}
            <div className="form-group">
              <label className="block text-lg font-medium text-white mb-2">
                Startup Name
              </label>
              <input
                type="text"
                name="startupName"
                value={formData.startupName}
                onChange={handleInputChange}
                className={`w-[434px] h-14 bg-gray-900 rounded-xl px-5 py-4 text-white placeholder-gray-500 border transition-colors focus:outline-none focus:ring-2 focus:ring-blue-500 ${
                  errors.startupName ? 'border-red-500' : 'border-gray-700 hover:border-gray-600'
                }`}
                placeholder="Enter your Startup Name"
              />
              {errors.startupName && (
                <p className="mt-2 text-sm text-red-500">{errors.startupName}</p>
              )}
            </div>

            {/* Phone Number */}
            <div className="form-group">
              <label className="block text-lg font-medium text-white mb-2">
                Phone Number
              </label>
              <div className="flex gap-3">
                <div className="relative">
                  <select
                    name="countryCode"
                    value={formData.countryCode}
                    onChange={handleInputChange}
                    className="w-24 h-14 bg-gray-900 rounded-xl px-3 py-4 text-white border border-gray-700 hover:border-gray-600 focus:outline-none focus:ring-2 focus:ring-blue-500 appearance-none cursor-pointer"
                  >
                    {countryCodes.map((item) => (
                      <option key={item.code} value={item.code}>
                        {item.code}
                      </option>
                    ))}
                  </select>
                  <ChevronDown className="absolute right-2 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400 pointer-events-none" />
                </div>
                <input
                  type="tel"
                  name="phoneNumber"
                  value={formData.phoneNumber}
                  onChange={handleInputChange}
                  className={`flex-1 max-w-[340px] h-14 bg-gray-900 rounded-xl px-5 py-4 text-white placeholder-gray-500 border transition-colors focus:outline-none focus:ring-2 focus:ring-blue-500 ${
                    errors.phoneNumber ? 'border-red-500' : 'border-gray-700 hover:border-gray-600'
                  }`}
                  placeholder="Enter your Phone Number"
                />
              </div>
              {errors.phoneNumber && (
                <p className="mt-2 text-sm text-red-500">{errors.phoneNumber}</p>
              )}
            </div>

            {/* Country */}
            <div className="form-group">
              <label className="block text-lg font-medium text-white mb-2">
                Country
              </label>
              <div className="relative">
                <select
                  name="country"
                  value={formData.country}
                  onChange={handleInputChange}
                  className={`w-[434px] h-14 bg-gray-900 rounded-xl px-5 py-4 text-white border transition-colors focus:outline-none focus:ring-2 focus:ring-blue-500 appearance-none cursor-pointer ${
                    errors.country ? 'border-red-500' : 'border-gray-700 hover:border-gray-600'
                  } ${!formData.country ? 'text-gray-500' : 'text-white'}`}
                >
                  <option value="">Select your Country</option>
                  {countries.map((country) => (
                    <option key={country} value={country}>
                      {country}
                    </option>
                  ))}
                </select>
                <ChevronDown className="absolute right-5 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400 pointer-events-none" />
              </div>
              {errors.country && (
                <p className="mt-2 text-sm text-red-500">{errors.country}</p>
              )}
            </div>

            {/* Website */}
            <div className="form-group">
              <label className="block text-lg font-medium text-white mb-2">
                Website
              </label>
              <input
                type="url"
                name="website"
                value={formData.website}
                onChange={handleInputChange}
                className={`w-[434px] h-14 bg-gray-900 rounded-xl px-5 py-4 text-white placeholder-gray-500 border transition-colors focus:outline-none focus:ring-2 focus:ring-blue-500 ${
                  errors.website ? 'border-red-500' : 'border-gray-700 hover:border-gray-600'
                }`}
                placeholder="Enter your Website"
              />
              {errors.website && (
                <p className="mt-2 text-sm text-red-500">{errors.website}</p>
              )}
            </div>

            {/* LinkedIn */}
            <div className="form-group">
              <label className="block text-lg font-medium text-white mb-2">
                LinkedIn
              </label>
              <input
                type="url"
                name="linkedin"
                value={formData.linkedin}
                onChange={handleInputChange}
                className={`w-[434px] h-14 bg-gray-900 rounded-xl px-5 py-4 text-white placeholder-gray-500 border transition-colors focus:outline-none focus:ring-2 focus:ring-blue-500 ${
                  errors.linkedin ? 'border-red-500' : 'border-gray-700 hover:border-gray-600'
                }`}
                placeholder="Enter your LinkedIn profile link"
              />
              {errors.linkedin && (
                <p className="mt-2 text-sm text-red-500">{errors.linkedin}</p>
              )}
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

export default BasicInfoForm;