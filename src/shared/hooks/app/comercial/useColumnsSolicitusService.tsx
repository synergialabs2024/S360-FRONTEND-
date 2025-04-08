/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable indent */
import type { MRT_ColumnDef, MRT_Row } from 'material-react-table';
import { useMemo } from 'react';

import {
  SalesStatesActionsEnumChoice,
  UserRolesEnumChoice,
} from '@/shared/constants';
import { TABLE_CONSTANTS } from '@/shared/constants/ui';
import type { SolicitudServicio } from '@/shared/interfaces';
import {
  emptyCellNested,
  emptyCellOneLevel,
  formatBooleanCell,
  formatDateWithTime,
  formatDateWithTimeCell,
} from '@/shared/utils';
import { useAuthStore } from '@/store/auth';

type UseColumnsSolicitusServiceProps = {
  imageModalTitle?: string;
};

type MRTSServiceType = { row: MRT_Row<SolicitudServicio> };

export const useColumnsSolicitusService = (
  _props?: UseColumnsSolicitusServiceProps,
) => {
  const isSalesman =
    useAuthStore(s => s.user?.role) === UserRolesEnumChoice.AGENTE;

  const solicitudServicioBase01 = useMemo<MRT_ColumnDef<SolicitudServicio>[]>(
    () => [
      {
        accessorKey: 'numero_referencia',
        header: 'NUMERO REFERENCIA',
        size: 180,
        enableColumnFilter: true,
        enableSorting: true,
        Cell: ({ row }: MRTSServiceType) =>
          emptyCellOneLevel(row, 'numero_referencia'),
      },
      {
        accessorKey: 'identificacion',
        header: 'IDENTIFICACION',
        size: 180,
        enableColumnFilter: true,
        enableSorting: true,
        Cell: ({ row }: MRTSServiceType) =>
          emptyCellOneLevel(row, 'identificacion'),
      },
      {
        accessorKey: 'tipo_identificacion',
        header: 'TIPO IDENTIFICACION',
        size: TABLE_CONSTANTS.COLUMN_WIDTH_MEDIUM,
        enableColumnFilter: true,
        enableSorting: true,
        Cell: ({ row }: MRTSServiceType) =>
          emptyCellOneLevel(row, 'tipo_identificacion'),
      },
      {
        accessorKey: 'razon_social',
        header: 'NOMBRES',
        size: 312,
        enableColumnFilter: true,
        enableSorting: true,
        Cell: ({ row }: MRTSServiceType) =>
          emptyCellOneLevel(row, 'razon_social'),
      },
      {
        accessorKey: 'codigo',
        header: 'CODIGO',
        size: TABLE_CONSTANTS.COLUMN_WIDTH_SMALL,
        enableColumnFilter: true,
        enableSorting: true,
        Cell: ({ row }: MRTSServiceType) => emptyCellOneLevel(row, 'codigo'),
      },
      {
        accessorKey: 'vendedor__razon_social',
        header: 'VENDEDOR',
        size: TABLE_CONSTANTS.COLUMN_WIDTH_LARGE,
        enableColumnFilter: false,
        Cell: ({ row }: MRTSServiceType) =>
          emptyCellNested(row, ['vendedor_data', 'razon_social']),
      },

      // only supervisor to top
      ...(isSalesman
        ? []
        : [
            {
              accessorKey: 'celular',
              header: 'CELULAR',
              size: TABLE_CONSTANTS.COLUMN_WIDTH_MEDIUM,
              enableColumnFilter: true,
              enableSorting: true,
              Cell: ({ row }: MRTSServiceType) =>
                emptyCellOneLevel(row, 'celular'),
            },
            {
              accessorKey: 'email',
              header: 'EMAIL',
              size: TABLE_CONSTANTS.COLUMN_WIDTH_MEDIUM,
              enableColumnFilter: true,
              enableSorting: true,
              Cell: ({ row }: MRTSServiceType) =>
                emptyCellOneLevel(row, 'email'),
            },
            {
              accessorKey: 'direccion',
              header: 'DIRECCION',
              size: TABLE_CONSTANTS.COLUMN_WIDTH_MEDIUM,
              enableColumnFilter: true,
              enableSorting: true,
              Cell: ({ row }: MRTSServiceType) =>
                emptyCellOneLevel(row, 'direccion'),
            },
            {
              accessorKey: 'coordenadas',
              header: 'COORDENADAS',
              size: TABLE_CONSTANTS.COLUMN_WIDTH_MEDIUM,
              enableColumnFilter: true,
              enableSorting: true,
              Cell: ({ row }: MRTSServiceType) =>
                emptyCellOneLevel(row, 'coordenadas'),
            },
          ]),

      {
        accessorKey: 'es_discapacitado',
        header: 'ES DISCAPACITADO',
        size: TABLE_CONSTANTS.COLUMN_WIDTH_MEDIUM,
        enableColumnFilter: true,
        enableSorting: true,
        Cell: ({ row }: MRTSServiceType) =>
          formatBooleanCell(row, 'es_discapacitado'),
      },
      {
        accessorKey: 'es_tercera_edad',
        header: 'ES TERCERA EDAD',
        size: TABLE_CONSTANTS.COLUMN_WIDTH_MEDIUM,
        enableColumnFilter: true,
        enableSorting: true,
        Cell: ({ row }: MRTSServiceType) =>
          formatBooleanCell(row, 'es_tercera_edad'),
      },
      {
        accessorKey: 'es_cliente',
        header: 'ES CLIENTE',
        size: TABLE_CONSTANTS.COLUMN_WIDTH_MEDIUM,
        enableColumnFilter: true,
        enableSorting: true,
        Cell: ({ row }: MRTSServiceType) =>
          formatBooleanCell(row, 'es_cliente'),
      },
      {
        accessorKey: 'tiene_cobertura',
        header: 'TIENE COBERTURA',
        size: TABLE_CONSTANTS.COLUMN_WIDTH_MEDIUM,
        enableColumnFilter: true,
        enableSorting: true,
        Cell: ({ row }: MRTSServiceType) =>
          formatBooleanCell(row, 'tiene_cobertura'),
      },
    ],
    [isSalesman],
  );
  const solServiceTrazoSinGestion = useMemo<MRT_ColumnDef<SolicitudServicio>[]>(
    () => [
      ...(isSalesman
        ? []
        : [
            {
              accessorKey: 'vendedor_solicita_desbloqueo',
              header: 'SOICITO DESBLOQUEO',
              size: TABLE_CONSTANTS.COLUMN_WIDTH_LARGE,
              enableColumnFilter: false,
              Cell: ({ row }: MRTSServiceType) => {
                const trazabilidad = row.original?.trazabilidad_data?.find(
                  item =>
                    item?.modelo_estado ===
                    SalesStatesActionsEnumChoice.SOLICITUD_DESBLOQUEO_ESPERA,
                );
                const message =
                  `${trazabilidad?.user_data?.razon_social} | ${formatDateWithTime(
                    trazabilidad?.timestamp,
                  )}` || 'N/A';

                return message;
              },
            },
            {
              accessorKey: 'admin_aprueba_desbloqueo',
              header: 'APRUEBA DESBLOQUEO',
              size: TABLE_CONSTANTS.COLUMN_WIDTH_LARGE,
              enableColumnFilter: false,
              Cell: ({ row }: MRTSServiceType) => {
                const trazabilidad = row.original?.trazabilidad_data?.find(
                  item =>
                    item?.modelo_estado ===
                    SalesStatesActionsEnumChoice.SOLICITUD_DESBLOQUEO_APROBADO,
                );
                const message =
                  `${trazabilidad?.user_data?.razon_social} | ${formatDateWithTime(
                    trazabilidad?.timestamp,
                  )}` || 'N/A';

                return message;
              },
            },
          ]),

      ...(isSalesman
        ? []
        : [
            {
              accessorKey: 'modified_at',
              header: 'MODIFICADO',
              size: TABLE_CONSTANTS.COLUMN_WIDTH_MEDIUM,
              enableColumnFilter: false,
              enableSorting: false,
              Cell: ({ row }: MRTSServiceType) =>
                formatDateWithTimeCell(row, 'modified_at'),
            },
          ]),
    ],
    [isSalesman],
  );
  const solServiceCreatedAt = useMemo<MRT_ColumnDef<SolicitudServicio>[]>(
    () => [
      {
        accessorKey: 'created_at',
        header: 'INGRESADO',
        size: TABLE_CONSTANTS.COLUMN_WIDTH_MEDIUM,
        enableColumnFilter: false,
        enableSorting: false,
        Cell: ({ row }: MRTSServiceType) =>
          formatDateWithTimeCell(row, 'created_at'),
      },
    ],
    [],
  );

  const solicitudServicioBase = useMemo<MRT_ColumnDef<SolicitudServicio>[]>(
    () => [...solicitudServicioBase01, ...solServiceCreatedAt],
    [solServiceCreatedAt, solicitudServicioBase01],
  );

  const solicitudServicioWithoutGestion = useMemo<
    MRT_ColumnDef<SolicitudServicio>[]
  >(
    () => [
      ...solicitudServicioBase01,
      ...solServiceTrazoSinGestion,
      ...solServiceCreatedAt,
    ],
    [solServiceCreatedAt, solServiceTrazoSinGestion, solicitudServicioBase01],
  );

  const solicitudServicioFinalizadas = useMemo<
    MRT_ColumnDef<SolicitudServicio>[]
  >(
    () => [
      ...solicitudServicioBase01,
      ...solServiceCreatedAt,
      {
        accessorKey: 'razon_social__finaliza_sol_serv',
        header: 'FINALIZADO POR',
        size: TABLE_CONSTANTS.COLUMN_WIDTH_LARGE,
        Cell: ({ row }: MRTSServiceType) => {
          const trazabilidad = row.original?.trazabilidad_data?.find(
            item =>
              item?.modelo_estado ===
              SalesStatesActionsEnumChoice.SOLICITUD_SERVICIO__FINALIZADO,
          );

          return trazabilidad?.user_data?.razon_social || 'N/A';
        },
      },
      {
        accessorKey: 'fecha_finalizado',
        header: 'FECHA FINALIZADO',
        enableColumnFilter: false,
        size: TABLE_CONSTANTS.COLUMN_WIDTH_MEDIUM,
        Cell: ({ row }: MRTSServiceType) => {
          const trazabilidad = row.original?.trazabilidad_data?.find(
            item =>
              item?.modelo_estado ===
              SalesStatesActionsEnumChoice.SOLICITUD_SERVICIO__FINALIZADO,
          );

          return trazabilidad
            ? formatDateWithTime(trazabilidad?.timestamp)
            : 'N/A';
        },
      },
    ],
    [solServiceCreatedAt, solicitudServicioBase01],
  );

  const solicitudServicioFallidas = useMemo<MRT_ColumnDef<SolicitudServicio>[]>(
    () => [
      ...solicitudServicioBase01,
      ...solServiceCreatedAt,
      {
        accessorKey: 'razon_social__cancela_sol_serv',
        header: 'CANCELADO POR',
        size: TABLE_CONSTANTS.COLUMN_WIDTH_LARGE,
        Cell: ({ row }: MRTSServiceType) => {
          const trazabilidad = row.original?.trazabilidad_data?.find(
            item =>
              item?.modelo_estado ===
              SalesStatesActionsEnumChoice.SOLICITUD_SERVICIO__CANCELADO,
          );

          return trazabilidad?.user_data?.razon_social || 'N/A';
        },
      },
      {
        accessorKey: 'fecha_cancelado',
        header: 'FECHA CANCELADO',
        enableColumnFilter: false,
        size: TABLE_CONSTANTS.COLUMN_WIDTH_MEDIUM,
        Cell: ({ row }: MRTSServiceType) => {
          const trazabilidad = row.original?.trazabilidad_data?.find(
            item =>
              item?.modelo_estado ===
              SalesStatesActionsEnumChoice.SOLICITUD_SERVICIO__CANCELADO,
          );

          return trazabilidad
            ? formatDateWithTime(trazabilidad?.timestamp)
            : 'N/A';
        },
      },
    ],
    [solServiceCreatedAt, solicitudServicioBase01],
  );

  const solicitudServicioRechazadas = useMemo<
    MRT_ColumnDef<SolicitudServicio>[]
  >(
    () => [
      ...solicitudServicioBase01,
      ...solServiceCreatedAt,
      {
        accessorKey: 'razon_social__rechazada_sol_serv',
        header: 'RECHAZADO POR',
        size: TABLE_CONSTANTS.COLUMN_WIDTH_LARGE,
        Cell: ({ row }: MRTSServiceType) => {
          const trazabilidad = row.original?.trazabilidad_data?.find(
            item =>
              item?.modelo_estado ===
              SalesStatesActionsEnumChoice.SOLICITUD_SERVICIO__RECHAZADO,
          );

          return trazabilidad?.user_data?.razon_social || 'N/A';
        },
      },
      {
        accessorKey: 'fecha_rechazado',
        header: 'FECHA RECHAZADO',
        enableColumnFilter: false,
        size: TABLE_CONSTANTS.COLUMN_WIDTH_MEDIUM,
        Cell: ({ row }: MRTSServiceType) => {
          const trazabilidad = row.original?.trazabilidad_data?.find(
            item =>
              item?.modelo_estado ===
              SalesStatesActionsEnumChoice.SOLICITUD_SERVICIO__RECHAZADO,
          );

          return trazabilidad
            ? formatDateWithTime(trazabilidad?.timestamp)
            : 'N/A';
        },
      },
    ],
    [solServiceCreatedAt, solicitudServicioBase01],
  );

  return {
    solicitudServicioBase,
    solicitudServicioWithoutGestion,
    solicitudServicioFinalizadas,
    solicitudServicioFallidas,
    solicitudServicioRechazadas,
  };
};
