import React, { useState } from 'react';
import { Mail, ArrowRight, ShieldCheck, Award } from 'lucide-react';

interface ScootFooterProps {
  onNavigate: (tab: 'book' | 'manage' | 'checkin' | 'status' | 'deals' | 'experience') => void;
}

export const ScootFooter: React.FC<ScootFooterProps> = ({ onNavigate }) => {
  const [email, setEmail] = useState('');
  const [subscribed, setSubscribed] = useState(false);

  const handleNewsletter = (e: React.FormEvent) => {
    e.preventDefault();
    if (email) {
      setSubscribed(true);
      setTimeout(() => setSubscribed(false), 3000);
      setEmail('');
    }
  };

  return (
    <footer className="bg-[#1D1D1B] text-white font-scoot pt-12 pb-12 mt-16 border-t-4 border-[#FFE600]">
      {/* Newsletter Signup Banner */}
      <div className="max-w-[1280px] mx-auto px-4 lg:px-8 mb-12">
        <div className="bg-[#FFE600] rounded-3xl p-8 text-black flex flex-col md:flex-row items-center justify-between gap-6 shadow-xl">
          <div>
            <div className="text-xs font-black uppercase tracking-wider bg-black text-[#FFE600] px-3 py-1 rounded-full inline-block mb-2">
              Scoot Insider
            </div>
            <h3 className="text-2xl md:text-3xl font-black font-scoot-display">
              Get Secret Deals & 15% Off Your Next Flight!
            </h3>
            <p className="text-xs md:text-sm font-semibold text-neutral-800 mt-1">
              Be the first to hear about flash sales, new destinations, and exclusive fares.
            </p>
          </div>

          <form onSubmit={handleNewsletter} className="w-full md:w-auto flex gap-2">
            <input
              type="email"
              placeholder="Enter your email address"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="px-4 py-3 rounded-xl bg-white text-black font-semibold text-xs outline-none w-64 border-2 border-black"
            />
            <button
              type="submit"
              className="bg-black hover:bg-neutral-800 text-[#FFE600] font-black text-xs px-6 py-3 rounded-xl cursor-pointer transition-colors shrink-0"
            >
              {subscribed ? 'Subscribed!' : 'Join Insider'}
            </button>
          </form>
        </div>
      </div>

      {/* Directory Columns */}
      <div className="max-w-[1280px] mx-auto px-4 lg:px-8 grid grid-cols-2 md:grid-cols-5 gap-8 text-xs text-gray-400 border-b border-gray-800 pb-12 mb-8">
        <div>
          <h4 className="font-black text-white uppercase tracking-wider mb-3 text-sm">
            Book Flights
          </h4>
          <ul className="space-y-2">
            <li><button onClick={() => onNavigate('book')} className="hover:text-[#FFE600] cursor-pointer">Flight Search</button></li>
            <li><button onClick={() => onNavigate('deals')} className="hover:text-[#FFE600] cursor-pointer">Deals & Offers</button></li>
            <li><button onClick={() => onNavigate('book')} className="hover:text-[#FFE600] cursor-pointer">Route Map</button></li>
            <li><button onClick={() => onNavigate('book')} className="hover:text-[#FFE600] cursor-pointer">Flight Schedules</button></li>
          </ul>
        </div>

        <div>
          <h4 className="font-black text-white uppercase tracking-wider mb-3 text-sm">
            Manage Travel
          </h4>
          <ul className="space-y-2">
            <li><button onClick={() => onNavigate('manage')} className="hover:text-[#FFE600] cursor-pointer">Manage Booking</button></li>
            <li><button onClick={() => onNavigate('checkin')} className="hover:text-[#FFE600] cursor-pointer">Web Check-in</button></li>
            <li><button onClick={() => onNavigate('status')} className="hover:text-[#FFE600] cursor-pointer">Flight Status Tracker</button></li>
            <li><button onClick={() => onNavigate('manage')} className="hover:text-[#FFE600] cursor-pointer">Add Baggage & Meals</button></li>
          </ul>
        </div>

        <div>
          <h4 className="font-black text-white uppercase tracking-wider mb-3 text-sm">
            Scoot Experience
          </h4>
          <ul className="space-y-2">
            <li><button onClick={() => onNavigate('experience')} className="hover:text-[#FFE600] cursor-pointer">ScootPlus Comfort</button></li>
            <li><button onClick={() => onNavigate('experience')} className="hover:text-[#FFE600] cursor-pointer">Boeing 787 Fleet</button></li>
            <li><button onClick={() => onNavigate('experience')} className="hover:text-[#FFE600] cursor-pointer">Scoot-in-Silence</button></li>
            <li><button onClick={() => onNavigate('experience')} className="hover:text-[#FFE600] cursor-pointer">Scoot Café Menus</button></li>
          </ul>
        </div>

        <div>
          <h4 className="font-black text-white uppercase tracking-wider mb-3 text-sm">
            KrisFlyer & Partners
          </h4>
          <ul className="space-y-2">
            <li className="hover:text-[#FFE600] cursor-pointer">Earn KrisFlyer Miles</li>
            <li className="hover:text-[#FFE600] cursor-pointer">Redeem Flight Awards</li>
            <li className="hover:text-[#FFE600] cursor-pointer">Singapore Airlines Group</li>
            <li className="hover:text-[#FFE600] cursor-pointer">HighFlyer for Business</li>
          </ul>
        </div>

        <div>
          <h4 className="font-black text-white uppercase tracking-wider mb-3 text-sm">
            About Scoot
          </h4>
          <ul className="space-y-2">
            <li className="hover:text-[#FFE600] cursor-pointer">Our Story & Fleet</li>
            <li className="hover:text-[#FFE600] cursor-pointer">Careers at Scoot</li>
            <li className="hover:text-[#FFE600] cursor-pointer">Sustainability Initiatives</li>
            <li className="hover:text-[#FFE600] cursor-pointer">Media & Newsroom</li>
          </ul>
        </div>
      </div>

      {/* Brand & Bottom Bar */}
      <div className="max-w-[1280px] mx-auto px-4 lg:px-8 flex flex-col md:flex-row items-center justify-between text-xs text-gray-500 gap-4">
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 rounded-full bg-[#FFE600] flex items-center justify-center font-black text-black italic">
            s
          </div>
          <span className="font-black text-white text-base">scoot.</span>
          <span className="text-gray-400">| A Singapore Airlines Group Carrier</span>
        </div>

        <div className="text-[11px] text-gray-400 text-center md:text-right">
          © 2026 Scoot Pte Ltd. All Rights Reserved. Co. Reg. No. 201112665E.
        </div>
      </div>
    </footer>
  );
};
