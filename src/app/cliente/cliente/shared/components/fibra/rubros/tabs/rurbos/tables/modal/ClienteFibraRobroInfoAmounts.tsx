import { formatCurrency, Rubro } from '@/shared';
import { Box, Typography } from '@mui/material';

export type ClienteFibraRobroInfoAmountsProps = {
  rubro: Rubro;
};

const ClienteFibraRobroInfoAmounts: React.FC<
  ClienteFibraRobroInfoAmountsProps
> = ({ rubro }) => {
  const saldo_rubro_consume_data = rubro?.saldo_rubro_consume_data || [];
  const saldo = saldo_rubro_consume_data.reduce(
    (acc, item) => acc + parseFloat(item.monto),
    0,
  );
  const saldo_rubro_origen_data = rubro?.saldo_rubro_origen_data || [];
  const saldo_origen = saldo_rubro_origen_data.reduce(
    (acc, item) => acc + parseFloat(item.monto),
    0,
  );
  const saldo_total = saldo + -saldo_origen;

  return (
    <>
      <Box p={3} bgcolor="primary.light" mt={3}>
        <Box display="flex" justifyContent="end" gap={3} mb={3}>
          <Typography variant="body1" fontWeight={600}>
            Sub Total:
          </Typography>
          <Typography variant="body1" fontWeight={600}>
            {formatCurrency(rubro?.subtotal)}
          </Typography>
        </Box>

        <Box display="flex" justifyContent="end" gap={3} mb={3}>
          <Typography variant="body1" fontWeight={600}>
            Impuesto:
          </Typography>
          <Typography variant="body1" fontWeight={600}>
            {formatCurrency(rubro?.valor_taxes)}
          </Typography>
        </Box>

        <Box display="flex" justifyContent="end" gap={3} mb={3}>
          <Typography variant="body1" fontWeight={600}>
            Descuento:
          </Typography>
          <Typography variant="body1" fontWeight={600}>
            {formatCurrency(saldo_total)}
          </Typography>
        </Box>

        <Box display="flex" justifyContent="end" gap={3}>
          <Typography variant="body1" fontWeight={600}>
            Total:
          </Typography>
          <Typography variant="body1" fontWeight={600}>
            {formatCurrency(rubro?.valor_total)}
          </Typography>
        </Box>
      </Box>
    </>
  );
};

export default ClienteFibraRobroInfoAmounts;
