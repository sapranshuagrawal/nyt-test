import React, { useState, useEffect, useRef } from 'react';
import { ArrowLeft, Clock, RotateCcw, CheckCircle, HelpCircle, Trophy, Sparkles } from 'lucide-react';
import { MINI_CROSSWORD_DATA, WORDLE_WORD, SPELLING_BEE_DATA } from '../data/games';

interface GamesViewProps {
  initialGame?: 'wordle' | 'crossword' | 'spelling-bee';
  onBack: () => void;
}

export const GamesView: React.FC<GamesViewProps> = ({
  initialGame = 'crossword',
  onBack
}) => {
  const [selectedTab, setSelectedTab] = useState<'crossword' | 'wordle' | 'spelling-bee'>(initialGame);

  return (
    <div className="max-w-[1080px] mx-auto px-4 lg:px-6 py-6">
      {/* Top Bar */}
      <div className="flex items-center justify-between border-b border-[#e2e2e2] pb-4 mb-6">
        <button
          onClick={onBack}
          className="inline-flex items-center gap-1.5 text-xs font-nyt-sans font-semibold text-[#121212] hover:text-[#567b95] transition-colors cursor-pointer"
        >
          <ArrowLeft className="w-3.5 h-3.5" />
          <span>Back to The New York Times</span>
        </button>

        <div className="flex items-center space-x-1 border border-[#e2e2e2] rounded p-1 bg-[#f7f7f7]">
          <button
            onClick={() => setSelectedTab('crossword')}
            className={`px-3 py-1 text-xs font-nyt-sans font-bold rounded cursor-pointer transition-colors ${
              selectedTab === 'crossword' ? 'bg-white shadow-xs text-black' : 'text-[#727272] hover:text-black'
            }`}
          >
            The Mini Crossword
          </button>
          <button
            onClick={() => setSelectedTab('wordle')}
            className={`px-3 py-1 text-xs font-nyt-sans font-bold rounded cursor-pointer transition-colors ${
              selectedTab === 'wordle' ? 'bg-white shadow-xs text-black' : 'text-[#727272] hover:text-black'
            }`}
          >
            Wordle
          </button>
          <button
            onClick={() => setSelectedTab('spelling-bee')}
            className={`px-3 py-1 text-xs font-nyt-sans font-bold rounded cursor-pointer transition-colors ${
              selectedTab === 'spelling-bee' ? 'bg-white shadow-xs text-black' : 'text-[#727272] hover:text-black'
            }`}
          >
            Spelling Bee
          </button>
        </div>
      </div>

      {selectedTab === 'crossword' && <MiniCrossword />}
      {selectedTab === 'wordle' && <WordleGame />}
      {selectedTab === 'spelling-bee' && <SpellingBeeGame />}
    </div>
  );
};

/* =========================================================================
   1. MINI CROSSWORD COMPONENT
   ========================================================================= */
