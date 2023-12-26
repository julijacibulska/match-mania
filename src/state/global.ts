import { create } from 'zustand';

interface GlobalState {
  isSetup: boolean;
  toggleSetup: () => void;
}

export const useGlobal = create<GlobalState>((set) => ({
  isSetup: true,
  toggleSetup: () => {
    set(({ isSetup }) => ({
      isSetup: !isSetup,
    }));
  },
}));
