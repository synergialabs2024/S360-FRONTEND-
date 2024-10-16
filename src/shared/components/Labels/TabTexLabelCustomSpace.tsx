import { Grid, Typography } from '@mui/material';

import { gridSize } from '@/shared/constants';
import { ColorButtonType, GridSizeType } from '@/shared/interfaces';
import { SingleIconButton } from '..';

export type TabTexLabelCustomSpaceProps = {
  textContent: string;

  labelBtn?: string;
  onClickBtn?: () => void;
  startIconBtn?: React.ReactNode;
  colorBtn?: ColorButtonType;
  sizeBtn?: GridSizeType;

  showCustomRightSpace?: boolean;
  customRightSpace?: React.ReactNode;
  upperCase?: boolean;

  ptContainer?: string | number;
};

const TabTexLabelCustomSpace: React.FC<TabTexLabelCustomSpaceProps> = ({
  textContent,
  onClickBtn,
  startIconBtn,
  colorBtn,
  labelBtn,
  sizeBtn = gridSize,

  showCustomRightSpace = false,
  customRightSpace = null,
  upperCase = true,

  ptContainer = '33px',
}) => {
  return (
    <Grid item xs={12} container mb="21px" alignItems="center" mt={ptContainer}>
      <Grid item>
        <Typography
          variant="h6"
          sx={{
            display: 'flex',
            alignItems: 'start',
            justifyContent: 'start',
            fontSize: '.9rem',
            color: '#6c737fb0',
          }}
        >
          {upperCase ? textContent?.toUpperCase() : textContent}
        </Typography>
      </Grid>
      <span className="spacer" />

      {showCustomRightSpace && customRightSpace ? (
        <Grid item>{customRightSpace}</Grid>
      ) : onClickBtn && labelBtn && startIconBtn ? (
        <SingleIconButton
          startIcon={startIconBtn}
          color={colorBtn as any}
          label={labelBtn}
          onClick={onClickBtn}
          size={sizeBtn}
        />
      ) : null}
    </Grid>
  );
};

export default TabTexLabelCustomSpace;
