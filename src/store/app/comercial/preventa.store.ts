import { create } from 'zustand';

import { SetCodigoOtpInCacheData } from '@/actions/shared/cache-redis-types.interface';
import { Nullable, Promocion } from '@/shared';

interface PreventaState {
  isOTPVerified: boolean;
  setIsOTPVerified: (isOTPVerified: boolean) => void;

  cachedOtpData: Nullable<SetCodigoOtpInCacheData>;
  setCachedOtpData: (cachedOtpData: Nullable<SetCodigoOtpInCacheData>) => void;

  isComponentBlocked: boolean;
  setIsComponentBlocked: (isComponentBlocked: boolean) => void;

  // equipos venta en generic inventory --------------------
  scoreServicio: string | null;
  setScoreServicio: (scoreServicio: string | null) => void;
  selectedCuotas: number; // global to all selected equipos venta
  setSelectedCuotas: (selectedCuotas: number) => void;

  // promocion --------------------
  salectedPromociones: Promocion[];
  setSalectedPromociones: (salectedPromociones: Promocion[]) => void;

  // referidos --------------------
  showReferidosPart: boolean;
  setShowReferidosPart: (showReferidosPart: boolean) => void;
  toggleShowReferidosPart: () => void;

  // helpers servicio form part --------
  suggestedPlansBuroKey: string[];
  setSuggestedPlansBuroKey: (suggestedPlansBuroKey: string[]) => void;
  alreadyConsultedEquifax: boolean;
  setAlreadyConsultedEquifax: (alreadyConsultedEquifax: boolean) => void;
  showEquiposPart: boolean;
  setShowEquiposPart: (showEquiposPart: boolean) => void;

  clearAll: () => void;
}

export const usePreventaStore = create<PreventaState>(set => ({
  isOTPGenerated: false,
  isOTPVerified: false,

  cachedOtpData: null,

  isComponentBlocked: false,

  setIsOTPVerified: isOTPVerified => set({ isOTPVerified }),

  setCachedOtpData: cachedOtpData => set({ cachedOtpData }),

  setIsComponentBlocked: isComponentBlocked => set({ isComponentBlocked }),

  // equipos venta --------------------
  scoreServicio: null,
  setScoreServicio: scoreServicio => set({ scoreServicio }),
  selectedCuotas: 1,
  setSelectedCuotas: selectedCuotas => set({ selectedCuotas }),

  // promocion --------------------
  salectedPromociones: [],
  setSalectedPromociones: salectedPromociones => set({ salectedPromociones }),

  // referidos --------------------
  showReferidosPart: false,
  setShowReferidosPart: showReferidosPart => set({ showReferidosPart }),
  toggleShowReferidosPart: () =>
    set(state => ({ showReferidosPart: !state.showReferidosPart })),

  // helpers servicio form part --------
  suggestedPlansBuroKey: [],
  setSuggestedPlansBuroKey: suggestedPlansBuroKey =>
    set({ suggestedPlansBuroKey }),
  alreadyConsultedEquifax: false,
  setAlreadyConsultedEquifax: alreadyConsultedEquifax =>
    set({ alreadyConsultedEquifax }),
  showEquiposPart: false,
  setShowEquiposPart: showEquiposPart => set({ showEquiposPart }),

  clearAll: () =>
    set({
      isOTPVerified: false,
      cachedOtpData: null,
      isComponentBlocked: false,

      scoreServicio: null,
      selectedCuotas: 1,

      salectedPromociones: [],

      showReferidosPart: false,

      //
      suggestedPlansBuroKey: [],
      alreadyConsultedEquifax: false,
      showEquiposPart: false,
    }),
}));
