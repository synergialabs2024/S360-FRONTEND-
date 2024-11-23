import type { MRT_ColumnDef, MRT_Row } from 'material-react-table';
import { useMemo } from 'react';

import {
  SalesStatesActionsEnumChoice,
  TABLE_CONSTANTS,
} from '@/shared/constants';
import { Agendamiento } from '@/shared/interfaces';
import {
  emptyCellNested,
  emptyCellOneLevel,
  formatDateWithTime,
  formatDateWithTimeCell,
} from '@/shared/utils';

type MRTAgendamientoType = { row: MRT_Row<Agendamiento> };

export const useColumnsAgendamientos = () => {
  const agendaBase01 = useMemo<MRT_ColumnDef<Agendamiento>[]>(
    () => [
      {
        accessorKey: 'numero_referencia',
        header: 'NUMERO REFERENCIA',
        size: TABLE_CONSTANTS.COLUMN_WIDTH_MEDIUM,
        enableColumnFilter: true,
        enableSorting: true,
        Cell: ({ row }) => emptyCellOneLevel(row, 'numero_referencia'),
      },
      {
        accessorKey: 'solicitud_servicio__tipo_identificacion',
        header: 'TIPO IDENTIFICACION',
        size: TABLE_CONSTANTS.COLUMN_WIDTH_MEDIUM,
        enableColumnFilter: true,
        enableSorting: true,
        Cell: ({ row }) =>
          emptyCellNested(row, [
            'solicitud_servicio_data',
            'tipo_identificacion',
          ]),
      },
      {
        accessorKey: 'solicitud_servicio__identificacion',
        header: 'IDENTIFICACION',
        size: TABLE_CONSTANTS.COLUMN_WIDTH_MEDIUM,
        enableColumnFilter: true,
        enableSorting: true,
        Cell: ({ row }) =>
          emptyCellNested(row, ['solicitud_servicio_data', 'identificacion']),
      },
      {
        accessorKey: 'solicitud_servicio__razon_social',
        header: 'NOMBRES',
        size: 312,
        enableColumnFilter: true,
        enableSorting: true,
        Cell: ({ row }) =>
          emptyCellNested(row, ['solicitud_servicio_data', 'razon_social']),
      },
      {
        accessorKey: 'codigo',
        header: 'CODIGO',
        size: TABLE_CONSTANTS.COLUMN_WIDTH_MEDIUM,
        enableColumnFilter: true,
        enableSorting: true,
        Cell: ({ row }) => emptyCellOneLevel(row, 'codigo'),
      },
    ],
    [],
  );

  const agendaBase02 = useMemo<MRT_ColumnDef<Agendamiento>[]>(
    () => [
      {
        accessorKey: 'fecha_instalacion',
        header: 'FECHA INSTALACION',
        size: TABLE_CONSTANTS.COLUMN_WIDTH_MEDIUM,
        enableColumnFilter: true,
        enableSorting: true,
        Cell: ({ row }) => emptyCellOneLevel(row, 'fecha_instalacion'),
      },
      {
        accessorKey: 'hora_instalacion',
        header: 'HORA INSTALACION',
        size: TABLE_CONSTANTS.COLUMN_WIDTH_MEDIUM,
        enableColumnFilter: true,
        enableSorting: true,
        Cell: ({ row }) => emptyCellOneLevel(row, 'hora_instalacion'),
      },
      {
        accessorKey: 'distancia_nap',
        header: 'DISTANCIA NAP',
        size: TABLE_CONSTANTS.COLUMN_WIDTH_MEDIUM,
        enableColumnFilter: true,
        enableSorting: true,
        Cell: ({ row }) => emptyCellOneLevel(row, 'distancia_nap'),
      },
      {
        accessorKey: 'descripcion_pago',
        header: 'DESCRIPCION PAGO',
        size: TABLE_CONSTANTS.COLUMN_WIDTH_MEDIUM,
        enableColumnFilter: true,
        enableSorting: true,
        Cell: ({ row }) => emptyCellOneLevel(row, 'descripcion_pago'),
      },

      {
        accessorKey: 'estado_pago',
        header: 'ESTADO PAGO',
        size: TABLE_CONSTANTS.COLUMN_WIDTH_MEDIUM,
        enableColumnFilter: true,
        enableSorting: true,
        Cell: ({ row }) => emptyCellOneLevel(row, 'estado_pago'),
      },
      {
        accessorKey: 'estado_agendamiento',
        header: 'ESTADO AGENDAMIENTO',
        size: TABLE_CONSTANTS.COLUMN_WIDTH_MEDIUM,
        enableColumnFilter: true,
        enableSorting: true,
        Cell: ({ row }) => emptyCellOneLevel(row, 'estado_agendamiento'),
      },
      {
        accessorKey: 'encuesta',
        header: 'ENCUESTA',
        size: TABLE_CONSTANTS.COLUMN_WIDTH_MEDIUM,
        enableColumnFilter: true,
        enableSorting: true,
        Cell: ({ row }) => emptyCellOneLevel(row, 'encuesta'),
      },

      {
        accessorKey: 'usos',
        header: 'USOS',
        size: TABLE_CONSTANTS.COLUMN_WIDTH_MEDIUM,
        enableColumnFilter: true,
        enableSorting: true,
        Cell: ({ row }) => emptyCellOneLevel(row, 'usos'),
      },
      {
        accessorKey: 'observaciones_vendedor',
        header: 'OBSERVACIONES VENDEDOR',
        size: TABLE_CONSTANTS.COLUMN_WIDTH_MEDIUM,
        enableColumnFilter: true,
        enableSorting: true,
        Cell: ({ row }) => emptyCellOneLevel(row, 'observaciones_vendedor'),
      },
      {
        accessorKey: 'observacion_rechazo',
        header: 'OBSERVACION RECHAZO',
        size: TABLE_CONSTANTS.COLUMN_WIDTH_MEDIUM,
        enableColumnFilter: true,
        enableSorting: true,
        Cell: ({ row }) => emptyCellOneLevel(row, 'observacion_rechazo'),
      },

      {
        accessorKey: 'numero_comprobante',
        header: 'NUMERO COMPROBANTE',
        size: TABLE_CONSTANTS.COLUMN_WIDTH_MEDIUM,
        enableColumnFilter: true,
        enableSorting: true,
        Cell: ({ row }) => emptyCellOneLevel(row, 'numero_comprobante'),
      },
    ],
    [],
  );

  const agendaBase03 = useMemo<MRT_ColumnDef<Agendamiento>[]>(
    () => [
      {
        accessorKey: 'flota__flota',
        header: 'FLOTA',
        size: TABLE_CONSTANTS.COLUMN_WIDTH_MEDIUM,
        enableColumnFilter: true,
        enableSorting: true,
        Cell: ({ row }) => emptyCellNested(row, ['flota_data', 'name']),
      },

      {
        accessorKey: 'nap__nap',
        header: 'NAP',
        size: TABLE_CONSTANTS.COLUMN_WIDTH_MEDIUM,
        enableColumnFilter: true,
        enableSorting: true,
        Cell: ({ row }) => emptyCellNested(row, ['nap_data', 'name']),
      },
      {
        accessorKey: 'preventa__tipo_plan',
        header: 'LINEA SERVICIO',
        size: 312,
        enableColumnFilter: true,
        enableSorting: true,
        Cell: ({ row }) => emptyCellNested(row, ['preventa_data', 'tipo_plan']),
      },
      {
        accessorKey: 'preventa__tipo_servicio',
        header: 'LINEA SERVICIO',
        size: 312,
        enableColumnFilter: true,
        enableSorting: true,
        Cell: ({ row }) =>
          emptyCellNested(row, ['preventa_data', 'tipo_servicio']),
      },

      {
        accessorKey: 'vendedor__vendedor',
        header: 'VENDEDOR',
        size: TABLE_CONSTANTS.COLUMN_WIDTH_MEDIUM,
        enableColumnFilter: true,
        enableSorting: true,
        Cell: ({ row }) =>
          emptyCellNested(row, ['vendedor_data', 'razon_social']),
      },
    ],
    [],
  );

  const agendaEspera = useMemo<MRT_ColumnDef<Agendamiento>[]>(
    () => [
      ...agendaBase01,
      ...agendaBase02,
      ...agendaBase03,
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
    [agendaBase01, agendaBase02, agendaBase03],
  );

  const agendaEsperaRecooordinacion = useMemo<MRT_ColumnDef<Agendamiento>[]>(
    () => [
      ...agendaBase01,
      ...agendaBase02,
      ...agendaBase03,
      {
        accessorKey: 'razon_social__espera_recoordinacion_agendamiento',
        header: 'ESPERA RECORDINADA POR',
        size: TABLE_CONSTANTS.COLUMN_WIDTH_LARGE,
        Cell: ({ row }: MRTAgendamientoType) => {
          const trazabilidad = row.original?.trazabilidad_data?.find(
            item =>
              item?.modelo_estado ===
              SalesStatesActionsEnumChoice.AGENDAMIENTO__RECOORDINADO_ESPERA,
          );

          return trazabilidad?.user_data?.razon_social || 'N/A';
        },
      },
      {
        accessorKey: 'fecha_espera_recoordinada',
        header: 'FECHA ESPERA RECOORDINADA',
        enableColumnFilter: false,
        size: TABLE_CONSTANTS.COLUMN_WIDTH_MEDIUM,
        Cell: ({ row }: MRTAgendamientoType) => {
          const trazabilidad = row.original?.trazabilidad_data?.find(
            item =>
              item?.modelo_estado ===
              SalesStatesActionsEnumChoice.AGENDAMIENTO__RECOORDINADO_ESPERA,
          );

          return trazabilidad
            ? formatDateWithTime(trazabilidad?.timestamp)
            : 'N/A';
        },
      },
    ],
    [agendaBase01, agendaBase02, agendaBase03],
  );

  const agendaRecoordinados = useMemo<MRT_ColumnDef<Agendamiento>[]>(
    () => [
      ...agendaBase01,
      ...agendaBase02,
      ...agendaBase03,
      {
        accessorKey: 'razon_social__recoordinacion_agendamiento',
        header: 'RECORDINADA POR',
        size: TABLE_CONSTANTS.COLUMN_WIDTH_LARGE,
        Cell: ({ row }: MRTAgendamientoType) => {
          const trazabilidad = row.original?.trazabilidad_data?.find(
            item =>
              item?.modelo_estado ===
              SalesStatesActionsEnumChoice.AGENDAMIENTO__RECOORDINADO_APROBADO,
          );

          return trazabilidad?.user_data?.razon_social || 'N/A';
        },
      },
      {
        accessorKey: 'fecha_recoordinada',
        header: 'FECHA RECOORDINADA',
        enableColumnFilter: false,
        size: TABLE_CONSTANTS.COLUMN_WIDTH_MEDIUM,
        Cell: ({ row }: MRTAgendamientoType) => {
          const trazabilidad = row.original?.trazabilidad_data?.find(
            item =>
              item?.modelo_estado ===
              SalesStatesActionsEnumChoice.AGENDAMIENTO__RECOORDINADO_APROBADO,
          );

          return trazabilidad
            ? formatDateWithTime(trazabilidad?.timestamp)
            : 'N/A';
        },
      },
    ],
    [agendaBase01, agendaBase02, agendaBase03],
  );

  return {
    agendaEspera,
    agendaEsperaRecooordinacion,
    agendaRecoordinados,
  };
};
