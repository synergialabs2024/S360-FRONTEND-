/* eslint-disable indent */
import { TextField } from '@mui/material';
import { MRT_ColumnDef, MRT_Row } from 'material-react-table';
import { useCallback, useMemo } from 'react';
import { IoMdTrash } from 'react-icons/io';

import { emptyCellNested, formatQuantityCell, TABLE_CONSTANTS } from '@/shared';
import {
  UbicacionProductosDisponiblesStoreKey,
  useUbicacionProductosStore,
} from '@/store/app';
import SeriesUbicacionProductoModal from '../../pages/modal/SeriesUbicacionProductoModal';
import { SingleIconButton } from '@/shared/components';
import { UbicacionProductosDisponiblesTableType } from '../../pages/modal/UbicacionProductosDisponiblesModal';
import ShowSeriesProductosModal from '../../pages/modal/ShowSeriesProductosModal';

type UseColumnsEquiposEgresoMaterial = {
  showActionColumn?: boolean;
  showCurrentStockColumn?: boolean;
  onActionProductosRowNode?: (
    item: UbicacionProductosDisponiblesTableType,
  ) => React.ReactNode;
};

type MRTUbicacionProductoTableType = {
  row: MRT_Row<UbicacionProductosDisponiblesTableType>;
};

export const useColumnsUbicacionProductosDisponibles = ({
  showActionColumn = false,
  onActionProductosRowNode,
  showCurrentStockColumn = true,
}: UseColumnsEquiposEgresoMaterial = {}) => {
  ///* global state --------------------
  const removeSelectedItem = useUbicacionProductosStore(
    s => s.removeSelectedItem,
  );
  const updateSelectedItemValue = useUbicacionProductosStore(
    s => s.updateSelectedItemValue,
  );

  const onChangePuntaInit = useCallback(
    (value: string, item: UbicacionProductosDisponiblesTableType) => {
      const usedQuantity = (item.cantidad || 0) - +value;

      updateSelectedItemValue({
        keyStore:
          UbicacionProductosDisponiblesStoreKey.ubicacionProductosDisponibles,
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
    (value: string[], item: UbicacionProductosDisponiblesTableType) => {
      updateSelectedItemValue({
        keyStore:
          UbicacionProductosDisponiblesStoreKey.ubicacionProductosDisponibles,
        updatedItem: {
          ...item,
          series: value ? value : [],
        } as any,
      });
    },
    [updateSelectedItemValue],
  );

  ///* base columns -------------------------------
  const baseColumnsUbicacionProductosDisponibles01 = useMemo<
    MRT_ColumnDef<UbicacionProductosDisponiblesTableType>[]
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
        enableColumnFilter: false,
        size: TABLE_CONSTANTS.COLUMN_WIDTH_LARGE,
        Cell: ({ row }) => emptyCellNested(row, ['producto_data', 'codigo']),
      },
      {
        accessorKey: 'descripcion',
        header: 'DESCRIPCION',
        enableColumnFilter: false,
        size: TABLE_CONSTANTS.COLUMN_WIDTH_LARGE,
        Cell: ({ row }) => emptyCellNested(row, ['producto_data', 'codigo']),
      },
      ...(showCurrentStockColumn
        ? [
            {
              accessorKey: 'stock_actual',
              header: 'STOCK ACTUAL',
              enableColumnFilter: false,
              Cell: ({ row }: MRTUbicacionProductoTableType) =>
                formatQuantityCell(row, 'stock_actual'),
            },
          ]
        : []),
    ],
    [showCurrentStockColumn],
  );
  const baseColumnsUbicacionProductosDisponibles05 = useMemo<
    MRT_ColumnDef<UbicacionProductosDisponiblesTableType>[]
  >(
    () => [
      {
        accessorKey: 'producto_data.requiere_series',
        header: 'CONTIENE SERIE',
        Cell: ({ row }) => {
          const requiereSeries = row?.original?.producto_data?.requiere_series;
          return <>{requiereSeries ? 'Con permiso' : 'Sin permiso'}</>;
        },
      },
    ],
    [],
  );

  const baseColumnsUbicacionProductosDisponibles02 = useMemo<
    MRT_ColumnDef<UbicacionProductosDisponiblesTableType>[]
  >(
    () => [
      ...baseColumnsUbicacionProductosDisponibles05,
      {
        accessorKey: 'producto__series',
        header: 'SERIES',
        enableColumnFilter: false,
        size: TABLE_CONSTANTS.COLUMN_WIDTH_LARGE,
        Cell: ({ row }) => {
          const stockActual = row.original.stock_actual;
          const cantidad = row.original.cantidad;

          function obtenerValor(
            valueCantidad: number | undefined,
            stockActual: number,
          ): boolean {
            if (valueCantidad === undefined) {
              return true;
            }

            if (valueCantidad > stockActual) {
              return true;
            }

            if (valueCantidad < stockActual) {
              return false;
            }

            return true;
          }

          return (
            <SeriesUbicacionProductoModal
              Arrays={row.original}
              cantidadBoolean={obtenerValor(cantidad, stockActual)}
              modalTitle={`Serie para ${row?.original?.producto_data?.codigo}`}
              onDataChange={newData => {
                onChangeSerieInit(newData, row.original);
              }}
            />
          );
        },
      },
    ],
    [onChangeSerieInit, baseColumnsUbicacionProductosDisponibles05],
  );

  const baseColumnsUbicacionProductosDisponibles03 = useMemo<
    MRT_ColumnDef<UbicacionProductosDisponiblesTableType>[]
  >(
    () => [
      ...baseColumnsUbicacionProductosDisponibles05,
      {
        accessorKey: 'producto__series',
        header: 'SERIES',
        enableColumnFilter: false,
        size: TABLE_CONSTANTS.COLUMN_WIDTH_LARGE,
        Cell: ({ row }) => {
          return (
            <ShowSeriesProductosModal
              Arrays={row.original}
              serieBoolean={true}
            />
          );
        },
      },
    ],
    [baseColumnsUbicacionProductosDisponibles05],
  );
  const baseColumnsUbicacionProductosDisponibles04 = useMemo<
    MRT_ColumnDef<UbicacionProductosDisponiblesTableType>[]
  >(
    () => [
      ...baseColumnsUbicacionProductosDisponibles05,
      {
        accessorKey: 'producto__series',
        header: 'SERIES',
        enableColumnFilter: false,
        size: TABLE_CONSTANTS.COLUMN_WIDTH_LARGE,
        Cell: ({ row }) => {
          return (
            <ShowSeriesProductosModal
              Arrays={row.original}
              serieBoolean={false}
            />
          );
        },
      },
    ],
    [baseColumnsUbicacionProductosDisponibles05],
  );

  const modalMaterialColumns = useMemo<
    MRT_ColumnDef<UbicacionProductosDisponiblesTableType>[]
  >(
    () => [
      ...baseColumnsUbicacionProductosDisponibles01,

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
      baseColumnsUbicacionProductosDisponibles01,
      onActionProductosRowNode,
      showActionColumn,
    ],
  );

  const crearMaterialColumns = useMemo<
    MRT_ColumnDef<UbicacionProductosDisponiblesTableType>[]
  >(
    () => [
      ...baseColumnsUbicacionProductosDisponibles01,
      {
        accessorKey: 'cantidad',
        header: 'CANTIDAD',
        Cell: ({ row }) => {
          return (
            <TextField
              variant="outlined"
              value={row.original.cantidad || ''}
              onChange={e => {
                onChangePuntaInit(e.target.value, row.original);
              }}
              type="number"
              inputProps={{
                min: 0,
                step: 1,
              }}
            />
          );
        },
      },
      ...baseColumnsUbicacionProductosDisponibles02,
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
                keyStore:
                  UbicacionProductosDisponiblesStoreKey.ubicacionProductosDisponibles,
              });
            }}
            justifyContent="center"
          />
        ),
      },
    ],
    [
      baseColumnsUbicacionProductosDisponibles01,
      baseColumnsUbicacionProductosDisponibles02,
      onChangePuntaInit,
      removeSelectedItem,
    ],
  );

  const seriesIngresoColumns = useMemo<
    MRT_ColumnDef<UbicacionProductosDisponiblesTableType>[]
  >(
    () => [
      ...baseColumnsUbicacionProductosDisponibles01,
      {
        accessorKey: 'cantidad',
        header: 'CANTIDAD',
        Cell: ({ row }) => {
          return (
            <TextField
              disabled={true}
              variant="outlined"
              value={row.original.cantidad || ''}
              onChange={e => {
                onChangePuntaInit(e.target.value, row.original);
              }}
              type="number"
              inputProps={{
                min: 0,
                step: 1,
              }}
            />
          );
        },
      },
      ...baseColumnsUbicacionProductosDisponibles03,
    ],
    [
      baseColumnsUbicacionProductosDisponibles01,
      baseColumnsUbicacionProductosDisponibles03,
      onChangePuntaInit,
    ],
  );

  const seriesEgresoColumns = useMemo<
    MRT_ColumnDef<UbicacionProductosDisponiblesTableType>[]
  >(
    () => [
      ...baseColumnsUbicacionProductosDisponibles01,
      {
        accessorKey: 'cantidad',
        header: 'CANTIDAD',
        Cell: ({ row }) => {
          return (
            <TextField
              disabled={true}
              variant="outlined"
              value={row.original.cantidad || ''}
              onChange={e => {
                onChangePuntaInit(e.target.value, row.original);
              }}
              type="number"
              inputProps={{
                min: 0,
                step: 1,
              }}
            />
          );
        },
      },
      ...baseColumnsUbicacionProductosDisponibles04,
    ],
    [
      baseColumnsUbicacionProductosDisponibles01,
      baseColumnsUbicacionProductosDisponibles04,
      onChangePuntaInit,
    ],
  );

  return {
    baseColumnsUbicacionProductosDisponibles01,
    modalMaterialColumns,
    crearMaterialColumns,
    seriesIngresoColumns,
    seriesEgresoColumns,
  };
};
