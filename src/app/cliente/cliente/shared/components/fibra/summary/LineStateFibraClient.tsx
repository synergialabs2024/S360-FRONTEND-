import { Grid, Typography } from '@mui/material';

import { gridSizeMdLg6, LineaServicio } from '@/shared';
import { ChipModelState } from '@/shared/components';

export type LineStateFibraClientProps = {
  serviceLine: LineaServicio;
};

const LineStateFibraClient: React.FC<LineStateFibraClientProps> = ({
  serviceLine,
}) => {
  return (
    <Grid item container spacing={2}>
      <Grid item {...gridSizeMdLg6}>
        <Typography
          variant="subtitle2"
          sx={{ fontWeight: 500, color: 'text.secondary' }}
        >
          ESTADO DEL SERVICIO:
        </Typography>
      </Grid>

      <Grid item {...gridSizeMdLg6}>
        <ChipModelState label={serviceLine.estado_linea} />
      </Grid>
    </Grid>
  );
};

export default LineStateFibraClient;
