import React from 'react';
import { Bookmark, Radio, Volume2 } from 'lucide-react';
import { Article } from '../types';
import { HERO_IMAGE_URL } from '../data/articles';

interface FrontPageProps {
  articles: Article[];
  onSelectArticle: (article: Article) => void;
  onSelectGame: (game: 'wordle' | 'crossword' | 'spelling-bee') => void;
  savedArticleIds: Set<string>;
  onToggleSaveArticle: (articleId: string, e: React.MouseEvent) => void;
  onPlayAudioArticle: (article: Article, e: React.MouseEvent) => void;
}

export const FrontPage: React.FC<FrontPageProps> = ({
  articles,
  onSelectArticle,
  onSelectGame,
  savedArticleIds,
  onToggleSaveArticle,
  onPlayAudioArticle
}) => {
  // Find key articles by ID
  const leadLiveArticle = articles.find((a) => a.id === 'israel-airspace-strikes') || articles[0];
  const saudiArticle = articles.find((a) => a.id === 'saudi-arabia-infrastructure') || articles[1];
  const climateArticle = articles.find((a) => a.id === 'climate-winds-aviation') || articles[2];
  const centerHeroArticle = articles.find((a) => a.id === 'families-sift-ruin') || articles[3];
  const fedArticle = articles.find((a) => a.id === 'fed-interest-rates') || articles[4];
  const museumArticle = articles.find((a) => a.id === 'museum-curation-transformation') || articles[5];
  const opinion1 = articles.find((a) => a.id === 'bret-stephens-adversaries') || articles[6];
  const opinion2 = articles.find((a) => a.id === 'michelle-goldberg-polls') || articles[7];
  const opinion3 = articles.find((a) => a.id === 'aris-thorne-deep-brain') || articles[8];

  return (
    <main className="max-w-[1280px] mx-auto px-4 lg:px-6 py-6" id="news-grid-container">
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 lg:gap-0">
        
        {/* ================= Left / Primary Column (Columns 1-4) ================= */}
        <section
          className="lg:col-span-4 lg:pr-6 lg:border-r lg:border-[#e2e2e2] flex flex-col justify-between"
          data-purpose="primary-lead-stories"
        >
          {/* Story 1: Lead Headline (Live Updates) */}
          <article className="pb-6 border-b border-[#e2e2e2] group relative">
            <div className="flex items-center justify-between mb-2">
              <div className="flex items-center space-x-1.5">
                <span className="inline-block w-2 h-2 rounded-full bg-red-600 animate-pulse"></span>
                <span className="text-[11px] font-nyt-sans font-bold uppercase tracking-wider text-[#727272]">
                  {leadLiveArticle.tag || 'Live Updates'}
                </span>
              </div>
              <div className="flex items-center space-x-2 opacity-0 group-hover:opacity-100 transition-opacity">
                <button
                  onClick={(e) => onPlayAudioArticle(leadLiveArticle, e)}
                  className="p-1 hover:text-[#567b95] text-[#727272] transition-colors cursor-pointer"
                  title="Listen to audio dispatch"
                >
                  <Volume2 className="w-3.5 h-3.5" />
                </button>
                <button
                  onClick={(e) => onToggleSaveArticle(leadLiveArticle.id, e)}
                  className="p-1 hover:text-[#121212] text-[#727272] transition-colors cursor-pointer"
                  title="Bookmark story"
                >
                  <Bookmark
                    className={`w-3.5 h-3.5 ${
                      savedArticleIds.has(leadLiveArticle.id) ? 'fill-[#121212] text-[#121212]' : ''
                    }`}
                  />
                </button>
              </div>
            </div>

            <h2
              onClick={() => onSelectArticle(leadLiveArticle)}
              className="font-nyt-headline text-2xl md:text-3xl font-bold leading-tight hover:text-[#727272] cursor-pointer transition-colors mb-3 text-[#121212]"
            >
              {leadLiveArticle.title}
            </h2>

            <p
              onClick={() => onSelectArticle(leadLiveArticle)}
              className="font-nyt-serif text-[15px] leading-[1.4] text-[#363636] mb-3 cursor-pointer"
            >
              {leadLiveArticle.summary}
            </p>

            <div className="flex items-center space-x-2 text-[11px] font-nyt-sans text-[#727272]">
              <span className="text-[#121212] font-semibold">{leadLiveArticle.timeAgo}</span>
              <span>•</span>
              <span className="hover:underline cursor-pointer">
                By {leadLiveArticle.authors.map((a) => a.name).join(' and ')}
              </span>
            </div>

            {/* Mini sub-bullet list typical of NYT leads */}
            {leadLiveArticle.bullets && (
              <ul className="mt-4 pt-3 border-t border-[#e2e2e2] space-y-2 text-xs font-nyt-sans text-[#121212]">
                {leadLiveArticle.bullets.map((bullet, idx) => (
                  <li
                    key={idx}
                    onClick={() => onSelectArticle(leadLiveArticle)}
                    className="flex items-start space-x-2 cursor-pointer group/bullet"
                  >
                    <span className="text-[#727272] mt-0.5">•</span>
                    <span className="group-hover/bullet:underline font-medium">{bullet}</span>
                  </li>
                ))}
              </ul>
            )}
          </article>

          {/* Story 2: Secondary Lead Story (Analysis) */}
          <article className="pt-6 pb-6 border-b border-[#e2e2e2] group relative">
            <div className="flex items-center justify-between mb-1.5">
              <span className="text-[10px] font-nyt-sans font-bold uppercase tracking-widest text-red-700">
                {saudiArticle.tag || 'Analysis'}
              </span>
              <button
                onClick={(e) => onToggleSaveArticle(saudiArticle.id, e)}
                className="opacity-0 group-hover:opacity-100 p-1 hover:text-[#121212] text-[#727272] transition-opacity cursor-pointer"
                title="Bookmark story"
              >
                <Bookmark
                  className={`w-3.5 h-3.5 ${
                    savedArticleIds.has(saudiArticle.id) ? 'fill-[#121212] text-[#121212]' : ''
                  }`}
                />
              </button>
            </div>

            <h3
              onClick={() => onSelectArticle(saudiArticle)}
              className="font-nyt-headline text-xl md:text-2xl font-bold leading-snug hover:text-[#727272] cursor-pointer transition-colors mb-2 text-[#121212]"
            >
              {saudiArticle.title}
            </h3>

            <p
              onClick={() => onSelectArticle(saudiArticle)}
              className="font-nyt-serif text-[15px] leading-[1.4] text-[#363636] mb-2 cursor-pointer"
            >
              {saudiArticle.summary}
            </p>

            <div className="text-[11px] font-nyt-sans text-[#727272]">
              <span>By {saudiArticle.authors.map((a) => a.name).join(', ')}</span>
            </div>
          </article>

          {/* Story 3: Brief Dispatch */}
          <article className="pt-4 group">
            <h4
              onClick={() => onSelectArticle(climateArticle)}
              className="font-nyt-headline text-base font-bold leading-snug hover:text-[#727272] cursor-pointer mb-1.5 text-[#121212]"
            >
              {climateArticle.title}
            </h4>
            <p
              onClick={() => onSelectArticle(climateArticle)}
              className="text-xs font-nyt-serif text-[#727272] leading-relaxed cursor-pointer"
            >
              {climateArticle.summary}
            </p>
          </article>
        </section>

        {/* ================= Middle Column: Lead Media & In-Depth Features (Columns 5-9) ================= */}
        <section
          className="lg:col-span-5 lg:px-6 lg:border-r lg:border-[#e2e2e2]"
          data-purpose="center-featured-content"
        >
          {/* Featured Image Card */}
          <article className="pb-6 border-b border-[#e2e2e2] group">
            <div
              onClick={() => onSelectArticle(centerHeroArticle)}
              className="relative overflow-hidden bg-neutral-100 mb-3 cursor-pointer"
            >
              <img
                alt="Emergency vehicles gathered along a central boulevard under hazy dawn light"
                className="w-full h-auto object-cover hover:scale-[1.01] transition-transform duration-300"
                src={centerHeroArticle.imageUrl || HERO_IMAGE_URL}
              />
              <span className="text-[10px] font-nyt-sans text-[#727272] block pt-1 text-right italic">
                {centerHeroArticle.imageCaption || 'Photographs via European Pressphoto Agency'}
              </span>
            </div>

            <div className="flex items-center justify-between mb-2">
              <span className="text-[10px] font-nyt-sans font-bold uppercase tracking-wider text-[#727272]">
                Lead Dispatch
              </span>
              <button
                onClick={(e) => onToggleSaveArticle(centerHeroArticle.id, e)}
                className="opacity-0 group-hover:opacity-100 p-1 hover:text-[#121212] text-[#727272] transition-opacity cursor-pointer"
                title="Bookmark story"
              >
                <Bookmark
                  className={`w-3.5 h-3.5 ${
                    savedArticleIds.has(centerHeroArticle.id) ? 'fill-[#121212] text-[#121212]' : ''
                  }`}
                />
              </button>
            </div>

            <h2
              onClick={() => onSelectArticle(centerHeroArticle)}
              className="font-nyt-headline text-2xl lg:text-[28px] font-bold leading-tight hover:text-[#727272] cursor-pointer mb-2.5 text-[#121212]"
            >
              {centerHeroArticle.title}
            </h2>

            <p
              onClick={() => onSelectArticle(centerHeroArticle)}
              className="font-nyt-serif text-[15px] leading-[1.4] text-[#363636] mb-3 cursor-pointer"
            >
              {centerHeroArticle.summary}
            </p>

            <div className="text-[11px] font-nyt-sans text-[#727272] flex items-center gap-2">
              <span>{centerHeroArticle.timeAgo} • {centerHeroArticle.readTime}</span>
              <button
                onClick={(e) => onPlayAudioArticle(centerHeroArticle, e)}
                className="hover:text-[#567b95] inline-flex items-center gap-1 cursor-pointer"
              >
                <Volume2 className="w-3 h-3" />
                <span>Listen ({centerHeroArticle.audioDuration})</span>
              </button>
            </div>
          </article>

          {/* Two Column Sub-Grid within Middle Section */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pt-6">
            <article className="group">
              <h3
                onClick={() => onSelectArticle(fedArticle)}
                className="font-nyt-headline text-base font-bold leading-snug hover:text-[#727272] mb-1.5 text-[#121212] cursor-pointer"
              >
                {fedArticle.title}
              </h3>
              <p
                onClick={() => onSelectArticle(fedArticle)}
                className="text-xs font-nyt-serif text-[#444] leading-relaxed mb-2 cursor-pointer"
              >
                {fedArticle.summary}
              </p>
              <span className="text-[10px] font-nyt-sans text-[#727272] uppercase tracking-wide">
                Business
              </span>
            </article>

            <article className="group">
              <h3
                onClick={() => onSelectArticle(museumArticle)}
                className="font-nyt-headline text-base font-bold leading-snug hover:text-[#727272] mb-1.5 text-[#121212] cursor-pointer"
              >
                {museumArticle.title}
              </h3>
              <p
                onClick={() => onSelectArticle(museumArticle)}
                className="text-xs font-nyt-serif text-[#444] leading-relaxed mb-2 cursor-pointer"
              >
                {museumArticle.summary}
              </p>
              <span className="text-[10px] font-nyt-sans text-[#727272] uppercase tracking-wide">
                Arts & Culture
              </span>
            </article>
          </div>
        </section>

        {/* ================= Right Column: Opinion, Columns & Essentials (Columns 10-12) ================= */}
        <aside className="lg:col-span-3 lg:pl-6 space-y-6" data-purpose="opinion-and-sidebar">
          {/* Opinion Header Label */}
          <div className="border-t-2 border-black pt-1 mb-2">
            <h2 className="font-nyt-sans font-bold text-xs uppercase tracking-wider text-black">
              Opinion
            </h2>
          </div>

          {/* Opinion Piece 1 */}
          <article className="pb-4 border-b border-[#e2e2e2] group">
            <div className="flex items-center justify-between text-xs font-nyt-sans text-[#727272] mb-1">
              <span className="font-bold text-black">{opinion1.authors[0].name}</span>
              <button
                onClick={(e) => onToggleSaveArticle(opinion1.id, e)}
                className="opacity-0 group-hover:opacity-100 hover:text-[#121212] cursor-pointer"
              >
                <Bookmark className={`w-3 h-3 ${savedArticleIds.has(opinion1.id) ? 'fill-black' : ''}`} />
              </button>
            </div>
            <h3
              onClick={() => onSelectArticle(opinion1)}
              className="font-nyt-headline text-lg font-bold leading-snug hover:text-[#727272] cursor-pointer text-[#121212]"
            >
              {opinion1.title}
            </h3>
          </article>

          {/* Opinion Piece 2 */}
          <article className="pb-4 border-b border-[#e2e2e2] group">
            <div className="flex items-center justify-between text-xs font-nyt-sans text-[#727272] mb-1">
              <span className="font-bold text-black">{opinion2.authors[0].name}</span>
              <button
                onClick={(e) => onToggleSaveArticle(opinion2.id, e)}
                className="opacity-0 group-hover:opacity-100 hover:text-[#121212] cursor-pointer"
              >
                <Bookmark className={`w-3 h-3 ${savedArticleIds.has(opinion2.id) ? 'fill-black' : ''}`} />
              </button>
            </div>
            <h3
              onClick={() => onSelectArticle(opinion2)}
              className="font-nyt-headline text-lg font-bold leading-snug hover:text-[#727272] cursor-pointer text-[#121212]"
            >
              {opinion2.title}
            </h3>
          </article>

          {/* Opinion Piece 3 (Guest Essay) */}
          <article className="pb-4 border-b border-[#e2e2e2] group">
            <div className="text-[10px] font-nyt-sans uppercase font-bold text-[#727272] mb-1">
              Guest Essay
            </div>
            <div className="flex items-center justify-between text-xs font-nyt-sans text-[#727272] mb-1">
              <span className="font-bold text-black">{opinion3.authors[0].name}</span>
              <button
                onClick={(e) => onToggleSaveArticle(opinion3.id, e)}
                className="opacity-0 group-hover:opacity-100 hover:text-[#121212] cursor-pointer"
              >
                <Bookmark className={`w-3 h-3 ${savedArticleIds.has(opinion3.id) ? 'fill-black' : ''}`} />
              </button>
            </div>
            <h3
              onClick={() => onSelectArticle(opinion3)}
              className="font-nyt-headline text-lg font-bold leading-snug hover:text-[#727272] cursor-pointer text-[#121212]"
            >
              {opinion3.title}
            </h3>
          </article>

          {/* Culture & Lifestyle Mini Widget (Interactive Games Card) */}
          <div className="bg-[#f7f7f7] p-4 border border-[#e2e2e2] rounded-sm">
            <div className="flex items-center justify-between mb-3">
              <h3 className="text-xs font-nyt-sans font-bold uppercase tracking-wider text-[#121212]">
                Today’s Games & Puzzles
              </h3>
              <span className="text-[10px] font-semibold text-[#567b95] bg-[#eef3f7] px-1.5 py-0.5 rounded">
                Daily
              </span>
            </div>
            <ul className="space-y-2.5 text-xs font-nyt-sans">
              <li className="flex justify-between items-center pb-2 border-b border-[#e2e2e2]">
                <div>
                  <span className="font-semibold text-[#121212] block">The Crossword</span>
                  <span className="text-[10px] text-[#727272]">5×5 daily puzzle</span>
                </div>
                <button
                  onClick={() => onSelectGame('crossword')}
                  className="text-[#567b95] hover:text-[#43647b] hover:underline text-[11px] font-bold cursor-pointer transition-colors"
                >
                  Play →
                </button>
              </li>
              <li className="flex justify-between items-center pb-2 border-b border-[#e2e2e2]">
                <div>
                  <span className="font-semibold text-[#121212] block">Spelling Bee</span>
                  <span className="text-[10px] text-[#727272]">7 letters, find words</span>
                </div>
                <button
                  onClick={() => onSelectGame('spelling-bee')}
                  className="text-[#567b95] hover:text-[#43647b] hover:underline text-[11px] font-bold cursor-pointer transition-colors"
                >
                  Play →
                </button>
              </li>
              <li className="flex justify-between items-center">
                <div>
                  <span className="font-semibold text-[#121212] block">Wordle</span>
                  <span className="text-[10px] text-[#727272]">6 tries, 5 letters</span>
                </div>
                <button
                  onClick={() => onSelectGame('wordle')}
                  className="text-[#567b95] hover:text-[#43647b] hover:underline text-[11px] font-bold cursor-pointer transition-colors"
                >
                  Play →
                </button>
              </li>
            </ul>
          </div>
        </aside>

      </div>
    </main>
  );
};
