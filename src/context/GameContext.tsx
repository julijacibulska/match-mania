import React, { createContext, useContext, useState } from "react";

export const gameDifficulty = {
  EASY: "easy",
  MEDIUM: "medium",
  HARD: "hard",
} as const;

const GameContext = createContext({
  game: {
    difficulty: gameDifficulty.EASY,
    isGameSetup: true,
  },
  updateGame: (newGame: any) => {},
  toggleIsGameSetup: () => {},
});

export const GameProvider = ({ children }: { children: React.ReactNode }) => {
  const [game, setGame] = useState({
    difficulty: gameDifficulty.EASY,
    isGameSetup: true,
  });

  const updateGame = (newGame: any) => {
    console.log(newGame);
    setGame((prevGame) => ({
      ...prevGame,
      ...newGame,
    }));
  };

  const toggleIsGameSetup = () => {
    setGame((prevGame) => ({
      ...prevGame,
      isGameSetup: !prevGame.isGameSetup,
    }));
  };

  return (
    <GameContext.Provider value={{ game, updateGame, toggleIsGameSetup }}>
      {children}
    </GameContext.Provider>
  );
};

export const useGame = () => {
  const context = useContext(GameContext);
  if (!context) {
    throw new Error("useGame must be used within an GameProvider");
  }
  return context;
};
