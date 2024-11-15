import { Box, Grid, Paper, Typography } from '@mui/material';

import { LineaServicio } from '@/shared';
import { useAuthStore } from '@/store/auth';

export type ClienteFibraRubroLibreFromToProps = {
  serviceLine: LineaServicio;
};

const ClienteFibraRubroLibreFromTo: React.FC<
  ClienteFibraRubroLibreFromToProps
> = ({ serviceLine }) => {
  const user = useAuthStore(s => s.user);
  const customer = serviceLine?.cliente_data;

  const toInvoide = {
    billTo: customer?.razon_social,
    billToEmail: customer?.email,
    billToAddress: serviceLine?.contrato_data?.direccion,
    billToPhone: customer?.celular,
  };
  const fromInvoice = {
    billFrom: user?.company_data?.company_name,
    billFromEmail: user?.company_data?.email,
    billFromAddress: user?.company_data?.main_address,
    billFromPhone: user?.company_data?.phone,
  };

  return (
    <Grid container spacing={3} mt={2} mb={4}>
      <Grid item xs={12} sm={6}>
        <Paper variant="outlined">
          <Box p={3} display="flex" flexDirection="column" gap="4px">
            <Typography variant="h6" mb={2}>
              De :
            </Typography>
            <Typography variant="body1">{fromInvoice.billFrom}</Typography>
            <Typography variant="body1">{fromInvoice.billFromEmail}</Typography>
            <Typography variant="body1">
              {fromInvoice.billFromAddress}
            </Typography>
            <Typography variant="body1">{fromInvoice.billFromPhone}</Typography>
          </Box>
        </Paper>
      </Grid>
      <Grid item xs={12} sm={6}>
        <Paper variant="outlined">
          <Box p={3} display="flex" flexDirection="column" gap="4px">
            <Typography variant="h6" mb={2}>
              To :
            </Typography>
            <Typography variant="body1">{toInvoide.billTo}</Typography>
            <Typography variant="body1">{toInvoide.billToEmail}</Typography>
            <Typography variant="body1">{toInvoide.billToAddress}</Typography>
            <Typography variant="body1">{toInvoide.billToPhone}</Typography>
          </Box>
        </Paper>
      </Grid>
    </Grid>
  );
};

export default ClienteFibraRubroLibreFromTo;
