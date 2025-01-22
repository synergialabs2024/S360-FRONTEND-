import type { MRT_ColumnDef } from 'material-react-table';
import { useMemo } from 'react';

import { TABLE_CONSTANTS } from '@/shared/constants';
import { Transaccion } from '@/shared/interfaces';
import {
  emptyCellNested,
  emptyCellOneLevel,
  formatCurrency,
  formatCurrencyCell,
  formatDateWithTimeCell,
} from '@/shared/utils';
import { ClienteFibraTransaccionesActionBtnColumns } from '@/app/cliente/cliente/shared/components/fibra/rubros/tabs/transacciones';

export const useColumnsTransaccionesCliente = () => {
  const baseColumsActions = useMemo<MRT_ColumnDef<Transaccion>[]>(
    () => [
      {
        accessorKey: 'url_pdf',
        header: 'DOCUMENTOS',
        size: TABLE_CONSTANTS.COLUMN_WIDTH_MEDIUM,
        Cell: ({ row }) => {
          const facturaUrl = row.original?.rubro_data?.factura_data?.url_pdf;
          if (!facturaUrl) return '-';

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
        Cell: ({ row }) => {
          const rubro = row.original?.rubro_data;
          const factura = rubro?.factura_data;

          return factura?.numero || '-';
        },
      },
      {
        accessorKey: 'fecha_pago_rubro',
        header: 'FECHA PAGO',
        size: TABLE_CONSTANTS.COLUMN_WIDTH_MEDIUM,
        Cell: ({ row }) => {
          const rubro = row.original?.rubro_data;
          return rubro?.fecha_pago || '-';
        },
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
        accessorKey: 'metodo_pago__name',
        header: 'METODO PAGO',
        size: TABLE_CONSTANTS.COLUMN_WIDTH_MEDIUM,
        Cell: ({ row }) => emptyCellNested(row, ['metodo_pago_data', 'name']),
      },

      {
        accessorKey: 'id_switch',
        header: 'ID SWITCH',
        size: TABLE_CONSTANTS.COLUMN_WIDTH_MEDIUM,
        Cell: ({ row }) => emptyCellOneLevel(row, 'id_switch'),
      },
      {
        accessorKey: 'entidad_financiera',
        header: 'ENTIDAD FINANCIERA',
        size: TABLE_CONSTANTS.COLUMN_WIDTH_MEDIUM,
        Cell: ({ row }) => emptyCellOneLevel(row, 'entidad_financiera'),
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

  // main columns ----------------------
  const transaccionClienteTabColumns = useMemo<MRT_ColumnDef<Transaccion>[]>(
    () => [...baseColumsActions, ...baseColums01, ...auditColumns],
    [baseColumsActions, baseColums01, auditColumns],
  );

  return { transaccionClienteTabColumns };
};
