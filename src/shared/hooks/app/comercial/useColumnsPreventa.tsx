import type { MRT_ColumnDef, MRT_Row } from 'material-react-table';
import { useMemo } from 'react';

import { CopyTextOnClickBtn, ImgModalComponent } from '@/shared/components';
import {
  SalesStatesActionsEnumChoice,
  TABLE_CONSTANTS,
} from '@/shared/constants';
import { Preventa } from '@/shared/interfaces';
import {
  emptyCellNested,
  emptyCellOneLevel,
  formatDateWithTime,
  formatDateWithTimeCell,
} from '@/shared/utils';
import { ToastWrapper } from '@/shared/wrappers';

type MRTSServiceType = { row: MRT_Row<Preventa> };

export const useColumnsPreventa = () => {
  const preventaBaseColumns = useMemo<MRT_ColumnDef<Preventa>[]>(
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
        accessorKey: 'solicitud_servicio__identificacion',
        header: 'IDENTIFICACION',
        size: TABLE_CONSTANTS.COLUMN_WIDTH_MEDIUM,
        enableColumnFilter: true,
        enableSorting: true,
        Cell: ({ row }) =>
          emptyCellNested(row, ['solicitud_servicio_data', 'identificacion']),
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
      {
        accessorKey: 'vendedor',
        header: 'VENDEDOR',
        size: TABLE_CONSTANTS.COLUMN_WIDTH_MEDIUM,
        enableColumnFilter: true,
        enableSorting: true,
        Cell: ({ row }: MRTSServiceType) => {
          const trazabilidadData =
            row.original.solicitud_servicio_data?.trazabilidad_data;
          const created = trazabilidadData?.at(0);

          return created ? created?.user_data?.razon_social : 'N/A';
        },
      },

      {
        accessorKey: 'es_referido',
        header: 'ES REFERIDO',
        size: TABLE_CONSTANTS.COLUMN_WIDTH_MEDIUM,
        enableColumnFilter: true,
        enableSorting: true,
        Cell: ({ row }) => emptyCellOneLevel(row, 'es_referido'),
      },

      {
        accessorKey: 'cliente_refiere',
        header: 'CLIENTE REFIERE',
        size: TABLE_CONSTANTS.COLUMN_WIDTH_MEDIUM,
        enableColumnFilter: true,
        enableSorting: true,
        Cell: ({ row }) => emptyCellOneLevel(row, 'cliente_refiere'),
      },

      {
        accessorKey: 'correo_cliente_refiere',
        header: 'CORREO CLIENTE REFIERE',
        size: TABLE_CONSTANTS.COLUMN_WIDTH_MEDIUM,
        enableColumnFilter: true,
        enableSorting: true,
        Cell: ({ row }) => emptyCellOneLevel(row, 'correo_cliente_refiere'),
      },

      {
        accessorKey: 'tipo_servicio',
        header: 'TIPO SERVICIO',
        size: TABLE_CONSTANTS.COLUMN_WIDTH_MEDIUM,
        enableColumnFilter: true,
        enableSorting: true,
        Cell: ({ row }) => emptyCellOneLevel(row, 'tipo_servicio'),
      },

      {
        accessorKey: 'tipo_plan',
        header: 'TIPO PLAN',
        size: TABLE_CONSTANTS.COLUMN_WIDTH_MEDIUM,
        enableColumnFilter: true,
        enableSorting: true,
        Cell: ({ row }) => emptyCellOneLevel(row, 'tipo_plan'),
      },

      {
        accessorKey: 'numero_cuenta_bancaria',
        header: 'NUMERO CUENTA BANCARIA',
        size: TABLE_CONSTANTS.COLUMN_WIDTH_MEDIUM,
        enableColumnFilter: true,
        enableSorting: true,
        Cell: ({ row }) => emptyCellOneLevel(row, 'numero_cuenta_bancaria'),
      },

      {
        accessorKey: 'costo_instalacion',
        header: 'COSTO INSTALACION',
        size: TABLE_CONSTANTS.COLUMN_WIDTH_MEDIUM,
        enableColumnFilter: true,
        enableSorting: true,
        Cell: ({ row }) => emptyCellOneLevel(row, 'costo_instalacion'),
      },

      {
        accessorKey: 'metodo_pago',
        header: 'METODO PAGO',
        size: TABLE_CONSTANTS.COLUMN_WIDTH_MEDIUM,
        enableColumnFilter: true,
        enableSorting: true,
        Cell: ({ row }) => emptyCellNested(row, ['metodo_pago_data', 'name']),
      },

      {
        accessorKey: 'entidad_financiera',
        header: 'ENTIDAD FINANCIERA',
        size: TABLE_CONSTANTS.COLUMN_WIDTH_MEDIUM,
        enableColumnFilter: true,
        enableSorting: true,
        Cell: ({ row }) =>
          emptyCellNested(row, ['entidad_financiera_data', 'name']),
      },

      {
        accessorKey: 'solicitud_servicio__tipo_plan',
        header: 'TIPO PLAN',
        size: TABLE_CONSTANTS.COLUMN_WIDTH_MEDIUM,
        enableColumnFilter: true,
        enableSorting: true,
        Cell: ({ row }) =>
          emptyCellNested(row, [
            'solicitud_servicio_data',
            'linea_servicio_data',
            'contrato_data',
            'plan_internet_ingreso_data',
            'tipo_plan',
          ]),
      },
      {
        accessorKey: 'solicitud_servicio__codigo',
        header: 'CODIGO',
        size: TABLE_CONSTANTS.COLUMN_WIDTH_MEDIUM,
        enableColumnFilter: true,
        enableSorting: true,
        Cell: ({ row }) =>
          emptyCellNested(row, [
            'solicitud_servicio_data',
            'linea_servicio_data',
            'contrato_data',
            'plan_internet_ingreso_data',
            'codigo',
          ]),
      },
      {
        accessorKey: 'solicitud_servicio__permanencia',
        header: 'PERMANENCIA',
        size: TABLE_CONSTANTS.COLUMN_WIDTH_MEDIUM,
        enableColumnFilter: true,
        enableSorting: true,
        Cell: ({ row }) =>
          emptyCellNested(row, [
            'solicitud_servicio_data',
            'linea_servicio_data',
            'contrato_data',
            'plan_internet_ingreso_data',
            'permanencia',
          ]),
      },
      {
        accessorKey: 'solicitud_servicio__tipo_servicio',
        header: 'TIPO SERVICIO',
        size: TABLE_CONSTANTS.COLUMN_WIDTH_MEDIUM,
        enableColumnFilter: true,
        enableSorting: true,
        Cell: ({ row }) =>
          emptyCellNested(row, [
            'solicitud_servicio_data',
            'linea_servicio_data',
            'contrato_data',
            'plan_internet_ingreso_data',
            'tipo_servicio',
          ]),
      },

      {
        accessorKey: 'imagen',
        header: 'IMAGENES',
        size: TABLE_CONSTANTS.COLUMN_WIDTH_MEDIUM,
        enableColumnFilter: false,
        enableSorting: false,
        Cell: ({ row }) => {
          return (
            <ImgModalComponent
              urls={{
                foto_aceptacion: row.original.url_foto_aceptacion || '',
                foto_cedula_frontal: row.original.url_foto_cedula_frontal || '',
                foto_cedula_trasera: row.original.url_foto_cedula_trasera || '',
                foto_documento_cuenta:
                  row.original.url_foto_documento_cuenta || '',
                foto_tarjeta: row.original.url_foto_tarjeta || '',
                foto_vivienda: row.original.url_foto_vivienda || '',
              }}
            />
          );
        },
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

  const preventaRealizadas = useMemo<MRT_ColumnDef<Preventa>[]>(
    () => [
      ...preventaBaseColumns,
      {
        accessorKey: 'razon_social__finaliza_preventa',
        header: 'REALIZADO POR',
        size: TABLE_CONSTANTS.COLUMN_WIDTH_LARGE,
        cell: ({ row }: MRTSServiceType) => {
          const trazabilidad = row.original?.trazabilidad_data?.find(
            item =>
              item?.modelo_estado ===
              SalesStatesActionsEnumChoice.PREVENTA__FINALIZADO,
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
              SalesStatesActionsEnumChoice.PREVENTA__FINALIZADO,
          );

          return trazabilidad
            ? formatDateWithTime(trazabilidad?.timestamp)
            : 'N/A';
        },
      },
    ],
    [preventaBaseColumns],
  );

  /*
  const preventaRechazadas = useMemo<MRT_ColumnDef<Preventa>[]>(
    () => [
      ...preventaBaseColumns,
      {
        accessorKey: 'razon_social__rechazada_preventa',
        header: 'RECHAZADO POR',
        size: TABLE_CONSTANTS.COLUMN_WIDTH_LARGE,
        Cell: ({ row }: MRTSServiceType) => {
          const trazabilidad = row.original?.trazabilidad_data?.find(
            item =>
              item?.modelo_estado ===
              SalesStatesActionsEnumChoice.PREVENTA__RECHAZADO,
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
              SalesStatesActionsEnumChoice.PREVENTA__RECHAZADO,
          );

          return trazabilidad
            ? formatDateWithTime(trazabilidad?.timestamp)
            : 'N/A';
        },
      },
    ],
    [],
  );
  */

  const preventaFallidas = useMemo<MRT_ColumnDef<Preventa>[]>(
    () => [
      ...preventaBaseColumns,
      {
        accessorKey: 'razon_social__cancela_preventa',
        header: 'CANCELADO POR',
        size: TABLE_CONSTANTS.COLUMN_WIDTH_LARGE,
        Cell: ({ row }: MRTSServiceType) => {
          const trazabilidad = row.original?.trazabilidad_data?.find(
            item =>
              item?.modelo_estado ===
              SalesStatesActionsEnumChoice.PREVENTA__CANCELADO,
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
              SalesStatesActionsEnumChoice.PREVENTA__CANCELADO,
          );

          return trazabilidad
            ? formatDateWithTime(trazabilidad?.timestamp)
            : 'N/A';
        },
      },
    ],
    [preventaBaseColumns],
  );
  const preventaSinGestion = useMemo<MRT_ColumnDef<Preventa>[]>(
    () => [
      ...preventaBaseColumns,
      {
        accessorKey: 'vendedor_solicita_desbloqueo',
        header: 'SOICITO DESBLOQUEO',
        size: TABLE_CONSTANTS.COLUMN_WIDTH_LARGE,
        enableColumnFilter: false,
        Cell: ({ row }: MRTSServiceType) => {
          const trazabilidad = row.original?.trazabilidad_data?.find(
            item =>
              item?.modelo_estado ===
              SalesStatesActionsEnumChoice.PREVENTA__SIN_GESTION,
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
              SalesStatesActionsEnumChoice.PREVENTA__SIN_GESTION,
          );
          const message =
            `${trazabilidad?.user_data?.razon_social} | ${formatDateWithTime(
              trazabilidad?.timestamp,
            )}` || 'N/A';

          return message;
        },
      },
    ],
    [preventaBaseColumns],
  );

  const preventasEsperaAceptacionColumns = useMemo<MRT_ColumnDef<Preventa>[]>(
    () => [
      ...preventaBaseColumns,
      {
        accessorKey: 'url_oficina_virtual',
        header: 'OFICINA VIRTUAL',
        size: 50,
        Cell: ({ row }) => {
          const url = row.original?.url_aceptacion || '';
          return (
            <CopyTextOnClickBtn
              text={url}
              onClick={() => {
                ToastWrapper.info('URL copiada al portapapeles');
              }}
            />
          );
        },
      },
    ],
    [preventaBaseColumns],
  );

  return {
    preventaBaseColumns,
    preventaRealizadas,
    preventaFallidas,
    preventaSinGestion,
    preventasEsperaAceptacionColumns,
  };
};
