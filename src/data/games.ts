export interface CrosswordCell {
  row: number;
  col: number;
  letter: string;
  number?: number;
  isBlocked: boolean;
}

export interface CrosswordClue {
  number: number;
  clue: string;
  answer: string;
}

export const MINI_CROSSWORD_DATA = {
  title: 'The Mini Crossword',
  date: 'Monday, Oct. 13, 2025',
  author: 'Joel Fagliano',
  gridSize: 5,
  solution: [
    ['P', 'A', 'P', 'E', 'R'],
    ['A', 'L', 'I', 'V', 'E'],
    ['C', 'O', 'N', 'E', 'S'],
    ['E', 'N', 'T', 'R', 'Y'],
    ['S', 'E', 'O', 'U', 'L']
  ],
  clueNumbers: [
    [1, 2, 3, 4, 5],
    [6, 0, 0, 0, 0],
    [7, 0, 0, 0, 0],
    [8, 0, 0, 0, 0],
    [9, 0, 0, 0, 0]
  ],
  across: [
    { number: 1, clue: 'Material for the morning edition', answer: 'PAPER' },
    { number: 6, clue: 'Full of energy and vigor', answer: 'ALIVE' },
    { number: 7, clue: 'Geometric shapes or ice cream holders', answer: 'CONES' },
    { number: 8, clue: 'Doorway or contest submission', answer: 'ENTRY' },
    { number: 9, clue: 'Capital city with a famous tower', answer: 'SEOUL' }
  ],
  down: [
    { number: 1, clue: 'Steps in a marathon, or marching tempo', answer: 'PACES' },
    { number: 2, clue: 'Single-celled or lonely, informally', answer: 'ALONE' },
    { number: 3, clue: 'Small measure of liquid or beer', answer: 'PINTO' },
    { number: 4, clue: 'Each and ___ one', answer: 'EVERY' },
    { number: 5, clue: 'Regal and dignified', answer: 'RESUL' }
  ]
};

export const WORDLE_WORD = 'PRESS';

export const SPELLING_BEE_DATA = {
  centerLetter: 'P',
  outerLetters: ['A', 'E', 'R', 'T', 'S', 'O'],
  validWords: [
    'PAPER', 'PRESS', 'PASTOR', 'POET', 'POST', 'POSTER',
    'POTATO', 'PROSE', 'POTS', 'PORT', 'PORTER', 'PEAT',
    'PASTA', 'PART', 'PARTS', 'PARTY', 'PEAR', 'PEST',
    'POETRY', 'PROTEST', 'PATTIES', 'PATTED'
  ],
  pangram: 'PASTOR',
  targetScore: 40
};
