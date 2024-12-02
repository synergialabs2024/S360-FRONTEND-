import { gridSizeMdLg6, LineaServicio } from '@/shared';
import { Grid, Typography } from '@mui/material';

export type ClienteFibraPerfilPagosProps = {
  serviceLine: LineaServicio;
};

const ClienteFibraPerfilPagos: React.FC<ClienteFibraPerfilPagosProps> = ({
  serviceLine,
}) => {
  return (
    <>
      <Grid item container spacing={2} mb={3}>
        <Grid item {...gridSizeMdLg6}>
          <Typography
            variant="subtitle2"
            sx={{ fontWeight: 500, color: 'text.secondary' }}
          >
            PERFIL DE PAGOS INGRESO:
          </Typography>
        </Grid>
        <Grid item {...gridSizeMdLg6}>
          {serviceLine?.contrato_data?.perfil_ingreso}
        </Grid>

        <Grid item {...gridSizeMdLg6}>
          <Typography
            variant="subtitle2"
            sx={{ fontWeight: 500, color: 'text.secondary' }}
          >
            PERFIL DE PAGOS ACTUAL:
          </Typography>
        </Grid>
        <Grid item xs={12} md={6}>
          {serviceLine?.contrato_data?.perfil_actual}
        </Grid>
      </Grid>
    </>
  );
};

export default ClienteFibraPerfilPagos;
