import { useMemo, useReducer } from 'react';
import { useGame } from '../../context/GameContext';
import { shuffleArray } from '../../utils/shuffle-array';

const gameSetup = {
  easy: { count: 12, columns: 4 },
  medium: { count: 20, columns: 5 },
  hard: { count: 30, columns: 6 },
} as const;

const availableCards = [
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
];

enum ActionType {
  SELECT_CARD = 'SELECT_CARD',
  MATCH_CARD = 'MATCH_CARD',
  RESET = 'RESET',
}

interface Action {
  type: ActionType;
  payload: any;
}

const generateCardSet = (cardCount: number) => {
  const cardPairCount = cardCount / 2;
  const possibleCards = availableCards.slice(0, cardPairCount);

  const cards = shuffleArray([...possibleCards, ...possibleCards]);

  return cards.map((card) => ({
    content: card,
    isSelected: false,
    isMatched: false,
  }));
};

const reducer = (state: any, action: Action) => {
  switch (action.type) {
    case ActionType.SELECT_CARD:
      return {
        ...state,
      };
    case ActionType.MATCH_CARD:
      return { ...state };
    case ActionType.RESET:
      return generateCardSet(state.length - 1);
  }
};

export const Game = (): React.JSX.Element => {
  const { game } = useGame();

  const [cards, dispatch] = useReducer(
    reducer,
    generateCardSet(gameSetup[game.difficulty].count),
  );

  return (
    <div
      className={`grid grid-cols-${
        gameSetup[game.difficulty].columns
      } gap-4 grid-rows-auto`}
    >
      {cards.map((card) => (
        <div className="text-7xl p-4 border rounded border-gray-200">
          {card.content}
        </div>
      ))}
    </div>
  );
};
