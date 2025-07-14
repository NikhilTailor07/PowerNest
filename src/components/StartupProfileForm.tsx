import React, { useState, useRef } from 'react';
import { User, Building, Globe, Upload, ImageIcon, Check, ChevronDown } from 'lucide-react';

interface StartupProfileData {
  logo: File | null;
  sector: string;
  stage: string;
  fundingRaised: string;
  fundingRaisedUnit: 'thousand' | 'million' | 'billion';
  currentFundingNeeds: string;
  currentFundingNeedsUnit: 'thousand' | 'million' | 'billion';
}

interface StartupProfileFormProps {
  onNext: (data: StartupProfileData) => void;
  onBack: () => void;
}

const StartupProfileForm: React.FC<StartupProfileFormProps> = ({ onNext, onBack }) => {
  const [formData, setFormData] = useState<StartupProfileData>({
    logo: null,
    sector: '',
    stage: '',
    fundingRaised: '',
    fundingRaisedUnit: 'million',
    currentFundingNeeds: '',
    currentFundingNeedsUnit: 'million',
  });

  const [errors, setErrors] = useState<Partial<StartupProfileData>>({});
  const [logoPreview, setLogoPreview] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const sectors = [
    'Technology',
    'Healthcare',
    'Finance',
    'E-commerce',
    'Education',
    'Real Estate',
    'Manufacturing',
    'Food & Beverage',
    'Transportation',
    'Energy',
    'Entertainment',
    'Agriculture',
    'Retail',
    'Consulting',
    'Other',
  ];

  const stages = [
    'Idea Stage',
    'Pre-Seed',
    'Seed',
    'Series A',
    'Series B',
    'Series C',
    'Series D+',
    'IPO Ready',
    'Public Company',
  ];

  const validateForm = (): boolean => {
    const newErrors: Partial<StartupProfileData> = {};

    if (!formData.sector) {
      newErrors.sector = 'Sector is required';
    }

    if (!formData.stage) {
      newErrors.stage = 'Stage is required';
    }

    if (!formData.fundingRaised) {
      newErrors.fundingRaised = 'Funding raised amount is required';
    } else if (isNaN(Number(formData.fundingRaised)) || Number(formData.fundingRaised) < 0) {
      newErrors.fundingRaised = 'Please enter a valid amount';
    }

    if (!formData.currentFundingNeeds) {
      newErrors.currentFundingNeeds = 'Current funding needs is required';
    } else if (isNaN(Number(formData.currentFundingNeeds)) || Number(formData.currentFundingNeeds) < 0) {
      newErrors.currentFundingNeeds = 'Please enter a valid amount';
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
    if (errors[name as keyof StartupProfileData]) {
      setErrors(prev => ({
        ...prev,
        [name]: undefined,
      }));
    }
  };

  const handleLogoUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      // Validate file type
      if (!file.type.startsWith('image/')) {
        setErrors(prev => ({ ...prev, logo: 'Please upload an image file' }));
        return;
      }

      // Validate file size (max 5MB)
      if (file.size > 5 * 1024 * 1024) {
        setErrors(prev => ({ ...prev, logo: 'File size must be less than 5MB' }));
        return;
      }

      setFormData(prev => ({ ...prev, logo: file }));
      
      // Create preview
      const reader = new FileReader();
      reader.onload = (e) => {
        setLogoPreview(e.target?.result as string);
      };
      reader.readAsDataURL(file);

      // Clear any previous errors
      setErrors(prev => ({ ...prev, logo: undefined }));
    }
  };

  const handleUploadClick = () => {
    fileInputRef.current?.click();
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (validateForm()) {
      onNext(formData);
    }
  };

  const formatCurrency = (value: string) => {
    // Remove non-numeric characters except decimal point
    const numericValue = value.replace(/[^0-9.]/g, '');
    return numericValue;
  };

  const sidebarSteps = [
    { id: 1, title: 'Basic Info', icon: User, active: false, completed: true },
    { id: 2, title: 'Startup Profile', icon: Building, active: true, completed: false },
    { id: 3, title: 'Upload Documents', icon: Globe, active: false, completed: false },
    { id: 4, title: 'Add your Team', icon: User, active: false, completed: false },
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
            <h2 className="text-4xl font-bold text-white mb-2">Startup Profile</h2>
            <p className="text-gray-400">
              Tell us more about your startup to help us connect you with the right opportunities.
            </p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-8">
            {/* Logo Upload */}
            <div className="form-group">
              <label className="block text-lg font-medium text-white mb-2">
                Logo
              </label>
              <div 
                onClick={handleUploadClick}
                className={`w-[434px] h-[120px] bg-gray-900 rounded-xl border-2 border-dashed transition-colors cursor-pointer hover:border-gray-600 flex items-center justify-center ${
                  errors.logo ? 'border-red-500' : 'border-gray-700'
                }`}
              >
                <input
                  ref={fileInputRef}
                  type="file"
                  accept="image/*"
                  onChange={handleLogoUpload}
                  className="hidden"
                  aria-label="Upload startup logo"
                />
                {logoPreview ? (
                  <img 
                    src={logoPreview} 
                    alt="Logo preview" 
                    className="max-h-[80px] max-w-[200px] object-contain"
                  />
                ) : (
                  <div className="text-center">
                    <ImageIcon className="w-8 h-8 text-gray-500 mx-auto mb-2" />
                    <p className="text-gray-500 text-sm">Upload your Logo here</p>
                    <p className="text-gray-600 text-xs mt-1">PNG, JPG up to 5MB</p>
                  </div>
                )}
              </div>
              {errors.logo && (
                <p className="mt-2 text-sm text-red-500">{errors.logo}</p>
              )}
            </div>

            {/* Sector */}
            <div className="form-group">
              <label className="block text-lg font-medium text-white mb-2">
                Sector
              </label>
              <div className="relative">
                <select
                  name="sector"
                  value={formData.sector}
                  onChange={handleInputChange}
                  className={`w-[434px] h-14 bg-gray-900 rounded-xl px-5 py-4 text-white border transition-colors focus:outline-none focus:ring-2 focus:ring-blue-500 appearance-none cursor-pointer ${
                    errors.sector ? 'border-red-500' : 'border-gray-700 hover:border-gray-600'
                  } ${!formData.sector ? 'text-gray-500' : 'text-white'}`}
                >
                  <option value="">Select your sector</option>
                  {sectors.map((sector) => (
                    <option key={sector} value={sector}>
                      {sector}
                    </option>
                  ))}
                </select>
                <ChevronDown className="absolute right-5 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400 pointer-events-none" />
              </div>
              {errors.sector && (
                <p className="mt-2 text-sm text-red-500">{errors.sector}</p>
              )}
            </div>

            {/* Stage */}
            <div className="form-group">
              <label className="block text-lg font-medium text-white mb-2">
                Stage
              </label>
              <div className="relative">
                <select
                  name="stage"
                  value={formData.stage}
                  onChange={handleInputChange}
                  className={`w-[434px] h-14 bg-gray-900 rounded-xl px-5 py-4 text-white border transition-colors focus:outline-none focus:ring-2 focus:ring-blue-500 appearance-none cursor-pointer ${
                    errors.stage ? 'border-red-500' : 'border-gray-700 hover:border-gray-600'
                  } ${!formData.stage ? 'text-gray-500' : 'text-white'}`}
                >
                  <option value="">Select your Stage</option>
                  {stages.map((stage) => (
                    <option key={stage} value={stage}>
                      {stage}
                    </option>
                  ))}
                </select>
                <ChevronDown className="absolute right-5 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400 pointer-events-none" />
              </div>
              {errors.stage && (
                <p className="mt-2 text-sm text-red-500">{errors.stage}</p>
              )}
            </div>

            {/* Funding Raised */}
            <div className="form-group">
              <label className="block text-lg font-medium text-white mb-2">
                Funding Raised to Date
              </label>
              <div className="flex gap-3">
                <input
                  type="text"
                  name="fundingRaised"
                  value={formData.fundingRaised}
                  onChange={handleInputChange}
                  className={`flex-1 max-w-[280px] h-14 bg-gray-900 rounded-xl px-5 py-4 text-white placeholder-gray-500 border transition-colors focus:outline-none focus:ring-2 focus:ring-blue-500 ${
                    errors.fundingRaised ? 'border-red-500' : 'border-gray-700 hover:border-gray-600'
                  }`}
                  placeholder="Enter amount"
                />
                <div className="relative">
                  <select
                    name="fundingRaisedUnit"
                    value={formData.fundingRaisedUnit}
                    onChange={handleInputChange}
                    className="w-32 h-14 bg-gray-900 rounded-xl px-3 py-4 text-white border border-gray-700 hover:border-gray-600 focus:outline-none focus:ring-2 focus:ring-blue-500 appearance-none cursor-pointer"
                  >
                    <option value="thousand">Thousand</option>
                    <option value="million">Million</option>
                    <option value="billion">Billion</option>
                  </select>
                  <ChevronDown className="absolute right-2 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400 pointer-events-none" />
                </div>
              </div>
              {errors.fundingRaised && (
                <p className="mt-2 text-sm text-red-500">{errors.fundingRaised}</p>
              )}
              <p className="mt-2 text-sm text-gray-500">
                Please enter numerical values and select the appropriate unit of measurement from the dropdown menu.
              </p>
            </div>

            {/* Current Funding Needs */}
            <div className="form-group">
              <label className="block text-lg font-medium text-white mb-2">
                Current Funding Needs
              </label>
              <div className="flex gap-3">
                <input
                  type="text"
                  name="currentFundingNeeds"
                  value={formData.currentFundingNeeds}
                  onChange={handleInputChange}
                  className={`flex-1 max-w-[280px] h-14 bg-gray-900 rounded-xl px-5 py-4 text-white placeholder-gray-500 border transition-colors focus:outline-none focus:ring-2 focus:ring-blue-500 ${
                    errors.currentFundingNeeds ? 'border-red-500' : 'border-gray-700 hover:border-gray-600'
                  }`}
                  placeholder="Enter amount"
                />
                <div className="relative">
                  <select
                    name="currentFundingNeedsUnit"
                    value={formData.currentFundingNeedsUnit}
                    onChange={handleInputChange}
                    className="w-32 h-14 bg-gray-900 rounded-xl px-3 py-4 text-white border border-gray-700 hover:border-gray-600 focus:outline-none focus:ring-2 focus:ring-blue-500 appearance-none cursor-pointer"
                  >
                    <option value="thousand">Thousand</option>
                    <option value="million">Million</option>
                    <option value="billion">Billion</option>
                  </select>
                  <ChevronDown className="absolute right-2 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400 pointer-events-none" />
                </div>
              </div>
              {errors.currentFundingNeeds && (
                <p className="mt-2 text-sm text-red-500">{errors.currentFundingNeeds}</p>
              )}
              <p className="mt-2 text-sm text-gray-500">
                Please enter numerical values and select the appropriate unit of measurement from the dropdown menu.
              </p>
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

export default StartupProfileForm;