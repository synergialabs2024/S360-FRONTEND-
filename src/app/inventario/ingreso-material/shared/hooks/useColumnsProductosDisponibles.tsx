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
import SeriesProductoModal from '../../pages/modal/SeriesProductoModal';
import ShowSeriesProductosModal from '@/app/inventario/egreso-material/pages/modal/ShowSeriesProductosModal';

export type ProductosDisponiblesTableType = Producto & {
  cantidad?: number;
  series?: any[];
  productos?: string[];
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

  const baseColumnsIngreso02 = useMemo<
    MRT_ColumnDef<ProductosDisponiblesTableType>[]
  >(
    () => [
      {
        accessorKey: 'producto__requiere_series',
        header: 'CONTIENE SERIE',
        Cell: ({ row }) => {
          const requiereSeries = row?.original?.requiere_series;
          return <>{requiereSeries ? 'Con permiso' : 'Sin permiso'}</>;
        },
      },
    ],
    [],
  );

  const baseColumnsProductosDisponibles02 = useMemo<
    MRT_ColumnDef<ProductosDisponiblesTableType>[]
  >(
    () => [
      ...baseColumnsIngreso02,
      {
        accessorKey: 'producto__series',
        header: 'SERIES',
        enableColumnFilter: false,
        size: TABLE_CONSTANTS.COLUMN_WIDTH_LARGE,
        Cell: ({ row }) => {
          const cantidad = row.original.cantidad;

          function obtenerValor(valueCantidad: number | undefined): boolean {
            if (valueCantidad !== undefined) {
              return false;
            }
            return true;
          }

          return (
            <SeriesProductoModal
              Arrays={row.original}
              modalTitle={`Serie para ${row?.original?.codigo}`}
              cantidadBoolean={obtenerValor(cantidad)}
              onDataChange={newData => onChangeSerieInit(newData, row.original)}
            />
          );
        },
      },
    ],
    [baseColumnsIngreso02, onChangeSerieInit],
  );

  const seriesIngresoColumns = useMemo<
    MRT_ColumnDef<ProductosDisponiblesTableType>[]
  >(
    () => [
      ...baseColumnsIngreso01,
      ...baseColumnsIngreso02,
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
    [baseColumnsIngreso01, baseColumnsIngreso02],
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

  const crearMaterialColumns = useMemo<
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
      baseColumnsIngreso01,
      baseColumnsProductosDisponibles02,
      onChangePuntaInit,
      removeSelectedItem,
    ],
  );

  return {
    modalMaterialColumns,
    crearMaterialColumns,
    seriesIngresoColumns,
  };
};
