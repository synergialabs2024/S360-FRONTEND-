import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Typography,
  useTheme,
} from '@mui/material';

export type CustomConfirmDialogPropsProps = {
  open: boolean;
  title: string;
  subtitle?: string;
  text2?: string;
  onClose?: () => void;
  onConfirm?: () => void;
  cancelTextBtn?: string;
  confirmTextBtn?: string;

  contentNode?: React.ReactNode;
};

const CustomConfirmDialogProps: React.FC<CustomConfirmDialogPropsProps> = ({
  open,
  title,
  subtitle,
  onClose,
  onConfirm,
  cancelTextBtn = 'Cancelar',
  confirmTextBtn = 'Confirmar',
  contentNode,
  text2,
}) => {
  const theme = useTheme();

  return (
    <Dialog open={open} onClose={onClose}>
      <DialogTitle
        sx={{
          fontSize: '0.975rem',
          fontWeight: 500,
        }}
      >
        {title}
      </DialogTitle>

      <DialogContent>
        <Typography variant="body1">{subtitle}</Typography>
        <Typography variant="body1">{text2}</Typography>

        {/* ------ Content Node ------ */}
        {contentNode && contentNode}
      </DialogContent>

      <DialogActions
        sx={{
          pr: 2,
        }}
      >
        <Button onClick={onClose} sx={{ color: theme.palette.primary.main }}>
          {cancelTextBtn}
        </Button>
        <Button
          onClick={onConfirm}
          style={{
            color: 'white',
            background: theme.palette.primary.main,
          }}
        >
          {confirmTextBtn}
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default CustomConfirmDialogProps;
