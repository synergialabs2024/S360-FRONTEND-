import type { MRT_ColumnDef } from 'material-react-table';
import { useMemo } from 'react';

import {
  emptyCellNested,
  emptyCellOneLevel,
  formatDateWithTimeCell,
} from '@/shared/utils';
import {
  TABLE_CONSTANTS,
  TRAZABILIDAD_MODELO_NAME_ARRAY_CHOICES,
} from '@/shared/constants';
import { TrazabilidadVenta } from '@/shared/interfaces';
import { ViewMoreTextModalTableCell } from '@/shared/components';

export const useColumnsTrazabilidadVenta = () => {
  // table base columns ---------------------
  const trazabilidadColumns01 = useMemo<MRT_ColumnDef<TrazabilidadVenta>[]>(
    () => [
      {
        accessorKey: 'modelo',
        header: 'MODELO',
        size: TABLE_CONSTANTS.COLUMN_WIDTH_SMALL,
        Cell: ({ row }) => emptyCellOneLevel(row, 'modelo'),
      },
      {
        accessorKey: 'modelo_name',
        header: 'ACCION TOMADA',
        size: TABLE_CONSTANTS.COLUMN_WIDTH_SMALL,
        enableColumnFilter: true,
        enableSorting: true,
        filterVariant: 'select',
        filterSelectOptions: TRAZABILIDAD_MODELO_NAME_ARRAY_CHOICES,
        Cell: ({ row }) => emptyCellOneLevel(row, 'modelo_name'),
      },
      {
        accessorKey: 'modelo_estado',
        header: 'MODELO ESTADO',
        size: TABLE_CONSTANTS.COLUMN_WIDTH_SMALL,
        enableColumnFilter: true,
        enableSorting: true,
        Cell: ({ row }) => {
          const str = row?.original?.modelo_estado
            ? row.original.modelo_estado
            : 'N/A';
          return (
            <ViewMoreTextModalTableCell
              longText={str}
              limit={27}
              modalTitle={`Estado del modelo ${row?.original?.modelo}`}
            />
          );
        },
      },
      {
        accessorKey: 'user__razon_social',
        header: 'USUARIO',
        size: TABLE_CONSTANTS.COLUMN_WIDTH_MEDIUM,
        Cell: ({ row }) => emptyCellNested(row, ['user_data', 'razon_social']),
      },

      {
        accessorKey: 'timestamp',
        header: 'TIMESTAMP',
        size: TABLE_CONSTANTS.COLUMN_WIDTH_MEDIUM,
        enableColumnFilter: false,
        enableSorting: false,
        Cell: ({ row }) => formatDateWithTimeCell(row, 'timestamp'),
      },

      {
        accessorKey: 'created_at',
        header: 'CREADO',
        size: TABLE_CONSTANTS.COLUMN_WIDTH_MEDIUM,
        enableColumnFilter: false,
        enableSorting: false,
        Cell: ({ row }) => formatDateWithTimeCell(row, 'created_at'),
      },
    ],
    [],
  );

  // table columns ---------------------
  const trazabilidadVentaColumns = useMemo<MRT_ColumnDef<TrazabilidadVenta>[]>(
    () => [...trazabilidadColumns01],
    [trazabilidadColumns01],
  );

  return {
    trazabilidadVentaColumns,
  };
};
