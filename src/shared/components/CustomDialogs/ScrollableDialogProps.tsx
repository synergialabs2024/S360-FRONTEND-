import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
} from '@mui/material';

import { ButtonVariantType, ColorButtonType } from '@/shared/interfaces';

export interface ScrollableDialogPropsProps {
  open: boolean;
  title: string;
  contentNode?: React.ReactNode;
  contentText?: string;
  cancelTextBtn?: string;
  cancelVariantBtn?: ButtonVariantType;
  confirmTextBtn?: string;
  confirmVariantBtn?: ButtonVariantType;
  onConfirm?: (() => Promise<void>) | (() => void);
  onClose: () => void;
  showConfirmBtn?: boolean;

  width?: string;
  minWidth?: string;

  showCustomActions?: boolean;
  customActions?: React.ReactNode;

  cancelColorBtn?: ColorButtonType;
  confirmColorBtn?: ColorButtonType;
}

const ScrollableDialogProps: React.FC<ScrollableDialogPropsProps> = ({
  open,
  title,
  cancelTextBtn = 'Cancelar',
  cancelVariantBtn = 'text',
  confirmTextBtn = 'Confirmar',
  confirmVariantBtn = 'text',
  contentNode,
  contentText,
  onClose,
  onConfirm,

  minWidth = '45%',
  width = '100%',
  showCustomActions = false,
  customActions,

  cancelColorBtn = 'primary',
  confirmColorBtn = 'primary',

  showConfirmBtn = true,
}) => {
  return (
    <>
      <Dialog
        open={open}
        onClose={onClose}
        scroll="paper"
        sx={{ '& .MuiDialog-paper': { width, minWidth } }}
      >
        {/* ========= Title ========= */}
        <DialogTitle style={{ padding: '24px 24px' }} id="scroll-dialog-title">
          {title}
        </DialogTitle>

        {/* ========= Content ========= */}
        <DialogContent dividers={true}>
          {contentNode ? (
            contentNode
          ) : (
            <DialogContentText id="scroll-dialog-description" tabIndex={-1}>
              {contentText}
            </DialogContentText>
          )}
        </DialogContent>

        {/* ========= Actions ========= */}
        <DialogActions>
          {showCustomActions ? (
            customActions
          ) : (
            <>
              <Button
                onClick={onClose}
                variant={cancelVariantBtn}
                color={cancelColorBtn}
              >
                {cancelTextBtn}
              </Button>

              {!!onConfirm && showConfirmBtn && (
                <Button
                  onClick={onConfirm}
                  variant={confirmVariantBtn}
                  color={confirmColorBtn}
                >
                  {confirmTextBtn}
                </Button>
              )}
            </>
          )}
        </DialogActions>
      </Dialog>
    </>
  );
};

export default ScrollableDialogProps;
