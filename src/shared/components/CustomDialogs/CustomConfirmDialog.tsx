import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Typography,
  useTheme,
} from '@mui/material';

import { useUiConfirmModalStore } from '@/store/ui';

export type CustomConfirmDialogProps = {};

const CustomConfirmDialog: React.FC<CustomConfirmDialogProps> = () => {
  const theme = useTheme();

  const open = useUiConfirmModalStore(s => s.confirmDialog.isOpen);
  const title = useUiConfirmModalStore(s => s.confirmDialog.title);
  const subtitle = useUiConfirmModalStore(s => s.confirmDialog.subtitle);
  const onClose = useUiConfirmModalStore(s => s.confirmDialog.onClose);
  const onConfirm = useUiConfirmModalStore(s => s.confirmDialog.onConfirm);
  const setConfirmDialogIsOpen = useUiConfirmModalStore(
    s => s.setConfirmDialogIsOpen,
  );
  const cancelTextBtn = useUiConfirmModalStore(
    s => s.confirmDialog.cancelTextBtn,
  );
  const confirmTextBtn = useUiConfirmModalStore(
    s => s.confirmDialog.confirmTextBtn,
  );

  return (
    <Dialog
      open={open}
      onClose={() => {
        !onClose ? setConfirmDialogIsOpen(false) : onClose();
      }}
    >
      <DialogTitle>{title}</DialogTitle>

      <DialogContent>
        <Typography variant="subtitle1">{subtitle}</Typography>
      </DialogContent>

      <DialogActions
        sx={{
          pr: 2,
        }}
      >
        <Button
          onClick={() => {
            !onClose ? setConfirmDialogIsOpen(false) : onClose();
          }}
          sx={{ color: theme.palette.primary.main }}
        >
          {cancelTextBtn || 'Cancelar'}
        </Button>
        <Button
          onClick={onConfirm}
          style={{
            color: 'white',
            background: theme.palette.primary.main,
          }}
        >
          {confirmTextBtn || 'Confirmar'}
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default CustomConfirmDialog;
