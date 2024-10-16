import { Typography } from '@mui/material';

import { TAB_TEXT_LABEL_SX } from '@/shared/constants/ui';
import { SxPropsThemeType, VarianTypographyType } from '@/shared/interfaces';

export type CustomTypoLabelProps = {
  text: string;

  pt?: string | number;
  pl?: string | number;
  mt?: string | number;
  pb?: string | number;
  variant?: VarianTypographyType;
  uppercase?: boolean;
  color?: string;

  sx?: SxPropsThemeType;
};

export enum CustomTypoLabelEnum {
  ptMiddlePosition = '45px',
}

const CustomTypoLabel: React.FC<CustomTypoLabelProps> = ({
  text,
  pt = '0px',
  pl = '24px',
  mt = '15px',
  pb = '6px',
  variant = 'subtitle1',
  uppercase = true,
  color = '#6c737fb0',
  sx,
}) => {
  return (
    <Typography
      variant={variant}
      sx={
        sx || {
          ...TAB_TEXT_LABEL_SX,
          pt,
          pl,
          mt,
          pb,
          color,
        }
      }
    >
      {uppercase ? text.toUpperCase() : text}
    </Typography>
  );
};

export default CustomTypoLabel;
