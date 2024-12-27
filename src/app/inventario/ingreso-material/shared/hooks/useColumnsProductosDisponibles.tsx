/* eslint-disable indent */
import { TextField } from '@mui/material';
import { useCallback, useMemo } from 'react';
import { IoMdTrash } from 'react-icons/io';
import { MRT_ColumnDef, MRT_Row } from 'material-react-table';

import { emptyCellOneLevel, TABLE_CONSTANTS } from '@/shared';
import { SingleIconButton } from '@/shared/components';
import {
  ProductosDisponiblesStoreKey,
  useProductosStore,
} from '@/store/app/inventario/productos-disponible.store';
import { ProductosDisponiblesTableType } from '../components/SaveIngresoMaterial/SaveIngresoMaterial';
import SeriesProductoModal from '../../pages/modal/SeriesProductoModal';

type UseColumnsEquiposIngresoMaterial = {
  showActionColumn?: boolean;
  onActionProductosRowNode?: (
    item: ProductosDisponiblesTableType,
  ) => React.ReactNode;
};

type MRTProductoTableType = {
  row: MRT_Row<ProductosDisponiblesTableType>;
};

export const useColumnsProductosDisponibles = ({
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

  const onChangeSerieInit = useCallback(
    (value: string[], item: ProductosDisponiblesTableType) => {
      updateSelectedItemValue({
        keyStore: ProductosDisponiblesStoreKey.productosDisponibles,
        updatedItem: {
          ...item,
          series: value ? value : [],
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
        accessorKey: 'codigo',
        header: 'CÓDIGO',
        enableColumnFilter: false,
        size: TABLE_CONSTANTS.COLUMN_WIDTH_LARGE,
        Cell: ({ row }) => emptyCellOneLevel(row, 'codigo'),
      },
      {
        accessorKey: 'descripcion',
        header: 'DESCRIPCION',
        enableColumnFilter: false,
        size: TABLE_CONSTANTS.COLUMN_WIDTH_LARGE,
        Cell: ({ row }) => emptyCellOneLevel(row, 'descripcion'),
      },
    ],
    [],
  );

  const baseColumnsProductosDisponibles02 = useMemo<
    MRT_ColumnDef<ProductosDisponiblesTableType>[]
  >(
    () => [
      {
        accessorKey: 'producto__series',
        header: 'SERIES',
        enableColumnFilter: false,
        size: TABLE_CONSTANTS.COLUMN_WIDTH_LARGE,
        Cell: ({ row }) => {
          return (
            <SeriesProductoModal
              requiereSerie={row?.original?.requiere_series}
              dataArray={row?.original?.series || []}
              modalTitle={`Serie para ${row?.original?.codigo}`}
              onDataChange={newData => onChangeSerieInit(newData, row.original)}
            />
          );
        },
      },
    ],
    [onChangeSerieInit],
  );

  const modalMaterialColumns = useMemo<
    MRT_ColumnDef<ProductosDisponiblesTableType>[]
  >(
    () => [
      ...baseColumnsProductosDisponibles01,

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
    [
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
      ...baseColumnsProductosDisponibles02,
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
    [
      baseColumnsProductosDisponibles01,
      baseColumnsProductosDisponibles02,
      onChangePuntaInit,
      removeSelectedItem,
    ],
  );

  return {
    baseColumnsProductosDisponibles01,
    modalMaterialColumns,
    crearMaterialColumns,
  };
};
