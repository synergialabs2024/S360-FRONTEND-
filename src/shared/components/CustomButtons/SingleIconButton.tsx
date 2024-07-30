import { Grid, IconButton, Tooltip } from '@mui/material';

import { useIsMediaQuery } from '@/shared/hooks';
import {
  ButtonVariantType,
  ColorButtonType,
  GridSizeType,
  JustifyContentType,
  TooltipPlacementType,
} from '@/shared/interfaces';

export type SingleIconButtonProps = {
  startIcon: React.ReactNode;
  label?: string;
  onClick?: (e: any) => void;

  color?: ColorButtonType;

  // new
  newCustomButton?: boolean;
  variant?: ButtonVariantType;
  size?: GridSizeType;

  noThemeColor?: boolean;
  disabled?: boolean;

  customClassName?: string;
  tooltipPlacement?: TooltipPlacementType;

  justifyContent?: JustifyContentType;

  customColor?: string;
};

const SingleIconButton: React.FC<SingleIconButtonProps> = ({
  startIcon,
  color = 'primary',
  label,
  onClick,
  size,
  noThemeColor = false,
  disabled = false,
  customClassName,
  tooltipPlacement = 'top',
  justifyContent,
  customColor,
}) => {
  const isMobile = useIsMediaQuery('sm');

  return (
    <>
      <Grid
        item
        {...size}
        container
        justifyContent={isMobile ? 'start' : justifyContent}
      >
        <Tooltip title={label} placement={tooltipPlacement}>
          <span>
            <IconButton
              color={color}
              onClick={e => onClick && onClick(e)}
              className={
                noThemeColor
                  ? 'table__icon-button--no-color'
                  : '' + customClassName || ''
              }
              disabled={disabled}
              sx={{
                color: customColor,
              }}
            >
              {startIcon}
            </IconButton>
          </span>
        </Tooltip>
      </Grid>
    </>
  );
};

export default SingleIconButton;
