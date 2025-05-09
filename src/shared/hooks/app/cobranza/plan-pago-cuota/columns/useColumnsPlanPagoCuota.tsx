import { useMemo } from 'react';
import { MRT_ColumnDef } from 'material-react-table';

import { MODEL_STATE_BOOLEAN, TABLE_CONSTANTS } from '@/shared/constants';
import {
  emptyCellNested,
  emptyCellOneLevel,
  formatBooleanCell,
  formatDateWithTimeCell,
} from '@/shared/utils';
import { PlanPagoCuota } from '@/shared/interfaces';
import ShowPlanPagoCuotaModal from '../modal/ShowPlanPagoCuotaModal';

export interface PlanPagoCuotaShow {
  codigo: string;
  precio: string;
  cantidad: string;
  num_cuotas: string;
  descripcion: string;
  line_subtotal: string;
  producto_data: string[];
}

export const useColumnsPlanPagoCuota = () => {
  const planpagocuotaBaseColumns = useMemo<MRT_ColumnDef<PlanPagoCuota>[]>(
    () => [
      {
        accessorKey: 'linea_servicio__cliente__identificacion',
        header: 'IDENTIFICACION',
        size: TABLE_CONSTANTS.COLUMN_WIDTH_MEDIUM,
        Cell: ({ row }) =>
          emptyCellNested(row, [
            'linea_servicio_data',
            'cliente_data',
            'identificacion',
          ]),
      },
      {
        accessorKey: 'linea_servicio__cliente__razon_social',
        header: 'NOMBRES',
        size: TABLE_CONSTANTS.COLUMN_WIDTH_MEDIUM,
        Cell: ({ row }) =>
          emptyCellNested(row, [
            'linea_servicio_data',
            'cliente_data',
            'razon_social',
          ]),
      },
      {
        accessorKey: 'linea_servicio__contrato__numero_contrato',
        header: 'NUMERO CONTRATO',
        size: TABLE_CONSTANTS.COLUMN_WIDTH_MEDIUM,
        Cell: ({ row }) =>
          emptyCellNested(row, [
            'linea_servicio_data',
            'contrato_data',
            'numero_contrato',
          ]),
      },
      {
        accessorKey: 'detalle',
        header: 'DETALLE',
        enableColumnFilter: false,
        size: TABLE_CONSTANTS.COLUMN_WIDTH_SMALL,
        Cell: ({ row }) => {
          return <ShowPlanPagoCuotaModal Arrays={row.original.detalle} />;
        },
      },
      {
        accessorKey: 'linea_servicio__cliente__tipo_identificacion',
        header: 'TIPO IDENT.',
        size: TABLE_CONSTANTS.COLUMN_WIDTH_MEDIUM,
        Cell: ({ row }) =>
          emptyCellNested(row, [
            'linea_servicio_data',
            'cliente_data',
            'tipo_identificacion',
          ]),
      },
      {
        accessorKey: 'linea_servicio__contrato__tipo_servicio',
        header: 'TIPO SERVICIO',
        size: TABLE_CONSTANTS.COLUMN_WIDTH_MEDIUM,
        Cell: ({ row }) =>
          emptyCellNested(row, [
            'linea_servicio_data',
            'contrato_data',
            'tipo_servicio',
          ]),
      },
      {
        accessorKey: 'linea_servicio__contrato__tipo_plan',
        header: 'TIPO SERVICIO',
        size: TABLE_CONSTANTS.COLUMN_WIDTH_MEDIUM,
        Cell: ({ row }) =>
          emptyCellNested(row, [
            'linea_servicio_data',
            'contrato_data',
            'tipo_plan',
          ]),
      },

      {
        accessorKey: 'estado_deuda',
        header: 'ESTADO DEUDA',
        size: TABLE_CONSTANTS.COLUMN_WIDTH_MEDIUM,
        Cell: ({ row }) => emptyCellOneLevel(row, 'estado_deuda'),
      },
      {
        accessorKey: 'total_cuotas',
        header: 'TOTAL CUOTAS',
        size: TABLE_CONSTANTS.COLUMN_WIDTH_MEDIUM,
        Cell: ({ row }) => emptyCellOneLevel(row, 'total_cuotas'),
      },
      {
        accessorKey: 'monto_total',
        header: 'MONTO TOTAL',
        size: TABLE_CONSTANTS.COLUMN_WIDTH_MEDIUM,
        Cell: ({ row }) => emptyCellOneLevel(row, 'monto_total'),
      },
    ],
    [],
  );
  const planpagocuotaShowColumns = useMemo<MRT_ColumnDef<PlanPagoCuotaShow>[]>(
    () => [
      {
        accessorKey: 'rubro',
        header: 'RUBRO',
        size: TABLE_CONSTANTS.COLUMN_WIDTH_MEDIUM,
        Cell: ({ row }) => emptyCellOneLevel(row, 'rubro'),
      },
      {
        accessorKey: 'state',
        header: 'ESTADO',
        size: TABLE_CONSTANTS.COLUMN_WIDTH_MEDIUM,
        enableColumnFilter: true,
        enableSorting: true,
        filterVariant: 'select',
        filterSelectOptions: MODEL_STATE_BOOLEAN,
        Cell: ({ row }) => formatBooleanCell(row, 'state'),
      },
      {
        accessorKey: 'removible',
        header: 'ES REMOVIBLE',
        size: TABLE_CONSTANTS.COLUMN_WIDTH_MEDIUM,
        enableColumnFilter: true,
        enableSorting: true,
        filterVariant: 'select',
        filterSelectOptions: MODEL_STATE_BOOLEAN,
        Cell: ({ row }) => formatBooleanCell(row, 'removible'),
      },
      {
        accessorKey: 'cantidad',
        header: 'CANTIDAD',
        size: TABLE_CONSTANTS.COLUMN_WIDTH_MEDIUM,
        Cell: ({ row }) => emptyCellOneLevel(row, 'cantidad'),
      },
      {
        accessorKey: 'impuesto',
        header: 'IMPUESTO',
        size: TABLE_CONSTANTS.COLUMN_WIDTH_MEDIUM,
        Cell: ({ row }) => emptyCellOneLevel(row, 'impuesto'),
      },
      {
        accessorKey: 'producto',
        header: 'PRODUCTO',
        size: TABLE_CONSTANTS.COLUMN_WIDTH_MEDIUM,
        Cell: ({ row }) => emptyCellOneLevel(row, 'producto'),
      },
      {
        accessorKey: 'valor_base',
        header: 'VALOR BASE',
        size: TABLE_CONSTANTS.COLUMN_WIDTH_MEDIUM,
        Cell: ({ row }) => emptyCellOneLevel(row, 'valor_base'),
      },
      {
        accessorKey: 'default_iva',
        header: 'IVA POR DEFECTO',
        size: TABLE_CONSTANTS.COLUMN_WIDTH_MEDIUM,
        Cell: ({ row }) => emptyCellOneLevel(row, 'default_iva'),
      },
      {
        accessorKey: 'descripcion',
        header: 'DESCRIPCION',
        size: TABLE_CONSTANTS.COLUMN_WIDTH_MEDIUM,
        Cell: ({ row }) => emptyCellOneLevel(row, 'descripcion'),
      },
      {
        accessorKey: 'tipo_rubro_item',
        header: 'TIPO RUBRO ITEM',
        size: TABLE_CONSTANTS.COLUMN_WIDTH_MEDIUM,
        Cell: ({ row }) => emptyCellOneLevel(row, 'tipo_rubro_item'),
      },
    ],
    [],
  );

  const planPagoMaterialColumns = useMemo<MRT_ColumnDef<PlanPagoCuota>[]>(
    () => [
      ...planpagocuotaBaseColumns,
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
    [planpagocuotaBaseColumns],
  );
  return {
    planPagoMaterialColumns,
    planpagocuotaShowColumns,
  };
};
