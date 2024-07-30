import { create } from 'zustand';

type ConfirmDialog = {
  isOpen: boolean;
  title: string;
  subtitle?: string;
  onConfirm: (() => Promise<void>) | (() => void);

  shwoCustomInputsForm?: boolean;
  inputsForm?: React.ReactNode;

  onClose?: () => void;
  cancelTextBtn?: string;
  confirmTextBtn?: string;
};

interface UiConfirmModalState {
  confirmDialog: ConfirmDialog;
  setConfirmDialog: (dialog: ConfirmDialog) => void;
  setConfirmDialogIsOpen: (isOpen: boolean) => void;
}

const confirmDialogInitialState: ConfirmDialog = {
  isOpen: false,
  title: '',
  onConfirm: () => {},
  onClose: () => {},
};

export const useUiConfirmModalStore = create<UiConfirmModalState>(
  (set, get) => ({
    confirmDialog: confirmDialogInitialState,

    setConfirmDialog: dialog => set({ confirmDialog: dialog }),
    setConfirmDialogIsOpen: isOpen => {
      set({
        confirmDialog: {
          ...get().confirmDialog,
          isOpen,
        },
      });
    },
  }),
);
