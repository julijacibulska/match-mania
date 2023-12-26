import { Card, useGame } from '../../state/game';
import { useShallow } from 'zustand/react/shallow';

const gameColumns = {
  easy: 'grid-cols-4',
  medium: 'grid-cols-5',
  hard: 'grid-cols-6',
} as const;

export const Game = (): React.JSX.Element => {
  const { difficulty, gameLayout, selectedCards, selectCard, reset } = useGame(
    useShallow((state) => ({
      difficulty: state.difficulty,
      gameLayout: state.layout,
      selectCard: state.selectCard,
      selectedCards: state.selectedCardIndices,
      reset: state.generateLayout,
    })),
  );

  return (
    <div className="w-full p-4 flex flex-col items-center justify-center">
      <div
        className={`mb-4 grid ${gameColumns[difficulty]} gap-4 grid-rows-auto`}
      >
        {gameLayout?.map((card: Card, index: number) => (
          <div
            key={index}
            className={`w-40 text-7xl text-center p-4 border rounded ${
              (selectedCards as number[]).includes(index)
                ? 'border-green-400'
                : 'border-grey-100'
            } cursor-pointer`}
            onClick={() => selectCard(index)}
          >
            {card.isMatched || (selectedCards as number[]).includes(index)
              ? card.content
              : 'x'}
          </div>
        ))}
      </div>
      <div>
        <button
          className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
          onClick={reset}
        >
          Reset
        </button>
      </div>
    </div>
  );
};
