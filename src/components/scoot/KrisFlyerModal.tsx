import React, { useState } from 'react';
import { X, Award, CheckCircle, ShieldCheck, User } from 'lucide-react';

interface KrisFlyerModalProps {
  isOpen: boolean;
  onClose: () => void;
  isLoggedIn: boolean;
  onLogin: (name: string) => void;
}

export const KrisFlyerModal: React.FC<KrisFlyerModalProps> = ({
  isOpen,
  onClose,
  isLoggedIn,
  onLogin
}) => {
  const [membershipNo, setMembershipNo] = useState('KF89214702');
  const [pin, setPin] = useState('••••••••');
  const [name, setName] = useState('Sapranshu Agrawal');

  if (!isOpen) return null;

  const handleLoginSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onLogin(name);
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 bg-black/70 flex items-center justify-center p-4 font-scoot">
      <div className="bg-white w-full max-w-md rounded-3xl shadow-2xl overflow-hidden border border-gray-200 animate-in zoom-in-95 duration-150">
        {/* Header */}
        <div className="bg-[#1D1D1B] text-white p-6 relative">
          <button
            onClick={onClose}
            className="absolute top-4 right-4 p-1 rounded-full hover:bg-neutral-800 text-gray-400 hover:text-white cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
          <div className="flex items-center gap-2 text-[#FFE600] mb-1">
            <Award className="w-5 h-5" />
            <span className="text-xs font-black uppercase tracking-wider">Singapore Airlines Group</span>
          </div>
          <h2 className="text-2xl font-black font-scoot-display">
            KrisFlyer on Scoot
          </h2>
          <p className="text-xs text-gray-400 mt-0.5">
            Earn and redeem KrisFlyer miles on every Scoot flight and add-on.
          </p>
        </div>

        {/* Content */}
        <div className="p-6">
          {isLoggedIn ? (
            <div className="space-y-4">
              <div className="bg-gray-50 p-4 rounded-2xl border border-gray-200">
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 rounded-full bg-[#FFE600] text-black font-black text-xl flex items-center justify-center">
                    SA
                  </div>
                  <div>
                    <h4 className="font-extrabold text-sm text-black">{name}</h4>
                    <span className="text-xs text-gray-500">KrisFlyer Elite Silver • #KF89214702</span>
                  </div>
                </div>
                <div className="mt-4 pt-3 border-t border-gray-200 flex justify-between items-baseline">
                  <span className="text-xs text-gray-500">Available Miles:</span>
                  <span className="text-xl font-black text-black">42,850 miles</span>
                </div>
              </div>

              <div className="bg-emerald-50 text-emerald-900 border border-emerald-200 p-3 rounded-xl text-xs font-medium">
                You will earn <strong>1,240 KrisFlyer miles</strong> on your upcoming Scoot booking!
              </div>

              <button
                onClick={onClose}
                className="w-full bg-[#FFE600] hover:bg-[#fbd300] text-black text-xs font-black py-3 rounded-xl cursor-pointer"
              >
                Close & Return to Booking
              </button>
            </div>
          ) : (
            <form onSubmit={handleLoginSubmit} className="space-y-4">
              <div>
                <label className="block text-xs font-bold text-gray-700 uppercase mb-1">
                  KrisFlyer Membership Number or Email
                </label>
                <input
                  type="text"
                  value={membershipNo}
                  onChange={(e) => setMembershipNo(e.target.value)}
                  className="w-full p-3 rounded-xl border border-gray-300 focus:border-[#FFE600] font-bold text-sm outline-none"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-gray-700 uppercase mb-1">
                  KrisFlyer PIN
                </label>
                <input
                  type="password"
                  value={pin}
                  onChange={(e) => setPin(e.target.value)}
                  className="w-full p-3 rounded-xl border border-gray-300 focus:border-[#FFE600] font-bold text-sm outline-none"
                />
              </div>

              <button
                type="submit"
                className="w-full bg-[#FFE600] hover:bg-[#fbd300] text-black font-black text-sm py-3.5 rounded-xl cursor-pointer shadow-md"
              >
                Log In to KrisFlyer
              </button>

              <div className="text-center text-xs text-gray-500 pt-2">
                Not a member yet? Join KrisFlyer for free and earn miles on every flight.
              </div>
            </form>
          )}
        </div>
      </div>
    </div>
  );
};
