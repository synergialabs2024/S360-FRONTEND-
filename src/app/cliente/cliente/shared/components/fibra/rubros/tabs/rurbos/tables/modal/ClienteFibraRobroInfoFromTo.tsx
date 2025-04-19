import { Rubro } from '@/shared';
import { useAuthStore } from '@/store/auth';
import { Box, Grid, Paper, Typography } from '@mui/material';

export type ClienteFibraRobroInfoFromToProps = {
  rubro: Rubro;
};

const ClienteFibraRobroInfoFromTo: React.FC<
  ClienteFibraRobroInfoFromToProps
> = ({ rubro }) => {
  const company = useAuthStore(s => s.user?.company_data);
  const customer = rubro?.cliente_data;

  const toInvoide = {
    billTo: customer?.razon_social,
    billToEmail: customer?.email,
    billToAddress:
      rubro?.contrato_data?.direccion_referencia ||
      rubro?.contrato_data?.direccion,
    billToPhone: customer?.celular,
  };
  const fromInvoice = {
    billFrom: company?.company_name,
    billFromEmail: company?.email,
    billFromAddress: company?.main_address,
    billFromPhone: company?.phone,
  };

  return (
    <>
      <Grid container spacing={3} mt={2} mb={4}>
        <Grid item xs={12} sm={6}>
          <Paper variant="outlined">
            <Box p={3} display="flex" flexDirection="column" gap="4px">
              <Typography variant="h6" mb={2}>
                De :
              </Typography>
              <Typography variant="body1">{fromInvoice.billFrom}</Typography>
              <Typography variant="body1">
                {fromInvoice.billFromEmail}
              </Typography>
              <Typography variant="body1">
                {fromInvoice.billFromAddress}
              </Typography>
              <Typography variant="body1">
                {fromInvoice.billFromPhone}
              </Typography>
            </Box>
          </Paper>
        </Grid>
        <Grid item xs={12} sm={6}>
          <Paper variant="outlined">
            <Box p={3} display="flex" flexDirection="column" gap="4px">
              <Typography variant="h6" mb={2}>
                Para :
              </Typography>
              <Typography variant="body1">{toInvoide.billTo}</Typography>
              <Typography variant="body1">{toInvoide.billToEmail}</Typography>
              <Typography variant="body1">{toInvoide.billToAddress}</Typography>
              <Typography variant="body1">{toInvoide.billToPhone}</Typography>
            </Box>
          </Paper>
        </Grid>
      </Grid>
    </>
  );
};

export default ClienteFibraRobroInfoFromTo;
