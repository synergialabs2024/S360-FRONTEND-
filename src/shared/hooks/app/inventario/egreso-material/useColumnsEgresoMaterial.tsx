import { MRT_ColumnDef } from 'material-react-table';
import { useMemo } from 'react';

import {
  emptyCellNested,
  emptyCellOneLevel,
  formatDateWithTimeCell,
} from '@/shared/utils';
import { ShowSeriesModal } from '../modals';
import { EgresoMaterial } from '@/shared/interfaces';
import { TABLE_CONSTANTS } from '@/shared/constants';
import { ViewMoreTextModalTableCell } from '@/shared/components';

export const useColumnsEgresoMaterial = () => {
  const egresoProductoBaseColumns = useMemo<MRT_ColumnDef<EgresoMaterial>[]>(
    () => [
      {
        accessorKey: 'secuencial',
        header: 'NUMERO REGISTRO',
        size: TABLE_CONSTANTS.COLUMN_WIDTH_SMALL,
        enableColumnFilter: true,
        enableSorting: true,
        Cell: ({ row }) => emptyCellOneLevel(row, 'secuencial'),
      },
      {
        accessorKey: 'productos',
        header: 'PRODUCTOS',
        enableColumnFilter: false,
        size: TABLE_CONSTANTS.COLUMN_WIDTH_SMALL,
        Cell: ({ row }) => {
          return <ShowSeriesModal Arrays={row.original} />;
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
        accessorKey: 'bodega__nombre',
        header: 'BODEGA',
        size: TABLE_CONSTANTS.COLUMN_WIDTH_MEDIUM,
        enableColumnFilter: true,
        enableSorting: true,
        Cell: ({ row }) => emptyCellNested(row, ['bodega_data', 'nombre']),
      },
      {
        accessorKey: 'ubicacion__nombre',
        header: 'UBICACIÓN',
        size: TABLE_CONSTANTS.COLUMN_WIDTH_MEDIUM,
        enableColumnFilter: true,
        enableSorting: true,
        Cell: ({ row }) => emptyCellNested(row, ['ubicacion_data', 'nombre']),
      },
      {
        accessorKey: 'motivo_egreso__nombre',
        header: 'EGRESO',
        size: TABLE_CONSTANTS.COLUMN_WIDTH_MEDIUM,
        enableColumnFilter: true,
        enableSorting: true,
        Cell: ({ row }) =>
          emptyCellNested(row, ['motivo_egreso_data', 'nombre']),
      },
      {
        accessorKey: 'user_create__razon_social',
        header: 'USUARIO',
        size: TABLE_CONSTANTS.COLUMN_WIDTH_MEDIUM,
        enableColumnFilter: true,
        enableSorting: true,
        Cell: ({ row }) =>
          emptyCellNested(row, ['user_create_data', 'razon_social']),
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
