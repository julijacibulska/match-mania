import { Settings } from './components/Settings';
import { Game } from './components/Game';
import { useGlobal } from './state/global';
import { useShallow } from 'zustand/react/shallow';

export const App = () => {
  const { isGameSetup, toggleGameSetup } = useGlobal(
    useShallow((state) => ({
      isGameSetup: state.isSetup,
      toggleGameSetup: state.toggleSetup,
    })),
  );

  return isGameSetup ? (
    <Settings />
  ) : (
    <div>
      <Game />
      <button
        className="bg-white hover:bg-grey-200 border border-color-grey-200 font-bold py-2 px-4 rounded"
        onClick={toggleGameSetup}
      >
        Settings
      </button>
    </div>
  );
};
