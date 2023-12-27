import { create } from 'zustand';
import { shuffleArray } from '../utils/shuffle-array';

export interface Card {
  content: (typeof availableCards)[number];
  isMatched: boolean;
}

interface GameState {
  difficulty: GameMode;
  setDifficulty: (difficulty: GameMode) => void;
  layout: Card[];
  generateLayout: () => void;
  isCompleted: () => boolean;
  selectedCardIndices: [] | [number] | [number, number];
  selectCard: (index: number) => void;
  matchCards: (first: number, second: number) => void;
}

export const useGame = create<GameState>((set, get) => ({
  difficulty: 'easy',
  setDifficulty: (difficulty: GameMode) => {
    set({ difficulty });
    get().generateLayout();
  },
  layout: [],
  generateLayout: () => {
    const cardCount = gameDifficulty[get().difficulty];
    const cardPairCount = cardCount / 2;
    const possibleCards = availableCards.slice(0, cardPairCount);
    const cards = shuffleArray([...possibleCards, ...possibleCards]);

    set({
      layout: cards.map((card) => ({
        content: card,
        isMatched: false,
      })),
    });
  },
  isCompleted: () => get().layout.every((card) => card.isMatched),
  selectedCardIndices: [],
  selectCard: (index: number) => {
    const { selectedCardIndices, layout } = get();

    if (selectedCardIndices.length >= 2) {
      return;
    }

    if (selectedCardIndices.length === 0) {
      set({ selectedCardIndices: [index] });
      return;
    }

    set((state) => ({
      selectedCardIndices: [...state.selectedCardIndices, index] as [
        number,
        number,
      ],
    }));

    if (layout[index].content === layout[selectedCardIndices[0]].content) {
      get().matchCards(selectedCardIndices[0], index);
      set({ selectedCardIndices: [] });
      return;
    }

    setTimeout(() => set({ selectedCardIndices: [] }), 1500);
  },
  matchCards: (firstCardIndex: number, secondCardIndex: number) => {
    const { layout } = get();
    const firstCard = layout[firstCardIndex];
    const secondCard = layout[secondCardIndex];

    if (firstCard.content !== secondCard.content) {
      return;
    }

    set({
      layout: layout.map((card, i) => {
        if (![firstCardIndex, secondCardIndex].includes(i)) {
          return card;
        }

        return {
          ...card,
          isMatched: true,
        };
      }),
    });
  },
}));

export const gameDifficulty = {
  easy: 12,
  medium: 20,
  hard: 30,
} as const;

export type GameCardCount =
  (typeof gameDifficulty)[keyof typeof gameDifficulty];
export type GameMode = keyof typeof gameDifficulty;

export const availableCards = [
  '🐶',
  '🐱',
  '🦊',
  '🐷',
  '🐸',
  '🐨',
  '🐼',
  '🦁',
  '🐭',
  '🐻',
  '🐯',
  '🐰',
  '🐮',
  '🐹',
  '🐻‍❄️',
] as const;
