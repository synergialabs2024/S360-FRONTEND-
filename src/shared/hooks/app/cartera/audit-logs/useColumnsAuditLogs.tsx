import { MRT_ColumnDef } from 'material-react-table';
import { useMemo } from 'react';

import {
  emptyCellNested,
  emptyCellOneLevel,
  formatDateWithTimeCell,
} from '@/shared/utils';
import { AuditLog } from '@/shared/interfaces';
import { TABLE_CONSTANTS } from '@/shared/constants';
import { ViewMoreTextModalTableCell } from '@/shared/components';

export const useColumnsAuditLogs = () => {
  const auditlogsBaseColumns01 = useMemo<MRT_ColumnDef<AuditLog>[]>(
    () => [
      {
        accessorKey: 'user__razon_social',
        header: 'NOMBRE USUARIO',
        size: TABLE_CONSTANTS.COLUMN_WIDTH_MEDIUM,
        Cell: ({ row }) => emptyCellNested(row, ['user_data', 'razon_social']),
      },
      {
        accessorKey: 'action',
        header: 'ACTION',
        size: TABLE_CONSTANTS.COLUMN_WIDTH_MEDIUM,
        enableColumnFilter: true,
        enableSorting: true,
        Cell: ({ row }) => emptyCellOneLevel(row, 'action'),
      },
      {
        accessorKey: 'description',
        header: 'DESCRIPCIÓN',
        size: TABLE_CONSTANTS.COLUMN_WIDTH_MEDIUM,
        enableColumnFilter: true,
        enableSorting: true,
        Cell: ({ row }) => {
          const str = row?.original?.description
            ? row.original.description
            : 'N/A';
          return (
            <ViewMoreTextModalTableCell
              longText={str}
              limit={27}
              modalTitle={`Descripcion de ${row?.original?.user_data.razon_social}`}
            />
          );
        },
      },
      {
        accessorKey: 'timestamp',
        header: 'MARCADOR DE TIEMPO',
        size: TABLE_CONSTANTS.COLUMN_WIDTH_MEDIUM,
        enableColumnFilter: false,
        enableSorting: false,
        Cell: ({ row }) => formatDateWithTimeCell(row, 'timestamp'),
      },
      {
        accessorKey: 'model_name',
        header: 'MODELO',
        size: TABLE_CONSTANTS.COLUMN_WIDTH_MEDIUM,
        enableColumnFilter: true,
        enableSorting: true,
        Cell: ({ row }) => emptyCellOneLevel(row, 'model_name'),
      },
      {
        accessorKey: 'content_type',
        header: 'TIPO CONTENIDO',
        size: TABLE_CONSTANTS.COLUMN_WIDTH_MEDIUM,
        enableColumnFilter: true,
        enableSorting: true,
        Cell: ({ row }) => emptyCellOneLevel(row, 'content_type'),
      },
    ],
    [],
  );

  const auditlogsColumns = useMemo<MRT_ColumnDef<AuditLog>[]>(
    () => [
      ...auditlogsBaseColumns01,
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
    [auditlogsBaseColumns01],
  );

  return {
    auditlogsColumns,
  };
};
