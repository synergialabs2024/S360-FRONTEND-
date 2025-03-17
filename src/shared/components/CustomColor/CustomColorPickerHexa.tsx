import { Grid, IconButton, Tooltip, Popover } from '@mui/material';
import { IconPaintFilled } from '@tabler/icons-react';
import React, { useState, useCallback } from 'react';
import { ChromePicker } from 'react-color';

import { gridSize, GridSizeType, SxPropsThemeType } from '@/shared';

type CustomColorPickerHexaProps = {
  size?: GridSizeType;
  sxGrid?: SxPropsThemeType;
  onData?: (data: string) => void;
  initialColor?: string;
};

const CustomColorPickerHexa: React.FC<CustomColorPickerHexaProps> = ({
  size = gridSize,
  sxGrid,
  onData = () => {},
  initialColor = '#ffffff',
}) => {
  const [open, setOpen] = useState(false);
  const [color, setColor] = useState(initialColor);
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);

  const onColorPickerInfoChange = useCallback(
    (color: any) => {
      const hex = color.hex;
      setColor(hex);
      onData(hex);
    },
    [onData],
  );

  const handleClick = useCallback((event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
    setOpen(prev => !prev);
  }, []);

  const handleClose = useCallback(() => {
    setOpen(false);
  }, []);

  return (
    <>
      <Grid
        item
        {...size}
        sx={{
          ...sxGrid,
          mt: 4,
        }}
      >
        <Tooltip title="COLOR" arrow placement="top">
          <IconButton
            component="span"
            color="primary"
            size="small"
            onClick={handleClick}
            sx={{ cursor: 'pointer' }}
          >
            <IconPaintFilled />
          </IconButton>
        </Tooltip>
      </Grid>

      <Popover
        open={open}
        anchorEl={anchorEl}
        onClose={handleClose}
        anchorOrigin={{
          vertical: 'bottom',
          horizontal: 'center',
        }}
        transformOrigin={{
          vertical: 'top',
          horizontal: 'center',
        }}
        PaperProps={{
          style: {
            boxShadow: '0px 4px 10px rgba(0, 0, 0, 0.15)',
            padding: '8px',
          },
        }}
      >
        <ChromePicker
          color={color}
          onChangeComplete={onColorPickerInfoChange}
          disableAlpha
        />
      </Popover>
    </>
  );
};

export default CustomColorPickerHexa;
