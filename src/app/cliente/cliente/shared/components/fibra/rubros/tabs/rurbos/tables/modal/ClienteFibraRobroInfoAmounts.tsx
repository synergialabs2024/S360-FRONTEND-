import { formatCurrency, Rubro } from '@/shared';
import { Box, Typography } from '@mui/material';

export type ClienteFibraRobroInfoAmountsProps = {
  rubro: Rubro;
};

const ClienteFibraRobroInfoAmounts: React.FC<
  ClienteFibraRobroInfoAmountsProps
> = ({ rubro }) => {
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
            Impuestos:
          </Typography>
          <Typography variant="body1" fontWeight={600}>
            {formatCurrency(rubro?.valor_taxes)}
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
