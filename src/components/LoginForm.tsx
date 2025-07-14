import React, { useState } from 'react';
import { Mail, Lock, AlertCircle, Eye, EyeOff } from 'lucide-react';
import GoogleAuth from "./GoogleAuth";
import LinkedInAuth from "./LinkedInAuth";

interface LoginFormData {
  email: string;
  password: string;
  rememberMe: boolean;
}

interface LoginFormErrors {
  email?: string;
  password?: string;
  general?: string;
}

interface LoginFormProps {
  onForgotPassword: () => void;
  onSignUp: () => void;
  onLoginSuccess: (userData: any) => void;
}

const LoginForm: React.FC<LoginFormProps> = ({ onForgotPassword, onSignUp, onLoginSuccess }) => {
  const [formData, setFormData] = useState<LoginFormData>({
    email: '',
    password: '',
    rememberMe: false,
  });

  const [errors, setErrors] = useState<LoginFormErrors>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  const validateForm = (): boolean => {
    const newErrors: LoginFormErrors = {};

    // Email validation
    if (!formData.email) {
      newErrors.email = 'Email is required';
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      newErrors.email = 'Please enter a valid email address';
    }

    // Password validation
    if (!formData.password) {
      newErrors.password = 'Password is required';
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
    if (errors[name as keyof LoginFormErrors]) {
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
    setErrors({});

    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 2000));
      
      // Mock user data - in real app this would come from API
      const userData = {
        name: 'Alex Johnson',
        email: formData.email,
        role: 'Founder',
        lastLogin: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000), // 2 days ago
        notifications: [
          { id: 1, type: 'message', content: '3 new investor inquiries', time: '2 hours ago' },
          { id: 2, type: 'update', content: 'Platform update: New analytics dashboard', time: '1 day ago' },
          { id: 3, type: 'achievement', content: 'Your pitch deck was viewed 15 times', time: '2 days ago' }
        ],
        quickActions: [
          { id: 1, title: 'View Dashboard', icon: 'BarChart3', description: 'Check your latest metrics' },
          { id: 2, title: 'Investor Network', icon: 'Users', description: 'Connect with investors' },
          { id: 3, title: 'Pitch Deck', icon: 'FileText', description: 'Update your presentation' },
          { id: 4, title: 'Messages', icon: 'MessageSquare', description: '5 unread messages' }
        ]
      };
      
      console.log('Login successful:', formData);
      onLoginSuccess(userData);
    } catch (error) {
      console.error('Login error:', error);
      setErrors({ general: 'Invalid email or password. Please try again.' });
    } finally {
      setIsSubmitting(false);
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
            Welcome back
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
            <h2 className="text-3xl font-bold text-white mb-2">Welcome back</h2>
            <p className="text-gray-400">
              Don't have an account?{' '}
              <button 
                onClick={onSignUp}
                className="text-blue-400 hover:text-blue-300 underline transition-colors"
              >
                Sign Up
              </button>
            </p>
          </div>

          {errors.general && (
            <div className="mb-6 p-4 bg-red-900/20 border border-red-500 rounded-lg">
              <p className="text-red-400 text-sm">{errors.general}</p>
            </div>
          )}

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
                  aria-describedby={errors.email ? 'email-error' : undefined}
                  aria-invalid={errors.email ? 'true' : 'false'}
                />
                {errors.email && (
                  <div className="absolute right-3 top-1/2 transform -translate-y-1/2">
                    <AlertCircle className="w-5 h-5 text-red-500" />
                  </div>
                )}
              </div>
              {errors.email && (
                <p id="email-error" className="mt-1 text-sm text-red-500" role="alert">
                  {errors.email}
                </p>
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
                  aria-describedby={errors.password ? 'password-error' : undefined}
                  aria-invalid={errors.password ? 'true' : 'false'}
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-300 transition-colors"
                  aria-label={showPassword ? 'Hide password' : 'Show password'}
                >
                  {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                </button>
                {errors.password && (
                  <div className="absolute right-10 top-1/2 transform -translate-y-1/2">
                    <AlertCircle className="w-5 h-5 text-red-500" />
                  </div>
                )}
              </div>
              {errors.password && (
                <p id="password-error" className="mt-1 text-sm text-red-500" role="alert">
                  {errors.password}
                </p>
              )}
            </div>

            {/* Remember Me & Forgot Password */}
            <div className="flex items-center justify-between">
              <label className="flex items-center">
                <input
                  type="checkbox"
                  name="rememberMe"
                  checked={formData.rememberMe}
                  onChange={handleInputChange}
                  className="w-4 h-4 text-blue-600 bg-gray-800 border-gray-600 rounded focus:ring-blue-500 focus:ring-2"
                />
                <span className="ml-2 text-sm text-gray-300">Remember me</span>
              </label>
              <button
                type="button"
                onClick={onForgotPassword}
                className="text-sm text-blue-400 hover:text-blue-300 transition-colors"
              >
                Forgot Password?
              </button>
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              disabled={isSubmitting}
              className="w-full bg-blue-600 hover:bg-blue-700 disabled:bg-blue-800 disabled:cursor-not-allowed text-white font-semibold py-3 px-4 rounded-lg transition-colors focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 focus:ring-offset-black"
            >
              {isSubmitting ? (
                <div className="flex items-center justify-center">
                  <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin mr-2"></div>
                  Signing In...
                </div>
              ) : (
                'Sign In'
              )}
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

export default LoginForm;