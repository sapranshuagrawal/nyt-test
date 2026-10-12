/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect } from 'react';
import { Header } from './components/Header';
import { Footer } from './components/Footer';
import { FrontPage } from './components/FrontPage';
import { ArticleView } from './components/ArticleView';
import { SectionView } from './components/SectionView';
import { GamesView } from './components/GamesView';
import { TodaysPaperView } from './components/TodaysPaperView';
import { SearchModal } from './components/SearchModal';
import { SubscribeModal } from './components/SubscribeModal';
import { AccountModal } from './components/AccountModal';
import { BookmarksDrawer } from './components/BookmarksDrawer';
import { AudioBar } from './components/AudioBar';
import { ARTICLES } from './data/articles';
import { Article, Edition, ActiveScreen, GameType } from './types';

export default function App() {
  const [activeScreen, setActiveScreen] = useState<ActiveScreen>('home');
  const [selectedArticle, setSelectedArticle] = useState<Article | null>(null);
  const [activeSection, setActiveSection] = useState<string | null>(null);
  const [selectedGame, setSelectedGame] = useState<GameType>('crossword');
  const [currentEdition, setCurrentEdition] = useState<Edition>('U.S.');

  // Subscriptions & reading quotas
  const [isSubscribed, setIsSubscribed] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [readArticles, setReadArticles] = useState<Set<string>>(new Set());
  const [freeArticlesLeft, setFreeArticlesLeft] = useState(2);

  // Bookmarks
  const [savedArticleIds, setSavedArticleIds] = useState<Set<string>>(new Set());

  // Audio player
  const [audioArticle, setAudioArticle] = useState<Article | null>(null);

  // Modals
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [isSubscribeOpen, setIsSubscribeOpen] = useState(false);
  const [isAccountOpen, setIsAccountOpen] = useState(false);
  const [isBookmarksOpen, setIsBookmarksOpen] = useState(false);

  // Handle article selection & free quota tracking
  const handleSelectArticle = (article: Article) => {
    setSelectedArticle(article);
    setActiveScreen('article');
    window.scrollTo({ top: 0, behavior: 'smooth' });

    if (!isSubscribed) {
      if (!readArticles.has(article.id)) {
        const nextSet = new Set(readArticles);
        nextSet.add(article.id);
        setReadArticles(nextSet);
        setFreeArticlesLeft((prev) => Math.max(0, prev - 1));
      }
    }
  };

  const handleSelectSection = (section: string | null) => {
    if (!section || section === 'U.S.') {
      setActiveSection(section);
      setActiveScreen('home');
    } else {
      setActiveSection(section);
      setActiveScreen('section');
    }
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleSelectGame = (game: GameType) => {
    setSelectedGame(game);
    setActiveScreen('games');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleGoHome = () => {
    setActiveScreen('home');
    setActiveSection(null);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleGoTodaysPaper = () => {
    setActiveScreen('todays-paper');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleToggleSaveArticle = (articleId: string, e?: React.MouseEvent) => {
    if (e) e.stopPropagation();
    setSavedArticleIds((prev) => {
      const next = new Set(prev);
      if (next.has(articleId)) {
        next.delete(articleId);
      } else {
        next.add(articleId);
      }
      return next;
    });
  };

  const handlePlayAudio = (article: Article, e?: React.MouseEvent) => {
    if (e) e.stopPropagation();
    setAudioArticle(article);
  };

  const handleSubscribe = () => {
    setIsSubscribed(true);
    setIsLoggedIn(true);
  };

  return (
    <div className="min-h-screen bg-white text-[#121212] flex flex-col font-nyt-sans selection:bg-[#567b95] selection:text-white">
      {/* Top Header */}
      <Header
        currentEdition={currentEdition}
        onSelectEdition={setCurrentEdition}
        activeSection={activeSection}
        onSelectSection={handleSelectSection}
        onOpenSearch={() => setIsSearchOpen(true)}
        onOpenSubscribe={() => setIsSubscribeOpen(true)}
        onOpenAccount={() => setIsAccountOpen(true)}
        onOpenBookmarks={() => setIsBookmarksOpen(true)}
        onGoHome={handleGoHome}
        onGoTodaysPaper={handleGoTodaysPaper}
        onOpenGames={() => handleSelectGame('crossword')}
        savedCount={savedArticleIds.size}
        freeArticlesLeft={freeArticlesLeft}
        isSubscribed={isSubscribed}
      />

      {/* Main Content Screens */}
      <div className="flex-1">
        {activeScreen === 'home' && (
          <FrontPage
            articles={ARTICLES}
            onSelectArticle={handleSelectArticle}
            onSelectGame={handleSelectGame}
            savedArticleIds={savedArticleIds}
            onToggleSaveArticle={handleToggleSaveArticle}
            onPlayAudioArticle={handlePlayAudio}
          />
        )}

        {activeScreen === 'article' && selectedArticle && (
          <ArticleView
            article={selectedArticle}
            onBack={handleGoHome}
            onSelectArticle={handleSelectArticle}
            relatedArticles={ARTICLES.filter((a) => a.id !== selectedArticle.id)}
            isSaved={savedArticleIds.has(selectedArticle.id)}
            onToggleSave={() => handleToggleSaveArticle(selectedArticle.id)}
            onPlayAudio={() => handlePlayAudio(selectedArticle)}
            isPlayingAudio={audioArticle?.id === selectedArticle.id}
          />
        )}

        {activeScreen === 'section' && (
          <SectionView
            sectionName={activeSection || 'World'}
            articles={ARTICLES}
            onSelectArticle={handleSelectArticle}
            onBack={handleGoHome}
            savedArticleIds={savedArticleIds}
            onToggleSaveArticle={handleToggleSaveArticle}
            onPlayAudioArticle={handlePlayAudio}
          />
        )}

        {activeScreen === 'games' && (
          <GamesView
            initialGame={selectedGame}
            onBack={handleGoHome}
          />
        )}

        {activeScreen === 'todays-paper' && (
          <TodaysPaperView
            articles={ARTICLES}
            onSelectArticle={handleSelectArticle}
            onBack={handleGoHome}
          />
        )}
      </div>

      {/* Footer */}
      <Footer
        onSelectSection={handleSelectSection}
        onOpenGames={() => handleSelectGame('crossword')}
        onOpenSubscribe={() => setIsSubscribeOpen(true)}
      />

      {/* Floating Audio Bar */}
      {audioArticle && (
        <AudioBar
          article={audioArticle}
          onClose={() => setAudioArticle(null)}
          onOpenArticle={handleSelectArticle}
        />
      )}

      {/* Modals and Drawers */}
      <SearchModal
        isOpen={isSearchOpen}
        onClose={() => setIsSearchOpen(false)}
        articles={ARTICLES}
        onSelectArticle={handleSelectArticle}
      />

      <SubscribeModal
        isOpen={isSubscribeOpen}
        onClose={() => setIsSubscribeOpen(false)}
        isSubscribed={isSubscribed}
        onSubscribe={handleSubscribe}
      />

      <AccountModal
        isOpen={isAccountOpen}
        onClose={() => setIsAccountOpen(false)}
        isLoggedIn={isLoggedIn}
        onToggleLogin={() => setIsLoggedIn(!isLoggedIn)}
        freeArticlesLeft={freeArticlesLeft}
        onResetFreeArticles={() => {
          setFreeArticlesLeft(2);
          setReadArticles(new Set());
        }}
        isSubscribed={isSubscribed}
        onOpenSubscribe={() => setIsSubscribeOpen(true)}
      />

      <BookmarksDrawer
        isOpen={isBookmarksOpen}
        onClose={() => setIsBookmarksOpen(false)}
        articles={ARTICLES}
        savedArticleIds={savedArticleIds}
        onRemoveBookmark={(id) => handleToggleSaveArticle(id)}
        onSelectArticle={handleSelectArticle}
      />
    </div>
  );
}
