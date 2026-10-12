import React from 'react';

interface FooterProps {
  onSelectSection: (section: string) => void;
  onOpenGames: () => void;
  onOpenSubscribe: () => void;
}

export const Footer: React.FC<FooterProps> = ({
  onSelectSection,
  onOpenGames,
  onOpenSubscribe
}) => {
  return (
    <footer className="max-w-[1280px] mx-auto px-4 lg:px-6 pt-6 pb-12 border-t-2 border-black mt-8 text-xs font-nyt-sans">
      {/* Footer Masthead and Navigation Matrix */}
      <div className="flex flex-col md:flex-row items-baseline justify-between border-b border-[#e2e2e2] pb-4 mb-4">
        <span className="font-nyt-masthead text-2xl font-normal text-[#121212]">
          The New York Times
        </span>
        <div className="text-[11px] text-[#727272] mt-2 md:mt-0 font-medium">
          © 2025 The New York Times Company
        </div>
      </div>

      {/* Expanded Section Links Grid */}
      <div className="grid grid-cols-2 md:grid-cols-6 gap-6 py-4 border-b border-[#e2e2e2] text-[11px] text-[#333333]">
        <div>
          <h4 className="font-bold text-[#121212] mb-2 uppercase tracking-wide">News</h4>
          <ul className="space-y-1.5">
            <li><button onClick={() => onSelectSection('World')} className="hover:underline text-left">World</button></li>
            <li><button onClick={() => onSelectSection('U.S.')} className="hover:underline text-left">U.S. Politics</button></li>
            <li><button onClick={() => onSelectSection('Business')} className="hover:underline text-left">Business</button></li>
            <li><button onClick={() => onSelectSection('Lifestyle')} className="hover:underline text-left">Climate & Tech</button></li>
          </ul>
        </div>
        <div>
          <h4 className="font-bold text-[#121212] mb-2 uppercase tracking-wide">Opinion</h4>
          <ul className="space-y-1.5">
            <li><button onClick={() => onSelectSection('Opinion')} className="hover:underline text-left">Today’s Opinion</button></li>
            <li><button onClick={() => onSelectSection('Opinion')} className="hover:underline text-left">Columnists</button></li>
            <li><button onClick={() => onSelectSection('Opinion')} className="hover:underline text-left">Editorials</button></li>
            <li><button onClick={() => onSelectSection('Opinion')} className="hover:underline text-left">Guest Essays</button></li>
          </ul>
        </div>
        <div>
          <h4 className="font-bold text-[#121212] mb-2 uppercase tracking-wide">Arts</h4>
          <ul className="space-y-1.5">
            <li><button onClick={() => onSelectSection('Arts')} className="hover:underline text-left">Today’s Arts</button></li>
            <li><button onClick={() => onSelectSection('Arts')} className="hover:underline text-left">Books & Culture</button></li>
            <li><button onClick={() => onSelectSection('Arts')} className="hover:underline text-left">Movies & Theater</button></li>
            <li><button onClick={() => onSelectSection('Arts')} className="hover:underline text-left">Museum Curation</button></li>
          </ul>
        </div>
        <div>
          <h4 className="font-bold text-[#121212] mb-2 uppercase tracking-wide">Living</h4>
          <ul className="space-y-1.5">
            <li><button onClick={() => onSelectSection('Cooking')} className="hover:underline text-left">Cooking Recipes</button></li>
            <li><button onClick={() => onSelectSection('Wirecutter')} className="hover:underline text-left">Wirecutter Reviews</button></li>
            <li><button onClick={() => onSelectSection('The Athletic')} className="hover:underline text-left">The Athletic Sports</button></li>
            <li><button onClick={() => onSelectSection('Lifestyle')} className="hover:underline text-left">Travel & Style</button></li>
          </ul>
        </div>
        <div>
          <h4 className="font-bold text-[#121212] mb-2 uppercase tracking-wide">Play</h4>
          <ul className="space-y-1.5">
            <li><button onClick={onOpenGames} className="hover:underline text-left font-semibold text-[#567b95]">Wordle</button></li>
            <li><button onClick={onOpenGames} className="hover:underline text-left font-semibold text-[#567b95]">The Crossword</button></li>
            <li><button onClick={onOpenGames} className="hover:underline text-left font-semibold text-[#567b95]">Spelling Bee</button></li>
            <li><button onClick={onOpenGames} className="hover:underline text-left">Connections</button></li>
          </ul>
        </div>
        <div>
          <h4 className="font-bold text-[#121212] mb-2 uppercase tracking-wide">Subscribe</h4>
          <ul className="space-y-1.5">
            <li><button onClick={onOpenSubscribe} className="hover:underline text-left font-bold text-[#121212]">All Access Pass</button></li>
            <li><button onClick={onOpenSubscribe} className="hover:underline text-left">Home Delivery</button></li>
            <li><button onClick={onOpenSubscribe} className="hover:underline text-left">Gift Subscriptions</button></li>
            <li><button onClick={onOpenSubscribe} className="hover:underline text-left">Group Subscriptions</button></li>
          </ul>
        </div>
      </div>

      {/* Quick Footer Links */}
      <div className="flex flex-wrap gap-x-6 gap-y-2 text-[11px] text-[#727272] font-medium justify-center md:justify-start pt-4">
        <a className="hover:underline cursor-pointer" href="#about">NYTCo</a>
        <a className="hover:underline cursor-pointer" href="#contact">Contact Us</a>
        <a className="hover:underline cursor-pointer" href="#accessibility">Accessibility</a>
        <a className="hover:underline cursor-pointer" href="#careers">Work with us</a>
        <a className="hover:underline cursor-pointer" href="#advertise">Advertise</a>
        <a className="hover:underline cursor-pointer" href="#tbrand">T Brand Studio</a>
        <a className="hover:underline cursor-pointer" href="#privacy">Your Ad Choices</a>
        <a className="hover:underline cursor-pointer" href="#privacy">Privacy Policy</a>
        <a className="hover:underline cursor-pointer" href="#terms">Terms of Service</a>
        <a className="hover:underline cursor-pointer" href="#sitemap">Site Map</a>
        <button onClick={onOpenSubscribe} className="hover:underline text-[#121212] font-semibold cursor-pointer">Subscriptions</button>
      </div>
    </footer>
  );
};
