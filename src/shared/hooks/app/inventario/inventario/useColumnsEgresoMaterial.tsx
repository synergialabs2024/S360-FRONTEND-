import { useMemo } from 'react';
import { MRT_ColumnDef } from 'material-react-table';

import { ViewMoreTextModalTableCell } from '@/shared/components';
import { TABLE_CONSTANTS } from '@/shared/constants';
import { EgresoMaterial } from '@/shared/interfaces';
import {
  emptyCellNested,
  emptyCellOneLevel,
  formatDateWithTimeCell,
} from '@/shared/utils';
import ShowSeriesModal from '@/app/inventario/egreso-material/pages/modal/ShowSeriesModal';

export const useColumnsEgresoMaterial = () => {
  const egresoProductoBaseColumns = useMemo<MRT_ColumnDef<EgresoMaterial>[]>(
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
              productoBoolean={false}
              Arrays={row.original.productos}
            />
          );
        },
      },
    ],
    [],
  );

  const egresoMaterialBaseColumns01 = useMemo<MRT_ColumnDef<EgresoMaterial>[]>(
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
        accessorKey: 'bodega__name',
        header: 'BODEGA',
        size: TABLE_CONSTANTS.COLUMN_WIDTH_MEDIUM,
        Cell: ({ row }) => emptyCellNested(row, ['bodega_data', 'nombre']),
      },
      {
        accessorKey: 'ubicacion__name',
        header: 'UBICACIÓN',
        size: TABLE_CONSTANTS.COLUMN_WIDTH_MEDIUM,
        Cell: ({ row }) => emptyCellNested(row, ['ubicacion_data', 'nombre']),
      },
    ],
    [],
  );

  const egresoMaterialColumns = useMemo<MRT_ColumnDef<EgresoMaterial>[]>(
    () => [
      ...egresoProductoBaseColumns,
      ...egresoMaterialBaseColumns01,
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
    [egresoMaterialBaseColumns01, egresoProductoBaseColumns],
  );
  return {
    egresoMaterialColumns,
  };
};
