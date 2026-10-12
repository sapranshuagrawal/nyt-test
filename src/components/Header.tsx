import React from 'react';
import { Search, Bookmark, User } from 'lucide-react';
import { NAV_SECTIONS } from '../data/articles';
import { Edition } from '../types';

interface HeaderProps {
  currentEdition: Edition;
  onSelectEdition: (edition: Edition) => void;
  activeSection: string | null;
  onSelectSection: (section: string | null) => void;
  onOpenSearch: () => void;
  onOpenSubscribe: () => void;
  onOpenAccount: () => void;
  onOpenBookmarks: () => void;
  onGoHome: () => void;
  onGoTodaysPaper: () => void;
  onOpenGames: () => void;
  savedCount: number;
  freeArticlesLeft: number;
  isSubscribed: boolean;
}

export const Header: React.FC<HeaderProps> = ({
  currentEdition,
  onSelectEdition,
  activeSection,
  onSelectSection,
  onOpenSearch,
  onOpenSubscribe,
  onOpenAccount,
  onOpenBookmarks,
  onGoHome,
  onGoTodaysPaper,
  onOpenGames,
  savedCount,
  freeArticlesLeft,
  isSubscribed
}) => {
  return (
    <header className="max-w-[1280px] mx-auto px-4 lg:px-6 pt-2 pb-0">
      {/* Top Utility Bar */}
      <div className="flex items-center justify-between text-[11px] font-nyt-sans border-b border-[#e2e2e2] pb-2">
        {/* Date, Search & Print Edition */}
        <div className="flex items-center space-x-3 text-[#121212]">
          <button
            onClick={onOpenSearch}
            aria-label="Search"
            className="p-1 hover:text-[#727272] transition-colors flex items-center gap-1 cursor-pointer"
            title="Search articles"
          >
            <Search className="w-4 h-4 text-[#121212]" />
            <span className="hidden sm:inline text-[11px] font-semibold text-[#121212]">SEARCH</span>
          </button>
          <span className="hidden sm:inline text-[#e2e2e2]">|</span>
          <span className="font-bold text-[#121212]">Monday, October 13, 2025</span>
          <button
            onClick={onGoTodaysPaper}
            className="text-[#727272] hover:text-[#121212] hover:underline font-normal cursor-pointer"
          >
            Today’s Paper
          </button>
        </div>

        {/* Edition Selector Links */}
        <nav aria-label="Editions" className="hidden md:flex items-center space-x-3 font-semibold text-[#333333] text-[10px] tracking-wider uppercase">
          {(['U.S.', 'International', 'Canada', 'Español', '中文'] as Edition[]).map((edition) => (
            <button
              key={edition}
              onClick={() => onSelectEdition(edition)}
              className={`transition-colors cursor-pointer ${
                currentEdition === edition
                  ? 'text-black font-bold border-b border-black pb-0.5'
                  : 'text-[#555] hover:underline font-semibold'
              }`}
            >
              {edition}
            </button>
          ))}
        </nav>

        {/* Account & Subscribe Actions */}
        <div className="flex items-center space-x-2">
          {savedCount > 0 && (
            <button
              onClick={onOpenBookmarks}
              className="hidden sm:flex items-center gap-1 text-[10px] font-bold uppercase tracking-wider text-[#121212] px-2 py-1 hover:bg-[#f7f7f7] rounded cursor-pointer"
              title="Saved Articles"
            >
              <Bookmark className="w-3.5 h-3.5 fill-[#121212]" />
              <span>Saved ({savedCount})</span>
            </button>
          )}

          {!isSubscribed ? (
            <button
              onClick={onOpenSubscribe}
              className="bg-[#567b95] hover:bg-[#43647b] text-white px-3 py-1.5 rounded-sm uppercase tracking-wider text-[10px] font-bold transition-colors cursor-pointer shadow-sm"
            >
              Subscribe for $1/Week
            </button>
          ) : (
            <span className="bg-[#e8f2ea] text-[#1b6528] px-2.5 py-1 rounded text-[10px] font-bold uppercase tracking-wider">
              All Access Active
            </span>
          )}

          <button
            onClick={onOpenAccount}
            className="border border-[#121212] hover:bg-[#121212] hover:text-white text-[#121212] px-2.5 py-1.5 rounded-sm uppercase tracking-wider text-[10px] font-bold transition-all cursor-pointer flex items-center gap-1"
          >
            <User className="w-3 h-3" />
            <span>{isSubscribed ? 'Account' : 'Log In'}</span>
          </button>
        </div>
      </div>

      {/* Iconic Blackletter Masthead */}
      <div className="py-4 text-center">
        <button
          onClick={onGoHome}
          className="inline-block group text-left cursor-pointer focus:outline-none"
        >
          <h1 className="font-nyt-masthead text-5xl md:text-7xl lg:text-[84px] leading-tight text-[#121212] font-normal tracking-tight select-none hover:opacity-90 transition-opacity">
            The New York Times
          </h1>
        </button>
      </div>

      {/* Primary Horizontal Navigation */}
      <nav aria-label="Primary Navigation" className="border-y border-[#e2e2e2] py-1.5">
        <ul className="flex items-center justify-between text-[11px] md:text-xs font-nyt-sans text-[#333333] font-semibold tracking-normal uppercase overflow-x-auto whitespace-nowrap scrollbar-none px-2">
          {NAV_SECTIONS.map((section) => {
            const isGames = section === 'Games';
            const isActive = activeSection === section;
            return (
              <li key={section} className="px-2 py-0.5">
                <button
                  onClick={() => {
                    if (isGames) {
                      onOpenGames();
                    } else {
                      onSelectSection(section);
                    }
                  }}
                  className={`cursor-pointer transition-colors ${
                    isActive
                      ? 'text-[#567b95] font-bold border-b-2 border-[#567b95]'
                      : 'hover:text-[#567b95] hover:underline'
                  }`}
                >
                  {section}
                </button>
              </li>
            );
          })}
        </ul>
      </nav>

      {/* Sub-bar / Free Access Notice */}
      <div className="border-b border-[#e2e2e2] py-1.5 px-2 text-center text-xs font-nyt-sans text-[#727272] flex items-center justify-center gap-1.5">
        {isSubscribed ? (
          <span className="text-[#121212] font-medium text-[11px]">
            Thank you for being a subscriber. Unlimited digital access enabled.
          </span>
        ) : (
          <>
            <span className="italic text-[#121212] font-nyt-serif">
              {freeArticlesLeft > 0
                ? `These ${freeArticlesLeft === 2 ? 'two stories' : 'one story'} are free to read.`
                : 'You have reached your free reading limit.'}
            </span>
            <span className="text-[11px] ml-1">
              {freeArticlesLeft > 0
                ? 'Create an account or log in to keep reading.'
                : 'Subscribe now for unlimited journalism.'}
            </span>
            {freeArticlesLeft === 0 && (
              <button
                onClick={onOpenSubscribe}
                className="text-[#567b95] underline font-bold ml-1 hover:text-[#43647b]"
              >
                View offers →
              </button>
            )}
          </>
        )}
      </div>
    </header>
  );
};
