type LinkedInAuthProps = {
  onSuccess?: (user: any) => void;
};

const LinkedInAuth = ({ onSuccess }: LinkedInAuthProps) => {
  
  // const apiUrl = process.env.REACT_APP_API_URL || '';

  const handleLogin = () => {
      const dummyUser = {
      name: 'LinkedIn User',
      email: 'linkedinuser@example.com',
      role: 'Founder',
      lastLogin: new Date(),
      notifications: [],
      quickActions: [],
    };
      if (typeof onSuccess === 'function') {
    onSuccess(dummyUser);
     } else {
      console.warn('onSuccess is not provided or not a function');
    }
    //redirect to backend when is ready
    // window.location.href = `${apiUrl}/auth/linkedin`;  //here you can add your backend Api
  };

  return (
    <button
      onClick={handleLogin}
      className="flex items-center justify-center bg-[#070707] px-6 py-3 gap-2 w-[196px] h-[50px] border-2 border-[#1A1A1A] rounded-[12px]"
    >
      <img
        src="/linkedin-logo.jpg"  // you can change logo and add the new one if you want
        alt="LinkedIn"
        className="w-[26px] h-[26px]"
      />
    </button>
  );
};

export default LinkedInAuth;
