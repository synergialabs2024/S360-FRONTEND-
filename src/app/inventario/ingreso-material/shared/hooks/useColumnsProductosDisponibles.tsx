/* eslint-disable indent */
import { emptyCellNested, formatQuantityCell, TABLE_CONSTANTS } from '@/shared';
import { useCallback, useMemo } from 'react';
import { MRT_ColumnDef, MRT_Row } from 'material-react-table';
import { SingleIconButton } from '@/shared/components';
import { IoMdTrash } from 'react-icons/io';
import {
  ProductosDisponiblesStoreKey,
  useProductosStore,
} from '@/store/app/inventario/productos-disponible.store';
import { TextField } from '@mui/material';
import { ProductosDisponiblesTableType } from '../components/SaveIngresoMaterial/SaveIngresoMaterial';

type UseColumnsEquiposIngresoMaterial = {
  showActionColumn?: boolean;
  onActionProductosRowNode?: (
    item: ProductosDisponiblesTableType,
  ) => React.ReactNode;

  showCurrentStockColumn?: boolean;
};

type MRTUbicacionProductoTableType = {
  row: MRT_Row<ProductosDisponiblesTableType>;
};

export const useColumnsProductosDisponibles = ({
  showActionColumn = false,
  onActionProductosRowNode,
  showCurrentStockColumn = true,
}: UseColumnsEquiposIngresoMaterial = {}) => {
  ///* global state --------------------
  const removeSelectedItem = useProductosStore(s => s.removeSelectedItem);
  const updateSelectedItemValue = useProductosStore(
    s => s.updateSelectedItemValue,
  );
  const onChangePuntaInit = useCallback(
    (value: string, item: ProductosDisponiblesTableType) => {
      const usedQuantity = (item.cantidad || 0) - +value;

      updateSelectedItemValue({
        keyStore: ProductosDisponiblesStoreKey.productosDisponibles,
        updatedItem: {
          ...item,
          cantidad: +value,
          usedQuantity: usedQuantity > 0 ? usedQuantity : 0,
        } as any,
      });
    },
    [updateSelectedItemValue],
  );

  ///* base columns -------------------------------
  const baseColumnsProductosDisponibles01 = useMemo<
    MRT_ColumnDef<ProductosDisponiblesTableType>[]
  >(
    () => [
      {
        accessorKey: 'producto__codigo',
        header: 'CÓDIGO',
        enableColumnFilter: false,
        size: TABLE_CONSTANTS.COLUMN_WIDTH_LARGE,
        Cell: ({ row }) => emptyCellNested(row, ['producto_data', 'nombre']),
      },
      {
        accessorKey: 'producto__descripcion',
        header: 'DESCRIPCION',
        enableColumnFilter: false,
        size: TABLE_CONSTANTS.COLUMN_WIDTH_LARGE,
        Cell: ({ row }) =>
          emptyCellNested(row, ['producto_data', 'descripcion']),
      },
    ],
    [],
  );

  const modalMaterialColumns = useMemo<
    MRT_ColumnDef<ProductosDisponiblesTableType>[]
  >(
    () => [
      ...baseColumnsProductosDisponibles01,

      ...(showCurrentStockColumn
        ? [
            {
              accessorKey: 'stock_actual',
              header: 'STOCK',
              enableColumnFilter: false,
              Cell: ({ row }: MRTUbicacionProductoTableType) =>
                formatQuantityCell(row, 'stock_actual'),
            },
          ]
        : []),

      ...(showActionColumn
        ? [
            {
              accessorKey: 'action',
              enableColumnFilter: false,
              header: 'ACCIÓN',
              Cell: ({ row }: MRTUbicacionProductoTableType) =>
                onActionProductosRowNode?.(row.original),
            },
          ]
        : []),
    ],
    [
      showCurrentStockColumn,
      baseColumnsProductosDisponibles01,
      onActionProductosRowNode,
      showActionColumn,
    ],
  );

  const crearMaterialColumns = useMemo<
    MRT_ColumnDef<ProductosDisponiblesTableType>[]
  >(
    () => [
      ...baseColumnsProductosDisponibles01,
      {
        accessorKey: 'producto__categoria',
        header: 'CATEGORIA',
        enableColumnFilter: false,
        size: TABLE_CONSTANTS.COLUMN_WIDTH_LARGE,
        Cell: ({ row }) => emptyCellNested(row, ['producto_data', 'categoria']),
      },
      {
        accessorKey: 'cantidad',
        header: 'CANTIDAD',
        Cell: ({ row }) => {
          return (
            <TextField
              variant="outlined"
              value={row.original.cantidad || ''}
              onChange={e => onChangePuntaInit(e.target.value, row.original)}
              type="number"
              inputProps={{
                min: 0,
                step: 1,
              }}
            />
          );
        },
      },
      {
        accessorKey: 'remove',
        header: 'ACCIONES',
        Cell: ({ row }) => (
          <SingleIconButton
            label="Remover"
            startIcon={<IoMdTrash />}
            color="error"
            tooltipPlacement="right-end"
            onClick={() => {
              removeSelectedItem({
                item: row.original,
                keyStore: ProductosDisponiblesStoreKey.productosDisponibles,
              });
            }}
            justifyContent="center"
          />
        ),
      },
    ],
    [baseColumnsProductosDisponibles01, onChangePuntaInit, removeSelectedItem],
  );

  return {
    baseColumnsProductosDisponibles01,
    modalMaterialColumns,
    crearMaterialColumns,
  };
};
