type GoogleAuthProps ={
  onSuccess?: (user: any) => void;// make optional
};

const GoogleAuth = ({ onSuccess }: GoogleAuthProps) => {
  // redirect to backend when ready
    // const apiUrl = process.env.REACT_APP_API_URL || '';
  const handleLogin = () => {
    
      const dummyUser = {
    name: 'Google User',
      email: 'testuser@example.com',
      role: 'Tester',
      lastLogin: new Date(),
       notifications: [],      
  quickActions: [], 
    };
    if (typeof onSuccess === 'function') {
    onSuccess(dummyUser);
     } else {
console.warn('onSuccess is not provided or not a function');
    }
    // redirect to backend when ready
    // window.location.href = `${apiUrl}/auth/google`;// backend logic/api
  };

  return (
    <button
      onClick={handleLogin}
      className="flex items-center justify-center bg-[#070707] px-6 py-3 gap-2 w-[196px] h-[50px] border-2 border-[#1A1A1A] rounded-[12px]"
    >
      <img
        src={"/google-logo.png"}// you can change logo and add the new one if you want
        alt="Google logo"
        className="w-[25px] h-[26px]"
      />
      <span className="text-sm text-[#1A1A1A] font-medium"></span>
    </button>
  );
};

export default GoogleAuth;


