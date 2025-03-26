import dayjs from 'dayjs';
import { create } from 'zustand';
import { persist } from 'zustand/middleware';

import { getParametrosSistemas } from '@/actions/app';
import {
  FrontBuildValueSystemParam,
  ParametroSistema,
  SystemParamsSlugsEnum,
} from '@/shared';
import { useUiConfirmModalStore } from '@/store/ui';

type ParametrosSistemaState = {
  systemParametersArray: ParametroSistema[];
  isLoadin: boolean;
  setSystemParametersArray: (value: ParametroSistema[]) => void;
  fetchAllSystemParameters: () => Promise<void>;

  frontEndVersion?: string;
  setFrontEndVersion: (value: string) => void;
};

export const useParametrosSistemaStore = create<ParametrosSistemaState>()(
  persist(
    (set, get) => ({
      systemParametersArray: [],
      isLoadin: false,

      setSystemParametersArray: value => set({ systemParametersArray: value }),

      fetchAllSystemParameters: async () => {
        set({ isLoadin: true });
        const { data } = await getParametrosSistemas({
          page_size: 2000,
        });

        // previous params ----------------------
        const currentParams = get().systemParametersArray || [];

        // process new params ----------------------
        const items = data?.items || [];
        const parsedItems = items.map(item => {
          if (item.type === 'JSON' && item.value) {
            try {
              const parsedValue = JSON.parse(item.value);

              // handle maintenance alert (only front, in back with axios interceptor) ------------------
              if (
                item.slug === SystemParamsSlugsEnum.MANTENIMIENTO_PROGRAMADO
              ) {
                const frontBuildVal: FrontBuildValueSystemParam = parsedValue;
                const now = dayjs();
                const fechaHoraInicio = dayjs(
                  `${frontBuildVal.fecha_inicio_alert} ${frontBuildVal.hora_inicio_alert}`,
                );
                const fechaHoraFin = dayjs(
                  `${frontBuildVal.fecha_fin_alert} ${frontBuildVal.hora_fin_alert}`,
                );

                const oldParam = currentParams.find(
                  p =>
                    p.slug === SystemParamsSlugsEnum.MANTENIMIENTO_PROGRAMADO,
                );
                const oldFrontVersion =
                  oldParam && typeof oldParam.value === 'object'
                    ? (oldParam.value as unknown as FrontBuildValueSystemParam)
                      .front_version
                    : null;

                // conditionally show alert ------
                if (
                  frontBuildVal?.state &&
                  now.isAfter(fechaHoraInicio) &&
                  now.isBefore(fechaHoraFin) &&
                  (!oldFrontVersion ||
                    oldFrontVersion !== frontBuildVal?.front_version) &&
                  currentParams.length > 0
                ) {
                  const setConfirmDialog =
                    useUiConfirmModalStore.getState().setConfirmDialog;
                  const setConfirmDialogIsOpen =
                    useUiConfirmModalStore.getState().setConfirmDialogIsOpen;

                  setConfirmDialog({
                    isOpen: true,
                    title: frontBuildVal.title!,
                    subtitle: frontBuildVal.description,
                    onConfirm: () => {
                      setConfirmDialogIsOpen(false);
                      // Forzar la recarga completa
                      window.location.reload();
                    },
                    showCancelBtn: false,
                    confirmTextBtn: 'Recargar',
                  });
                }
              }

              return { ...item, value: parsedValue };
            } catch (err) {
              console.error(`Error parseando parámetro ${item.slug}:`, err);
              return { ...item, value: item.value };
            }
          }
          return item;
        });

        const frontVersion = parsedItems.find(
          p => p.slug === SystemParamsSlugsEnum.MANTENIMIENTO_PROGRAMADO,
        )?.value?.front_version;

        set({
          systemParametersArray: parsedItems,
          isLoadin: false,
          frontEndVersion: frontVersion,
        });
      },

      // ----------------------
      frontEndVersion: undefined,
      setFrontEndVersion: value => set({ frontEndVersion: value }),
    }),

    {
      name: 'systemparams-store',
    },
  ),
);
