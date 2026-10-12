import React from 'react';
import { X, Bookmark, Trash2, ArrowRight } from 'lucide-react';
import { Article } from '../types';

interface BookmarksDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  articles: Article[];
  savedArticleIds: Set<string>;
  onRemoveBookmark: (id: string) => void;
  onSelectArticle: (article: Article) => void;
}

export const BookmarksDrawer: React.FC<BookmarksDrawerProps> = ({
  isOpen,
  onClose,
  articles,
  savedArticleIds,
  onRemoveBookmark,
  onSelectArticle
}) => {
  if (!isOpen) return null;

  const savedList = articles.filter((a) => savedArticleIds.has(a.id));

  return (
    <div className="fixed inset-0 z-50 bg-black/60 flex justify-end">
      <div className="bg-white w-full max-w-md h-full shadow-2xl flex flex-col font-nyt-sans border-l border-[#121212] animate-in slide-in-from-right duration-200">
        {/* Header */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-[#e2e2e2]">
          <div className="flex items-center gap-2">
            <Bookmark className="w-5 h-5 fill-[#121212]" />
            <h3 className="font-bold text-sm uppercase tracking-wider text-[#121212]">
              Reading List ({savedList.length})
            </h3>
          </div>
          <button
            onClick={onClose}
            className="p-1 hover:bg-gray-100 rounded text-[#727272] hover:text-black cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Content */}
        <div className="flex-1 overflow-y-auto p-4 divide-y divide-[#e2e2e2]">
          {savedList.length === 0 ? (
            <div className="py-20 text-center text-sm text-[#727272]">
              <Bookmark className="w-8 h-8 mx-auto mb-2 text-gray-300" />
              <p className="font-semibold text-black">Your reading list is empty</p>
              <p className="text-xs text-[#727272] mt-1">
                Click the bookmark icon on any article to save it for later.
              </p>
            </div>
          ) : (
            savedList.map((art) => (
              <div key={art.id} className="py-3 group flex items-start justify-between gap-3">
                <div
                  onClick={() => {
                    onSelectArticle(art);
                    onClose();
                  }}
                  className="cursor-pointer flex-1"
                >
                  <span className="text-[10px] font-bold uppercase tracking-wider text-[#727272] block mb-0.5">
                    {art.section} • {art.readTime}
                  </span>
                  <h4 className="font-nyt-headline text-sm font-bold text-[#121212] group-hover:text-[#567b95] leading-snug">
                    {art.title}
                  </h4>
                  <div className="text-[10px] text-[#727272] mt-1">
                    By {art.authors.map((a) => a.name).join(', ')}
                  </div>
                </div>

                <button
                  onClick={() => onRemoveBookmark(art.id)}
                  className="p-1.5 hover:bg-red-50 text-gray-400 hover:text-red-600 rounded transition-colors cursor-pointer"
                  title="Remove from reading list"
                >
                  <Trash2 className="w-4 h-4" />
                </button>
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  );
};
