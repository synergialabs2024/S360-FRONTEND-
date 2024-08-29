import { gridSize } from '@/shared/constants';
import { useIsMediaQuery } from '@/shared/hooks';
import {
  BtnStylesType,
  ButtonVariantType,
  ColorButtonType,
  GridSizeType,
  JustifyContentType,
  SxPropsThemeType,
} from '@/shared/interfaces';
import { Button, Grid } from '@mui/material';

export type CustomSingleButtonProps = {
  label: string;
  startIcon?: React.ReactNode;
  variant?: ButtonVariantType;
  onClick?: () => void;
  disabled?: boolean;
  sxBtn?: SxPropsThemeType;
  color?: ColorButtonType;
  gridSizeBtn?: GridSizeType;
  sxGrid?: SxPropsThemeType;
  justifyContent?: JustifyContentType;
  btnStyles?: BtnStylesType;
};

const CustomSingleButton: React.FC<CustomSingleButtonProps> = ({
  label,
  startIcon,
  variant = 'contained',
  onClick,
  disabled = false,
  color = 'primary',
  sxBtn,
  sxGrid,
  gridSizeBtn = gridSize,
  justifyContent = 'flex-start', // Default to 'flex-start'
  btnStyles,
}) => {
  const isMobile = useIsMediaQuery('sm');

  return (
    <Grid
      item
      container
      {...gridSizeBtn}
      sx={sxGrid}
      justifyContent={isMobile ? 'start' : justifyContent}
    >
      <Button
        sx={sxBtn}
        color={color}
        startIcon={startIcon || null}
        variant={variant}
        onClick={onClick}
        disabled={disabled}
        style={btnStyles}
      >
        {label}
      </Button>
    </Grid>
  );
};

export default CustomSingleButton;
