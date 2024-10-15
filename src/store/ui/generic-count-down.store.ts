import { create } from 'zustand';

export type CounterType = {
  count?: number | null;
  isClear: boolean;
  interval?: NodeJS.Timeout | null;
};

type GenericCounterDownState = {
  counters: Record<string, CounterType>;

  start: (
    id: string,
    initialCount: number,
    customClearCb?: CustomClearCb,
  ) => void;

  stop: (id: string) => void;
  reset: (id: string, newInitialCount: number) => void;
  clear: (id: string, customClearCb?: CustomClearCb) => void;
  setIsClear: (id: string, isClear: boolean) => void;

  clearAll: () => void;
};

type CustomClearCb = () => Promise<void> | void;

export const useGenericCountdownStore = create<GenericCounterDownState>(
  (set, get) => ({
    counters: {},

    start: (
      id: string,
      initialCount: number,
      customClearCb?: CustomClearCb,
    ) => {
      const counter = get().counters[id] || {
        count: null,
        isClear: false,
        interval: null,
      };

      if (counter.interval !== null) {
        return;
      }

      if (initialCount <= 0) {
        get().clear(id, customClearCb);
        return;
      }

      counter.count = initialCount;
      counter.interval = setInterval(() => {
        set(state => {
          const newCount = state.counters[id].count
            ? state.counters[id].count! - 1
            : 0;
          if (newCount <= 0) {
            get().clear(id, customClearCb);
          }
          return {
            counters: {
              ...state.counters,
              [id]: { ...state.counters[id], count: newCount },
            },
          };
        });
      }, 1000);

      set(state => ({
        counters: {
          ...state.counters,
          [id]: counter,
        },
      }));
    },

    stop: (id: string) => {
      const counter = get().counters[id];
      if (counter && counter.interval !== null) {
        clearInterval(counter.interval);
        counter.interval = null;
        set(state => ({
          counters: {
            ...state.counters,
            [id]: counter,
          },
        }));
      }
    },

    reset: (id: string, newInitialCount: number) => {
      const counter = get().counters[id] || {
        count: null,
        isClear: false,
        interval: null,
      };

      if (counter.interval !== null) {
        clearInterval(counter.interval);
        counter.interval = null;
      }

      counter.count = newInitialCount;
      counter.interval = setInterval(() => {
        set(state => {
          const newCount = state.counters[id].count
            ? state.counters[id].count! - 1
            : 0;
          if (newCount <= 0) {
            get().clear(id);
          }
          return {
            counters: {
              ...state.counters,
              [id]: { ...state.counters[id], count: newCount },
            },
          };
        });
      }, 1000);

      set(state => ({
        counters: {
          ...state.counters,
          [id]: counter,
        },
      }));
    },

    clear: (id: string, customClearCb?: CustomClearCb) => {
      const counter = get().counters[id];
      if (counter && counter.interval !== null) {
        clearInterval(counter.interval);
        counter.interval = null;
      }

      set(state => ({
        counters: {
          ...state.counters,
          [id]: { count: null, isClear: true, interval: null },
        },
      }));

      customClearCb && customClearCb();
    },

    setIsClear: (id: string, isClear: boolean) => {
      set(state => ({
        counters: {
          ...state.counters,
          [id]: { ...state.counters[id], isClear },
        },
      }));
    },

    clearAll: () => {
      Object.keys(get().counters).forEach(id => {
        get().clear(id);
      });
    },
  }),
);
