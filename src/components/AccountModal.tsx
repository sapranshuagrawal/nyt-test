import React, { useState } from 'react';
import { X, User, CheckCircle, RotateCcw, Shield } from 'lucide-react';

interface AccountModalProps {
  isOpen: boolean;
  onClose: () => void;
  isLoggedIn: boolean;
  onToggleLogin: () => void;
  freeArticlesLeft: number;
  onResetFreeArticles: () => void;
  isSubscribed: boolean;
  onOpenSubscribe: () => void;
}

export const AccountModal: React.FC<AccountModalProps> = ({
  isOpen,
  onClose,
  isLoggedIn,
  onToggleLogin,
  freeArticlesLeft,
  onResetFreeArticles,
  isSubscribed,
  onOpenSubscribe
}) => {
  const [email, setEmail] = useState('reader@example.com');

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 bg-black/60 flex items-center justify-center p-4">
      <div className="bg-white w-full max-w-md rounded-sm shadow-2xl overflow-hidden font-nyt-sans border border-[#121212] animate-in zoom-in-95 duration-150">
        {/* Header */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-[#e2e2e2]">
          <div className="flex items-center gap-2">
            <User className="w-5 h-5 text-[#121212]" />
            <h3 className="font-bold text-sm uppercase tracking-wider text-[#121212]">
              {isLoggedIn ? 'Your Account' : 'Log In to The Times'}
            </h3>
          </div>
          <button
            onClick={onClose}
            className="p-1 hover:bg-gray-100 rounded text-[#727272] hover:text-black cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Body */}
        <div className="p-6 space-y-5">
          {isLoggedIn ? (
            <div className="space-y-4">
              <div className="flex items-center gap-3 p-3 bg-[#f7f7f7] rounded border border-[#e2e2e2]">
                <div className="w-10 h-10 rounded-full bg-[#121212] text-white flex items-center justify-center font-bold text-base">
                  R
                </div>
                <div>
                  <div className="font-bold text-sm text-[#121212]">Reader Account</div>
                  <div className="text-xs text-[#727272]">{email}</div>
                </div>
              </div>

              {/* Status */}
              <div className="border border-[#e2e2e2] rounded p-3 text-xs space-y-2">
                <div className="flex justify-between items-center">
                  <span className="text-[#727272]">Access Tier:</span>
                  <span className="font-bold text-black">
                    {isSubscribed ? 'All Access Digital Subscriber' : 'Standard Registered Reader'}
                  </span>
                </div>
                {!isSubscribed && (
                  <div className="flex justify-between items-center">
                    <span className="text-[#727272]">Free articles remaining:</span>
                    <span className="font-bold text-[#567b95]">{freeArticlesLeft} of 2</span>
                  </div>
                )}
              </div>

              {!isSubscribed && (
                <button
                  onClick={() => {
                    onClose();
                    onOpenSubscribe();
                  }}
                  className="w-full bg-[#567b95] hover:bg-[#43647b] text-white py-2 rounded text-xs font-bold uppercase tracking-wider cursor-pointer transition-colors"
                >
                  Upgrade to Unlimited ($1/Week)
                </button>
              )}

              <div className="pt-2 flex justify-between items-center text-xs">
                <button
                  onClick={onResetFreeArticles}
                  className="text-[#727272] hover:text-black flex items-center gap-1 cursor-pointer"
                  title="Reset demo quota"
                >
                  <RotateCcw className="w-3 h-3" />
                  <span>Reset Free Quota</span>
                </button>
                <button
                  onClick={onToggleLogin}
                  className="text-red-600 hover:underline font-semibold cursor-pointer"
                >
                  Log Out
                </button>
              </div>
            </div>
          ) : (
            <div className="space-y-4">
              <p className="text-xs text-[#555] leading-relaxed">
                Log in to enjoy your 2 free articles, save stories across devices, and participate in reader discussions.
              </p>

              <div>
                <label className="block text-xs font-bold text-[#121212] mb-1">Email Address</label>
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full text-xs font-nyt-sans px-3 py-2 border border-[#d2d2d2] rounded focus:outline-none focus:border-black"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-[#121212] mb-1">Password</label>
                <input
                  type="password"
                  defaultValue="••••••••••••"
                  className="w-full text-xs font-nyt-sans px-3 py-2 border border-[#d2d2d2] rounded focus:outline-none focus:border-black"
                />
              </div>

              <button
                onClick={onToggleLogin}
                className="w-full bg-[#121212] hover:bg-neutral-800 text-white py-2.5 rounded text-xs font-bold uppercase tracking-wider cursor-pointer transition-colors"
              >
                Log In
              </button>

              <div className="text-center text-xs text-[#727272]">
                <span>Don’t have an account? </span>
                <button
                  onClick={onToggleLogin}
                  className="text-[#121212] underline font-bold cursor-pointer"
                >
                  Create one
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
