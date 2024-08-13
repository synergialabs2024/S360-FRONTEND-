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
};

const ChipModelState: React.FC<ChipModelStateProps> = ({
  label,
  color = 'success',
  variant = 'outlined',

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
  return (
    <>
      <Grid
        item
        {...size}
        container
        justifyContent={justifyContent}
        alignItems={alignItems}
      >
        <Chip label={label} color={color} variant={variant} sx={sxChip} />
      </Grid>
    </>
  );
};

export default ChipModelState;
