import React, { useState } from 'react';
import { Search, X, ArrowRight } from 'lucide-react';
import { Article } from '../types';

interface SearchModalProps {
  isOpen: boolean;
  onClose: () => void;
  articles: Article[];
  onSelectArticle: (article: Article) => void;
}

export const SearchModal: React.FC<SearchModalProps> = ({
  isOpen,
  onClose,
  articles,
  onSelectArticle
}) => {
  const [query, setQuery] = useState('');
  const [selectedSection, setSelectedSection] = useState<string>('all');

  if (!isOpen) return null;

  const filtered = articles.filter((art) => {
    const matchesQuery =
      query.trim() === '' ||
      art.title.toLowerCase().includes(query.toLowerCase()) ||
      art.summary.toLowerCase().includes(query.toLowerCase()) ||
      art.authors.some((a) => a.name.toLowerCase().includes(query.toLowerCase()));

    const matchesSection =
      selectedSection === 'all' || art.section.toLowerCase() === selectedSection.toLowerCase();

    return matchesQuery && matchesSection;
  });

  const uniqueSections = Array.from(new Set(articles.map((a) => a.section)));

  return (
    <div className="fixed inset-0 z-50 bg-black/60 flex items-start justify-center pt-12 sm:pt-20 px-4">
      <div className="bg-white w-full max-w-2xl rounded-sm shadow-2xl overflow-hidden font-nyt-sans border border-[#121212] animate-in fade-in duration-200">
        {/* Search Input Bar */}
        <div className="flex items-center px-4 py-3 border-b border-[#e2e2e2] gap-3">
          <Search className="w-5 h-5 text-[#727272]" />
          <input
            type="text"
            placeholder="Search The New York Times..."
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            autoFocus
            className="w-full text-base font-nyt-sans outline-none placeholder-[#727272]"
          />
          <button
            onClick={onClose}
            className="p-1 hover:bg-gray-100 rounded text-[#727272] hover:text-black cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Section Filters */}
        <div className="flex items-center gap-2 px-4 py-2 border-b border-[#e2e2e2] bg-[#f9f9f9] overflow-x-auto text-xs">
          <span className="text-[#727272] uppercase font-bold text-[10px]">Filter:</span>
          <button
            onClick={() => setSelectedSection('all')}
            className={`px-2.5 py-1 rounded cursor-pointer font-semibold ${
              selectedSection === 'all' ? 'bg-black text-white' : 'text-[#555] hover:bg-gray-200'
            }`}
          >
            All
          </button>
          {uniqueSections.map((sec) => (
            <button
              key={sec}
              onClick={() => setSelectedSection(sec)}
              className={`px-2.5 py-1 rounded cursor-pointer whitespace-nowrap font-semibold ${
                selectedSection === sec ? 'bg-black text-white' : 'text-[#555] hover:bg-gray-200'
              }`}
            >
              {sec}
            </button>
          ))}
        </div>

        {/* Results list */}
        <div className="max-h-[60vh] overflow-y-auto divide-y divide-[#e2e2e2] p-2">
          {filtered.length === 0 ? (
            <div className="py-12 text-center text-sm text-[#727272]">
              No articles found matching &quot;{query}&quot;. Try another search term.
            </div>
          ) : (
            filtered.map((art) => (
              <div
                key={art.id}
                onClick={() => {
                  onSelectArticle(art);
                  onClose();
                }}
                className="p-3 hover:bg-[#f7f7f7] cursor-pointer group transition-colors rounded"
              >
                <div className="flex items-center justify-between text-[10px] font-bold uppercase tracking-wider text-[#727272] mb-1">
                  <span>{art.section} {art.subSection ? `• ${art.subSection}` : ''}</span>
                  <span>{art.timeAgo}</span>
                </div>
                <h4 className="font-nyt-headline text-base font-bold text-[#121212] group-hover:text-[#567b95] transition-colors leading-snug mb-1">
                  {art.title}
                </h4>
                <p className="text-xs font-nyt-serif text-[#555] line-clamp-2 mb-1">
                  {art.summary}
                </p>
                <div className="text-[11px] text-[#727272] flex items-center justify-between">
                  <span>By {art.authors.map((a) => a.name).join(', ')}</span>
                  <span className="flex items-center gap-1 text-[#567b95] font-semibold opacity-0 group-hover:opacity-100 transition-opacity">
                    Read Story <ArrowRight className="w-3 h-3" />
                  </span>
                </div>
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  );
};
