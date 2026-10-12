import React, { useState } from 'react';
import {
  ArrowLeft,
  Share2,
  Bookmark,
  Volume2,
  Printer,
  MessageSquare,
  ThumbsUp,
  Check,
  Send,
  Sparkles
} from 'lucide-react';
import { Article } from '../types';

interface ArticleViewProps {
  article: Article;
  onBack: () => void;
  onSelectArticle: (article: Article) => void;
  relatedArticles: Article[];
  isSaved: boolean;
  onToggleSave: () => void;
  onPlayAudio: () => void;
  isPlayingAudio: boolean;
}

interface ReaderComment {
  id: string;
  author: string;
  location: string;
  timeAgo: string;
  content: string;
  likes: number;
}

export const ArticleView: React.FC<ArticleViewProps> = ({
  article,
  onBack,
  onSelectArticle,
  relatedArticles,
  isSaved,
  onToggleSave,
  onPlayAudio,
  isPlayingAudio
}) => {
  const [fontSize, setFontSize] = useState<'normal' | 'large' | 'xlarge'>('normal');
  const [copiedLink, setCopiedLink] = useState(false);
  const [comments, setComments] = useState<ReaderComment[]>([
    {
      id: 'c1',
      author: 'Marcus Vance',
      location: 'Boston, MA',
      timeAgo: '20m ago',
      content:
        'This reporting is sobering and necessary. The diplomatic cables mentioned in Geneva highlight just how delicate the airspace treaties have become.',
      likes: 42
    },
    {
      id: 'c2',
      author: 'Elena Rostova',
      location: 'Geneva, Switzerland',
      timeAgo: '45m ago',
      content:
        'Having worked in international logistics for 15 years, rerouting flight corridors around the Mediterranean creates massive cascading delays into Heathrow and Frankfurt within hours.',
      likes: 29
    }
  ]);
  const [newCommentText, setNewCommentText] = useState('');
  const [newCommentAuthor, setNewCommentAuthor] = useState('');
  const [showComments, setShowComments] = useState(false);

  const handleShare = () => {
    navigator.clipboard?.writeText(window.location.href);
    setCopiedLink(true);
    setTimeout(() => setCopiedLink(false), 2000);
  };

  const handleAddComment = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newCommentText.trim()) return;

    const newComment: ReaderComment = {
      id: Date.now().toString(),
      author: newCommentAuthor.trim() || 'Verified Reader',
      location: 'New York, NY',
      timeAgo: 'Just now',
      content: newCommentText.trim(),
      likes: 1
    };

    setComments([newComment, ...comments]);
    setNewCommentText('');
  };

  const fontClasses = {
    normal: 'text-[17px] leading-[1.75]',
    large: 'text-[19px] leading-[1.8]',
    xlarge: 'text-[21px] leading-[1.85]'
  };

  return (
    <article className="max-w-[1020px] mx-auto px-4 lg:px-6 py-6">
      {/* Top Navigation & Controls */}
      <div className="flex items-center justify-between border-b border-[#e2e2e2] pb-3 mb-6">
        <button
          onClick={onBack}
          className="inline-flex items-center gap-1.5 text-xs font-nyt-sans font-semibold text-[#121212] hover:text-[#567b95] transition-colors cursor-pointer"
        >
          <ArrowLeft className="w-3.5 h-3.5" />
          <span>Back to Front Page</span>
        </button>

        <div className="flex items-center space-x-3 text-xs font-nyt-sans text-[#727272]">
          {/* Font Size Adjuster */}
          <div className="flex items-center border border-[#e2e2e2] rounded px-1.5 py-0.5 space-x-1">
            <span className="text-[10px] uppercase font-bold text-[#727272] mr-1">Text:</span>
            <button
              onClick={() => setFontSize('normal')}
              className={`px-1 font-bold ${fontSize === 'normal' ? 'text-black' : 'text-gray-400'}`}
              title="Standard font size"
            >
              A
            </button>
            <button
              onClick={() => setFontSize('large')}
              className={`px-1 font-bold text-sm ${fontSize === 'large' ? 'text-black' : 'text-gray-400'}`}
              title="Larger font size"
            >
              A+
            </button>
            <button
              onClick={() => setFontSize('xlarge')}
              className={`px-1 font-bold text-base ${fontSize === 'xlarge' ? 'text-black' : 'text-gray-400'}`}
              title="Largest font size"
            >
              A++
            </button>
          </div>

          {/* Share */}
          <button
            onClick={handleShare}
            className="flex items-center gap-1 hover:text-black transition-colors cursor-pointer"
            title="Copy share link"
          >
            {copiedLink ? <Check className="w-3.5 h-3.5 text-green-600" /> : <Share2 className="w-3.5 h-3.5" />}
            <span className="hidden sm:inline">{copiedLink ? 'Copied' : 'Share'}</span>
          </button>

          {/* Bookmark */}
          <button
            onClick={onToggleSave}
            className="flex items-center gap-1 hover:text-black transition-colors cursor-pointer"
            title="Bookmark story"
          >
            <Bookmark className={`w-3.5 h-3.5 ${isSaved ? 'fill-black text-black' : ''}`} />
            <span className="hidden sm:inline">{isSaved ? 'Saved' : 'Save'}</span>
          </button>

          {/* Print */}
          <button
            onClick={() => window.print()}
            className="hidden sm:flex items-center gap-1 hover:text-black transition-colors cursor-pointer"
            title="Print article"
          >
            <Printer className="w-3.5 h-3.5" />
            <span>Print</span>
          </button>
        </div>
      </div>

      {/* Article Header Container */}
      <div className="max-w-[740px] mx-auto">
        {/* Section Tag */}
        <div className="mb-2">
          {article.tag ? (
            <span
              className={`text-[11px] font-nyt-sans font-bold uppercase tracking-widest ${
                article.tagType === 'analysis'
                  ? 'text-red-700'
                  : article.tagType === 'live'
                  ? 'text-red-600 flex items-center gap-1.5'
                  : 'text-[#727272]'
              }`}
            >
              {article.tagType === 'live' && (
                <span className="inline-block w-2 h-2 rounded-full bg-red-600 animate-pulse"></span>
              )}
              {article.tag}
            </span>
          ) : (
            <span className="text-[11px] font-nyt-sans font-bold uppercase tracking-wider text-[#727272]">
              {article.section} {article.subSection ? `• ${article.subSection}` : ''}
            </span>
          )}
        </div>

        {/* Headline */}
        <h1 className="font-nyt-headline text-3xl md:text-4xl lg:text-[44px] font-bold leading-[1.15] text-[#121212] mb-3">
          {article.title}
        </h1>

        {/* Standfirst / Summary */}
        <p className="font-nyt-serif text-lg md:text-xl text-[#363636] leading-snug mb-5">
          {article.summary}
        </p>

        {/* Authors & Publication Date */}
        <div className="border-t border-[#e2e2e2] pt-3 pb-4 mb-6 flex flex-col sm:flex-row sm:items-center justify-between text-xs font-nyt-sans text-[#727272] gap-2">
          <div>
            <div className="text-black font-semibold text-[13px]">
              By {article.authors.map((a) => a.name).join(' and ')}
            </div>
            {article.authors[0].role && (
              <div className="text-[#727272] text-[11px]">{article.authors[0].role}</div>
            )}
          </div>
          <div className="text-right sm:text-right text-[11px]">
            <div>Published {article.publishedAt}</div>
            <div className="text-[#121212] font-semibold">{article.timeAgo} • {article.readTime}</div>
          </div>
        </div>

        {/* Listen to this article Audio Player Widget */}
        {article.audioDuration && (
          <div className="bg-[#f7f7f7] border border-[#e2e2e2] rounded-md p-3.5 mb-6 flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <button
                onClick={onPlayAudio}
                className="w-10 h-10 rounded-full bg-[#121212] hover:bg-[#333] text-white flex items-center justify-center cursor-pointer transition-colors shadow-sm"
              >
                {isPlayingAudio ? (
                  <span className="w-3 h-3 bg-white block rounded-xs"></span>
                ) : (
                  <Volume2 className="w-5 h-5 ml-0.5" />
                )}
              </button>
              <div>
                <span className="text-[11px] font-nyt-sans font-bold uppercase tracking-wider text-[#567b95] block">
                  NYT Audio Dispatch
                </span>
                <span className="text-xs font-nyt-sans font-medium text-[#121212]">
                  {isPlayingAudio ? 'Now Playing' : 'Listen to this article'} ({article.audioDuration})
                </span>
              </div>
            </div>
            <span className="text-[11px] font-nyt-sans text-[#727272] hidden sm:inline">
              Narrated by NYT Audio
            </span>
          </div>
        )}
      </div>

      {/* Hero Image if present */}
      {article.imageUrl && (
        <div className="my-6 max-w-[920px] mx-auto">
          <div className="overflow-hidden rounded-xs border border-[#e2e2e2]">
            <img
              src={article.imageUrl}
              alt={article.title}
              className="w-full h-auto object-cover max-h-[540px]"
            />
          </div>
          {article.imageCaption && (
            <p className="text-[11px] font-nyt-sans text-[#727272] mt-1.5 text-right italic">
              {article.imageCaption}
            </p>
          )}
        </div>
      )}

      {/* Live Updates Bullet Summary if present */}
      {article.bullets && (
        <div className="max-w-[740px] mx-auto mb-6 bg-[#fbfbfb] border-l-4 border-black p-4">
          <h4 className="text-xs font-nyt-sans font-bold uppercase tracking-wider text-[#121212] mb-2">
            Key Developments
          </h4>
          <ul className="space-y-2 text-sm font-nyt-sans text-[#222]">
            {article.bullets.map((b, i) => (
              <li key={i} className="flex items-start gap-2">
                <span className="text-black font-bold">•</span>
                <span>{b}</span>
              </li>
            ))}
          </ul>
        </div>
      )}

      {/* Article Body Paragraphs */}
      <div className={`max-w-[740px] mx-auto font-nyt-serif text-[#222] ${fontClasses[fontSize]} space-y-5`}>
        {article.paragraphs.map((para, index) => {
          if (index === 0) {
            return (
              <p key={index} className="drop-cap">
                {para}
              </p>
            );
          }

          if (index === 2 && article.pullQuote) {
            return (
              <React.Fragment key={index}>
                <blockquote className="my-8 py-4 border-y-2 border-black font-nyt-headline text-2xl md:text-3xl font-bold leading-snug text-[#121212] px-2 italic">
                  “{article.pullQuote.text}”
                  <footer className="text-xs font-nyt-sans font-normal not-italic text-[#727272] mt-2 text-right">
                    — {article.pullQuote.attribution}
                  </footer>
                </blockquote>
                <p>{para}</p>
              </React.Fragment>
            );
          }

          return <p key={index}>{para}</p>;
        })}
      </div>

      {/* Author Bio Box */}
      <div className="max-w-[740px] mx-auto mt-10 pt-6 border-t border-[#e2e2e2] flex items-center justify-between text-xs font-nyt-sans">
        <div>
          <span className="font-bold text-[#121212]">
            {article.authors.map((a) => a.name).join(' & ')}
          </span>
          <p className="text-[#727272] mt-0.5">
            Reporting contributed from New York, Washington, Jerusalem, and Geneva bureaus.
          </p>
        </div>
        <button
          onClick={() => setShowComments(!showComments)}
          className="flex items-center gap-1.5 px-3 py-1.5 border border-[#121212] rounded text-xs font-bold hover:bg-[#121212] hover:text-white transition-colors cursor-pointer"
        >
          <MessageSquare className="w-3.5 h-3.5" />
          <span>{comments.length + article.commentsCount} Comments</span>
        </button>
      </div>

      {/* Reader Comments Section */}
      <section className="max-w-[740px] mx-auto mt-8 bg-[#fafafa] p-6 border border-[#e2e2e2] rounded">
        <div className="flex items-center justify-between mb-4 border-b border-[#e2e2e2] pb-3">
          <h3 className="font-nyt-sans font-bold text-sm uppercase tracking-wider text-[#121212] flex items-center gap-2">
            <MessageSquare className="w-4 h-4 text-[#567b95]" />
            <span>Reader Discussion ({comments.length + article.commentsCount})</span>
          </h3>
          <span className="text-[11px] font-nyt-sans text-[#727272]">
            Moderated by NYT Editorial Standards
          </span>
        </div>

        {/* Add comment box */}
        <form onSubmit={handleAddComment} className="mb-6 space-y-3">
          <input
            type="text"
            placeholder="Your name or display handle"
            value={newCommentAuthor}
            onChange={(e) => setNewCommentAuthor(e.target.value)}
            className="w-full text-xs font-nyt-sans px-3 py-2 border border-[#d2d2d2] rounded bg-white focus:outline-none focus:border-black"
          />
          <textarea
            rows={3}
            placeholder="Share your perspective on this reporting..."
            value={newCommentText}
            onChange={(e) => setNewCommentText(e.target.value)}
            className="w-full text-xs font-nyt-sans p-3 border border-[#d2d2d2] rounded bg-white focus:outline-none focus:border-black resize-none"
          ></textarea>
          <div className="flex justify-end">
            <button
              type="submit"
              className="bg-[#121212] hover:bg-[#333] text-white text-xs font-bold px-4 py-2 rounded flex items-center gap-1 cursor-pointer transition-colors"
            >
              <Send className="w-3 h-3" />
              <span>Post Comment</span>
            </button>
          </div>
        </form>

        {/* Existing comments */}
        <div className="space-y-4">
          {comments.map((c) => (
            <div key={c.id} className="border-b border-[#e8e8e8] pb-3 text-xs font-nyt-sans">
              <div className="flex items-center justify-between mb-1">
                <div>
                  <span className="font-bold text-[#121212]">{c.author}</span>
                  <span className="text-[#727272] ml-2 text-[11px]">{c.location}</span>
                </div>
                <span className="text-[11px] text-[#999]">{c.timeAgo}</span>
              </div>
              <p className="text-[#333] leading-relaxed mb-2 font-nyt-serif text-[13px]">
                {c.content}
              </p>
              <div className="flex items-center gap-1 text-[11px] text-[#727272]">
                <ThumbsUp className="w-3 h-3 cursor-pointer hover:text-black" />
                <span>{c.likes} Recommended</span>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Related Stories */}
      <section className="max-w-[740px] mx-auto mt-12 pt-8 border-t-2 border-black">
        <h3 className="font-nyt-sans font-bold text-xs uppercase tracking-wider text-black mb-4">
          More from The Times
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {relatedArticles.slice(0, 3).map((rel) => (
            <div
              key={rel.id}
              onClick={() => onSelectArticle(rel)}
              className="group cursor-pointer border-b md:border-b-0 pb-4 md:pb-0"
            >
              <span className="text-[10px] font-nyt-sans font-bold uppercase tracking-wider text-[#727272] block mb-1">
                {rel.section}
              </span>
              <h4 className="font-nyt-headline text-base font-bold leading-snug group-hover:text-[#727272] transition-colors mb-1 text-[#121212]">
                {rel.title}
              </h4>
              <p className="text-xs font-nyt-serif text-[#727272] line-clamp-2">
                {rel.summary}
              </p>
            </div>
          ))}
        </div>
      </section>
    </article>
  );
};
