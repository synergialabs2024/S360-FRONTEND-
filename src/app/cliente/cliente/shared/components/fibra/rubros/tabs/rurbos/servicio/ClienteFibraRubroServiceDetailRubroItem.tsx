import { Grid, Paper, TextField } from '@mui/material';
import { MRT_ColumnDef } from 'material-react-table';
import { useCallback, useMemo } from 'react';
import { IoMdAdd } from 'react-icons/io';
import { MdDeleteForever } from 'react-icons/md';
import { v4 as uuid } from 'uuid';

import {
  formatCurrency,
  formatToNDecimals,
  TABLE_CONSTANTS,
  TipoRubroEnumChoice,
  ToastWrapper,
} from '@/shared';
import {
  CustomMinimalTable,
  CustomSingleButton,
  SingleIconButton,
} from '@/shared/components';
import { RubroItemDataType, useRubroStore } from '@/store/app/rubros';

export type ClienteFibraRubroServiceDetailRubroItemProps = {};

const ClienteFibraRubroServiceDetailRubroItem: React.FC<
  ClienteFibraRubroServiceDetailRubroItemProps
> = () => {
  ///* global state --------------------------
  const activeRubro = useRubroStore(s => s.activeRubro); // to edit
  const updateSelectedRubroItemValue = useRubroStore(
    s => s.updateSelectedRubroItemValue,
  );
  const softDeleteSelectedRubroItem = useRubroStore(
    s => s.softDeleteSelectedRubroItem,
  );
  const removeSelectedRubroItem = useRubroStore(s => s.removeSelectedRubroItem);
  const addNewRubroItemLine = useRubroStore(s => s.addNewRubroItemLine);

  ///* handlers --------------------------
  const onChangeDescription = useCallback(
    (value: string, item: RubroItemDataType) => {
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
    (value: string, item: RubroItemDataType) => {
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
    (value: string, item: RubroItemDataType) => {
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
    (value: string, item: RubroItemDataType) => {
      updateSelectedRubroItemValue({
        item: {
          ...item,
          impuesto: value as any,
        },
      });
    },
    [updateSelectedRubroItemValue],
  );
  const onDeleteRubroItem = useCallback(
    (item: RubroItemDataType) => {
      // si el id es string que termina con `___new` es un item nuevo y si se elimina, este usa el removeSelectedRubroItem, caso contrario usa el softDeleteSelectedRubroItem
      if (item.id && item.id.toString().endsWith('___new')) {
        removeSelectedRubroItem({ item });
        return;
      }

      softDeleteSelectedRubroItem({ item });
    },
    [removeSelectedRubroItem, softDeleteSelectedRubroItem],
  );
  const onAddRubroItem = useCallback(() => {
    const newItem: RubroItemDataType = {
      id: `${uuid()}___new` as any,
      tipo_rubro_item: TipoRubroEnumChoice.SERVICIO,
      descripcion: '',
      valor_base: '0.00',
      cantidad: 1,
      impuesto: '0.00',
      removible: true,
      state: true,
    };
    addNewRubroItemLine({ item: newItem });
  }, [addNewRubroItemLine]);

  ///* columns --------------------------
  const columnsEditRubro = useMemo<MRT_ColumnDef<RubroItemDataType>[]>(
    () => [
      {
        accessorKey: 'descripcion',
        header: 'DESCRIPCION',
        size: TABLE_CONSTANTS.COLUMN_WIDTH_EXTRA_LARGE,
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
          return (
            <>
              <Grid
                item
                container
                xs={12}
                justifyContent="space-between"
                alignItems="center"
              >
                <Grid item xs={6}>
                  <span>{formatCurrency(formatToNDecimals(total, 2))}</span>
                </Grid>
                <Grid item xs={6}>
                  <SingleIconButton
                    startIcon={<MdDeleteForever />}
                    color="error"
                    label="Remover"
                    tooltipPlacement="right-end"
                    onClick={() => {
                      onDeleteRubroItem(row.original);
                    }}
                  />
                </Grid>
              </Grid>
            </>
          );
        },
      },
    ],
    [
      onChangeDescription,
      onChangePrice,
      onChangeQuantity,
      onChangeTax,
      onDeleteRubroItem,
    ],
  );

  if (!activeRubro) return null;

  return (
    <>
      <Paper variant="outlined">
        <Grid
          item
          container
          xs={12}
          alignItems="center"
          justifyContent="space-between"
        >
          <Grid item xs={12} pt={2} pr={2}>
            <CustomSingleButton
              label="AGREGAR LINEA"
              justifyContent="flex-end"
              startIcon={<IoMdAdd />}
              onClick={() => {
                onAddRubroItem();
              }}
              variant="outlined"
            />
          </Grid>

          <Grid item xs={12}>
            <CustomMinimalTable<RubroItemDataType>
              columns={columnsEditRubro}
              data={
                activeRubro?.rubro_items_data?.filter(
                  (item: RubroItemDataType) => item.state !== false,
                ) || []
              }
              enablePagination
              density="compact"
            />
          </Grid>
        </Grid>
      </Paper>
    </>
  );
};

export default ClienteFibraRubroServiceDetailRubroItem;
