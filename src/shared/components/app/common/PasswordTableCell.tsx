import { Grid, Tooltip, Typography } from '@mui/material';
import { useState } from 'react';

export type PasswordTableCellProps = {
  password: string;
};

const PasswordTableCell: React.FC<PasswordTableCellProps> = ({ password }) => {
  const [isVisble, setIsVisible] = useState(false);

  if (!password) return 'N/A';

  return (
    <>
      <Grid item xs={12}>
        <Tooltip
          title={isVisble ? 'Ocultar contraseña' : 'Mostrar contraseña'}
          placement="top"
          arrow
        >
          <Typography
            variant="body2"
            color="inherit"
            style={{ cursor: 'pointer' }}
            onClick={() => {
              setIsVisible(!isVisble);
            }}
          >
            {isVisble ? password : '********'}
          </Typography>
        </Tooltip>
      </Grid>
    </>
  );
};

export default PasswordTableCell;
