import React, { useState } from 'react';
import { X, Check, AlertCircle } from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import { GoogleLogin } from '@react-oauth/google';

interface SignInModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSuccessRedirect?: () => void;
}

export const SignInModal: React.FC<SignInModalProps> = ({
  isOpen,
  onClose,
  onSuccessRedirect,
}) => {
  const { loginWithGoogle } = useAuth();
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);

  const handleGoogleSuccess = async (credentialResponse: any) => {
    setLoading(true);
    setError(null);

    try {
      const idToken = credentialResponse.credential;

      if (!idToken) {
        throw new Error('No Google ID token received');
      }

      await loginWithGoogle(idToken);

      setSuccess(true);

      setTimeout(() => {
        setSuccess(false);
        setLoading(false);
        onClose();

        if (onSuccessRedirect) {
          onSuccessRedirect();
        }
      }, 1000);
    } catch (err: any) {
      setError(err.message || 'Google Sign-In failed. Please try again.');
      setLoading(false);
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-xs transition-opacity animate-in fade-in">
      <div
        className="bg-white rounded-2xl max-w-md w-full p-6 sm:p-8 shadow-2xl border border-gray-100 relative text-left"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Close button */}
        <button
          onClick={onClose}
          className="absolute top-5 right-5 p-1.5 rounded-lg text-gray-400 hover:text-gray-700 hover:bg-gray-100 transition-colors"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Brand header */}
        <div className="flex items-center gap-2.5 mb-6">
          <img
            src="/botly-logo.png"
            alt="Prompt Studio"
            className="w-7 h-7 object-contain"
          />

          <span className="font-bold text-gray-900 text-lg">
            Prompt Studio
          </span>
        </div>

        <h3 className="text-2xl font-bold text-gray-950 tracking-tight">
          Sign in to Prompt Studio
        </h3>

        <p className="text-sm text-gray-500 mt-1 mb-6 font-normal">
          Access your saved prompts, experiments, and active evaluations with
          your Google account.
        </p>

        {/* Error message */}
        {error && (
          <div className="mb-4 p-3 bg-rose-50 border border-rose-100 text-rose-700 rounded-xl text-xs flex items-center gap-2">
            <AlertCircle className="w-4 h-4 text-rose-500 shrink-0" />
            <span>{error}</span>
          </div>
        )}

        {/* Success state */}
        {success ? (
          <div className="py-8 text-center bg-emerald-50 rounded-xl border border-emerald-100 p-4">
            <div className="w-10 h-10 rounded-full bg-emerald-500 text-white flex items-center justify-center mx-auto mb-3">
              <Check className="w-5 h-5" />
            </div>

            <p className="font-semibold text-emerald-900 text-sm">
              Welcome back!
            </p>

            <p className="text-xs text-emerald-700 mt-1">
              Connecting to your Prompt Studio workspace...
            </p>
          </div>
        ) : (
          <div className="space-y-4">
            {/* Google Sign-In */}
            <div className="flex justify-center my-4">
              <div id="google-login-btn-container">
                <GoogleLogin
                  onSuccess={handleGoogleSuccess}
                  onError={() => {
                    setError(
                      'Google Sign-In failed. Please try again.'
                    );
                    setLoading(false);
                  }}
                  useOneTap={false}
                />
              </div>
            </div>

            <p className="text-xs text-center text-gray-400">
              By continuing, you agree to Prompt Studio's Terms of Service and
              Privacy Policy.
            </p>
          </div>
        )}
      </div>
    </div>
  );
};