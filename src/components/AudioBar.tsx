import React, { useState, useEffect } from 'react';
import { Play, Pause, RotateCcw, RotateCw, X, Volume2, FastForward } from 'lucide-react';
import { Article } from '../types';

interface AudioBarProps {
  article: Article | null;
  onClose: () => void;
  onOpenArticle: (article: Article) => void;
}

export const AudioBar: React.FC<AudioBarProps> = ({
  article,
  onClose,
  onOpenArticle
}) => {
  if (!article) return null;

  const [isPlaying, setIsPlaying] = useState(true);
  const [progress, setProgress] = useState(15); // percentage
  const [playbackRate, setPlaybackRate] = useState<number>(1);

  // Simulated progress
  useEffect(() => {
    let interval: NodeJS.Timeout;
    if (isPlaying) {
      interval = setInterval(() => {
        setProgress((prev) => (prev >= 100 ? 0 : prev + 0.5 * playbackRate));
      }, 1000);
    }
    return () => clearInterval(interval);
  }, [isPlaying, playbackRate]);

  const toggleRate = () => {
    if (playbackRate === 1) setPlaybackRate(1.25);
    else if (playbackRate === 1.25) setPlaybackRate(1.5);
    else setPlaybackRate(1);
  };

  return (
    <div className="fixed bottom-0 left-0 right-0 z-40 bg-[#121212] text-white border-t border-[#333] shadow-2xl py-3 px-4 font-nyt-sans">
      <div className="max-w-[1280px] mx-auto flex flex-col sm:flex-row sm:items-center justify-between gap-3">
        {/* Left: Article info */}
        <div
          onClick={() => onOpenArticle(article)}
          className="flex items-center gap-3 cursor-pointer group min-w-0"
        >
          <div className="w-9 h-9 rounded bg-[#567b95] text-white flex items-center justify-center shrink-0">
            <Volume2 className="w-5 h-5" />
          </div>
          <div className="truncate">
            <div className="text-[10px] font-bold uppercase tracking-wider text-[#a7d8ff]">
              Now Playing • NYT Audio
            </div>
            <div className="text-xs font-bold text-white group-hover:underline truncate">
              {article.title}
            </div>
            <div className="text-[10px] text-gray-400">
              Narrated by NYT • {article.audioDuration || '5:00'}
            </div>
          </div>
        </div>

        {/* Center: Playback controls */}
        <div className="flex items-center justify-center gap-3">
          <button
            onClick={() => setProgress((p) => Math.max(0, p - 10))}
            className="p-1 text-gray-400 hover:text-white transition-colors cursor-pointer"
            title="Rewind 15 seconds"
          >
            <RotateCcw className="w-4 h-4" />
          </button>

          <button
            onClick={() => setIsPlaying(!isPlaying)}
            className="w-8 h-8 rounded-full bg-white text-black flex items-center justify-center hover:bg-gray-200 transition-colors cursor-pointer shadow-sm"
          >
            {isPlaying ? <Pause className="w-4 h-4 fill-black" /> : <Play className="w-4 h-4 fill-black ml-0.5" />}
          </button>

          <button
            onClick={() => setProgress((p) => Math.min(100, p + 10))}
            className="p-1 text-gray-400 hover:text-white transition-colors cursor-pointer"
            title="Fast forward 15 seconds"
          >
            <RotateCw className="w-4 h-4" />
          </button>

          {/* Speed button */}
          <button
            onClick={toggleRate}
            className="text-[11px] font-bold text-gray-400 hover:text-white border border-gray-600 px-1.5 py-0.5 rounded cursor-pointer ml-1"
          >
            {playbackRate}x
          </button>
        </div>

        {/* Right: Progress bar & close */}
        <div className="flex items-center gap-3">
          <div className="w-32 bg-gray-700 h-1.5 rounded-full overflow-hidden hidden md:block">
            <div
              className="bg-[#567b95] h-full transition-all duration-300"
              style={{ width: `${progress}%` }}
            ></div>
          </div>

          <button
            onClick={onClose}
            className="p-1 text-gray-400 hover:text-white rounded cursor-pointer"
            title="Close audio player"
          >
            <X className="w-4 h-4" />
          </button>
        </div>
      </div>
    </div>
  );
};
