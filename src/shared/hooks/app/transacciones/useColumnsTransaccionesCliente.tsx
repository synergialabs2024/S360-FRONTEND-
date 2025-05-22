import type { MRT_ColumnDef } from 'material-react-table';
import { useMemo } from 'react';

import {
  formatCurrency,
  emptyCellNested,
  emptyCellOneLevel,
  formatCurrencyCell,
  formatDateWithTimeCell,
} from '@/shared/utils';
import { PDFIconButton } from '@/shared/components';
import { Rubro, Transaccion } from '@/shared/interfaces';
import { MODEL_BOOLEAN, TABLE_CONSTANTS } from '@/shared/constants';
import { ClienteFibraTransaccionesActionBtnColumns } from '@/app/cliente/cliente/shared/components/fibra/rubros/tabs/transacciones';

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
          const facturaUrl = row.original?.rubros_data;
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
      /*
      {
        accessorKey: 'created_at',
        header: 'CREADO',
        size: TABLE_CONSTANTS.COLUMN_WIDTH_MEDIUM,
        enableColumnFilter: false,
        enableSorting: false,
        Cell: ({ row }) => formatDateWithTimeCell(row, 'created_at'),
      },
      */
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

  const transaccionrubroColumns = useMemo<MRT_ColumnDef<Rubro>[]>(
    () => [
      {
        accessorKey: 'numero_referencia',
        header: 'NO REFERENCIA',
        size: TABLE_CONSTANTS.COLUMN_WIDTH_LARGE,
        Cell: ({ row }) => emptyCellOneLevel(row, 'numero_referencia'),
      },
      {
        accessorKey: 'numero_rubro',
        header: 'NO RUBRO',
        size: TABLE_CONSTANTS.COLUMN_WIDTH_SMALL,
        Cell: ({ row }) => emptyCellOneLevel(row, 'numero_rubro'),
      },
      {
        accessorKey: 'url_pdf',
        header: 'PDF',
        size: TABLE_CONSTANTS.COLUMN_WIDTH_MEDIUM,
        enableColumnFilter: false,
        enableSorting: false,
        Cell: ({ row }) => {
          const onPDF = !row.original.factura_data?.url_pdf;
          return (
            <PDFIconButton
              url={row.original.factura_data?.url_pdf!}
              disabled={onPDF}
            />
          );
        },
      },
      {
        accessorKey: 'url_xml',
        header: 'XML',
        size: TABLE_CONSTANTS.COLUMN_WIDTH_MEDIUM,
        enableColumnFilter: false,
        enableSorting: false,
        Cell: ({ row }) => {
          const onXML = !row.original.factura_data?.url_xml;
          return (
            <PDFIconButton
              url={row.original.factura_data?.url_xml!}
              isXml
              disabled={onXML}
            />
          );
        },
      },
      {
        accessorKey: 'concepto',
        header: 'CONCEPTO',
        size: TABLE_CONSTANTS.COLUMN_WIDTH_LARGE,
        Cell: ({ row }) => emptyCellOneLevel(row, 'concepto'),
      },
      {
        accessorKey: 'estado_rubro',
        header: 'ESTADO RUBRO',
        size: TABLE_CONSTANTS.COLUMN_WIDTH_SMALL,
        Cell: ({ row }) => emptyCellOneLevel(row, 'estado_rubro'),
      },
      {
        accessorKey: 'fecha_a_pagar',
        header: 'FECHA A PAGAR',
        size: TABLE_CONSTANTS.COLUMN_WIDTH_MEDIUM,
        enableColumnFilter: false,
        enableSorting: false,
        Cell: ({ row }) => formatDateWithTimeCell(row, 'fecha_a_pagar'),
      },
      {
        accessorKey: 'fecha_emision',
        header: 'FECHA EMISION',
        size: TABLE_CONSTANTS.COLUMN_WIDTH_MEDIUM,
        enableColumnFilter: false,
        enableSorting: false,
        Cell: ({ row }) => formatDateWithTimeCell(row, 'fecha_emision'),
      },
      {
        accessorKey: 'fecha_pago',
        header: 'FECHA PAGO',
        size: TABLE_CONSTANTS.COLUMN_WIDTH_MEDIUM,
        enableColumnFilter: false,
        enableSorting: false,
        Cell: ({ row }) => formatDateWithTimeCell(row, 'fecha_pago'),
      },
      {
        accessorKey: 'fecha_vencimiento',
        header: 'FECHA VENCIMIENTO',
        size: TABLE_CONSTANTS.COLUMN_WIDTH_MEDIUM,
        enableColumnFilter: false,
        enableSorting: false,
        Cell: ({ row }) => formatDateWithTimeCell(row, 'fecha_vencimiento'),
      },
      {
        accessorKey: 'generar_factura',
        header: 'GENERAR FACTURA',
        size: TABLE_CONSTANTS.COLUMN_WIDTH_MEDIUM,
        enableColumnFilter: false,
        enableSorting: false,
        filterVariant: 'select',
        filterSelectOptions: MODEL_BOOLEAN,
        Cell: ({ row }) => formatDateWithTimeCell(row, 'generar_factura'),
      },
      {
        accessorKey: 'ifi',
        header: 'IFI',
        size: TABLE_CONSTANTS.COLUMN_WIDTH_SMALL,
        Cell: ({ row }) => emptyCellOneLevel(row, 'ifi'),
      },
      {
        accessorKey: 'subtotal',
        header: 'SUBTOTAL',
        size: TABLE_CONSTANTS.COLUMN_WIDTH_SMALL,
        Cell: ({ row }) => emptyCellOneLevel(row, 'subtotal'),
      },
      {
        accessorKey: 'tipo_rubro',
        header: 'tipo rubro',
        size: TABLE_CONSTANTS.COLUMN_WIDTH_SMALL,
        Cell: ({ row }) => emptyCellOneLevel(row, 'tipo_rubro'),
      },
      {
        accessorKey: 'valor_factura',
        header: 'VALOR FACTURA',
        size: TABLE_CONSTANTS.COLUMN_WIDTH_SMALL,
        Cell: ({ row }) => emptyCellOneLevel(row, 'valor_factura'),
      },
      {
        accessorKey: 'valor_ice',
        header: 'VALOR ICE',
        size: TABLE_CONSTANTS.COLUMN_WIDTH_SMALL,
        Cell: ({ row }) => emptyCellOneLevel(row, 'valor_ice'),
      },
      {
        accessorKey: 'valor_pagado',
        header: 'VALOR PAGADO',
        size: TABLE_CONSTANTS.COLUMN_WIDTH_SMALL,
        Cell: ({ row }) => emptyCellOneLevel(row, 'valor_pagado'),
      },
      {
        accessorKey: 'valor_taxes',
        header: 'VALOR TAXES',
        size: TABLE_CONSTANTS.COLUMN_WIDTH_SMALL,
        Cell: ({ row }) => emptyCellOneLevel(row, 'valor_taxes'),
      },
      {
        accessorKey: 'valor_total',
        header: 'VALOR TOTAL',
        size: TABLE_CONSTANTS.COLUMN_WIDTH_SMALL,
        Cell: ({ row }) => emptyCellOneLevel(row, 'valor_total'),
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

  return {
    transaccionClienteTabColumns,
    generalTransaccionesColumns,
    transaccionrubroColumns,
  };
};
