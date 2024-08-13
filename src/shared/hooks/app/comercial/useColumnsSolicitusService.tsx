/* eslint-disable indent */
import type { MRT_ColumnDef, MRT_Row } from 'material-react-table';
import { useMemo } from 'react';

import { UserRolesEnumChoice } from '@/shared/constants';
import { TABLE_CONSTANTS } from '@/shared/constants/ui';
import type { SolicitudServicio } from '@/shared/interfaces';
import {
  emptyCellOneLevel,
  formatBooleanCell,
  formatDateWithTimeCell,
} from '@/shared/utils';
import { useAuthStore } from '@/store/auth';

type UseColumnsSolicitusServiceProps = {
  imageModalTitle?: string;
  isSalesman?: boolean;
};

type MRTSServiceType = { row: MRT_Row<SolicitudServicio> };

export const useColumnsSolicitusService = (
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  _props?: UseColumnsSolicitusServiceProps,
) => {
  const isSalesman =
    useAuthStore(s => s.user?.role) === UserRolesEnumChoice.AGENTE;

  const solicitudServicioBase = useMemo<MRT_ColumnDef<SolicitudServicio>[]>(
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

      {
        accessorKey: 'linea_servicio',
        header: 'LINEA SERVICIO',
        size: TABLE_CONSTANTS.COLUMN_WIDTH_MEDIUM,
        enableColumnFilter: true,
        enableSorting: true,
        Cell: ({ row }: MRTSServiceType) =>
          emptyCellOneLevel(row, 'linea_servicio'),
      },

      ...(isSalesman
        ? []
        : [
            {
              accessorKey: 'detalle_servicios_contratados',
              header: 'DETALLE SERVICIOS CONTRATADOS',
              size: TABLE_CONSTANTS.COLUMN_WIDTH_MEDIUM,
              enableColumnFilter: true,
              enableSorting: true,
              Cell: ({ row }: MRTSServiceType) =>
                emptyCellOneLevel(row, 'detalle_servicios_contratados'),
            },

            // EQUIFAX ------------
            {
              accessorKey: 'score_inclusion',
              header: 'SCORE INCLUSION',
              size: TABLE_CONSTANTS.COLUMN_WIDTH_MEDIUM,
              enableColumnFilter: true,
              enableSorting: true,
              Cell: ({ row }: MRTSServiceType) =>
                emptyCellOneLevel(row, 'score_inclusion'),
            },
            {
              accessorKey: 'score_sobreendeudamiento',
              header: 'SCORE SOBREENDEUDAMIENTO',
              size: TABLE_CONSTANTS.COLUMN_WIDTH_MEDIUM,
              enableColumnFilter: true,
              enableSorting: true,
              Cell: ({ row }: MRTSServiceType) =>
                emptyCellOneLevel(row, 'score_sobreendeudamiento'),
            },
            {
              accessorKey: 'score_servicios',
              header: 'SCORE SERVICIOS',
              size: TABLE_CONSTANTS.COLUMN_WIDTH_MEDIUM,
              enableColumnFilter: true,
              enableSorting: true,
              Cell: ({ row }: MRTSServiceType) =>
                emptyCellOneLevel(row, 'score_servicios'),
            },
            {
              accessorKey: 'rango_capacidad_pago',
              header: 'RANGO CAPACIDAD PAGO',
              size: TABLE_CONSTANTS.COLUMN_WIDTH_MEDIUM,
              enableColumnFilter: true,
              enableSorting: true,
              Cell: ({ row }: MRTSServiceType) =>
                emptyCellOneLevel(row, 'rango_capacidad_pago'),
            },

            {
              accessorKey: 'valor_maximo',
              header: 'VALOR MAXIMO',
              size: TABLE_CONSTANTS.COLUMN_WIDTH_MEDIUM,
              enableColumnFilter: true,
              enableSorting: true,
              Cell: ({ row }: MRTSServiceType) =>
                emptyCellOneLevel(row, 'valor_maximo'),
            },
            {
              accessorKey: 'valor_minimo',
              header: 'VALOR MINIMO',
              size: TABLE_CONSTANTS.COLUMN_WIDTH_MEDIUM,
              enableColumnFilter: true,
              enableSorting: true,
              Cell: ({ row }: MRTSServiceType) =>
                emptyCellOneLevel(row, 'valor_minimo'),
            },
          ]),

      // TODO: trazabilidad

      {
        accessorKey: 'codigo',
        header: 'CODIGO',
        size: TABLE_CONSTANTS.COLUMN_WIDTH_SMALL,
        enableColumnFilter: true,
        enableSorting: true,
        Cell: ({ row }: MRTSServiceType) => emptyCellOneLevel(row, 'codigo'),
      },
      {
        accessorKey: 'created_at',
        header: 'CREADO',
        size: TABLE_CONSTANTS.COLUMN_WIDTH_MEDIUM,
        enableColumnFilter: false,
        enableSorting: false,
        Cell: ({ row }: MRTSServiceType) =>
          formatDateWithTimeCell(row, 'created_at'),
      },
      {
        accessorKey: 'modified_at',
        header: 'MODIFICADO',
        size: TABLE_CONSTANTS.COLUMN_WIDTH_MEDIUM,
        enableColumnFilter: false,
        enableSorting: false,
        Cell: ({ row }: MRTSServiceType) =>
          formatDateWithTimeCell(row, 'modified_at'),
      },
    ],
    [isSalesman],
  );

  return { solicitudServicioBase };
};
