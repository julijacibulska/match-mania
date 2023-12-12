import { useGame } from "./context/GameContext";
import { Setup } from "./components/Setup";

export function App() {
  const { game } = useGame();

  return game.isGameSetup ? <Setup /> : <div className="text-3xl">Hi</div>;
}
