import { create } from 'zustand';

type State = {
  count: number | null;
  isClear: boolean;
  start: (initialCount: number, customClearCb?: CustomClearCb) => void;
  stop: () => void;
  reset: (newInitialCount: number) => void;
  clear: (customClearCb?: CustomClearCb) => void;
  setIsClear: (isClear: boolean) => void;
};
type CustomClearCb = () => Promise<void> | void;

let interval: NodeJS.Timeout | null = null;

export const useGenericCountdownStore = create<State>((set, get) => ({
  count: null,
  isClear: false,

  start: (initialCount: number, customClearCb?: CustomClearCb) => {
    if (interval !== null) {
      return;
    }

    // if is negative, clear the interval
    if (initialCount <= 0) {
      get().clear(customClearCb);
      return;
    }

    // set initial count
    set({ count: initialCount });
    interval = setInterval(() => {
      set(state => ({ count: state.count ? state.count - 1 : 0 }));

      if ((get().count || 0) <= 0) {
        get().clear(customClearCb);
      }
    }, 1000);
  },
  stop: () => {
    if (interval !== null) {
      clearInterval(interval);
      interval = null;
    }
  },
  reset: (newInitialCount: number) => {
    if (interval !== null) {
      clearInterval(interval);
      interval = null;
    }
    set({ count: newInitialCount });
    interval = setInterval(() => {
      set(state => ({ count: state.count ? state.count - 1 : 0 }));
    }, 1000);
  },
  clear: customClearCb => {
    if (interval !== null) {
      clearInterval(interval);
      interval = null;
    }

    set({ count: null, isClear: true });

    customClearCb && customClearCb();
  },
  setIsClear: (isClear: boolean) => {
    set({ isClear });
  },
}));
