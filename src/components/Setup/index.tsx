import { gameDifficulty, useGame } from "../../context/GameContext";

export const Setup = (): React.JSX.Element => {
  const { game, updateGame, toggleIsGameSetup } = useGame();

  const onValueChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    updateGame({ difficulty: e.target.value });
  };

  return (
    <div>
      <h1>Setup</h1>

      <h2>Choose your difficulty</h2>

      {Object.entries(gameDifficulty).map(([key, value]) => (
        <div key={key}>
          <input
            type="radio"
            name="difficulty"
            id={value}
            checked={game.difficulty === value}
            onChange={onValueChange}
          />
          <label htmlFor={value}>{value}</label>
        </div>
      ))}

      <button
        className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
        onClick={toggleIsGameSetup}
      >
        Start
      </button>
    </div>
  );
};
