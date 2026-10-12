import React from 'react';
import { ArrowLeft, Printer, Calendar, FileText } from 'lucide-react';
import { Article } from '../types';

interface TodaysPaperViewProps {
  articles: Article[];
  onSelectArticle: (article: Article) => void;
  onBack: () => void;
}

export const TodaysPaperView: React.FC<TodaysPaperViewProps> = ({
  articles,
  onSelectArticle,
  onBack
}) => {
  return (
    <div className="max-w-[1280px] mx-auto px-4 lg:px-6 py-6 font-nyt-sans">
      {/* Top back bar */}
      <div className="flex items-center justify-between border-b border-[#e2e2e2] pb-3 mb-6">
        <button
          onClick={onBack}
          className="inline-flex items-center gap-1.5 text-xs font-bold text-[#121212] hover:text-[#567b95] transition-colors cursor-pointer"
        >
          <ArrowLeft className="w-3.5 h-3.5" />
          <span>Back to Front Page</span>
        </button>

        <div className="flex items-center space-x-4 text-xs text-[#727272]">
          <span className="flex items-center gap-1">
            <Calendar className="w-3.5 h-3.5 text-black" />
            <strong className="text-black">Monday, October 13, 2025</strong>
          </span>
          <button
            onClick={() => window.print()}
            className="flex items-center gap-1 hover:text-black cursor-pointer"
          >
            <Printer className="w-3.5 h-3.5" />
            <span>Print Digest</span>
          </button>
        </div>
      </div>

      {/* Header */}
      <div className="text-center py-4 border-b-2 border-black mb-8">
        <span className="text-xs uppercase font-bold tracking-widest text-[#727272] block mb-1">
          The New York Times In Print
        </span>
        <h1 className="font-nyt-masthead text-4xl md:text-6xl text-[#121212]">
          Today’s Paper
        </h1>
        <p className="text-xs text-[#727272] mt-2 italic font-nyt-serif">
          The complete front page and section directory for the daily national print edition.
        </p>
      </div>

      {/* Page A1: The Front Page */}
      <section className="mb-10">
        <div className="flex items-center justify-between border-b-2 border-black pb-1 mb-4">
          <h2 className="font-bold text-sm uppercase tracking-wider text-black flex items-center gap-2">
            <FileText className="w-4 h-4" />
            <span>The Front Page — Section A</span>
          </h2>
          <span className="text-xs text-[#727272]">Page A1 - A24</span>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {articles.slice(0, 3).map((art, idx) => (
            <div
              key={art.id}
              onClick={() => onSelectArticle(art)}
              className="border border-[#e2e2e2] p-4 rounded-xs hover:border-black transition-colors cursor-pointer group bg-white shadow-xs"
            >
              <div className="flex justify-between items-center text-[10px] uppercase font-bold text-[#727272] mb-1">
                <span>Column {idx + 1}</span>
                <span>Page A{idx + 1}</span>
              </div>
              <h3 className="font-nyt-headline text-lg font-bold leading-snug group-hover:text-[#727272] transition-colors mb-2 text-[#121212]">
                {art.title}
              </h3>
              <p className="font-nyt-serif text-xs text-[#444] leading-relaxed line-clamp-3 mb-3">
                {art.summary}
              </p>
              <div className="text-[10px] text-[#727272] border-t border-[#e2e2e2] pt-2">
                By {art.authors.map((a) => a.name).join(', ')}
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Section B: Business & Finance */}
      <section className="mb-10">
        <div className="flex items-center justify-between border-b-2 border-black pb-1 mb-4">
          <h2 className="font-bold text-sm uppercase tracking-wider text-black">
            Business Day — Section B
          </h2>
          <span className="text-xs text-[#727272]">Page B1 - B8</span>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {articles.filter((a) => a.section === 'Business').map((art) => (
            <div
              key={art.id}
              onClick={() => onSelectArticle(art)}
              className="border-b border-[#e2e2e2] pb-4 cursor-pointer group"
            >
              <h3 className="font-nyt-headline text-base font-bold leading-snug group-hover:text-[#727272] mb-1">
                {art.title}
              </h3>
              <p className="text-xs font-nyt-serif text-[#555] line-clamp-2">{art.summary}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Section C: Arts & Culture */}
      <section>
        <div className="flex items-center justify-between border-b-2 border-black pb-1 mb-4">
          <h2 className="font-bold text-sm uppercase tracking-wider text-black">
            Arts & Culture — Section C
          </h2>
          <span className="text-xs text-[#727272]">Page C1 - C12</span>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {articles.filter((a) => a.section === 'Arts' || a.section === 'Cooking').map((art) => (
            <div
              key={art.id}
              onClick={() => onSelectArticle(art)}
              className="border-b border-[#e2e2e2] pb-4 cursor-pointer group"
            >
              <h3 className="font-nyt-headline text-base font-bold leading-snug group-hover:text-[#727272] mb-1">
                {art.title}
              </h3>
              <p className="text-xs font-nyt-serif text-[#555] line-clamp-2">{art.summary}</p>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
};
