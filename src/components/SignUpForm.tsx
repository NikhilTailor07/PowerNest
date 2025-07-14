import React, { useState } from 'react';
import { Mail, Lock, Check, AlertCircle } from 'lucide-react';
import GoogleAuth from './GoogleAuth';
import LinkedInAuth from './LinkedInAuth';

interface FormData {
  email: string;
  password: string;
  agreeToTerms: boolean;
}

interface FormErrors {
  email?: string;
  password?: string;
  agreeToTerms?: string;
}

interface SignUpFormProps {
  onForgotPassword: () => void;
  onSignUpSuccess: () => void;
  onLoginSuccess: (userData: any) => void;
}

const SignUpForm: React.FC<SignUpFormProps> = ({ onForgotPassword, onSignUpSuccess, onLoginSuccess }) => {
  const [formData, setFormData] = useState<FormData>({
    email: '',
    password: '',
    agreeToTerms: false,
  });

  const [errors, setErrors] = useState<FormErrors>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  const validateForm = (): boolean => {
    const newErrors: FormErrors = {};

    // Email validation
    if (!formData.email) {
      newErrors.email = 'Email is required';
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      newErrors.email = 'Please enter a valid email address';
    }

    // Password validation
    if (!formData.password) {
      newErrors.password = 'Password is required';
    } else if (formData.password.length < 8) {
      newErrors.password = 'Password must be at least 8 characters long';
    } else if (!/(?=.*[a-z])(?=.*[A-Z])(?=.*\d)/.test(formData.password)) {
      newErrors.password = 'Password must contain at least one uppercase letter, one lowercase letter, and one number';
    }

    // Terms validation
    if (!formData.agreeToTerms) {
      newErrors.agreeToTerms = 'You must agree to the terms and conditions';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value, type, checked } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value,
    }));

    // Clear error when user starts typing
    if (errors[name as keyof FormErrors]) {
      setErrors(prev => ({
        ...prev,
        [name]: undefined,
      }));
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!validateForm()) {
      return;
    }

    setIsSubmitting(true);

    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 2000));
      
      // Handle successful submission
      console.log('Form submitted successfully:', formData);
      
      // Reset form
      setFormData({
        email: '',
        password: '',
        agreeToTerms: false,
      });
      
      onSignUpSuccess();
    } catch (error) {
      console.error('Error submitting form:', error);
      alert('An error occurred. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  // const handleSocialLogin = (provider: 'google' | 'linkedin') => {
  //   console.log(`Attempting to login with ${provider}`);
  //   // Implement social login logic here
  // };

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
            Create an account
          </h2>
        </div>
      </div>

      {/* Right side - Form */}
      <div className="flex-1 flex items-center justify-center px-8 py-12 bg-black">
        <div className="w-full max-w-md">
          {/* Mobile branding */}
          <div className="lg:hidden flex items-center mb-8">
            <img src="/image.png" alt="Power Nest Logo" className="w-8 h-8 mr-3" />
            <h1 className="text-xl font-bold text-white">Power Nest</h1>
          </div>

          <div className="mb-8">
            <h2 className="text-3xl font-bold text-white mb-2">Create an account</h2>
            <p className="text-gray-400">
              Already have an account?{' '}
              <button 
                onClick={() => window.location.reload()} // This will reset to login state
                className="text-blue-400 hover:text-blue-300 underline transition-colors"
              >
                Sign In
              </button>
              {' | '}
              <button 
                onClick={onForgotPassword}
                className="text-blue-400 hover:text-blue-300 underline transition-colors"
              >
                Forgot Password?
              </button>
            </p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Email Field */}
            <div>
              <label htmlFor="email" className="block text-sm font-medium text-white mb-2">
                Email
              </label>
              <div className="relative">
                <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                <input
                  type="email"
                  id="email"
                  name="email"
                  value={formData.email}
                  onChange={handleInputChange}
                  className={`w-full pl-10 pr-4 py-3 bg-gray-800 text-white rounded-lg border transition-colors focus:outline-none focus:ring-2 focus:ring-blue-500 ${
                    errors.email ? 'border-red-500' : 'border-gray-700 hover:border-gray-600'
                  }`}
                  placeholder="Enter your Email"
                />
                {errors.email && (
                  <div className="absolute right-3 top-1/2 transform -translate-y-1/2">
                    <AlertCircle className="w-5 h-5 text-red-500" />
                  </div>
                )}
              </div>
              {errors.email && (
                <p className="mt-1 text-sm text-red-500">{errors.email}</p>
              )}
            </div>

            {/* Password Field */}
            <div>
              <label htmlFor="password" className="block text-sm font-medium text-white mb-2">
                Password
              </label>
              <div className="relative">
                <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                <input
                  type={showPassword ? 'text' : 'password'}
                  id="password"
                  name="password"
                  value={formData.password}
                  onChange={handleInputChange}
                  className={`w-full pl-10 pr-12 py-3 bg-gray-800 text-white rounded-lg border transition-colors focus:outline-none focus:ring-2 focus:ring-blue-500 ${
                    errors.password ? 'border-red-500' : 'border-gray-700 hover:border-gray-600'
                  }`}
                  placeholder="Enter your Password"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-300 transition-colors"
                >
                  {showPassword ? '👁️' : '👁️‍🗨️'}
                </button>
                {errors.password && (
                  <div className="absolute right-10 top-1/2 transform -translate-y-1/2">
                    <AlertCircle className="w-5 h-5 text-red-500" />
                  </div>
                )}
              </div>
              {errors.password && (
                <p className="mt-1 text-sm text-red-500">{errors.password}</p>
              )}
            </div>

            {/* Terms Checkbox */}
            <div>
              <label className="flex items-start space-x-3">
                <div className="relative">
                  <input
                    type="checkbox"
                    name="agreeToTerms"
                    checked={formData.agreeToTerms}
                    onChange={handleInputChange}
                    className="sr-only"
                  />
                  <div className={`w-5 h-5 border-2 rounded transition-colors cursor-pointer ${
                    formData.agreeToTerms 
                      ? 'bg-blue-600 border-blue-600' 
                      : errors.agreeToTerms 
                        ? 'border-red-500' 
                        : 'border-gray-600 hover:border-gray-500'
                  }`}>
                    {formData.agreeToTerms && (
                      <Check className="w-3 h-3 text-white absolute top-0.5 left-0.5" />
                    )}
                  </div>
                </div>
                <span className="text-sm text-gray-300">
                  I agree to the{' '}
                  <button 
                    type="button"
                    className="text-blue-400 hover:text-blue-300 underline transition-colors"
                  >
                    terms & conditions
                  </button>
                </span>
              </label>
              {errors.agreeToTerms && (
                <p className="mt-1 text-sm text-red-500">{errors.agreeToTerms}</p>
              )}
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              disabled={isSubmitting}
              className="w-full bg-blue-600 hover:bg-blue-700 disabled:bg-blue-800 disabled:cursor-not-allowed text-white font-semibold py-3 px-4 rounded-lg transition-colors focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 focus:ring-offset-black"
            >
              {isSubmitting ? 'Creating Account...' : 'Sign Up'}
            </button>

            {/* Social Login Options */}
          <div className="space-y-4">
              <div className="flex items-center my-4">
  <div className="flex-grow border-t border-gray-700"></div>
  <span className="px-2 text-gray-400 text-sm">Or register with</span>
  <div className="flex-grow border-t border-gray-700"></div>
</div>

              

              <div className="grid grid-cols-2 gap-3">
                
      <GoogleAuth onSuccess={onLoginSuccess} />
      <LinkedInAuth onSuccess={onLoginSuccess} />
               </div>

              
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default SignUpForm;