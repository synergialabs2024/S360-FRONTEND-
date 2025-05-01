import { MRT_ColumnDef } from 'material-react-table';
import { useMemo } from 'react';

import {
  emptyCellNested,
  emptyCellOneLevel,
  formatDateWithTimeCell,
} from '@/shared/utils';
import { Cliente } from '@/shared/interfaces';
import { TABLE_CONSTANTS } from '@/shared/constants';
import { ShowEquipoMaterialUtilizadosModal } from '../modal';

export type ClienteSTTableType = Cliente & {
  materiales_utilizados?: string[];
  equipos_utilizados?: string[];
};

export const useColumnsSoporteTecnico = () => {
  const soporteTecnicoBaseColumns01 = useMemo<
    MRT_ColumnDef<ClienteSTTableType>[]
  >(
    () => [
      {
        accessorKey: 'numero_referencia',
        header: 'NUM REFERENCIA',
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
        header: 'RAZON SOCIAL',
        size: TABLE_CONSTANTS.COLUMN_WIDTH_MEDIUM,
        enableColumnFilter: true,
        enableSorting: true,
        Cell: ({ row }) =>
          emptyCellNested(row, ['solicitud_servicio_data', 'razon_social']),
      },
      {
        accessorKey: 'solicitud_servicio__celular',
        header: 'CELULAR',
        size: TABLE_CONSTANTS.COLUMN_WIDTH_MEDIUM,
        enableColumnFilter: true,
        enableSorting: true,
        Cell: ({ row }) =>
          emptyCellNested(row, ['solicitud_servicio_data', 'celular']),
      },
      {
        accessorKey: 'solicitud_servicio__email',
        header: 'EMAIL',
        size: TABLE_CONSTANTS.COLUMN_WIDTH_MEDIUM,
        enableColumnFilter: true,
        enableSorting: true,
        Cell: ({ row }) =>
          emptyCellNested(row, ['solicitud_servicio_data', 'email']),
      },
    ],
    [],
  );
  const soporteTecnicoBaseColumns02 = useMemo<
    MRT_ColumnDef<ClienteSTTableType>[]
  >(
    () => [
      {
        accessorKey: 'solicitud_servicio__numero_referencia',
        header: 'SOL. SERVICIO',
        size: TABLE_CONSTANTS.COLUMN_WIDTH_MEDIUM,
        enableColumnFilter: true,
        enableSorting: true,
        Cell: ({ row }) =>
          emptyCellNested(row, [
            'solicitud_servicio_data',
            'numero_referencia',
          ]),
      },
      {
        accessorKey: 'preventa__numero_referencia',
        header: 'PREVENTA',
        size: TABLE_CONSTANTS.COLUMN_WIDTH_MEDIUM,
        enableColumnFilter: true,
        enableSorting: true,
        Cell: ({ row }) =>
          emptyCellNested(row, ['preventa_data', 'numero_referencia']),
      },
      {
        accessorKey: 'agendamiento__numero_referencia',
        header: 'AGENDAMIENTO',
        size: TABLE_CONSTANTS.COLUMN_WIDTH_MEDIUM,
        enableColumnFilter: true,
        enableSorting: true,
        Cell: ({ row }) =>
          emptyCellNested(row, ['agendamiento_data', 'numero_referencia']),
      },
    ],
    [],
  );

  const soporteTecnicoBaseColumns03 = useMemo<
    MRT_ColumnDef<ClienteSTTableType>[]
  >(
    () => [
      {
        accessorKey: 'flota__name',
        header: 'FLOTA',
        size: TABLE_CONSTANTS.COLUMN_WIDTH_SMALL,
        enableColumnFilter: true,
        enableSorting: true,
        Cell: ({ row }) => emptyCellNested(row, ['flota_data', 'name']),
      },
      {
        accessorKey: 'nap__name',
        header: 'NAP',
        size: TABLE_CONSTANTS.COLUMN_WIDTH_SMALL,
        enableColumnFilter: true,
        enableSorting: true,
        Cell: ({ row }) => emptyCellNested(row, ['nap_data', 'name']),
      },
      {
        accessorKey: 'nodo__name',
        header: 'NODO',
        size: TABLE_CONSTANTS.COLUMN_WIDTH_SMALL,
        enableColumnFilter: true,
        enableSorting: true,
        Cell: ({ row }) => emptyCellNested(row, ['nodo_data', 'name']),
      },
      {
        accessorKey: 'olt__name',
        header: 'OLT',
        size: TABLE_CONSTANTS.COLUMN_WIDTH_SMALL,
        enableColumnFilter: true,
        enableSorting: true,
        Cell: ({ row }) => emptyCellNested(row, ['olt_data', 'name']),
      },
      {
        accessorKey: 'brass__name',
        header: 'BRASS',
        size: TABLE_CONSTANTS.COLUMN_WIDTH_SMALL,
        enableColumnFilter: true,
        enableSorting: true,
        Cell: ({ row }) => emptyCellNested(row, ['brass_data', 'name']),
      },
    ],
    [],
  );

  const soporteTecnicoBaseColumns04 = useMemo<
    MRT_ColumnDef<ClienteSTTableType>[]
  >(
    () => [
      {
        accessorKey: 'materiales_utilizados',
        header: 'MATERIAL UTILIZADO',
        enableColumnFilter: false,
        size: TABLE_CONSTANTS.COLUMN_WIDTH_SMALL,
        Cell: ({ row }) => {
          return (
            <ShowEquipoMaterialUtilizadosModal
              tipo_utilizado="material"
              Arrays={row.original.materiales_utilizados}
            />
          );
        },
      },
      {
        accessorKey: 'equipos_utilizados',
        header: 'EQUIPOS UTILIZADO',
        enableColumnFilter: false,
        size: TABLE_CONSTANTS.COLUMN_WIDTH_SMALL,
        Cell: ({ row }) => {
          return (
            <ShowEquipoMaterialUtilizadosModal
              tipo_utilizado="equipo"
              Arrays={row.original.equipos_utilizados}
            />
          );
        },
      },
    ],
    [],
  );

  const soporteTecnicoColumns = useMemo<MRT_ColumnDef<ClienteSTTableType>[]>(
    () => [
      ...soporteTecnicoBaseColumns01,
      ...soporteTecnicoBaseColumns02,
      ...soporteTecnicoBaseColumns03,
      ...soporteTecnicoBaseColumns04,
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
    [
      soporteTecnicoBaseColumns01,
      soporteTecnicoBaseColumns02,
      soporteTecnicoBaseColumns03,
      soporteTecnicoBaseColumns04,
    ],
  );

  return {
    soporteTecnicoColumns,
  };
};
