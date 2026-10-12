import React from 'react';
import { Plane, Calendar, QrCode, Search, Tag, Sparkles, User, Globe, HelpCircle, Award } from 'lucide-react';

interface ScootHeaderProps {
  activeTab: 'book' | 'manage' | 'checkin' | 'status' | 'deals' | 'experience';
  onSelectTab: (tab: 'book' | 'manage' | 'checkin' | 'status' | 'deals' | 'experience') => void;
  onOpenKrisFlyer: () => void;
  isLoggedIn: boolean;
  userName: string;
}

export const ScootHeader: React.FC<ScootHeaderProps> = ({
  activeTab,
  onSelectTab,
  onOpenKrisFlyer,
  isLoggedIn,
  userName
}) => {
  return (
    <header className="sticky top-0 z-50 bg-white shadow-xs font-scoot">
      {/* Top Utility Bar */}
      <div className="bg-[#1D1D1B] text-white text-xs py-1.5 px-4 lg:px-8">
        <div className="max-w-[1280px] mx-auto flex items-center justify-between">
          {/* Left badge */}
          <div className="flex items-center space-x-3 text-[11px] text-gray-300">
            <span className="flex items-center gap-1 font-semibold text-white">
              <span className="w-2 h-2 rounded-full bg-[#FFE600]"></span>
              Fly Cheap. Fly Smart. Fly Scoot.
            </span>
            <span className="hidden md:inline text-gray-500">|</span>
            <span className="hidden md:inline text-gray-300">
              Part of the Singapore Airlines Group
            </span>
          </div>

          {/* Right utility links */}
          <div className="flex items-center space-x-4 text-[11px]">
            <button
              onClick={onOpenKrisFlyer}
              className="flex items-center gap-1 text-[#FFE600] font-bold hover:underline cursor-pointer"
            >
              <Award className="w-3.5 h-3.5" />
              <span>KrisFlyer</span>
            </button>

            <a
              href="#help"
              className="hidden sm:flex items-center gap-1 text-gray-300 hover:text-white transition-colors"
            >
              <HelpCircle className="w-3.5 h-3.5" />
              <span>Help & FAQs</span>
            </a>

            <div className="flex items-center gap-1 text-gray-300">
              <Globe className="w-3.5 h-3.5" />
              <span>SG | EN (SGD $)</span>
            </div>

            <button
              onClick={onOpenKrisFlyer}
              className="flex items-center gap-1 text-white hover:text-[#FFE600] font-semibold transition-colors cursor-pointer"
            >
              <User className="w-3.5 h-3.5" />
              <span>{isLoggedIn ? userName : 'Log in / Register'}</span>
            </button>
          </div>
        </div>
      </div>

      {/* Main Brand Bar */}
      <div className="border-b border-gray-100 bg-white">
        <div className="max-w-[1280px] mx-auto px-4 lg:px-8 py-3 flex items-center justify-between">
          {/* Scoot Logo */}
          <div
            onClick={() => onSelectTab('book')}
            className="flex items-center gap-2 cursor-pointer group select-none"
          >
            {/* Scoot Yellow Badge & Text */}
            <div className="relative flex items-center">
              <div className="w-10 h-10 rounded-full bg-[#FFE600] flex items-center justify-center font-black text-black text-xl italic tracking-tighter shadow-xs group-hover:scale-105 transition-transform">
                s
              </div>
              <span className="ml-1 text-3xl font-extrabold italic tracking-tight text-[#1D1D1B] font-scoot-display">
                scoot<span className="text-[#FFE600] text-4xl leading-none">.</span>
              </span>
            </div>
            <span className="hidden sm:inline-block text-[11px] uppercase tracking-widest font-extrabold text-gray-400 bg-gray-100 px-2 py-0.5 rounded-full ml-1">
              Escape the ordinary
            </span>
          </div>

          {/* Primary Navigation Tabs */}
          <nav className="flex items-center space-x-1 sm:space-x-2">
            <button
              onClick={() => onSelectTab('book')}
              className={`flex items-center gap-1.5 px-3 py-2 rounded-full text-xs font-bold transition-all cursor-pointer ${
                activeTab === 'book'
                  ? 'bg-[#FFE600] text-black shadow-xs'
                  : 'text-[#1D1D1B] hover:bg-gray-100'
              }`}
            >
              <Plane className="w-3.5 h-3.5" />
              <span>Book Flights</span>
            </button>

            <button
              onClick={() => onSelectTab('manage')}
              className={`flex items-center gap-1.5 px-3 py-2 rounded-full text-xs font-bold transition-all cursor-pointer ${
                activeTab === 'manage'
                  ? 'bg-[#FFE600] text-black shadow-xs'
                  : 'text-[#1D1D1B] hover:bg-gray-100'
              }`}
            >
              <Calendar className="w-3.5 h-3.5" />
              <span className="hidden sm:inline">Manage Booking</span>
              <span className="sm:hidden">Manage</span>
            </button>

            <button
              onClick={() => onSelectTab('checkin')}
              className={`flex items-center gap-1.5 px-3 py-2 rounded-full text-xs font-bold transition-all cursor-pointer ${
                activeTab === 'checkin'
                  ? 'bg-[#FFE600] text-black shadow-xs'
                  : 'text-[#1D1D1B] hover:bg-gray-100'
              }`}
            >
              <QrCode className="w-3.5 h-3.5" />
              <span>Check-In</span>
            </button>

            <button
              onClick={() => onSelectTab('status')}
              className={`hidden md:flex items-center gap-1.5 px-3 py-2 rounded-full text-xs font-bold transition-all cursor-pointer ${
                activeTab === 'status'
                  ? 'bg-[#FFE600] text-black shadow-xs'
                  : 'text-[#1D1D1B] hover:bg-gray-100'
              }`}
            >
              <Search className="w-3.5 h-3.5" />
              <span>Flight Status</span>
            </button>

            <button
              onClick={() => onSelectTab('deals')}
              className={`flex items-center gap-1.5 px-3 py-2 rounded-full text-xs font-bold transition-all cursor-pointer ${
                activeTab === 'deals'
                  ? 'bg-[#FFE600] text-black shadow-xs'
                  : 'text-[#1D1D1B] hover:bg-gray-100'
              }`}
            >
              <Tag className="w-3.5 h-3.5 text-red-600" />
              <span>Deals</span>
            </button>

            <button
              onClick={() => onSelectTab('experience')}
              className={`hidden lg:flex items-center gap-1.5 px-3 py-2 rounded-full text-xs font-bold transition-all cursor-pointer ${
                activeTab === 'experience'
                  ? 'bg-[#FFE600] text-black shadow-xs'
                  : 'text-[#1D1D1B] hover:bg-gray-100'
              }`}
            >
              <Sparkles className="w-3.5 h-3.5 text-[#567b95]" />
              <span>Scoot Experience</span>
            </button>
          </nav>
        </div>
      </div>
    </header>
  );
};
