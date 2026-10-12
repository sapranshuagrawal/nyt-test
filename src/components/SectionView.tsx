import React from 'react';
import { ArrowLeft, Bookmark, Volume2 } from 'lucide-react';
import { Article } from '../types';

interface SectionViewProps {
  sectionName: string;
  articles: Article[];
  onSelectArticle: (article: Article) => void;
  onBack: () => void;
  savedArticleIds: Set<string>;
  onToggleSaveArticle: (articleId: string, e: React.MouseEvent) => void;
  onPlayAudioArticle: (article: Article, e: React.MouseEvent) => void;
}

export const SectionView: React.FC<SectionViewProps> = ({
  sectionName,
  articles,
  onSelectArticle,
  onBack,
  savedArticleIds,
  onToggleSaveArticle,
  onPlayAudioArticle
}) => {
  // Filter or show matching articles
  const sectionArticles = articles.filter(
    (a) => a.section.toLowerCase() === sectionName.toLowerCase() ||
           (sectionName === 'U.S.' && (a.section === 'Business' || a.section === 'Opinion'))
  );

  const displayList = sectionArticles.length > 0 ? sectionArticles : articles.slice(0, 5);

  return (
    <div className="max-w-[1280px] mx-auto px-4 lg:px-6 py-6 font-nyt-sans">
      {/* Breadcrumb */}
      <div className="flex items-center justify-between border-b border-[#e2e2e2] pb-3 mb-6">
        <button
          onClick={onBack}
          className="inline-flex items-center gap-1.5 text-xs font-bold text-[#121212] hover:text-[#567b95] transition-colors cursor-pointer"
        >
          <ArrowLeft className="w-3.5 h-3.5" />
          <span>Home</span>
        </button>
        <span className="text-xs text-[#727272]">The New York Times / {sectionName}</span>
      </div>

      {/* Section Header */}
      <div className="border-b-2 border-black pb-2 mb-6">
        <h1 className="font-nyt-headline text-4xl md:text-5xl font-bold text-[#121212]">
          {sectionName}
        </h1>
        <p className="text-xs text-[#727272] mt-1">
          In-depth reporting, global context, and exclusive analysis from our correspondents worldwide.
        </p>
      </div>

      {/* Section Articles Grid */}
      <div className="grid grid-cols-1 md:grid-cols-12 gap-8">
        {/* Main lead article of section */}
        {displayList[0] && (
          <div className="md:col-span-8 border-b md:border-b-0 md:border-r border-[#e2e2e2] md:pr-8">
            <article className="group cursor-pointer">
              {displayList[0].imageUrl && (
                <div
                  onClick={() => onSelectArticle(displayList[0])}
                  className="overflow-hidden mb-4 bg-neutral-100"
                >
                  <img
                    src={displayList[0].imageUrl}
                    alt={displayList[0].title}
                    className="w-full h-auto object-cover max-h-[420px] group-hover:scale-[1.01] transition-transform duration-300"
                  />
                  {displayList[0].imageCaption && (
                    <span className="text-[10px] text-[#727272] block pt-1 text-right italic">
                      {displayList[0].imageCaption}
                    </span>
                  )}
                </div>
              )}

              <div className="flex items-center justify-between mb-2">
                <span className="text-[10px] font-bold uppercase tracking-wider text-red-700">
                  {displayList[0].tag || 'Featured'}
                </span>
                <div className="flex items-center space-x-2">
                  <button
                    onClick={(e) => onPlayAudioArticle(displayList[0], e)}
                    className="p-1 hover:text-[#567b95] text-[#727272] cursor-pointer"
                  >
                    <Volume2 className="w-3.5 h-3.5" />
                  </button>
                  <button
                    onClick={(e) => onToggleSaveArticle(displayList[0].id, e)}
                    className="p-1 hover:text-black text-[#727272] cursor-pointer"
                  >
                    <Bookmark
                      className={`w-3.5 h-3.5 ${
                        savedArticleIds.has(displayList[0].id) ? 'fill-black text-black' : ''
                      }`}
                    />
                  </button>
                </div>
              </div>

              <h2
                onClick={() => onSelectArticle(displayList[0])}
                className="font-nyt-headline text-2xl md:text-3xl font-bold leading-tight group-hover:text-[#727272] transition-colors mb-3 text-[#121212]"
              >
                {displayList[0].title}
              </h2>

              <p
                onClick={() => onSelectArticle(displayList[0])}
                className="font-nyt-serif text-[16px] leading-[1.5] text-[#363636] mb-3"
              >
                {displayList[0].summary}
              </p>

              <div className="text-[11px] text-[#727272]">
                <span>{displayList[0].timeAgo}</span> • By{' '}
                {displayList[0].authors.map((a) => a.name).join(', ')}
              </div>
            </article>
          </div>
        )}

        {/* Secondary articles */}
        <div className="md:col-span-4 space-y-6">
          <h3 className="font-bold text-xs uppercase tracking-wider text-black border-t-2 border-black pt-1 mb-3">
            Latest in {sectionName}
          </h3>
          {displayList.slice(1).map((art) => (
            <article
              key={art.id}
              onClick={() => onSelectArticle(art)}
              className="pb-4 border-b border-[#e2e2e2] group cursor-pointer"
            >
              <div className="flex items-center justify-between mb-1">
                <span className="text-[10px] font-bold uppercase text-[#727272]">
                  {art.subSection || art.section}
                </span>
                <span className="text-[10px] text-[#999]">{art.timeAgo}</span>
              </div>
              <h4 className="font-nyt-headline text-lg font-bold leading-snug group-hover:text-[#727272] transition-colors mb-1 text-[#121212]">
                {art.title}
              </h4>
              <p className="text-xs font-nyt-serif text-[#555] line-clamp-2">
                {art.summary}
              </p>
              <div className="text-[10px] text-[#727272] mt-1.5">
                By {art.authors.map((a) => a.name).join(', ')}
              </div>
            </article>
          ))}
        </div>
      </div>
    </div>
  );
};