const MiniCrossword: React.FC = () => {
  const [grid, setGrid] = useState<string[][]>(
    Array(5).fill(null).map(() => Array(5).fill(''))
  );
  const [selectedCell, setSelectedCell] = useState<{ r: number; c: number }>({ r: 0, c: 0 });
  const [direction, setDirection] = useState<'across' | 'down'>('across');
  const [seconds, setSeconds] = useState(0);
  const [isRunning, setIsRunning] = useState(true);
  const [isSolved, setIsSolved] = useState(false);
  const [checkResult, setCheckResult] = useState<string | null>(null);

  // Timer
  useEffect(() => {
    let interval: NodeJS.Timeout;
    if (isRunning && !isSolved) {
      interval = setInterval(() => setSeconds((s) => s + 1), 1000);
    }
    return () => clearInterval(interval);
  }, [isRunning, isSolved]);

  const formatTime = (totalSeconds: number) => {
    const mins = Math.floor(totalSeconds / 60);
    const secs = totalSeconds % 60;
    return `${mins}:${secs < 10 ? '0' : ''}${secs}`;
  };

  const handleCellClick = (r: number, c: number) => {
    if (selectedCell.r === r && selectedCell.c === c) {
      setDirection((d) => (d === 'across' ? 'down' : 'across'));
    } else {
      setSelectedCell({ r, c });
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    const { r, c } = selectedCell;

    if (e.key === 'Backspace') {
      const nextGrid = grid.map((row) => [...row]);
      nextGrid[r][c] = '';
      setGrid(nextGrid);
      // Move back
      if (direction === 'across' && c > 0) setSelectedCell({ r, c: c - 1 });
      if (direction === 'down' && r > 0) setSelectedCell({ r: r - 1, c });
      return;
    }

    if (e.key === 'ArrowRight' && c < 4) setSelectedCell({ r, c: c + 1 });
    if (e.key === 'ArrowLeft' && c > 0) setSelectedCell({ r, c: c - 1 });
    if (e.key === 'ArrowDown' && r < 4) setSelectedCell({ r: r + 1, c });
    if (e.key === 'ArrowUp' && r > 0) setSelectedCell({ r: r - 1, c });

    if (/^[a-zA-Z]$/.test(e.key)) {
      const char = e.key.toUpperCase();
      const nextGrid = grid.map((row) => [...row]);
      nextGrid[r][c] = char;
      setGrid(nextGrid);

      // Check if finished
      let allFilled = true;
      let allCorrect = true;
      for (let i = 0; i < 5; i++) {
        for (let j = 0; j < 5; j++) {
          const val = (i === r && j === c) ? char : nextGrid[i][j];
          if (!val) allFilled = false;
          if (val !== MINI_CROSSWORD_DATA.solution[i][j]) allCorrect = false;
        }
      }

      if (allFilled && allCorrect) {
        setIsSolved(true);
        setIsRunning(false);
      }

      // Move next
      if (direction === 'across' && c < 4) setSelectedCell({ r, c: c + 1 });
      else if (direction === 'down' && r < 4) setSelectedCell({ r: r + 1, c });
    }
  };

  const handleRevealAll = () => {
    setGrid(MINI_CROSSWORD_DATA.solution);
    setIsSolved(true);
    setIsRunning(false);
  };

  const handleReset = () => {
    setGrid(Array(5).fill(null).map(() => Array(5).fill('')));
    setSelectedCell({ r: 0, c: 0 });
    setSeconds(0);
    setIsSolved(false);
    setIsRunning(true);
    setCheckResult(null);
  };

  return (
    <div className="max-w-[800px] mx-auto focus:outline-none" tabIndex={0} onKeyDown={handleKeyDown}>
      {/* Crossword Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between border-b border-[#e2e2e2] pb-3 mb-6 gap-2">
        <div>
          <span className="text-[11px] font-nyt-sans font-bold uppercase tracking-wider text-[#727272]">
            The New York Times Games
          </span>
          <h2 className="font-nyt-headline text-3xl font-bold text-[#121212]">
            The Mini Crossword
          </h2>
          <p className="text-xs font-nyt-sans text-[#727272]">
            {MINI_CROSSWORD_DATA.date} • Edited by {MINI_CROSSWORD_DATA.author}
          </p>
        </div>

        <div className="flex items-center space-x-3 text-xs font-nyt-sans">
          <div className="flex items-center gap-1.5 px-3 py-1.5 bg-[#f7f7f7] rounded border border-[#e2e2e2]">
            <Clock className="w-4 h-4 text-[#567b95]" />
            <span className="font-mono text-sm font-bold text-[#121212]">{formatTime(seconds)}</span>
          </div>
          <button
            onClick={handleReset}
            className="p-2 border border-[#e2e2e2] rounded hover:bg-gray-100 transition-colors cursor-pointer"
            title="Reset Puzzle"
          >
            <RotateCcw className="w-3.5 h-3.5" />
          </button>
          <button
            onClick={handleRevealAll}
            className="px-2.5 py-1 text-xs border border-[#121212] rounded hover:bg-black hover:text-white transition-colors cursor-pointer"
          >
            Reveal
          </button>
        </div>
      </div>

      {isSolved && (
        <div className="bg-[#e8f2ea] border border-[#a2cfac] p-4 rounded-md mb-6 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <CheckCircle className="w-6 h-6 text-green-700" />
            <div>
              <h4 className="font-bold text-green-900 text-sm">Congratulations! Puzzle Solved!</h4>
              <p className="text-xs text-green-800">You completed the Mini in {formatTime(seconds)}.</p>
            </div>
          </div>
          <button
            onClick={handleReset}
            className="bg-green-800 hover:bg-green-900 text-white text-xs px-3 py-1.5 rounded font-bold cursor-pointer"
          >
            Play Again
          </button>
        </div>
      )}

      {/* Grid and Clues */}
      <div className="grid grid-cols-1 md:grid-cols-12 gap-8 items-start">
        {/* 5x5 Crossword Grid */}
        <div className="md:col-span-6 flex flex-col items-center">
          <div className="grid grid-cols-5 gap-[1px] bg-black p-[2px] border-2 border-black rounded-xs shadow-md">
            {grid.map((row, r) =>
              row.map((cell, c) => {
                const isSelected = selectedCell.r === r && selectedCell.c === c;
                const isWordHighlighted =
                  direction === 'across'
                    ? selectedCell.r === r
                    : selectedCell.c === c;
                const clueNum = MINI_CROSSWORD_DATA.clueNumbers[r][c];

                return (
                  <button
                    key={`${r}-${c}`}
                    onClick={() => handleCellClick(r, c)}
                    className={`w-14 h-14 sm:w-16 sm:h-16 relative flex items-center justify-center font-nyt-sans font-bold text-2xl transition-colors cursor-pointer select-none focus:outline-none ${
                      isSelected
                        ? 'bg-[#ffda00] text-black'
                        : isWordHighlighted
                        ? 'bg-[#a7d8ff] text-black'
                        : 'bg-white hover:bg-gray-50 text-black'
                    }`}
                  >
                    {clueNum > 0 && (
                      <span className="absolute top-0.5 left-1 text-[10px] font-sans font-medium text-black">
                        {clueNum}
                      </span>
                    )}
                    <span>{cell}</span>
                  </button>
                );
              })
            )}
          </div>
          <p className="text-[11px] font-nyt-sans text-[#727272] mt-3">
            Click a square to type. Click again to toggle Across / Down direction.
          </p>
        </div>

        {/* Clues Pane */}
        <div className="md:col-span-6 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-1 gap-6 text-xs font-nyt-sans">
          {/* Across Clues */}
          <div>
            <h3 className="font-bold uppercase tracking-wider text-black pb-1 border-b border-black mb-2">
              Across
            </h3>
            <ul className="space-y-2">
              {MINI_CROSSWORD_DATA.across.map((item) => {
                const isCurrent =
                  direction === 'across' &&
                  selectedCell.r === MINI_CROSSWORD_DATA.across.indexOf(item);
                return (
                  <li
                    key={item.number}
                    onClick={() => {
                      const rIndex = MINI_CROSSWORD_DATA.across.indexOf(item);
                      setSelectedCell({ r: rIndex, c: 0 });
                      setDirection('across');
                    }}
                    className={`cursor-pointer p-1 rounded transition-colors ${
                      isCurrent ? 'bg-[#ffda00]/30 font-semibold text-black' : 'hover:bg-gray-100 text-[#333]'
                    }`}
                  >
                    <span className="font-bold text-black mr-1">{item.number}</span>
                    <span>{item.clue}</span>
                  </li>
                );
              })}
            </ul>
          </div>

          {/* Down Clues */}
          <div>
            <h3 className="font-bold uppercase tracking-wider text-black pb-1 border-b border-black mb-2">
              Down
            </h3>
            <ul className="space-y-2">
              {MINI_CROSSWORD_DATA.down.map((item) => {
                const isCurrent =
                  direction === 'down' &&
                  selectedCell.c === MINI_CROSSWORD_DATA.down.indexOf(item);
                return (
                  <li
                    key={item.number}
                    onClick={() => {
                      const cIndex = MINI_CROSSWORD_DATA.down.indexOf(item);
                      setSelectedCell({ r: 0, c: cIndex });
                      setDirection('down');
                    }}
                    className={`cursor-pointer p-1 rounded transition-colors ${
                      isCurrent ? 'bg-[#ffda00]/30 font-semibold text-black' : 'hover:bg-gray-100 text-[#333]'
                    }`}
                  >
                    <span className="font-bold text-black mr-1">{item.number}</span>
                    <span>{item.clue}</span>
                  </li>
                );
              })}
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};

/* =========================================================================
   2. WORDLE COMPONENT
   ========================================================================= */
const WordleGame: React.FC = () => {
  const targetWord = WORDLE_WORD;
  const [guesses, setGuesses] = useState<string[]>([]);
  const [currentGuess, setCurrentGuess] = useState('');
  const [gameStatus, setGameStatus] = useState<'playing' | 'won' | 'lost'>('playing');

  const handleKeyPress = (letter: string) => {
    if (gameStatus !== 'playing') return;

    if (letter === 'ENTER') {
      if (currentGuess.length !== 5) return;
      const nextGuesses = [...guesses, currentGuess.toUpperCase()];
      setGuesses(nextGuesses);
      if (currentGuess.toUpperCase() === targetWord) {
        setGameStatus('won');
      } else if (nextGuesses.length >= 6) {
        setGameStatus('lost');
      }
      setCurrentGuess('');
      return;
    }

    if (letter === 'BACKSPACE') {
      setCurrentGuess((g) => g.slice(0, -1));
      return;
    }

    if (currentGuess.length < 5 && /^[A-Z]$/.test(letter)) {
      setCurrentGuess((g) => g + letter);
    }
  };

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Enter') handleKeyPress('ENTER');
      else if (e.key === 'Backspace') handleKeyPress('BACKSPACE');
      else if (/^[a-zA-Z]$/.test(e.key)) handleKeyPress(e.key.toUpperCase());
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [currentGuess, gameStatus, guesses]);

  const getTileColor = (rowIndex: number, colIndex: number) => {
    const guess = guesses[rowIndex];
    if (!guess) return 'border-[#d3d6da] bg-white text-black';

    const char = guess[colIndex];
    if (targetWord[colIndex] === char) {
      return 'bg-[#6aaa64] text-white border-[#6aaa64]';
    } else if (targetWord.includes(char)) {
      return 'bg-[#c9b458] text-white border-[#c9b458]';
    } else {
      return 'bg-[#787c7e] text-white border-[#787c7e]';
    }
  };

  const keyboardRows = [
    ['Q', 'W', 'E', 'R', 'T', 'Y', 'U', 'I', 'O', 'P'],
    ['A', 'S', 'D', 'F', 'G', 'H', 'J', 'K', 'L'],
    ['ENTER', 'Z', 'X', 'C', 'V', 'B', 'N', 'M', 'BACKSPACE']
  ];

  return (
    <div className="max-w-[500px] mx-auto text-center font-nyt-sans">
      <div className="border-b border-[#e2e2e2] pb-3 mb-6">
        <h2 className="font-nyt-headline text-3xl font-bold tracking-tight">Wordle</h2>
        <p className="text-xs text-[#727272]">Get 6 chances to guess a 5-letter word.</p>
      </div>

      {gameStatus !== 'playing' && (
        <div
          className={`p-3 rounded mb-4 text-sm font-bold ${
            gameStatus === 'won' ? 'bg-[#6aaa64] text-white' : 'bg-[#121212] text-white'
          }`}
        >
          {gameStatus === 'won'
            ? `Splendid! You guessed ${targetWord} in ${guesses.length} attempts!`
            : `The word was ${targetWord}. Better luck next time!`}
          <button
            onClick={() => {
              setGuesses([]);
              setCurrentGuess('');
              setGameStatus('playing');
            }}
            className="ml-3 underline cursor-pointer"
          >
            Play Again
          </button>
        </div>
      )}

      {/* 6 Rows Grid */}
      <div className="grid grid-rows-6 gap-1.5 justify-center mb-6">
        {Array.from({ length: 6 }).map((_, rIndex) => {
          const guess = guesses[rIndex];
          const isCurrentRow = rIndex === guesses.length;

          return (
            <div key={rIndex} className="grid grid-cols-5 gap-1.5">
              {Array.from({ length: 5 }).map((_, cIndex) => {
                let letter = '';
                if (guess) letter = guess[cIndex];
                else if (isCurrentRow && currentGuess[cIndex]) letter = currentGuess[cIndex];

                const colorClasses = getTileColor(rIndex, cIndex);

                return (
                  <div
                    key={cIndex}
                    className={`w-12 h-12 sm:w-14 sm:h-14 border-2 flex items-center justify-center font-bold text-2xl uppercase select-none transition-colors ${
                      guess ? colorClasses : letter ? 'border-black text-black' : 'border-[#d3d6da] text-black'
                    }`}
                  >
                    {letter}
                  </div>
                );
              })}
            </div>
          );
        })}
      </div>

      {/* On Screen Keyboard */}
      <div className="space-y-1.5 max-w-[480px] mx-auto">
        {keyboardRows.map((row, rIdx) => (
          <div key={rIdx} className="flex justify-center gap-1">
            {row.map((key) => (
              <button
                key={key}
                onClick={() => handleKeyPress(key)}
                className={`py-3 rounded font-bold uppercase transition-colors cursor-pointer text-xs select-none ${
                  key.length > 1 ? 'px-2 bg-[#d3d6da]' : 'px-2.5 sm:px-3 bg-[#d3d6da]'
                } hover:bg-gray-400`}
              >
                {key === 'BACKSPACE' ? '⌫' : key}
              </button>
            ))}
          </div>
        ))}
      </div>
    </div>
  );
};

/* =========================================================================
   3. SPELLING BEE COMPONENT
   ========================================================================= */
const SpellingBeeGame: React.FC = () => {
  const { centerLetter, outerLetters, validWords } = SPELLING_BEE_DATA;
  const [currentInput, setCurrentInput] = useState('');
  const [foundWords, setFoundWords] = useState<string[]>([]);
  const [score, setScore] = useState(0);
  const [message, setMessage] = useState<string | null>(null);

  const handleSubmit = (e?: React.FormEvent) => {
    if (e) e.preventDefault();
    const word = currentInput.toUpperCase();
    setCurrentInput('');

    if (word.length < 4) {
      showMessage('Too short (minimum 4 letters)');
      return;
    }
    if (!word.includes(centerLetter)) {
      showMessage(`Must include center letter: ${centerLetter}`);
      return;
    }
    if (foundWords.includes(word)) {
      showMessage('Already found');
      return;
    }
    if (!validWords.includes(word)) {
      showMessage('Not in word list');
      return;
    }

    const points = word.length === 4 ? 1 : word.length;
    setScore((s) => s + points);
    setFoundWords([word, ...foundWords]);
    showMessage(`Great! +${points} pts`);
  };

  const showMessage = (msg: string) => {
    setMessage(msg);
    setTimeout(() => setMessage(null), 2500);
  };

  const addLetter = (l: string) => {
    setCurrentInput((c) => c + l);
  };

  const getRank = (sc: number) => {
    if (sc > 30) return 'Genius';
    if (sc > 20) return 'Amazing';
    if (sc > 12) return 'Great';
    if (sc > 6) return 'Solid';
    if (sc > 2) return 'Good';
    return 'Beginner';
  };

  return (
    <div className="max-w-[700px] mx-auto font-nyt-sans">
      <div className="border-b border-[#e2e2e2] pb-3 mb-6 text-center">
        <h2 className="font-nyt-headline text-3xl font-bold tracking-tight">Spelling Bee</h2>
        <p className="text-xs text-[#727272]">
          How many words can you make with 7 letters? Center letter is required.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-12 gap-8 items-start">
        {/* Left Column: Honeycomb & Controls */}
        <div className="md:col-span-7 flex flex-col items-center">
          {/* Progress bar */}
          <div className="w-full max-w-[320px] mb-4">
            <div className="flex justify-between text-xs font-bold mb-1">
              <span>Rank: <span className="text-[#f7da21] font-black">{getRank(score)}</span></span>
              <span>{score} pts</span>
            </div>
            <div className="w-full bg-gray-200 h-2 rounded-full overflow-hidden">
              <div
                className="bg-[#f7da21] h-full transition-all duration-300"
                style={{ width: `${Math.min(100, (score / 40) * 100)}%` }}
              ></div>
            </div>
          </div>

          {/* Input text display */}
          <div className="h-10 text-2xl font-bold uppercase tracking-wider text-black flex items-center justify-center mb-3">
            {currentInput || <span className="text-gray-300">Type or click letters</span>}
          </div>

          {message && (
            <div className="mb-2 text-xs font-bold text-amber-900 bg-amber-100 px-3 py-1 rounded">
              {message}
            </div>
          )}

          {/* Hive of hexagonal letters */}
          <div className="relative w-64 h-64 my-2 flex items-center justify-center">
            {/* Center letter */}
            <button
              onClick={() => addLetter(centerLetter)}
              className="w-16 h-16 rounded-full bg-[#f7da21] hover:bg-[#ebd01a] text-black font-extrabold text-2xl flex items-center justify-center shadow-md cursor-pointer transition-transform hover:scale-105 z-10"
            >
              {centerLetter}
            </button>

            {/* Surrounding letters */}
            {outerLetters.map((letter, idx) => {
              const angle = (idx * 60 - 90) * (Math.PI / 180);
              const radius = 70;
              const x = Math.cos(angle) * radius;
              const y = Math.sin(angle) * radius;

              return (
                <button
                  key={letter}
                  onClick={() => addLetter(letter)}
                  style={{
                    transform: `translate(${x}px, ${y}px)`
                  }}
                  className="absolute w-14 h-14 rounded-full bg-[#e6e6e6] hover:bg-[#d4d4d4] text-black font-bold text-xl flex items-center justify-center shadow-sm cursor-pointer transition-transform hover:scale-105"
                >
                  {letter}
                </button>
              );
            })}
          </div>

          {/* Action buttons */}
          <div className="flex gap-2 mt-4">
            <button
              onClick={() => setCurrentInput((c) => c.slice(0, -1))}
              className="px-4 py-2 text-xs font-bold border border-black rounded-full hover:bg-gray-100 cursor-pointer"
            >
              Delete
            </button>
            <button
              onClick={() => handleSubmit()}
              className="px-6 py-2 text-xs font-bold bg-black text-white rounded-full hover:bg-gray-800 cursor-pointer"
            >
              Enter
            </button>
          </div>
        </div>

        {/* Right Column: Found Words List */}
        <div className="md:col-span-5 bg-[#f9f9f9] border border-[#e2e2e2] rounded p-4">
          <h4 className="font-bold text-xs uppercase tracking-wider text-black border-b border-[#e2e2e2] pb-2 mb-3">
            Words Found ({foundWords.length})
          </h4>
          {foundWords.length === 0 ? (
            <p className="text-xs text-[#727272] italic">No words found yet. Discover words using the hive!</p>
          ) : (
            <div className="flex flex-wrap gap-1.5 max-h-[220px] overflow-y-auto">
              {foundWords.map((w) => (
                <span
                  key={w}
                  className="text-xs font-semibold bg-white border border-[#d2d2d2] px-2 py-0.5 rounded capitalize"
                >
                  {w.toLowerCase()}
                </span>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
