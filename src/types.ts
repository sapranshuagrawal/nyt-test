export interface Article {
  id: string;
  section: string;
  subSection?: string;
  tag?: string;
  tagType?: 'live' | 'analysis' | 'opinion' | 'guest' | 'standard';
  title: string;
  summary: string;
  authors: {
    name: string;
    role?: string;
  }[];
  publishedAt: string;
  timeAgo: string;
  readTime: string;
  imageUrl?: string;
  imageCaption?: string;
  bullets?: string[];
  paragraphs: string[];
  pullQuote?: {
    text: string;
    attribution: string;
  };
  audioDuration?: string;
  commentsCount: number;
}

export type ActiveScreen = 'home' | 'article' | 'section' | 'games' | 'todays-paper';

export type GameType = 'wordle' | 'crossword' | 'spelling-bee';

export type Edition = 'U.S.' | 'International' | 'Canada' | 'Español' | '中文';
