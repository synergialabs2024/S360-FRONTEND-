import type { MRT_ColumnDef } from 'material-react-table';
import { useMemo } from 'react';

import { ClienteFibraTransaccionesActionBtnColumns } from '@/app/cliente/cliente/shared/components/fibra/rubros/tabs/transacciones';
import { TABLE_CONSTANTS } from '@/shared/constants';
import { Transaccion } from '@/shared/interfaces';
import {
  emptyCellNested,
  emptyCellOneLevel,
  formatCurrency,
  formatCurrencyCell,
  formatDateWithTimeCell,
} from '@/shared/utils';

export const useColumnsTransaccionesCliente = () => {
  const baseColumsActions = useMemo<MRT_ColumnDef<Transaccion>[]>(
    () => [
      {
        accessorKey: 'url_pdf',
        header: 'ACCIONES',
        size: TABLE_CONSTANTS.COLUMN_WIDTH_MEDIUM,
        enableColumnFilter: false,
        enableSorting: false,
        Cell: ({ row }) => {
          const facturaUrl = row.original?.rubro_data?.factura_data?.url_pdf;
          if (!facturaUrl) return null;

          return (
            <ClienteFibraTransaccionesActionBtnColumns
              transaccion={row.original}
            />
          );
          // return <PDFIconButton url={facturaUrl} />;
        },
      },
    ],
    [],
  );

  const baseColums01 = useMemo<MRT_ColumnDef<Transaccion>[]>(
    () => [
      {
        accessorKey: 'factura',
        header: 'N° FACTURA',
        size: TABLE_CONSTANTS.COLUMN_WIDTH_MEDIUM,
        Cell: ({ row }) => emptyCellOneLevel(row, 'numero_transaccion'),
      },
      {
        accessorKey: 'fecha_pago_rubro',
        header: 'FECHA PAGO',
        size: TABLE_CONSTANTS.COLUMN_WIDTH_MEDIUM,
        Cell: ({ row }) => formatDateWithTimeCell(row, 'created_at'),
      },
      {
        accessorKey: 'monto',
        header: 'TOTAL PAGADO',
        size: TABLE_CONSTANTS.COLUMN_WIDTH_MEDIUM,
        Cell: ({ row }) => formatCurrencyCell(row, 'monto'),
      },
      {
        accessorKey: 'saldo',
        header: 'SALDO',
        size: TABLE_CONSTANTS.COLUMN_WIDTH_MEDIUM,
        enableColumnFilter: false,
        enableSorting: false,
        Cell: ({ row }) => {
          const saldo = row.original?.saldo_data;
          return saldo ? formatCurrency(saldo?.monto) : '0.00';
        },
      },

      {
        accessorKey: 'codigo_transaccion',
        header: 'CODIGO TRANSACCION',
        size: TABLE_CONSTANTS.COLUMN_WIDTH_MEDIUM,
        Cell: ({ row }) => emptyCellOneLevel(row, 'codigo_transaccion'),
      },
      {
        accessorKey: 'numero_transaccion',
        header: 'NUMERO TRANSACCION',
        size: TABLE_CONSTANTS.COLUMN_WIDTH_MEDIUM,
        Cell: ({ row }) => emptyCellOneLevel(row, 'numero_transaccion'),
      },

      {
        accessorKey: 'entidad_financiera__name',
        header: 'FORMA DE PAGO',
        size: TABLE_CONSTANTS.COLUMN_WIDTH_MEDIUM,
        Cell: ({ row }) =>
          emptyCellNested(row, ['entidad_financiera_data', 'name']),
      },

      {
        accessorKey: 'id_switch',
        header: 'ID SWITCH',
        size: TABLE_CONSTANTS.COLUMN_WIDTH_MEDIUM,
        Cell: ({ row }) => emptyCellOneLevel(row, 'id_switch'),
      },
    ],
    [],
  );

  const auditColumns = useMemo<MRT_ColumnDef<Transaccion>[]>(
    () => [
      {
        accessorKey: 'uuid',
        header: 'Identificador',
        size: TABLE_CONSTANTS.COLUMN_WIDTH_LARGE,
        Cell: ({ row }) => emptyCellOneLevel(row, 'uuid'),
      },
      {
        accessorKey: 'created_at',
        header: 'FECHA TRANSACCION',
        size: TABLE_CONSTANTS.COLUMN_WIDTH_MEDIUM,
        enableColumnFilter: false,
        enableSorting: false,
        Cell: ({ row }) => formatDateWithTimeCell(row, 'created_at'),
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

  const clienteDataTransaccionColumnsBase01 = useMemo<
    MRT_ColumnDef<Transaccion>[]
  >(
    () => [
      {
        accessorKey: 'cliente__razon_social',
        header: 'CLIENTE',
        size: TABLE_CONSTANTS.COLUMN_WIDTH_NAME,
        enableColumnFilter: true,
        enableSorting: true,
        Cell: ({ row }) =>
          emptyCellNested(row, ['cliente_data', 'razon_social']),
      },
      {
        accessorKey: 'cliente__identificacion',
        header: 'IDENTIFICACION',
        size: TABLE_CONSTANTS.COLUMN_WIDTH_MEDIUM,
        enableColumnFilter: true,
        enableSorting: true,
        Cell: ({ row }) =>
          emptyCellNested(row, ['cliente_data', 'identificacion']),
      },

      {
        accessorKey: 'contrato__numero_contrato',
        header: 'NUM CONTRATO',
        size: TABLE_CONSTANTS.COLUMN_WIDTH_MEDIUM,
        enableColumnFilter: true,
        enableSorting: true,
        Cell: ({ row }) =>
          emptyCellNested(row, ['contrato_data', 'numero_contrato']),
      },
      {
        accessorKey: 'contrato__identificacion_pago',
        header: 'IDENTIFICACION PAGO',
        size: TABLE_CONSTANTS.COLUMN_WIDTH_MEDIUM,
        Cell: ({ row }) =>
          emptyCellNested(row, ['contrato_data', 'identificacion_pago']),
      },
    ],
    [],
  );

  // main columns ----------------------
  const transaccionClienteTabColumns = useMemo<MRT_ColumnDef<Transaccion>[]>(
    () => [...baseColumsActions, ...baseColums01, ...auditColumns],
    [baseColumsActions, baseColums01, auditColumns],
  );

  const generalTransaccionesColumns = useMemo<MRT_ColumnDef<Transaccion>[]>(
    () => [
      ...baseColumsActions,
      ...clienteDataTransaccionColumnsBase01,
      ...baseColums01,
      ...auditColumns,
    ],
    [
      clienteDataTransaccionColumnsBase01,
      baseColumsActions,
      baseColums01,
      auditColumns,
    ],
  );

  return { transaccionClienteTabColumns, generalTransaccionesColumns };
};
