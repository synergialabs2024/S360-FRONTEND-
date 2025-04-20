import { formatCurrency, formatToNDecimals } from '@/shared';
import { useRubroStore } from '@/store/app/rubros';
import { Box, Typography } from '@mui/material';

export type ClienteFibraEditRubroAmountProps = {};

const ClienteFibraEditRubroAmount: React.FC<
  ClienteFibraEditRubroAmountProps
> = () => {
  ///* global state --------------------------
  const activeRubro = useRubroStore(s => s.activeRubro); // to edit
  const rubroItems =
    activeRubro?.rubro_items_data?.filter(item => item?.state !== false) || [];

  ///* handlers --------------------------
  // saldos ---
  const discountAll =
    +(activeRubro?.subtotal || 0) + +(activeRubro?.valor_taxes || 0);
  const onlyNegativesSaldoConsume = (
    activeRubro?.saldo_rubro_consume_data || []
  )
    .filter(item => parseFloat(item.monto) < 0)
    .reduce((acc, item) => acc + parseFloat(item.monto), 0);
  const discount2 =
    activeRubro?.valor_total === '0.00'
      ? -discountAll
      : onlyNegativesSaldoConsume;

  // calc subtotal ------
  const subtotal = rubroItems.reduce((acc, item) => {
    const itemTotal =
      parseFloat(item.valor_base) *
      parseFloat((+(item?.cantidad || 0)).toString());
    return acc + itemTotal;
  }, 0);
  // calc taxes ------
  const taxes = rubroItems.reduce((acc, item) => {
    const itemTotal =
      parseFloat(item.valor_base) *
      parseFloat((+(item?.cantidad || 0)).toString());
    const itemTaxes = itemTotal * (parseFloat(item.impuesto) / 100);
    return acc + itemTaxes;
  }, 0);
  // calc total ------
  const total = subtotal + taxes + discount2;

  return (
    <Box p={3} bgcolor="primary.light" mt={3}>
      <Box display="flex" justifyContent="end" gap={3} mb={3}>
        <Typography variant="body1" fontWeight={600}>
          Sub Total:
        </Typography>
        <Typography variant="body1" fontWeight={600}>
          {formatCurrency(formatToNDecimals(subtotal, 2))}
        </Typography>
      </Box>

      <Box display="flex" justifyContent="end" gap={3} mb={3}>
        <Typography variant="body1" fontWeight={600}>
          Impuesto:
        </Typography>
        <Typography variant="body1" fontWeight={600}>
          {formatCurrency(formatToNDecimals(taxes, 2))}
        </Typography>
      </Box>

      <Box display="flex" justifyContent="end" gap={3} mb={3}>
        <Typography variant="body1" fontWeight={600}>
          Descuento:
        </Typography>
        <Typography variant="body1" fontWeight={600}>
          {formatCurrency(formatToNDecimals(discount2, 2))}
        </Typography>
      </Box>

      <Box display="flex" justifyContent="end" gap={3}>
        <Typography variant="body1" fontWeight={600}>
          Total:
        </Typography>
        <Typography variant="body1" fontWeight={600}>
          {formatCurrency(formatToNDecimals(total, 2))}
        </Typography>
      </Box>

      <Box display="flex" justifyContent="end" gap={3}>
        <Typography variant="body1" fontWeight={600}>
          Total Factura:
        </Typography>
        <Typography variant="body1" fontWeight={600}>
          {formatCurrency(
            formatToNDecimals(+(activeRubro?.valor_factura || 0), 2),
          )}
        </Typography>
      </Box>
    </Box>
  );
};

export default ClienteFibraEditRubroAmount;
