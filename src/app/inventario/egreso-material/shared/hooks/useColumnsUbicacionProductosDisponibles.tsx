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
      updateSelectedItemValue({
        keyStore:
          UbicacionProductosDisponiblesStoreKey.ubicacionProductosDisponibles,
        updatedItem: {
          ...item,
          cantidad: +value,
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
  const baseColumnsEgreso01 = useMemo<
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
        Cell: ({ row }) =>
          emptyCellNested(row, ['producto_data', 'descripcion']),
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

  const baseColumnsEgreso02 = useMemo<
    MRT_ColumnDef<UbicacionProductosDisponiblesTableType>[]
  >(
    () => [
      {
        accessorKey: 'producto__requiere_series',
        header: 'CONTIENE SERIE',
        Cell: ({ row }) => {
          const requiereSeries = row?.original?.producto_data?.requiere_series;
          return <>{requiereSeries ? 'Con permiso' : 'Sin permiso'}</>;
        },
      },
    ],
    [],
  );

  const baseColumnsEgreso03 = useMemo<
    MRT_ColumnDef<UbicacionProductosDisponiblesTableType>[]
  >(
    () => [
      ...baseColumnsEgreso02,
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

            if (valueCantidad <= stockActual) {
              return false;
            }

            return true;
          }

          return (
            <SeriesUbicacionProductoModal
              Arrays={row.original}
              modalTitle={`Serie para ${row?.original?.producto_data?.codigo}`}
              cantidadBoolean={obtenerValor(cantidad, stockActual)}
              onDataChange={newData => {
                onChangeSerieInit(newData, row.original);
              }}
            />
          );
        },
      },
    ],
    [onChangeSerieInit, baseColumnsEgreso02],
  );

  const baseColumnsEgreso04 = useMemo<
    MRT_ColumnDef<UbicacionProductosDisponiblesTableType>[]
  >(
    () => [
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
    [],
  );

  const modalEgresoMaterialColumns = useMemo<
    MRT_ColumnDef<UbicacionProductosDisponiblesTableType>[]
  >(
    () => [
      ...baseColumnsEgreso01,

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
    [baseColumnsEgreso01, onActionProductosRowNode, showActionColumn],
  );

  const crearEgresoMaterialColumns = useMemo<
    MRT_ColumnDef<UbicacionProductosDisponiblesTableType>[]
  >(
    () => [
      ...baseColumnsEgreso01,
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
      ...baseColumnsEgreso03,
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
      baseColumnsEgreso01,
      baseColumnsEgreso03,
      onChangePuntaInit,
      removeSelectedItem,
    ],
  );

  const seriesEgresoColumns = useMemo<
    MRT_ColumnDef<UbicacionProductosDisponiblesTableType>[]
  >(
    () => [
      ...baseColumnsEgreso01,
      ...baseColumnsEgreso02,
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
      ...baseColumnsEgreso04,
    ],
    [baseColumnsEgreso01, baseColumnsEgreso02, baseColumnsEgreso04],
  );

  return {
    modalEgresoMaterialColumns,
    crearEgresoMaterialColumns,
    seriesEgresoColumns,
  };
};
