import { Paper, TextField } from '@mui/material';
import { MRT_ColumnDef } from 'material-react-table';
import { useCallback, useMemo } from 'react';

import {
  formatCurrency,
  formatToNDecimals,
  RubroItemData,
  TABLE_CONSTANTS,
  ToastWrapper,
} from '@/shared';
import { CustomMinimalTable } from '@/shared/components';
import { useRubroStore } from '@/store/app/rubros';

export type ClienteFibraRubroServiceDetailRubroItemProps = {};

const ClienteFibraRubroServiceDetailRubroItem: React.FC<
  ClienteFibraRubroServiceDetailRubroItemProps
> = () => {
  ///* global state --------------------------
  const activeRubro = useRubroStore(s => s.activeRubro); // to edit
  const updateSelectedRubroItemValue = useRubroStore(
    s => s.updateSelectedRubroItemValue,
  );

  ///* handlers --------------------------
  const onChangeDescription = useCallback(
    (value: string, item: RubroItemData) => {
      updateSelectedRubroItemValue({
        item: {
          ...item,
          descripcion: value,
        },
      });
    },
    [updateSelectedRubroItemValue],
  );
  const onChangePrice = useCallback(
    (value: string, item: RubroItemData) => {
      console.log('value', value);
      updateSelectedRubroItemValue({
        item: {
          ...item,
          valor_base: value,
        },
      });
    },
    [updateSelectedRubroItemValue],
  );
  const onChangeQuantity = useCallback(
    (value: string, item: RubroItemData) => {
      updateSelectedRubroItemValue({
        item: {
          ...item,
          cantidad: value as any,
        },
      });
    },
    [updateSelectedRubroItemValue],
  );
  const onChangeTax = useCallback(
    (value: string, item: RubroItemData) => {
      updateSelectedRubroItemValue({
        item: {
          ...item,
          impuesto: value as any,
        },
      });
    },
    [updateSelectedRubroItemValue],
  );

  ///* columns --------------------------
  const columnsEditRubro = useMemo<MRT_ColumnDef<RubroItemData>[]>(
    () => [
      {
        accessorKey: 'descripcion',
        header: 'DESCRIPCION',
        size: TABLE_CONSTANTS.COLUMN_WIDTH_NAME,
        Cell: ({ row }) => {
          return (
            <TextField
              variant="outlined"
              value={row.original?.descripcion}
              onChange={e => {
                const newValue = e.target.value;
                onChangeDescription(newValue, row.original);
              }}
              type="text"
              inputProps={{
                maxLength: 100,
                style: { textAlign: 'left' },
              }}
              fullWidth
            />
          );
        },
      },
      {
        accessorKey: 'valor_base',
        header: 'PRECIO UNITARIO',
        size: TABLE_CONSTANTS.COLUMN_WIDTH_SMALL,
        Cell: ({ row }) => {
          return (
            <TextField
              variant="outlined"
              value={row.original?.valor_base}
              onChange={e => {
                const newValue = e.target.value;
                // si no es numero, forzar a 0
                if (isNaN(Number(newValue)) || newValue === '') {
                  onChangePrice('0.00', row.original);
                  return;
                }
                // si tiene mas de 2 decimales, retornar alerta con erro y no dejar continuar
                const decimalCount = newValue.split('.')[1]?.length || 0;
                if (decimalCount > 2) {
                  return ToastWrapper.error(
                    'El precio unitario no puede tener más de 2 decimales',
                  );
                }

                onChangePrice(newValue, row.original);
              }}
              type="number"
              inputProps={{
                min: -999,
                step: 0.01,
                max: 1200,
                style: { textAlign: 'right' },
              }}
            />
          );
        },
      },
      {
        accessorKey: 'cantidad',
        header: 'CANTIDAD',
        size: TABLE_CONSTANTS.COLUMN_WIDTH_SMALL,
        Cell: ({ row }) => {
          return (
            <TextField
              variant="outlined"
              value={row.original?.cantidad}
              onChange={e => {
                const newValue = e.target.value;
                // si no es numero, forzar a 0
                if (isNaN(Number(newValue)) || newValue === '') {
                  onChangeQuantity('0', row.original);
                  return;
                }
                // si tiene mas de 2 decimales, retornar alerta con erro y no dejar continuar
                const decimalCount = newValue.split('.')[1]?.length || 0;
                if (decimalCount > 0) {
                  return ToastWrapper.error(
                    'La cantidad no puede tener decimales',
                  );
                }

                onChangeQuantity(newValue, row.original);
              }}
              type="number"
              inputProps={{
                min: 0,
                step: 1,
                max: 1200,
                style: { textAlign: 'right' },
              }}
            />
          );
        },
      },
      {
        accessorKey: 'impuesto',
        header: 'IMP %',
        size: TABLE_CONSTANTS.COLUMN_WIDTH_SMALL,
        Cell: ({ row }) => {
          return (
            <TextField
              variant="outlined"
              value={row.original?.impuesto}
              onChange={e => {
                const newValue = e.target.value;
                // si no es numero, forzar a 0
                if (isNaN(Number(newValue)) || newValue === '') {
                  onChangeTax('0.00', row.original);
                  return;
                }
                // si tiene mas de 2 decimales, retornar alerta con erro y no dejar continuar
                const decimalCount = newValue.split('.')[1]?.length || 0;
                if (decimalCount > 2) {
                  return ToastWrapper.error(
                    'El impuesto no puede tener más de 2 decimales',
                  );
                }

                onChangeTax(newValue, row.original);
              }}
              type="number"
              inputProps={{
                min: 0,
                step: 0.01,
                max: 1200,
                style: { textAlign: 'right' },
              }}
            />
          );
        },
      },
      {
        accessorKey: 'subtotal',
        header: 'SUBTOTAL',
        size: TABLE_CONSTANTS.COLUMN_WIDTH_SMALL,
        Cell: ({ row }) => {
          const subtotal =
            Number(row.original?.valor_base) * Number(row.original?.cantidad);
          return <span>{formatCurrency(formatToNDecimals(subtotal, 2))}</span>;
        },
      },
      {
        accessorKey: 'total',
        header: 'TOTAL',
        size: TABLE_CONSTANTS.COLUMN_WIDTH_SMALL,
        Cell: ({ row }) => {
          const subtotal =
            Number(row.original?.valor_base) * Number(row.original?.cantidad);
          const total = subtotal * (Number(row.original?.impuesto) / 100 + 1);
          return <span>{formatCurrency(formatToNDecimals(total, 2))}</span>;
        },
      },
    ],
    [onChangeDescription, onChangePrice, onChangeQuantity, onChangeTax],
  );

  if (!activeRubro) return null;

  return (
    <>
      <Paper variant="outlined">
        <>
          <CustomMinimalTable<RubroItemData>
            columns={columnsEditRubro}
            data={activeRubro?.rubro_items_data || []}
            enablePagination
            density="compact"
          />
        </>
      </Paper>
    </>
  );
};

export default ClienteFibraRubroServiceDetailRubroItem;
