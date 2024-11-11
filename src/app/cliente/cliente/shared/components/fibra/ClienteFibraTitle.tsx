import { Button, Grid, Typography } from '@mui/material';
import { useNavigate } from 'react-router';

import { LineaServicio, useIsMediaQuery } from '@/shared';
import { returnUrlClientesFibraPage } from '../../../pages/tables/ClientesFibraMainPage';

export type ClienteFibraTitleProps = {
  serviceLine: LineaServicio;
};

const ClienteFibraTitle: React.FC<ClienteFibraTitleProps> = ({
  serviceLine,
}) => {
  ///* hooks ----------------
  const navigate = useNavigate();
  const isMobile = useIsMediaQuery('sm');

  return (
    <Grid item xs={12} container>
      <Grid item xs={12} md={9}>
        <Typography variant="h2" pb={isMobile ? 3 : 6}>
          {serviceLine?.cliente_data?.razon_social}

          <span className="cliente__page--title">
            (#{serviceLine?.contrato_data?.numero_contrato})
          </span>
        </Typography>
      </Grid>

      <Grid
        item
        xs={12}
        md={3}
        container
        justifyContent="flex-end"
        alignItems="flex-start"
      >
        <Button
          onClick={() => navigate(returnUrlClientesFibraPage)}
          variant="text"
          sx={{
            py: 1,
            my: 0,
          }}
          size="small"
          startIcon={'<-'}
        >
          REGRESAR
        </Button>
      </Grid>
    </Grid>
  );
};

export default ClienteFibraTitle;
