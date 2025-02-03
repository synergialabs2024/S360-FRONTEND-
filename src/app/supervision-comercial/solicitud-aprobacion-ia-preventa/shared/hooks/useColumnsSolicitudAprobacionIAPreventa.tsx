import type { MRT_ColumnDef } from 'material-react-table';
import { useMemo } from 'react';

import {
  emptyCellNested,
  emptyCellOneLevel,
  formatDateWithTimeCell,
  type SolicitudAprobacionIAPreventa,
  TABLE_CONSTANTS,
} from '@/shared';
import { ViewMoreTextModalTableCell } from '@/shared/components';

export const useColumnsSolicitudAprobacionIAPreventa = () => {
  const columnsSolServicio = useMemo<
    MRT_ColumnDef<SolicitudAprobacionIAPreventa>[]
  >(
    () => [
      {
        accessorKey: 'solicitud_servicio__razon_social',
        header: 'NOMBRE',
        size: TABLE_CONSTANTS.COLUMN_WIDTH_NAME,
        Cell: ({ row }) => {
          const name =
            row.original?.preventa_data?.solicitud_servicio_data?.razon_social;

          return name ? name : 'N/A';
        },
      },
      {
        accessorKey: 'solicitud_servicio__identificacion',
        header: 'IDENTIFICACION',
        size: TABLE_CONSTANTS.COLUMN_WIDTH_MEDIUM,
        Cell: ({ row }) => {
          const identificacion =
            row.original?.preventa_data?.solicitud_servicio_data
              ?.identificacion;

          return identificacion ? identificacion : 'N/A';
        },
      },
    ],
    [],
  );

  const columnsBase01 = useMemo<MRT_ColumnDef<SolicitudAprobacionIAPreventa>[]>(
    () => [
      {
        accessorKey: 'descripcion',
        header: 'DESCRIPCION',
        size: TABLE_CONSTANTS.COLUMN_WIDTH_MEDIUM,
        Cell: ({ row }) => {
          return (
            <ViewMoreTextModalTableCell longText={row.original?.descripcion} />
          );
        },
      },

      {
        accessorKey: 'estado_solicitud',
        header: 'ESTADO SOLICITUD',
        size: TABLE_CONSTANTS.COLUMN_WIDTH_MEDIUM,
        Cell: ({ row }) => emptyCellOneLevel(row, 'estado_solicitud'),
      },

      {
        accessorKey: 'preventa__numero_referencia',
        header: 'PREVENTA',
        size: TABLE_CONSTANTS.COLUMN_WIDTH_MEDIUM,
        Cell: ({ row }) =>
          emptyCellNested(row, ['preventa_data', 'numero_referencia']),
      },

      {
        accessorKey: 'vendedor__razon_social',
        header: 'VENDEDOR',
        size: TABLE_CONSTANTS.COLUMN_WIDTH_MEDIUM,
        Cell: ({ row }) =>
          emptyCellNested(row, ['vendedor_data', 'razon_social']),
      },
    ],
    [],
  );

  const trazaModelColumns = useMemo<
    MRT_ColumnDef<SolicitudAprobacionIAPreventa>[]
  >(
    () => [
      {
        accessorKey: 'area',
        header: 'AREA',
        size: TABLE_CONSTANTS.COLUMN_WIDTH_MEDIUM,
        Cell: ({ row }) => emptyCellOneLevel(row, 'area'),
      },
      {
        accessorKey: 'departamento',
        header: 'DEPARTAMENTO',
        size: TABLE_CONSTANTS.COLUMN_WIDTH_MEDIUM,
        Cell: ({ row }) => emptyCellOneLevel(row, 'departamento'),
      },
      {
        accessorKey: 'canal_venta',
        header: 'CANAL VENTA',
        size: TABLE_CONSTANTS.COLUMN_WIDTH_MEDIUM,
        Cell: ({ row }) => emptyCellOneLevel(row, 'canal_venta'),
      },
      {
        accessorKey: 'usuario_gestion',
        header: 'USUARIO GESTION',
        size: TABLE_CONSTANTS.COLUMN_WIDTH_MEDIUM,
        Cell: ({ row }) => emptyCellOneLevel(row, 'usuario_gestion'),
      },
    ],
    [],
  );

  const columnsAudit = useMemo<MRT_ColumnDef<SolicitudAprobacionIAPreventa>[]>(
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

  ///* main colum -----
  const esperaColumns = useMemo<MRT_ColumnDef<SolicitudAprobacionIAPreventa>[]>(
    () => [...columnsSolServicio, ...columnsBase01, ...columnsAudit],
    [columnsBase01, columnsSolServicio, columnsAudit],
  );
  const aprobadoColumns = useMemo<
    MRT_ColumnDef<SolicitudAprobacionIAPreventa>[]
  >(
    () => [
      ...columnsSolServicio,
      ...columnsBase01,
      ...trazaModelColumns,
      ...columnsAudit,
    ],
    [columnsBase01, columnsSolServicio, columnsAudit, trazaModelColumns],
  );
  const rechazadoColumns = useMemo<
    MRT_ColumnDef<SolicitudAprobacionIAPreventa>[]
  >(
    () => [...columnsSolServicio, ...columnsBase01, ...columnsAudit],
    [columnsBase01, columnsSolServicio, columnsAudit],
  );

  return {
    esperaColumns,
    aprobadoColumns,
    rechazadoColumns,
  };
};
