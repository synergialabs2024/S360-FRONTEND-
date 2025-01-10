import { useMemo } from 'react';
import { MRT_ColumnDef } from 'material-react-table';

import { ViewMoreTextModalTableCell } from '@/shared/components';
import { TABLE_CONSTANTS } from '@/shared/constants';
import { TransferenciaMaterial } from '@/shared/interfaces';
import {
  emptyCellNested,
  emptyCellOneLevel,
  formatDateWithTimeCell,
} from '@/shared/utils';
import ShowSeriesModal from '@/app/inventario/egreso-material/pages/modal/ShowSeriesModal';

export const useColumnsTransferenciaMaterial = () => {
  const transferenciaProductoBaseColumns = useMemo<
    MRT_ColumnDef<TransferenciaMaterial>[]
  >(
    () => [
      {
        accessorKey: 'uuid',
        header: 'REFERENCIA',
        size: TABLE_CONSTANTS.ACTIONCOLUMN_WIDTH_LARGE,
        Cell: ({ row }) => emptyCellOneLevel(row, 'uuid'),
      },
      {
        accessorKey: 'productos',
        header: 'PRODUCTOS',
        enableColumnFilter: false,
        size: TABLE_CONSTANTS.COLUMN_WIDTH_MEDIUM,
        Cell: ({ row }) => {
          return (
            <ShowSeriesModal
              productoBoolean={true}
              Arrays={row.original.productos}
            />
          );
        },
      },
    ],
    [],
  );

  const transferenciaMaterialBaseColumns01 = useMemo<
    MRT_ColumnDef<TransferenciaMaterial>[]
  >(
    () => [
      {
        accessorKey: 'observacion',
        header: 'OBSERVACIÓN',
        size: TABLE_CONSTANTS.COLUMN_WIDTH_MEDIUM,
        enableColumnFilter: true,
        enableSorting: true,
        Cell: ({ row }) => {
          const str = row?.original?.observacion
            ? row.original.observacion
            : 'N/A';
          return (
            <ViewMoreTextModalTableCell
              longText={str}
              limit={27}
              modalTitle="Observacion"
            />
          );
        },
      },
      {
        accessorKey: 'bodega_origen__name',
        header: 'BODEGA ORIGEN',
        size: TABLE_CONSTANTS.COLUMN_WIDTH_MEDIUM,
        Cell: ({ row }) =>
          emptyCellNested(row, ['bodega_origen_data', 'nombre']),
      },
      {
        accessorKey: 'ubicacion_origen__name',
        header: 'UBICACIÓN ORIGEN',
        size: TABLE_CONSTANTS.COLUMN_WIDTH_MEDIUM,
        Cell: ({ row }) =>
          emptyCellNested(row, ['ubicacion_origen_data', 'nombre']),
      },
      {
        accessorKey: 'bodega_destino__name',
        header: 'BODEGA DESTINO',
        size: TABLE_CONSTANTS.COLUMN_WIDTH_MEDIUM,
        Cell: ({ row }) =>
          emptyCellNested(row, ['bodega_destino_data', 'nombre']),
      },
      {
        accessorKey: 'ubicacion_destino__name',
        header: 'UBICACIÓN DESTINO',
        size: TABLE_CONSTANTS.COLUMN_WIDTH_MEDIUM,
        Cell: ({ row }) =>
          emptyCellNested(row, ['ubicacion_destino_data', 'nombre']),
      },
    ],
    [],
  );

  const transferenciaMaterialColumns = useMemo<
    MRT_ColumnDef<TransferenciaMaterial>[]
  >(
    () => [
      ...transferenciaProductoBaseColumns,
      ...transferenciaMaterialBaseColumns01,
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
    [transferenciaMaterialBaseColumns01, transferenciaProductoBaseColumns],
  );
  return {
    transferenciaMaterialColumns,
  };
};
