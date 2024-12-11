import type { MRT_ColumnDef, MRT_Row } from 'material-react-table';
import { useMemo } from 'react';

import {
  emptyCellNested,
  emptyCellOneLevel,
  formatDateWithTime,
  SalesStatesActionsEnumChoice,
  TABLE_CONSTANTS,
  type OrdenTrabajo,
} from '@/shared';
import { ImgModalComponent } from '@/shared/components';

type MRTOTrabajoType = { row: MRT_Row<OrdenTrabajo> };

export const useColumnsOrdenTrabajo = () => {
  const otColumnsBase01 = useMemo<MRT_ColumnDef<OrdenTrabajo>[]>(
    () => [
      {
        accessorKey: 'identificacion',
        header: 'IDENTIFICACION',
        size: TABLE_CONSTANTS.COLUMN_WIDTH_MEDIUM,
        Cell: ({ row }) =>
          emptyCellNested(row, ['solicitud_servicio_data', 'identificacion']),
      },
      {
        accessorKey: 'solicitud_servicio__razon_social',
        header: 'NOMBRE',
        size: TABLE_CONSTANTS.COLUMN_WIDTH_NAME,
        enableColumnFilter: true,
        enableSorting: true,
        Cell: ({ row }) =>
          emptyCellNested(row, ['solicitud_servicio_data', 'razon_social']),
      },
      {
        accessorKey: 'agendamiento__fecha_instalacion',
        header: 'FECHA INSTALACION',
        size: TABLE_CONSTANTS.COLUMN_WIDTH_MEDIUM,
        enableColumnFilter: true,
        enableSorting: true,
        Cell: ({ row }) =>
          emptyCellNested(row, ['agendamiento_data', 'fecha_instalacion']),
      },
      {
        accessorKey: 'agendamiento__hora_instalacion',
        header: 'HORA INSTALACION',
        size: TABLE_CONSTANTS.COLUMN_WIDTH_MEDIUM,
        enableColumnFilter: true,
        enableSorting: true,
        Cell: ({ row }) =>
          emptyCellNested(row, ['agendamiento_data', 'hora_instalacion']),
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
    ],
    [],
  );
  const otColumnsBase02 = useMemo<MRT_ColumnDef<OrdenTrabajo>[]>(
    () => [
      {
        accessorKey: 'tipo_orden_trabajo',
        header: 'TIPO ORDEN DE TRABAJO',
        size: TABLE_CONSTANTS.COLUMN_WIDTH_MEDIUM,
        enableColumnFilter: true,
        enableSorting: true,
        Cell: ({ row }) => emptyCellOneLevel(row, 'tipo_orden_trabajo'),
      },
      {
        accessorKey: 'estado_orden_trabajo',
        header: 'ESTADO ORDEN DE TRABAJO',
        size: TABLE_CONSTANTS.COLUMN_WIDTH_MEDIUM,
        enableColumnFilter: true,
        enableSorting: true,
        Cell: ({ row }) => emptyCellOneLevel(row, 'estado_orden_trabajo'),
      },
      {
        accessorKey: 'estado_activacion',
        header: 'ESTADO ACTIVACION',
        size: TABLE_CONSTANTS.COLUMN_WIDTH_MEDIUM,
        enableColumnFilter: true,
        enableSorting: true,
        Cell: ({ row }) => emptyCellOneLevel(row, 'estado_activacion'),
      },
      {
        accessorKey: 'ipv4',
        header: 'IPV4',
        size: TABLE_CONSTANTS.COLUMN_WIDTH_MEDIUM,
        enableColumnFilter: true,
        enableSorting: true,
        Cell: ({ row }) => emptyCellOneLevel(row, 'ipv4'),
      },
      {
        accessorKey: 'ipv6',
        header: 'IPV6',
        size: TABLE_CONSTANTS.COLUMN_WIDTH_MEDIUM,
        enableColumnFilter: true,
        enableSorting: true,
        Cell: ({ row }) => emptyCellOneLevel(row, 'ipv6'),
      },
      {
        accessorKey: 'pppoe',
        header: 'PPPOE',
        size: TABLE_CONSTANTS.COLUMN_WIDTH_MEDIUM,
        enableColumnFilter: true,
        enableSorting: true,
        Cell: ({ row }) => emptyCellOneLevel(row, 'pppoe'),
      },
      {
        accessorKey: 'pppassword',
        header: 'PPPPASSWORD',
        size: TABLE_CONSTANTS.COLUMN_WIDTH_MEDIUM,
        enableColumnFilter: true,
        enableSorting: true,
        Cell: ({ row }) => emptyCellOneLevel(row, 'pppassword'),
      },
      {
        accessorKey: 'punta_inicial_fibra',
        header: 'PUNTA INICIAL DE FIBRA',
        size: TABLE_CONSTANTS.COLUMN_WIDTH_MEDIUM,
        enableColumnFilter: true,
        enableSorting: true,
        Cell: ({ row }) => emptyCellOneLevel(row, 'punta_inicial_fibra'),
      },
      {
        accessorKey: 'punta_final_fibra',
        header: 'PUNTA FINAL DE FIBRA',
        size: TABLE_CONSTANTS.COLUMN_WIDTH_MEDIUM,
        enableColumnFilter: true,
        enableSorting: true,
        Cell: ({ row }) => emptyCellOneLevel(row, 'punta_final_fibra'),
      },
      {
        accessorKey: 'metraje_utilizado_fibra',
        header: 'METRAJE UTILIZADO EN FIBRA',
        size: TABLE_CONSTANTS.COLUMN_WIDTH_MEDIUM,
        enableColumnFilter: true,
        enableSorting: true,
        Cell: ({ row }) => emptyCellOneLevel(row, 'metraje_utilizado_fibra'),
      },
      {
        accessorKey: 'metraje_exedente_fibra',
        header: 'METRAJE EXEDENTE DE FIBRA',
        size: TABLE_CONSTANTS.COLUMN_WIDTH_MEDIUM,
        enableColumnFilter: true,
        enableSorting: true,
        Cell: ({ row }) => emptyCellOneLevel(row, 'metraje_exedente_fibra'),
      },
      {
        accessorKey: 'potencia_ont',
        header: 'POTENCIA ONT',
        size: TABLE_CONSTANTS.COLUMN_WIDTH_MEDIUM,
        enableColumnFilter: true,
        enableSorting: true,
        Cell: ({ row }) => emptyCellOneLevel(row, 'potencia_ont'),
      },
      {
        accessorKey: 'imagen',
        header: 'IMAGENES',
        size: TABLE_CONSTANTS.COLUMN_WIDTH_MEDIUM,
        enableColumnFilter: true,
        enableSorting: true,
        Cell: ({ row }) => {
          return (
            <ImgModalComponent
              urls={{
                foto_ont: row.original.url_foto_ont || '',
                foto_potencia_ont: row.original.url_foto_potencia_ont || '',
                foto_ont_encontrado_casa:
                  row.original.url_foto_ont_encontrado_casa || '',
                foto_etiqueta: row.original.url_foto_etiqueta || '',
                foto_nap: row.original.url_foto_nap || '',
                foto_potencia_nap: row.original.url_foto_potencia_nap || '',
                foto_premio: row.original.url_foto_premio || '',
                foto_test_speed: row.original.url_foto_test_speed || '',
                foto_acta_entrega_ups:
                  row.original.url_foto_acta_entrega_ups || '',
              }}
            />
          );
        },
      },
    ],
    [],
  );
  const otColumnsBase03 = useMemo<MRT_ColumnDef<OrdenTrabajo>[]>(
    () => [
      {
        accessorKey: 'preventa__tipo_servicio',
        header: 'TIPO SERVICIO',
        size: TABLE_CONSTANTS.COLUMN_WIDTH_MEDIUM,
        enableColumnFilter: true,
        enableSorting: true,
        Cell: ({ row }) =>
          emptyCellNested(row, ['preventa_data', 'tipo_servicio']),
      },
      {
        accessorKey: 'preventa__tipo_plan',
        header: 'TIPO PLAN',
        size: TABLE_CONSTANTS.COLUMN_WIDTH_MEDIUM,
        enableColumnFilter: true,
        enableSorting: true,
        Cell: ({ row }) => emptyCellNested(row, ['preventa_data', 'tipo_plan']),
      },
      {
        accessorKey: 'preventa__name_plan',
        header: 'TIPO PLAN',
        size: TABLE_CONSTANTS.COLUMN_WIDTH_MEDIUM,
        enableColumnFilter: true,
        enableSorting: true,
        Cell: ({ row }) =>
          emptyCellNested(row, ['preventa_data', 'plan_internet_data', 'name']),
      },
      {
        accessorKey: 'preventa__tipo_cuenta_bancaria',
        header: 'TIPO CUENTA BANCARIA',
        size: TABLE_CONSTANTS.COLUMN_WIDTH_MEDIUM,
        enableColumnFilter: true,
        enableSorting: true,
        Cell: ({ row }) =>
          emptyCellNested(row, ['preventa_data', 'tipo_cuenta_bancaria']),
      },
      {
        accessorKey: 'preventa__banco',
        header: 'ENTIDAD BANCARIA',
        size: TABLE_CONSTANTS.COLUMN_WIDTH_MEDIUM,
        enableColumnFilter: true,
        enableSorting: true,
        Cell: ({ row }) =>
          emptyCellNested(row, [
            'preventa_data',
            'entidad_financiera_data',
            'name',
          ]),
      },
      {
        accessorKey: 'flota__name',
        header: 'FLOTA',
        size: TABLE_CONSTANTS.COLUMN_WIDTH_MEDIUM,
        enableColumnFilter: true,
        enableSorting: true,
        Cell: ({ row }) => emptyCellNested(row, ['flota_data', 'name']),
      },
      {
        accessorKey: 'nap__name',
        header: 'NAP',
        size: TABLE_CONSTANTS.COLUMN_WIDTH_MEDIUM,
        enableColumnFilter: true,
        enableSorting: true,
        Cell: ({ row }) => emptyCellNested(row, ['nap_data', 'name']),
      },
      {
        accessorKey: 'linea_servicio__estado_linea',
        header: 'ESTADO LINEA',
        size: TABLE_CONSTANTS.COLUMN_WIDTH_MEDIUM,
        enableColumnFilter: true,
        enableSorting: true,
        Cell: ({ row }) =>
          emptyCellNested(row, ['linea_servicio_data', 'estado_linea']),
      },
      {
        accessorKey: 'nodo__name',
        header: 'NODO',
        size: TABLE_CONSTANTS.COLUMN_WIDTH_MEDIUM,
        enableColumnFilter: true,
        enableSorting: true,
        Cell: ({ row }) => emptyCellNested(row, ['nodo_data', 'name']),
      },
      {
        accessorKey: 'olt__name',
        header: 'OLT',
        size: TABLE_CONSTANTS.COLUMN_WIDTH_MEDIUM,
        enableColumnFilter: true,
        enableSorting: true,
        Cell: ({ row }) => emptyCellNested(row, ['olt_data', 'name']),
      },
      {
        accessorKey: 'router__name',
        header: 'ROUTER',
        size: TABLE_CONSTANTS.COLUMN_WIDTH_MEDIUM,
        enableColumnFilter: true,
        enableSorting: true,
        Cell: ({ row }) => emptyCellNested(row, ['router_data', 'name']),
      },
      {
        accessorKey: 'router__tipo_router',
        header: 'TIPO ROUTER',
        size: TABLE_CONSTANTS.COLUMN_WIDTH_MEDIUM,
        enableColumnFilter: true,
        enableSorting: true,
        Cell: ({ row }) => emptyCellNested(row, ['router_data', 'tipo_router']),
      },
    ],
    [],
  );
  const otColumnsBase04 = useMemo<MRT_ColumnDef<OrdenTrabajo>[]>(
    () => [
      {
        accessorKey: 'ubicacion__provincia',
        header: 'PROVINCIA',
        size: TABLE_CONSTANTS.COLUMN_WIDTH_MEDIUM,
        enableColumnFilter: true,
        enableSorting: true,
        Cell: ({ row }) => emptyCellNested(row, ['provincia_data', 'name']),
      },
      {
        accessorKey: 'ubicacion__ciudad',
        header: 'CIUDAD',
        size: TABLE_CONSTANTS.COLUMN_WIDTH_MEDIUM,
        enableColumnFilter: true,
        enableSorting: true,
        Cell: ({ row }) => emptyCellNested(row, ['ciudad_data', 'name']),
      },
      {
        accessorKey: 'ubicacion__zona',
        header: 'ZONA',
        size: TABLE_CONSTANTS.COLUMN_WIDTH_MEDIUM,
        enableColumnFilter: true,
        enableSorting: true,
        Cell: ({ row }) => emptyCellNested(row, ['zona_data', 'name']),
      },
      {
        accessorKey: 'ubicacion__sector',
        header: 'SECTOR',
        size: TABLE_CONSTANTS.COLUMN_WIDTH_MEDIUM,
        enableColumnFilter: true,
        enableSorting: true,
        Cell: ({ row }) => emptyCellNested(row, ['sector_data', 'name']),
      },

      {
        accessorKey: 'codigo',
        header: 'CODIGO',
        size: TABLE_CONSTANTS.COLUMN_WIDTH_MEDIUM,
        enableColumnFilter: true,
        enableSorting: true,
        Cell: ({ row }) => emptyCellOneLevel(row, 'codigo'),
      },
      {
        accessorKey: 'numero_referencia',
        header: '# REF',
        size: TABLE_CONSTANTS.COLUMN_WIDTH_SMALL,
        Cell: ({ row }) => emptyCellOneLevel(row, 'numero_referencia'),
      },
    ],
    [],
  );

  const installAsignadasEsperaOTColumns = useMemo<
    MRT_ColumnDef<OrdenTrabajo>[]
  >(
    () => [
      ...otColumnsBase01,
      ...otColumnsBase02,
      ...otColumnsBase03,
      ...otColumnsBase04,
      {
        accessorKey: 'razon_social__asignada_orde_trabajo',
        header: 'ASIGNADA POR',
        size: TABLE_CONSTANTS.COLUMN_WIDTH_LARGE,
        cell: ({ row }: MRTOTrabajoType) => {
          const trazabilidad = row.original?.trazabilidad_data?.find(
            item =>
              item?.modelo_estado ===
              SalesStatesActionsEnumChoice.ORDEN_TRABAJO__INSTALACION_CREADO,
          );

          return trazabilidad?.user_data?.razon_social || 'N/A';
        },
      },
      {
        accessorKey: 'fecha_asignada',
        header: 'FECHA ASIGNADA',
        enableColumnFilter: false,
        size: TABLE_CONSTANTS.COLUMN_WIDTH_MEDIUM,
        Cell: ({ row }: MRTOTrabajoType) => {
          const trazabilidad = row.original?.trazabilidad_data?.find(
            item =>
              item?.modelo_estado ===
              SalesStatesActionsEnumChoice.ORDEN_TRABAJO__INSTALACION_CREADO,
          );

          return trazabilidad
            ? formatDateWithTime(trazabilidad?.timestamp)
            : 'N/A';
        },
      },
    ],
    [otColumnsBase01, otColumnsBase02, otColumnsBase03, otColumnsBase04],
  );

  const installAsignadasRecoordinadasOTColumns = useMemo<
    MRT_ColumnDef<OrdenTrabajo>[]
  >(
    () => [
      ...otColumnsBase01,
      ...otColumnsBase02,
      ...otColumnsBase03,
      ...otColumnsBase04,
      {
        accessorKey: 'razon_social__asignada_recoordinada_orden_trabajo',
        header: 'ASIGNADA RECOORDINADA POR',
        size: TABLE_CONSTANTS.COLUMN_WIDTH_LARGE,
        cell: ({ row }: MRTOTrabajoType) => {
          const trazabilidad = row.original?.trazabilidad_data?.find(
            item =>
              item?.modelo_estado ===
              SalesStatesActionsEnumChoice.ORDEN_TRABAJO__INSTALACION_SUBIDA,
          );

          return trazabilidad?.user_data?.razon_social || 'N/A';
        },
      },
      {
        accessorKey: 'fecha_asignada_recoordinada',
        header: 'FECHA ASIGNADA RECOORDINADA',
        enableColumnFilter: false,
        size: TABLE_CONSTANTS.COLUMN_WIDTH_MEDIUM,
        Cell: ({ row }: MRTOTrabajoType) => {
          const trazabilidad = row.original?.trazabilidad_data?.find(
            item =>
              item?.modelo_estado ===
              SalesStatesActionsEnumChoice.ORDEN_TRABAJO__INSTALACION_SUBIDA,
          );

          return trazabilidad
            ? formatDateWithTime(trazabilidad?.timestamp)
            : 'N/A';
        },
      },
    ],
    [otColumnsBase01, otColumnsBase02, otColumnsBase03, otColumnsBase04],
  );

  const installGestionadasOTColumns = useMemo<MRT_ColumnDef<OrdenTrabajo>[]>(
    () => [
      ...otColumnsBase01,
      ...otColumnsBase02,
      ...otColumnsBase03,
      ...otColumnsBase04,
      {
        accessorKey: 'razon_social__finaliza_orden_trabajo',
        header: 'FINALIZADA POR',
        size: TABLE_CONSTANTS.COLUMN_WIDTH_LARGE,
        cell: ({ row }: MRTOTrabajoType) => {
          const trazabilidad = row.original?.trazabilidad_data?.find(
            item =>
              item?.modelo_estado ===
              SalesStatesActionsEnumChoice.ORDEN_TRABAJO__INSTALACION_ACTIVADA,
          );

          return trazabilidad?.user_data?.razon_social || 'N/A';
        },
      },
      {
        accessorKey: 'fecha_finalizado',
        header: 'FECHA FINALIZADA',
        enableColumnFilter: false,
        size: TABLE_CONSTANTS.COLUMN_WIDTH_MEDIUM,
        Cell: ({ row }: MRTOTrabajoType) => {
          const trazabilidad = row.original?.trazabilidad_data?.find(
            item =>
              item?.modelo_estado ===
              SalesStatesActionsEnumChoice.ORDEN_TRABAJO__INSTALACION_ACTIVADA,
          );

          return trazabilidad
            ? formatDateWithTime(trazabilidad?.timestamp)
            : 'N/A';
        },
      },
    ],
    [otColumnsBase01, otColumnsBase02, otColumnsBase03, otColumnsBase04],
  );

  const installPreRechazadoOTColumns = useMemo<MRT_ColumnDef<OrdenTrabajo>[]>(
    () => [
      ...otColumnsBase01,
      ...otColumnsBase02,
      ...otColumnsBase03,
      ...otColumnsBase04,
      {
        accessorKey: 'razon_social__pre_rechazada_orden_trabajo',
        header: 'PRE RECHAZADA POR',
        size: TABLE_CONSTANTS.COLUMN_WIDTH_LARGE,
        cell: ({ row }: MRTOTrabajoType) => {
          const trazabilidad = row.original?.trazabilidad_data?.find(
            item =>
              item?.modelo_estado ===
              SalesStatesActionsEnumChoice.ORDEN_TRABAJO__INSTALACION_PRE_RECHAZADO,
          );

          return trazabilidad?.user_data?.razon_social || 'N/A';
        },
      },
      {
        accessorKey: 'fecha_pre_rechazada',
        header: 'FECHA PRE RECHAZADA',
        enableColumnFilter: false,
        size: TABLE_CONSTANTS.COLUMN_WIDTH_MEDIUM,
        Cell: ({ row }: MRTOTrabajoType) => {
          const trazabilidad = row.original?.trazabilidad_data?.find(
            item =>
              item?.modelo_estado ===
              SalesStatesActionsEnumChoice.ORDEN_TRABAJO__INSTALACION_PRE_RECHAZADO,
          );

          return trazabilidad
            ? formatDateWithTime(trazabilidad?.timestamp)
            : 'N/A';
        },
      },
    ],
    [otColumnsBase01, otColumnsBase02, otColumnsBase03, otColumnsBase04],
  );

  // auditoria -----------
  const installEsperaAuditoriaOTColumns = useMemo<
    MRT_ColumnDef<OrdenTrabajo>[]
  >(
    () => [
      ...otColumnsBase01,
      ...otColumnsBase02,
      ...otColumnsBase03,
      ...otColumnsBase04,
    ],
    [otColumnsBase01, otColumnsBase02, otColumnsBase03, otColumnsBase04],
  );
  const installEsperaCorreccionAuditoriaOTColumns = useMemo<
    MRT_ColumnDef<OrdenTrabajo>[]
  >(
    () => [
      ...otColumnsBase01,
      ...otColumnsBase02,
      ...otColumnsBase03,
      ...otColumnsBase04,
    ],
    [otColumnsBase01, otColumnsBase02, otColumnsBase03, otColumnsBase04],
  );
  const installAprobadasAuditoriaOTColumns = useMemo<
    MRT_ColumnDef<OrdenTrabajo>[]
  >(
    () => [
      ...otColumnsBase01,
      ...otColumnsBase02,
      ...otColumnsBase03,
      ...otColumnsBase04,
    ],
    [otColumnsBase01, otColumnsBase02, otColumnsBase03, otColumnsBase04],
  );

  return {
    installAsignadasEsperaOTColumns,
    installAsignadasRecoordinadasOTColumns,
    installGestionadasOTColumns,
    installPreRechazadoOTColumns,

    installEsperaAuditoriaOTColumns,
    installEsperaCorreccionAuditoriaOTColumns,
    installAprobadasAuditoriaOTColumns,
  };
};
