import React from 'react';
import { 
  BarChart3, 
  Users, 
  FileText, 
  MessageSquare, 
  Bell, 
  Clock, 
  TrendingUp, 
  ArrowRight,
  Calendar,
  Star
} from 'lucide-react';

interface Notification {
  id: number;
  type: 'message' | 'update' | 'achievement';
  content: string;
  time: string;
}

interface QuickAction {
  id: number;
  title: string;
  icon: string;
  description: string;
}

interface UserData {
  name: string;
  email: string;
  role: string;
  lastLogin: Date;
  notifications: Notification[];
  quickActions: QuickAction[];
}

interface WelcomeBackPageProps {
  userData: UserData;
  onProceedToApp: () => void;
}

const WelcomeBackPage: React.FC<WelcomeBackPageProps> = ({ userData, onProceedToApp }) => {
  const formatLastLogin = (date: Date) => {
    const now = new Date();
    const diffInHours = Math.floor((now.getTime() - date.getTime()) / (1000 * 60 * 60));
    
    if (diffInHours < 24) {
      return `${diffInHours} hours ago`;
    } else {
      const diffInDays = Math.floor(diffInHours / 24);
      return `${diffInDays} day${diffInDays > 1 ? 's' : ''} ago`;
    }
  };

  const getNotificationIcon = (type: string) => {
    switch (type) {
      case 'message':
        return <MessageSquare className="w-4 h-4" />;
      case 'update':
        return <TrendingUp className="w-4 h-4" />;
      case 'achievement':
        return <Star className="w-4 h-4" />;
      default:
        return <Bell className="w-4 h-4" />;
    }
  };

  const getQuickActionIcon = (iconName: string) => {
    switch (iconName) {
      case 'BarChart3':
        return <BarChart3 className="w-6 h-6" />;
      case 'Users':
        return <Users className="w-6 h-6" />;
      case 'FileText':
        return <FileText className="w-6 h-6" />;
      case 'MessageSquare':
        return <MessageSquare className="w-6 h-6" />;
      default:
        return <BarChart3 className="w-6 h-6" />;
    }
  };

  const getNotificationColor = (type: string) => {
    switch (type) {
      case 'message':
        return 'bg-blue-500';
      case 'update':
        return 'bg-green-500';
      case 'achievement':
        return 'bg-yellow-500';
      default:
        return 'bg-gray-500';
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
          <h2 className="text-5xl font-bold leading-tight mb-6">
            Welcome back,<br />
            {userData.name.split(' ')[0]}!
          </h2>
          <p className="text-xl text-blue-200">
            Ready to continue building your future?
          </p>
        </div>
      </div>

      {/* Right side - Welcome content */}
      <div className="flex-1 flex items-center justify-center px-8 py-12 bg-black">
        <div className="w-full max-w-2xl">
          {/* Mobile branding */}
          <div className="lg:hidden flex items-center mb-8">
            <img src="/image.png" alt="Power Nest Logo" className="w-8 h-8 mr-3" />
            <h1 className="text-xl font-bold text-white">Power Nest</h1>
          </div>

          {/* Welcome Header */}
          <div className="mb-8">
            <h2 className="text-4xl font-bold text-white mb-2">
              Welcome back, {userData.name.split(' ')[0]}!
            </h2>
            <div className="flex items-center text-gray-400 mb-4">
              <Clock className="w-4 h-4 mr-2" />
              <span>Last login: {formatLastLogin(userData.lastLogin)}</span>
            </div>
            <div className="flex items-center text-blue-400">
              <div className="w-2 h-2 bg-blue-400 rounded-full mr-2"></div>
              <span className="text-sm font-medium">{userData.role}</span>
            </div>
          </div>

          {/* Notifications Section */}
          <div className="mb-8">
            <div className="flex items-center mb-4">
              <Bell className="w-5 h-5 text-white mr-2" />
              <h3 className="text-xl font-semibold text-white">What's New</h3>
              <div className="ml-2 bg-blue-600 text-white text-xs px-2 py-1 rounded-full">
                {userData.notifications.length}
              </div>
            </div>
            <div className="space-y-3">
              {userData.notifications.map((notification) => (
                <div 
                  key={notification.id}
                  className="bg-gray-900 border border-gray-800 rounded-lg p-4 hover:border-gray-700 transition-colors"
                >
                  <div className="flex items-start">
                    <div className={`${getNotificationColor(notification.type)} p-2 rounded-lg mr-3 flex-shrink-0`}>
                      {getNotificationIcon(notification.type)}
                    </div>
                    <div className="flex-1">
                      <p className="text-white text-sm mb-1">{notification.content}</p>
                      <p className="text-gray-400 text-xs">{notification.time}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Quick Actions */}
          <div className="mb-8">
            <h3 className="text-xl font-semibold text-white mb-4">Quick Actions</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {userData.quickActions.map((action) => (
                <button
                  key={action.id}
                  className="bg-gray-900 border border-gray-800 rounded-lg p-4 hover:border-blue-500 hover:bg-gray-800 transition-all duration-200 text-left group"
                >
                  <div className="flex items-center mb-2">
                    <div className="bg-blue-600 p-2 rounded-lg mr-3 group-hover:bg-blue-500 transition-colors">
                      {getQuickActionIcon(action.icon)}
                    </div>
                    <h4 className="text-white font-medium">{action.title}</h4>
                  </div>
                  <p className="text-gray-400 text-sm">{action.description}</p>
                </button>
              ))}
            </div>
          </div>

          {/* Stats Overview */}
          <div className="mb-8">
            <div className="bg-gradient-to-r from-blue-600/20 to-purple-600/20 border border-blue-500/30 rounded-lg p-6">
              <div className="flex items-center mb-4">
                <TrendingUp className="w-5 h-5 text-blue-400 mr-2" />
                <h3 className="text-lg font-semibold text-white">Your Progress</h3>
              </div>
              <div className="grid grid-cols-3 gap-4">
                <div className="text-center">
                  <div className="text-2xl font-bold text-white mb-1">15</div>
                  <div className="text-xs text-gray-400">Pitch Views</div>
                </div>
                <div className="text-center">
                  <div className="text-2xl font-bold text-white mb-1">3</div>
                  <div className="text-xs text-gray-400">New Connections</div>
                </div>
                <div className="text-center">
                  <div className="text-2xl font-bold text-white mb-1">8</div>
                  <div className="text-xs text-gray-400">Messages</div>
                </div>
              </div>
            </div>
          </div>

          {/* Main CTA */}
          <button
            onClick={onProceedToApp}
            className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-4 px-6 rounded-lg transition-colors focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 focus:ring-offset-black group"
          >
            <div className="flex items-center justify-center">
              <span className="mr-2">Continue to Dashboard</span>
              <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
            </div>
          </button>

          {/* Footer */}
          <div className="mt-6 text-center">
            <p className="text-gray-500 text-sm">
              Need help? Visit our{' '}
              <button className="text-blue-400 hover:text-blue-300 underline transition-colors">
                Help Center
              </button>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default WelcomeBackPage;