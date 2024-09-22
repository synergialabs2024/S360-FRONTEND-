import { create } from 'zustand';

import { getParametrosSistemas } from '@/actions/app';
import { ParametroSistema } from '@/shared';

type ParametrosSistemaState = {
  systemParametersArray: ParametroSistema[];
  isLoadin: boolean;
  setSystemParametersArray: (value: ParametroSistema[]) => void;
  fetchAllSystemParameters: () => Promise<void>;
};

export const useParametrosSistemaStore = create<ParametrosSistemaState>()(
  set => ({
    systemParametersArray: [],
    isLoadin: false,

    setSystemParametersArray: value => set({ systemParametersArray: value }),

    fetchAllSystemParameters: async () => {
      set({ isLoadin: true });
      const { data } = await getParametrosSistemas({
        page_size: 2000,
      });

      set({ systemParametersArray: data?.items || [], isLoadin: false });
    },
  }),
);
