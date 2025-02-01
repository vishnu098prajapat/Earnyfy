import { User } from 'lucide-react';

const SignInButton = () => {
  const handleClick = () => {
    const authPopupEvent = new CustomEvent('showAuthPopup', {
      detail: { mode: 'signin' }
    });
    window.dispatchEvent(authPopupEvent);
  };

  return (
    <button
      onClick={handleClick}
      className="auth-exempt flex items-center space-x-2 px-4 py-2 rounded-lg bg-primary-500 text-white hover:bg-primary-600 transition-colors"
    >
      <User className="h-5 w-5" />
      <span>Sign In</span>
    </button>
  );
};

export default SignInButton; 