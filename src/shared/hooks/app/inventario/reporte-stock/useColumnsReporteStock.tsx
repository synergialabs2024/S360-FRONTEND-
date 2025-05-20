import { MRT_ColumnDef } from 'material-react-table';
import { useMemo } from 'react';

import {
  emptyCellNested,
  emptyCellOneLevel,
  formatDateWithTimeCell,
} from '@/shared/utils';
import { TABLE_CONSTANTS } from '@/shared/constants';
import { UbicacionProducto } from '@/shared/interfaces';
import ShowSeriesProductosModal from '@/app/inventario/egreso-material/pages/modal/ShowSeriesProductosModal';

export const useColumnsReporteStock = () => {
  const reporteStockBase001Columns = useMemo<
    MRT_ColumnDef<UbicacionProducto>[]
  >(
    () => [
      {
        accessorKey: 'producto__nombre',
        header: 'PRODUCTO',
        size: TABLE_CONSTANTS.COLUMN_WIDTH_MEDIUM,
        enableColumnFilter: true,
        enableSorting: true,
        Cell: ({ row }) => emptyCellNested(row, ['producto_data', 'nombre']),
      },
      {
        accessorKey: 'bodega__nombre',
        header: 'BODEGA',
        size: TABLE_CONSTANTS.COLUMN_WIDTH_MEDIUM,
        enableColumnFilter: true,
        enableSorting: true,
        Cell: ({ row }) => emptyCellNested(row, ['bodega_data', 'nombre']),
      },
      {
        accessorKey: 'ubicacion__nombre',
        header: 'UBICACION',
        size: TABLE_CONSTANTS.COLUMN_WIDTH_MEDIUM,
        enableColumnFilter: true,
        enableSorting: true,
        Cell: ({ row }) => emptyCellNested(row, ['ubicacion_data', 'nombre']),
      },
      {
        accessorKey: 'categoria__nombre',
        header: 'CATEGORIA',
        size: TABLE_CONSTANTS.COLUMN_WIDTH_MEDIUM,
        enableColumnFilter: true,
        enableSorting: true,
        Cell: ({ row }) => emptyCellNested(row, ['categoria_data', 'nombre']),
      },
    ],
    [],
  );

  const reporteStockBase002Columns = useMemo<
    MRT_ColumnDef<UbicacionProducto>[]
  >(
    () => [
      {
        accessorKey: 'stock_actual',
        header: 'STOCK ACTUAL',
        size: TABLE_CONSTANTS.COLUMN_WIDTH_SMALL,
        enableColumnFilter: true,
        enableSorting: true,
        Cell: ({ row }) => emptyCellOneLevel(row, 'stock_actual'),
      },
      {
        accessorKey: 'stock_minimo',
        header: 'STOCK MINIMO',
        size: TABLE_CONSTANTS.COLUMN_WIDTH_SMALL,
        enableColumnFilter: true,
        enableSorting: true,
        Cell: ({ row }) => emptyCellOneLevel(row, 'stock_minimo'),
      },
      {
        accessorKey: 'stock_maximo',
        header: 'STOCK MAXIMO',
        size: TABLE_CONSTANTS.COLUMN_WIDTH_SMALL,
        enableColumnFilter: true,
        enableSorting: true,
        Cell: ({ row }) => emptyCellOneLevel(row, 'stock_maximo'),
      },
      {
        accessorKey: 'stock_critico',
        header: 'STOCK CRITICO',
        size: TABLE_CONSTANTS.COLUMN_WIDTH_SMALL,
        enableColumnFilter: true,
        enableSorting: true,
        Cell: ({ row }) => emptyCellOneLevel(row, 'stock_critico'),
      },
      {
        accessorKey: 'producto__requiere_series',
        header: 'CONTIENE SERIE',
        size: TABLE_CONSTANTS.COLUMN_WIDTH_SMALL,
        enableColumnFilter: true,
        enableSorting: true,
        Cell: ({ row }) => {
          const requiereSeries = row?.original?.producto_data?.requiere_series;
          return <>{requiereSeries ? 'Con permiso' : 'Sin permiso'}</>;
        },
      },
      {
        accessorKey: 'producto__series',
        header: 'SERIES',
        enableColumnFilter: false,
        size: TABLE_CONSTANTS.COLUMN_WIDTH_SMALL,
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

  const motivoTransferenciaColumns = useMemo<
    MRT_ColumnDef<UbicacionProducto>[]
  >(
    () => [
      ...reporteStockBase001Columns,
      ...reporteStockBase002Columns,
      {
        accessorKey: 'created_at',
        header: 'CREADO',
        size: TABLE_CONSTANTS.COLUMN_WIDTH_MEDIUM,
        enableColumnFilter: false,
        enableSorting: false,
        Cell: ({ row }) => formatDateWithTimeCell(row, 'created_at'),
      },
      {
        accessorKey: 'modified_at',
        header: 'MODIFICADO',
        size: TABLE_CONSTANTS.COLUMN_WIDTH_MEDIUM,
        enableColumnFilter: false,
        enableSorting: false,
        Cell: ({ row }) => formatDateWithTimeCell(row, 'modified_at'),
      },
    ],
    [reporteStockBase001Columns, reporteStockBase002Columns],
  );

  return {
    motivoTransferenciaColumns,
  };
};
