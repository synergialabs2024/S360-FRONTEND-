/* eslint-disable indent */
import type { MRT_ColumnDef, MRT_Row } from 'material-react-table';
import { useMemo } from 'react';

import { CustomRubroActionsBtn } from '@/app/cliente/cliente/shared/components/fibra/rubros/tabs/rurbos/btns';
import {
  ClienteFibraRubroChipState,
  ClienteFibraRubroInfoTableCell,
} from '@/app/cliente/cliente/shared/components/fibra/rubros/tabs/rurbos/tables';
import { TABLE_CONSTANTS } from '@/shared/constants';
import { type Rubro } from '@/shared/interfaces';
import {
  emptyCellOneLevel,
  formatCurrencyCell,
  formatDateWithTimeCell,
  formatDateWithTimeCellOnlyDate,
} from '@/shared/utils';

type UseColumnsRubrosCliente = {
  showNumberRubro?: boolean;
  showActionColumn?: boolean;
};

type MRTRubrosType = {
  row: MRT_Row<Rubro>;
};

export const useColumnsRubrosCliente = ({
  showNumberRubro = true,
  showActionColumn = false,
}: UseColumnsRubrosCliente = {}) => {
  // columns ----------------------
  const rubroColumnsBase01 = useMemo<MRT_ColumnDef<Rubro>[]>(
    () => [
      ...(showActionColumn
        ? [
            {
              accessorKey: 'action',
              enableColumnFilter: false,
              header: 'ACCIONES',
              size: TABLE_CONSTANTS.ACTIONCOLUMN_WIDTH,
              Cell: ({ row }: MRTRubrosType) => {
                const rubro = row.original;

                return <CustomRubroActionsBtn rubro={rubro} />;
              },
            },
          ]
        : []),
      {
        accessorKey: 'numero_referencia',
        header: 'NUM REFERENCIA',
        size: TABLE_CONSTANTS.COLUMN_WIDTH_MEDIUM,
        enableColumnFilter: true,
        enableSorting: true,
        Cell: ({ row }) => {
          const value = row?.original?.numero_referencia;
          if (!value) return '-';
          return <ClienteFibraRubroInfoTableCell rubro={row.original} />;
        },
      },

      ...(showNumberRubro
        ? [
            {
              accessorKey: 'numero_rubro',
              header: 'NUM RUBRO',
              size: TABLE_CONSTANTS.COLUMN_WIDTH_MEDIUM,
              enableColumnFilter: true,
              enableSorting: true,
              Cell: ({ row }: MRTRubrosType) =>
                emptyCellOneLevel(row, 'numero_rubro'),
            },
          ]
        : []),

      {
        accessorKey: 'tipo_rubro',
        header: 'TIPO',
        size: TABLE_CONSTANTS.COLUMN_WIDTH_MEDIUM,
        enableColumnFilter: true,
        enableSorting: true,
        Cell: ({ row }) => emptyCellOneLevel(row, 'tipo_rubro'),
      },

      {
        accessorKey: 'fecha_emision',
        header: 'EMISION',
        size: TABLE_CONSTANTS.COLUMN_WIDTH_MEDIUM,
        enableColumnFilter: true,
        enableSorting: true,
        Cell: ({ row }) => formatDateWithTimeCellOnlyDate(row, 'fecha_emision'),
      },
      {
        accessorKey: 'fecha_vencimiento',
        header: 'VENCIMIENTO',
        size: TABLE_CONSTANTS.COLUMN_WIDTH_MEDIUM,
        enableColumnFilter: true,
        enableSorting: true,
        Cell: ({ row }) =>
          formatDateWithTimeCellOnlyDate(row, 'fecha_vencimiento'),
      },

      {
        accessorKey: 'estado_rubro',
        header: 'ESTADO RUBRO',
        size: TABLE_CONSTANTS.COLUMN_WIDTH_MEDIUM,
        enableColumnFilter: true,
        enableSorting: true,
        Cell: ({ row }) => {
          const rubroState = row.original?.estado_rubro;
          return <ClienteFibraRubroChipState state={rubroState} />;
        },
      },
    ],
    [showActionColumn, showNumberRubro],
  );

  const rubroColumnsBase02Money = useMemo<MRT_ColumnDef<Rubro>[]>(
    () => [
      {
        accessorKey: 'valor_total',
        header: 'VALOR TOTAL',
        size: TABLE_CONSTANTS.COLUMN_WIDTH_MEDIUM,
        enableColumnFilter: true,
        enableSorting: true,
        Cell: ({ row }) => formatCurrencyCell(row, 'valor_total'),
      },
      {
        accessorKey: 'subtotal',
        header: 'SUBTOTAL',
        size: TABLE_CONSTANTS.COLUMN_WIDTH_MEDIUM,
        enableColumnFilter: true,
        enableSorting: true,
        Cell: ({ row }) => formatCurrencyCell(row, 'subtotal'),
      },
      {
        accessorKey: 'valor_taxes',
        header: 'VALOR TAXES',
        size: TABLE_CONSTANTS.COLUMN_WIDTH_MEDIUM,
        enableColumnFilter: true,
        enableSorting: true,
        Cell: ({ row }) => formatCurrencyCell(row, 'valor_taxes'),
      },

      {
        accessorKey: 'valor_pagado',
        header: 'VALOR PAGADO',
        size: TABLE_CONSTANTS.COLUMN_WIDTH_MEDIUM,
        enableColumnFilter: true,
        enableSorting: true,
        Cell: ({ row }) => formatCurrencyCell(row, 'valor_pagado'),
      },
      {
        accessorKey: 'fecha_pago',
        header: 'FECHA PAGO',
        size: TABLE_CONSTANTS.COLUMN_WIDTH_MEDIUM,
        enableColumnFilter: true,
        enableSorting: true,
        Cell: ({ row }) => {
          const value = row?.original?.fecha_pago;
          if (!value) return '-';
          return formatDateWithTimeCellOnlyDate(row, 'fecha_pago');
        },
      },
      {
        accessorKey: 'concepto',
        header: 'CONCEPTO',
        size: TABLE_CONSTANTS.COLUMN_WIDTH_NAME,
        enableColumnFilter: true,
        enableSorting: true,
        Cell: ({ row }) => emptyCellOneLevel(row, 'concepto'),
      },
    ],
    [],
  );

  const rubroColumnsBase03Audit = useMemo<MRT_ColumnDef<Rubro>[]>(
    () => [
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

  // actual columns ----------------------
  const columnsRubrosClientView = useMemo<MRT_ColumnDef<Rubro>[]>(
    () => [
      ...rubroColumnsBase01,
      ...rubroColumnsBase02Money,
      ...rubroColumnsBase03Audit,
    ],
    [rubroColumnsBase01, rubroColumnsBase02Money, rubroColumnsBase03Audit],
  );

  return { columnsRubrosClientView };
};
