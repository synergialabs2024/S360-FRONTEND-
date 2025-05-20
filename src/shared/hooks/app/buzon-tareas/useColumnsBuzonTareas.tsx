import type { MRT_ColumnDef } from 'material-react-table';
import { useMemo } from 'react';

import { TABLE_CONSTANTS } from '@/shared/constants';
import {
  emptyCellNested,
  emptyCellOneLevel,
  formatDateWithTimeCell,
} from '@/shared/utils';
import { BuzonTarea } from '@/shared/interfaces';

export const useColumnsBuzonTareas = () => {
  // table base columns ---------------------
  const tareasBaseColumns01 = useMemo<MRT_ColumnDef<BuzonTarea>[]>(
    () => [
      {
        accessorKey: 'linea_servicio__cliente__name',
        header: 'RAZON SOCIAL',
        size: TABLE_CONSTANTS.COLUMN_WIDTH_MEDIUM,
        enableColumnFilter: true,
        enableSorting: true,
        Cell: ({ row }) =>
          emptyCellNested(row, [
            'linea_servicio_data',
            'cliente_data',
            'razon_social',
          ]),
      },
      {
        accessorKey: 'linea_servicio__cliente__identificacion',
        header: 'IDENTIFICACION',
        size: TABLE_CONSTANTS.COLUMN_WIDTH_MEDIUM,
        enableColumnFilter: true,
        enableSorting: true,
        Cell: ({ row }) =>
          emptyCellNested(row, [
            'linea_servicio_data',
            'cliente_data',
            'identificacion',
          ]),
      },
      {
        accessorKey: 'tipo_tarea__name',
        header: 'TIPO TAREA',
        Cell: ({ row }) => emptyCellNested(row, ['tipo_tarea_data', 'name']),
      },
      {
        accessorKey: 'subtipo_tarea__name',
        header: 'SUBTIPO TAREA',
        Cell: ({ row }) => emptyCellNested(row, ['subtipo_tarea_data', 'name']),
      },
      {
        accessorKey: 'causa_tarea__name',
        header: 'CAUSA TAREA',
        Cell: ({ row }) => emptyCellNested(row, ['causa_tarea_data', 'name']),
      },

      {
        accessorKey: 'detalle_caso',
        header: 'DETALLE CASO',
        size: TABLE_CONSTANTS.COLUMN_WIDTH_MEDIUM,
        enableColumnFilter: true,
        enableSorting: true,
        Cell: ({ row }) => emptyCellOneLevel(row, 'detalle_caso'),
      },

      {
        accessorKey: 'departamento_asignado__name',
        header: 'DEPARTAMENTO ASIGNADO',
        size: TABLE_CONSTANTS.COLUMN_WIDTH_MEDIUM,
        enableColumnFilter: true,
        enableSorting: true,
        Cell: ({ row }) =>
          emptyCellNested(row, ['departamento_asignado_data', 'name']),
      },

      {
        accessorKey: 'aplica_beneficio_segun_perfil',
        header: 'APLICA BENEFICIO SEGUN PERFIL',
        size: TABLE_CONSTANTS.COLUMN_WIDTH_MEDIUM,
        Cell: ({ row }) =>
          emptyCellOneLevel(row, 'aplica_beneficio_segun_perfil'),
      },

      {
        accessorKey: 'canal_referencia',
        header: 'CANAL REFERENCIA',
        size: TABLE_CONSTANTS.COLUMN_WIDTH_MEDIUM,
        enableColumnFilter: true,
        enableSorting: true,
        Cell: ({ row }) => emptyCellOneLevel(row, 'canal_referencia'),
      },

      {
        accessorKey: 'usuario_creacion__name',
        header: 'USUARIO APERTURA TAREA',
        Cell: ({ row }) =>
          emptyCellNested(row, ['usuario_creacion_data', 'username']),
      },

      {
        accessorKey: 'created_at',
        header: 'CREADO',
        size: TABLE_CONSTANTS.COLUMN_WIDTH_MEDIUM,
        enableColumnFilter: false,
        enableSorting: false,
        Cell: ({ row }) => formatDateWithTimeCell(row, 'created_at'),
      },
    ],
    [],
  );

  // table columns ---------------------
  const tareasBaseColumns = useMemo<MRT_ColumnDef<BuzonTarea>[]>(
    () => [...tareasBaseColumns01],
    [tareasBaseColumns01],
  );

  return {
    tareasBaseColumns,
  };
};
