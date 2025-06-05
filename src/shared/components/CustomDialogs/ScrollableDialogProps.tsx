/* eslint-disable indent */
import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  Grid,
  Typography,
} from '@mui/material';

import { ButtonVariantType, ColorButtonType } from '@/shared/interfaces';
import { useIsMediaQuery } from '@/shared/hooks';

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

  showCustomTitleNode?: boolean;
  customTitleNode?: React.ReactNode;

  disabledConfirmBtn?: boolean;

  // 1 additional btn
  additionalBtnLabel?: string;
  additionalBtnColor?: ColorButtonType;
  additionalBtnVariant?: ButtonVariantType;
  onAdditionalBtn?: () => void;
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

  cancelColorBtn = 'inherit',
  confirmColorBtn = 'primary',

  showConfirmBtn = true,

  showCustomTitleNode = false,
  customTitleNode,
  disabledConfirmBtn = false,

  // 1 additional btn
  additionalBtnLabel,
  additionalBtnColor = 'inherit',
  additionalBtnVariant = 'text',
  onAdditionalBtn,
}) => {
  const isMobile = useIsMediaQuery('sm');
  return (
    <>
      <Dialog
        open={open}
        onClose={onClose}
        scroll="paper"
        sx={{
          '& .MuiDialog-paper': {
            width,
            minWidth: isMobile ? '90%' : minWidth,
          },
        }}
      >
        {/* ========= Title ========= */}
        <DialogTitle style={{ padding: '24px 24px' }} id="scroll-dialog-title">
          {showCustomTitleNode && customTitleNode ? (
            customTitleNode
          ) : (
            <Typography variant="h4" component="span">
              {title}
            </Typography>
          )}
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
          ) : additionalBtnLabel &&
            additionalBtnColor &&
            additionalBtnVariant &&
            onAdditionalBtn ? (
            <Grid container spacing={1} justifyContent="space-between">
              <Grid item>
                <Button
                  onClick={onClose}
                  variant={cancelVariantBtn}
                  color={cancelColorBtn}
                >
                  {cancelTextBtn}
                </Button>
              </Grid>

              <Grid item>
                <Button
                  onClick={onAdditionalBtn}
                  variant={additionalBtnVariant}
                  color={additionalBtnColor}
                >
                  {additionalBtnLabel}
                </Button>

                <Button
                  onClick={onConfirm}
                  variant={confirmVariantBtn}
                  color={confirmColorBtn}
                  disabled={disabledConfirmBtn}
                >
                  {confirmTextBtn}
                </Button>
              </Grid>
            </Grid>
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
                  disabled={disabledConfirmBtn}
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
