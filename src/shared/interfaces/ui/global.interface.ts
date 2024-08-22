import { SxProps, Theme } from '@mui/material';
import { Variant } from '@mui/material/styles/createTypography';

export type SxPropsThemeType = SxProps<Theme>;

export type GridSizeType = {
  xs: number;
  sm: number;
  md: number;
  lg: number;
};

export type JustifyContentType =
  | 'flex-start'
  | 'center'
  | 'flex-end'
  | 'space-between'
  | 'space-around'
  | 'space-evenly';

export type AlignItemsType =
  | 'flex-start'
  | 'center'
  | 'flex-end'
  | 'stretch'
  | 'baseline';

export type SxPropsType = SxProps<Theme>;

export type ColorButtonType =
  | 'error'
  | 'info'
  | 'inherit'
  | 'primary'
  | 'secondary'
  | 'success'
  | 'warning';

export type MaxWidthType = 'xs' | 'sm' | 'md' | 'lg' | 'xl';

export type ButtonVariantType = 'text' | 'outlined' | 'contained' | undefined;
export type ChipVariantType = 'filled' | 'outlined' | undefined;

export type VarianTypographyType = Variant | 'inherit' | undefined;

export type TextFieldVariantType =
  | 'standard'
  | 'outlined'
  | 'filled'
  | undefined;

export type TextColorType = string | undefined;

export type ToastSeverityType = 'error' | 'warning' | 'info' | 'success';

export type TooltipPlacementType =
  | 'bottom'
  | 'left'
  | 'right'
  | 'top'
  | 'bottom-end'
  | 'bottom-start'
  | 'left-end'
  | 'left-start'
  | 'right-end'
  | 'right-start'
  | 'top-end'
  | 'top-start'
  | undefined;

export type TextFieldSizeType = 'medium' | 'small' | undefined;

export type ColorChipType =
  | 'primary'
  | 'secondary'
  | 'warning'
  | 'error'
  | 'info'
  | 'success';

export type DensityTableType = 'comfortable' | 'compact' | 'spacious';
