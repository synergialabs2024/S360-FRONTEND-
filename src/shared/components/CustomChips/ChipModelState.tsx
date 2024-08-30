import { Chip, Grid } from '@mui/material';

import {
  AlignItemsType,
  ColorChipType,
  GridSizeType,
  JustifyContentType,
  SxPropsType,
  gridSize,
} from '@/shared';

export type ChipModelStateProps = {
  label: string;
  color?: ColorChipType;
  variant?: 'filled' | 'outlined';

  size?: GridSizeType;
  justifyContent?: JustifyContentType;
  alignItems?: AlignItemsType;

  sxChip?: SxPropsType;
  customColor?: string;
};

const ChipModelState: React.FC<ChipModelStateProps> = ({
  label,
  color = 'success',
  variant = 'outlined',

  customColor,

  size = gridSize,
  justifyContent = 'center',
  alignItems = 'center',
  sxChip = {
    width: '100%',
    textAlign: 'center',
    fontWeight: 500,
    fontSize: '14px',
  },
}) => {
  const chipSx = customColor
    ? {
      ...sxChip,
      backgroundColor:
          variant === 'filled'
            ? customColor
            : (sxChip as any).backgroundColor || 'transparent',
      color:
          (sxChip as any).color ||
          (variant === 'filled' ? '#000' : customColor),
      borderColor:
          variant === 'outlined'
            ? customColor
            : (sxChip as any).borderColor || 'transparent',
      borderWidth: variant === 'outlined' ? '1px' : '0',
      borderStyle: 'solid',
    }
    : sxChip;

  return (
    <Grid
      item
      {...size}
      container
      justifyContent={justifyContent}
      alignItems={alignItems}
    >
      <Chip
        label={label}
        color={!customColor ? color : undefined}
        variant={variant}
        sx={chipSx}
      />
    </Grid>
  );
};

export default ChipModelState;
