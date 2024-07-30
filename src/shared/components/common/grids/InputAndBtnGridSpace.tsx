import { Grid } from '@mui/material';

import {
  gridSize,
  gridSizeMdLg10,
  gridSizeMdLg2,
  gridSizeMdLg6,
} from '@/shared/constants/ui';
import { ColorButtonType, GridSizeType } from '@/shared/interfaces';
import { SingleIconButton } from '../../CustomButtons';

export type InputAndBtnGridSpaceProps = {
  inputNode: React.ReactNode;

  overrideBtnNode?: boolean;
  customBtnNode?: React.ReactNode;

  iconBtn?: React.ReactNode;
  showIconBtn?: boolean;
  btnLabel?: string;
  btnColor?: ColorButtonType;
  onClick?: () => void;

  //
  mainGridSize?: GridSizeType;
  inputGridSize?: GridSizeType;
  btnGridSize?: GridSizeType;
};

const InputAndBtnGridSpace: React.FC<InputAndBtnGridSpaceProps> = ({
  inputNode,
  showIconBtn = true,
  iconBtn,
  btnLabel,
  btnColor = 'default',
  customBtnNode,
  overrideBtnNode,
  onClick,

  mainGridSize = gridSizeMdLg6,
  inputGridSize = showIconBtn ? gridSizeMdLg10 : gridSize,
  btnGridSize = gridSizeMdLg2,
}) => {
  return (
    <>
      <Grid item container alignItems="center" spacing={1} {...mainGridSize}>
        <Grid item {...inputGridSize}>
          {inputNode}
        </Grid>

        {showIconBtn && (
          <Grid item {...btnGridSize}>
            {overrideBtnNode && customBtnNode ? (
              customBtnNode
            ) : (
              <>
                <SingleIconButton
                  startIcon={iconBtn}
                  label={btnLabel}
                  color={btnColor as any}
                  onClick={() => {
                    onClick && onClick();
                  }}
                />
              </>
            )}
          </Grid>
        )}
      </Grid>
    </>
  );
};

export default InputAndBtnGridSpace;
