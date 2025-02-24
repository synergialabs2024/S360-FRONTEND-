/* eslint-disable indent */
import { Box, Typography } from '@mui/material';

import { formatCurrency, Rubro } from '@/shared';

export type ClienteFibraRobroInfoAmountsProps = {
  rubro: Rubro;
};

const ClienteFibraRobroInfoAmounts: React.FC<
  ClienteFibraRobroInfoAmountsProps
> = ({ rubro }) => {
  const discountAll = +(rubro?.subtotal || 0) + +(rubro?.valor_taxes || 0);

  const onlyNegativesSaldoConsume = (rubro?.saldo_rubro_consume_data || [])
    .filter(item => parseFloat(item.monto) < 0)
    .reduce((acc, item) => acc + parseFloat(item.monto), 0);

  const discount2 =
    rubro?.valor_total === '0.00' ? -discountAll : onlyNegativesSaldoConsume;

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
            {formatCurrency(discount2)}
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
