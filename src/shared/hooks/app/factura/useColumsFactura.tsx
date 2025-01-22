import { type MRT_ColumnDef } from 'material-react-table';
import { useMemo } from 'react';

import { TABLE_CONSTANTS } from '@/shared/constants';
import { Factura } from '@/shared/interfaces';
import { emptyCellOneLevel, formatDateWithTimeCell } from '@/shared/utils';

export const useColumsFactura = () => {
  const columnsBase = useMemo<MRT_ColumnDef<Factura>[]>(
    () => [
      {
        accessorKey: 'fecha_emision',
        header: 'FECHA EMISION',
        size: TABLE_CONSTANTS.COLUMN_WIDTH_MEDIUM,
        Cell: ({ row }) => emptyCellOneLevel(row, 'fecha_emision'),
      },

      {
        accessorKey: 'url_pdf',
        header: 'URL PDF',
        size: TABLE_CONSTANTS.COLUMN_WIDTH_MEDIUM,
        Cell: ({ row }) => emptyCellOneLevel(row, 'url_pdf'),
      },

      {
        accessorKey: 'url_xml',
        header: 'URL XML',
        size: TABLE_CONSTANTS.COLUMN_WIDTH_MEDIUM,
        Cell: ({ row }) => emptyCellOneLevel(row, 'url_xml'),
      },

      {
        accessorKey: 'total',
        header: 'TOTAL',
        size: TABLE_CONSTANTS.COLUMN_WIDTH_MEDIUM,
        Cell: ({ row }) => emptyCellOneLevel(row, 'total'),
      },

      {
        accessorKey: 'clave_acceso',
        header: 'CLAVE ACCESO',
        size: TABLE_CONSTANTS.COLUMN_WIDTH_MEDIUM,
        Cell: ({ row }) => emptyCellOneLevel(row, 'clave_acceso'),
      },

      {
        accessorKey: 'numero',
        header: 'NUMERO',
        size: TABLE_CONSTANTS.COLUMN_WIDTH_MEDIUM,
        Cell: ({ row }) => emptyCellOneLevel(row, 'numero'),
      },
    ],
    [],
  );

  const auditColumns = useMemo<MRT_ColumnDef<Factura>[]>(
    () => [
      {
        accessorKey: 'uuid',
        header: 'UUID',
        size: TABLE_CONSTANTS.COLUMN_WIDTH_MEDIUM,
        Cell: ({ row }) => emptyCellOneLevel(row, 'uuid'),
      },

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
    [],
  );

  /// main columns ----------------------
  const facturasGenericColumns = useMemo<MRT_ColumnDef<Factura>[]>(
    () => [...columnsBase, ...auditColumns],
    [columnsBase, auditColumns],
  );

  return { facturasGenericColumns };
};
