import { useGame } from "./context/GameContext";
import { Setup } from "./components/Setup";
import { Game } from "./components/Game";

export const App = () => {
  const { game } = useGame();

  return !game.isGameSetup ? <Setup /> : <Game/>;
}
