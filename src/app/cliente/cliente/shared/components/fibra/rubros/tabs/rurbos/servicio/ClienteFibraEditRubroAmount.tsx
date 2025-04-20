import { formatCurrency, formatToNDecimals } from '@/shared';
import { useRubroStore } from '@/store/app/rubros';
import { Box, Typography } from '@mui/material';
import { useEffect } from 'react';

export type ClienteFibraEditRubroAmountProps = {};

const ClienteFibraEditRubroAmount: React.FC<
  ClienteFibraEditRubroAmountProps
> = () => {
  ///* global state --------------------------
  const activeRubro = useRubroStore(s => s.activeRubro)!;
  const rubroItems =
    activeRubro?.rubro_items_data?.filter(item => item?.state !== false) || [];
  const setActiveRubro = useRubroStore(s => s.setActiveRubro);

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
  const subtotalRaw = rubroItems.reduce((acc, item) => {
    const base = parseFloat(item.valor_base) || 0;
    const qty = item.cantidad || 0;
    return acc + base * qty;
  }, 0);
  // calc taxes ------
  const taxesRaw = rubroItems.reduce((acc, item) => {
    const base = parseFloat(item.valor_base) || 0;
    const qty = item.cantidad || 0;
    const pct = (parseFloat(item.impuesto) || 0) / 100;
    return acc + base * qty * pct;
  }, 0);
  // calc total ------
  const totalRaw = subtotalRaw + taxesRaw + discount2;
  const subtotal = formatToNDecimals(subtotalRaw, 2).toString();
  const valor_taxes = formatToNDecimals(taxesRaw, 2).toString();
  const valor_total = formatToNDecimals(totalRaw, 2).toString();

  ///* effects --------------------------
  useEffect(() => {
    if (
      activeRubro.subtotal !== subtotal ||
      activeRubro.valor_taxes !== valor_taxes ||
      activeRubro.valor_total !== valor_total
    ) {
      setActiveRubro({
        ...activeRubro,
        subtotal: subtotal,
        valor_taxes: valor_taxes,
        valor_total: valor_total,
      });
    }
  }, [subtotal, valor_taxes, valor_total, activeRubro, setActiveRubro]);

  return (
    <Box p={3} bgcolor="primary.light" mt={3}>
      <Box display="flex" justifyContent="end" gap={3} mb={3}>
        <Typography variant="body1" fontWeight={600}>
          Sub Total:
        </Typography>
        <Typography variant="body1" fontWeight={600}>
          {formatCurrency(subtotal)}
        </Typography>
      </Box>

      <Box display="flex" justifyContent="end" gap={3} mb={3}>
        <Typography variant="body1" fontWeight={600}>
          Impuesto:
        </Typography>
        <Typography variant="body1" fontWeight={600}>
          {formatCurrency(valor_taxes)}
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
          {formatCurrency(valor_total)}
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
