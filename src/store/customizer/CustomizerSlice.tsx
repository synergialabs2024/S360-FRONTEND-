import { create } from 'zustand';

type StateType = {
  activeDir?: string | any;
  activeMode?: string; // This can be light or dark
  activeTheme?: string; // BLUE_THEME, GREEN_THEME, BLACK_THEME, PURPLE_THEME, ORANGE_THEME
  SidebarWidth?: number;
  MiniSidebarWidth?: number;
  TopbarHeight?: number;
  isCollapse?: boolean;
  isLayout?: string;
  isSidebarHover?: boolean;
  isMobileSidebar?: boolean;
  isHorizontal?: boolean;
  isLanguage?: string;
  isCardShadow?: boolean;
  borderRadius?: number | any;
};

interface uiState extends StateType {
  setTheme: (activeTheme: string) => void;
  setDarkMode: (activeMode: string) => void;
  setDir: (activeDir: string) => void;
  setLanguage: (isLanguage: string) => void;
  setCardShadow: (isCardShadow: boolean) => void;
  toggleSidebar: (isCollapse: boolean) => void;
  hoverSidebar: (isSidebarHover: boolean) => void;
  toggleMobileSidebar: (isMobileSidebar: boolean) => void;
  toggleLayout: (isLayout: string) => void;
  toggleHorizontal: (isHorizontal: boolean) => void;
  setBorderRadius: (borderRadius: number) => void;
}

const customizerSlice = create<uiState>(set => ({
  state: {
    activeDir: 'ltr',
    activeMode: 'light', // This can be light or dark
    activeTheme: 'BLUE_THEME', // BLUE_THEME, GREEN_THEME, BLACK_THEME, PURPLE_THEME, ORANGE_THEME
    SidebarWidth: 270,
    MiniSidebarWidth: 87,
    TopbarHeight: 70,
    isLayout: 'boxed', // This can be full or boxed
    isCollapse: false, // to make sidebar Mini by default
    isSidebarHover: false,
    isMobileSidebar: false,
    isHorizontal: false,
    isLanguage: 'en',
    isCardShadow: true,
    borderRadius: 7,
  },
  setTheme: activeTheme =>
    set(state => ({
      ...state,
      activeTheme: activeTheme,
    })),

  setDarkMode: activeMode =>
    set(state => ({
      ...state,
      activeMode: activeMode,
    })),

  setDir: activeDir =>
    set(state => ({
      ...state,
      activeDir: activeDir,
    })),

  setLanguage: isLanguage =>
    set(state => ({
      ...state,
      isLanguage: isLanguage,
    })),

  setCardShadow: isCardShadow =>
    set(state => ({
      ...state,
      isCardShadow: isCardShadow,
    })),

  toggleSidebar: isCollapse =>
    set(state => ({ ...state, isCollapse: isCollapse })),

  hoverSidebar: isSidebarHover =>
    set(state => ({
      ...state,
      isSidebarHover: isSidebarHover,
    })),

  toggleMobileSidebar: isMobileSidebar =>
    set(state => ({
      ...state,
      isMobileSidebar: isMobileSidebar,
    })),

  toggleLayout: isLayout => set(state => ({ ...state, isLayout: isLayout })),

  toggleHorizontal: isHorizontal =>
    set(state => ({ ...state, isHorizontal: isHorizontal })),

  setBorderRadius: borderRadius =>
    set(state => ({ ...state, borderRadius: borderRadius })),
}));

export default customizerSlice;
