import { useState } from 'react';
import { GameMode, gameDifficulty, useGame } from '../../state/game';
import { useShallow } from 'zustand/react/shallow';
import { useGlobal } from '../../state/global';

export const Settings = (): React.JSX.Element => {
  const toggleGameSetup = useGlobal((state) => state.toggleSetup);
  const { difficulty, setDifficulty } = useGame(
    useShallow((state) => ({
      difficulty: state.difficulty,
      setDifficulty: state.setDifficulty,
    })),
  );
  const [selectedDifficulty, setSelectedDifficulty] =
    useState<GameMode>(difficulty);

  const onValueChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSelectedDifficulty(e.target.id as GameMode);
  };

  const startGame = () => {
    setDifficulty(selectedDifficulty);
    toggleGameSetup();
  };

  return (
    <div>
      <h1>Setup</h1>

      <h2>Choose game difficulty</h2>

      {Object.keys(gameDifficulty).map((key) => (
        <div key={key}>
          <input
            type="radio"
            name="difficulty"
            id={key}
            checked={selectedDifficulty === key}
            onChange={onValueChange}
          />
          <label htmlFor={key}>{key}</label>
        </div>
      ))}

      <div className="mt-4">
        <button
          className="border border-grey-500 hover:bg-grey-200 font-bold py-2 px-4 mr-4 rounded"
          onClick={toggleGameSetup}
        >
          Cancel
        </button>
        <button
          className="bg-green-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
          onClick={startGame}
        >
          Start
        </button>
      </div>
    </div>
  );
};
