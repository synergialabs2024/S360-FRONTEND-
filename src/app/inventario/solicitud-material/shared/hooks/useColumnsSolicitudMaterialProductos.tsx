/* eslint-disable indent */
import { TextField } from '@mui/material';
import { useCallback, useMemo } from 'react';
import { IoMdTrash } from 'react-icons/io';
import { MRT_ColumnDef, MRT_Row } from 'material-react-table';

import {
  emptyCellNested,
  emptyCellOneLevel,
  Producto,
  TABLE_CONSTANTS,
} from '@/shared';
import { SingleIconButton } from '@/shared/components';
import {
  ProductosDisponiblesStoreKey,
  useProductosStore,
} from '@/store/app/inventario/productos-disponible.store';

export type ProductosDisponiblesTableType = Producto & {
  cantidad?: number;
  series?: any[];
  productos?: string[];
  usedQuantity?: number;
  selectedSeries?: string[];
  savedSeries?: string[];
};

type UseColumnsEquiposIngresoMaterial = {
  showActionColumn?: boolean;
  onActionProductosRowNode?: (
    item: ProductosDisponiblesTableType,
  ) => React.ReactNode;
};

type MRTProductoTableType = {
  row: MRT_Row<ProductosDisponiblesTableType>;
};

export const useColumnsSolicitudMaterialProductos = ({
  showActionColumn = false,
  onActionProductosRowNode,
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
  const baseColumnsIngreso01 = useMemo<
    MRT_ColumnDef<ProductosDisponiblesTableType>[]
  >(
    () => [
      {
        accessorKey: 'categoria_data__name',
        header: 'CATEGORIA',
        enableColumnFilter: false,
        size: TABLE_CONSTANTS.COLUMN_WIDTH_LARGE,
        Cell: ({ row }) => emptyCellNested(row, ['categoria_data', 'nombre']),
      },
      {
        accessorKey: 'codigo',
        header: 'CÓDIGO',
        size: TABLE_CONSTANTS.COLUMN_WIDTH_MEDIUM,
        Cell: ({ row }) => emptyCellOneLevel(row, 'codigo'),
      },
      {
        accessorKey: 'descripcion',
        header: 'DESCRIPCION',
        size: TABLE_CONSTANTS.COLUMN_WIDTH_MEDIUM,
        Cell: ({ row }) => emptyCellOneLevel(row, 'descripcion'),
      },
    ],
    [],
  );

  const seriesIngresoColumns = useMemo<
    MRT_ColumnDef<ProductosDisponiblesTableType>[]
  >(
    () => [
      ...baseColumnsIngreso01,

      {
        accessorKey: 'cantidad',
        header: 'CANTIDAD',
        Cell: ({ row }) => {
          return (
            <TextField
              disabled={true}
              variant="outlined"
              value={row.original.cantidad || ''}
              type="number"
              inputProps={{
                min: 0,
                step: 1,
              }}
            />
          );
        },
      },
    ],
    [baseColumnsIngreso01],
  );

  const modalMaterialColumns = useMemo<
    MRT_ColumnDef<ProductosDisponiblesTableType>[]
  >(
    () => [
      ...baseColumnsIngreso01,

      ...(showActionColumn
        ? [
            {
              accessorKey: 'action',
              enableColumnFilter: false,
              header: 'ACCIÓN',
              Cell: ({ row }: MRTProductoTableType) =>
                onActionProductosRowNode?.(row.original),
            },
          ]
        : []),
    ],
    [baseColumnsIngreso01, onActionProductosRowNode, showActionColumn],
  );

  const crearSolicitudMaterialColumns = useMemo<
    MRT_ColumnDef<ProductosDisponiblesTableType>[]
  >(
    () => [
      ...baseColumnsIngreso01,
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
    [baseColumnsIngreso01, onChangePuntaInit, removeSelectedItem],
  );

  return {
    modalMaterialColumns,
    crearSolicitudMaterialColumns,
    seriesIngresoColumns,
  };
};
