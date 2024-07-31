import { create } from 'zustand';

type CustomizationType = {
  borderRadius: string;
  fontFamily: string;
  isOpenMenuItem: string[];
  isOpen: string[];
  opened: boolean;
};

interface UiState {
  ///* state
  isOpenSideNav: boolean;
  openPopover: boolean;
  openMenus: { [level: number]: string | null }; // handle toggle open menu

  ///* customizations
  customization: CustomizationType;

  ///* actions
  setIsOpenSideNav: (isOpen: boolean) => void;

  ///* top nav
  setOpenNav: (value: boolean) => void;
  setOpenPopover: (value: boolean) => void;
  setOpenMenu: (level: number, menuId: string | null) => void;

  ///* customizations
  setCustomization: (customization: CustomizationType) => void;

  ///* loaders
  isGlobalLoading: boolean;
  setIsGlobalLoading: (isLoading: boolean) => void;
}

export const useUiStore = create<UiState>(set => ({
  ///* initial state
  isOpenSideNav: true,
  openPopover: false,
  openMenus: {}, // { level: menuId }
  customization: {
    borderRadius: '12',
    fontFamily: 'Roboto, sans-serif',
    isOpenMenuItem: [],
    isOpen: [],
    opened: true,
  },
  isGlobalLoading: false,

  ///* actions
  setIsOpenSideNav: isOpen => set({ isOpenSideNav: isOpen }),

  setOpenNav: value => set({ isOpenSideNav: value }),
  setOpenPopover: value => set({ openPopover: value }),
  setOpenMenu: (level, menuId) =>
    set(state => ({
      openMenus: { ...state.openMenus, [level]: menuId },
    })),

  setCustomization: customization => set({ customization }),

  setIsGlobalLoading: isLoading => set({ isGlobalLoading: isLoading }),
}));
