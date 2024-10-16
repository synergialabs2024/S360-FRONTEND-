import { GrValidate } from 'react-icons/gr';

import { gridSize, GridSizeType } from '@/shared';
import { CustomSingleButton } from '@/shared/components';

export type ValidButtonProps = {
  label: string;
  gridSizeBtn?: GridSizeType;
};

const ValidButton: React.FC<ValidButtonProps> = ({
  label,
  gridSizeBtn = gridSize,
}) => {
  return (
    <CustomSingleButton
      label={label}
      startIcon={<GrValidate />}
      color="success"
      variant="outlined"
      disabled
      sxBtn={{
        width: '100%',
      }}
      btnStyles={{
        borderRadius: '5px',
        border: '1px solid green',
        color: 'green',
        fontWeight: 600,
        height: '52px',
      }}
      gridSizeBtn={gridSizeBtn}
    />
  );
};

export default ValidButton;
