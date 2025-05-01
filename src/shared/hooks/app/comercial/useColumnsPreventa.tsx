import type { MRT_ColumnDef, MRT_Row } from 'material-react-table';
import { useMemo } from 'react';

import { ImgModalComponent } from '@/shared/components';
import CopyTextOnClickBtn from '@/shared/components/CustomButtons/CopyTextOnClickBtn';
import {
  IDENTIFICATION_TYPE_ARRAY_CHOICES_OBJ_SOL_SERVICE,
  SalesStatesActionsEnumChoice,
  TABLE_CONSTANTS,
  TRUE_FALSE_TYPE_ARRAY_CHOICES,
} from '@/shared/constants';
import { Preventa } from '@/shared/interfaces';
import {
  emptyCellNested,
  emptyCellOneLevel,
  formatBooleanCell,
  formatDateWithTimeCell,
  formatTrazabilidadCell,
} from '@/shared/utils';
import { ToastWrapper } from '@/shared/wrappers';
import { useAuthStore } from '@/store/auth';

type MRTSServiceType = { row: MRT_Row<Preventa> };

export const useColumnsPreventa = () => {
  const user = useAuthStore(s => s.user);

  // table base columns ---------------------
  const preventaBaseColumns01 = useMemo<MRT_ColumnDef<Preventa>[]>(
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
        accessorKey: 'tipo_identificacion',
        header: 'TIPO IDENTIFICACION',
        size: TABLE_CONSTANTS.COLUMN_WIDTH_MEDIUM,
        enableColumnFilter: true,
        enableSorting: true,
        filterVariant: 'select',
        filterSelectOptions: IDENTIFICATION_TYPE_ARRAY_CHOICES_OBJ_SOL_SERVICE,
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
    ],
    [],
  );

  const preventaBaseColumns02 = useMemo<MRT_ColumnDef<Preventa>[]>(
    () => [
      {
        accessorKey: 'codigo',
        header: 'CODIGO',
        size: TABLE_CONSTANTS.COLUMN_WIDTH_MEDIUM,
        enableColumnFilter: true,
        enableSorting: true,
        Cell: ({ row }) => emptyCellOneLevel(row, 'codigo'),
      },
      {
        accessorKey: 'vendedor__razon_social',
        header: 'VENDEDOR',
        size: TABLE_CONSTANTS.COLUMN_WIDTH_LARGE,
        enableColumnFilter: false,
        Cell: ({ row }: MRTSServiceType) =>
          emptyCellNested(row, ['vendedor_data', 'razon_social']),
      },

      {
        accessorKey: 'es_referido',
        header: 'ES REFERIDO',
        size: TABLE_CONSTANTS.COLUMN_WIDTH_MEDIUM,
        enableColumnFilter: true,
        enableSorting: true,
        filterVariant: 'select',
        filterSelectOptions: TRUE_FALSE_TYPE_ARRAY_CHOICES,
        Cell: ({ row }) => formatBooleanCell(row, 'es_referido'),
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
        accessorKey: 'entidad_financiera__name',
        header: 'ENTIDAD FINANCIERA',
        size: TABLE_CONSTANTS.COLUMN_WIDTH_MEDIUM,
        enableColumnFilter: true,
        enableSorting: true,
        Cell: ({ row }) =>
          emptyCellNested(row, ['entidad_financiera_data', 'name']),
      },

      {
        accessorKey: 'plan_internet__tipo_plan',
        header: 'TIPO PLAN SOl. SERVICIO',
        size: TABLE_CONSTANTS.COLUMN_WIDTH_MEDIUM,
        enableColumnFilter: true,
        enableSorting: true,
        Cell: ({ row }) =>
          emptyCellNested(row, ['plan_internet_data', 'tipo_plan']),
      },

      {
        accessorKey: 'plan_internet__permanencia',
        header: 'PERMANENCIA',
        size: TABLE_CONSTANTS.COLUMN_WIDTH_MEDIUM,
        enableColumnFilter: true,
        enableSorting: true,
        Cell: ({ row }) =>
          emptyCellNested(row, ['plan_internet_data', 'permanencia']),
      },
      {
        accessorKey: 'solicitud_servicio__codigo',
        header: 'CODIGO SOL. SERVICIO',
        size: TABLE_CONSTANTS.COLUMN_WIDTH_MEDIUM,
        enableColumnFilter: true,
        enableSorting: true,
        Cell: ({ row }) =>
          emptyCellNested(row, ['solicitud_servicio_data', 'codigo']),
      },
      /*
      {
        accessorKey: 'solicitud_servicio__tipo_servicio',
        header: 'TIPO SERVICIO SOL. SERVICIO',
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
      */

      ...(!user?.is_valid_salesman
        ? [
          {
            accessorKey: 'imagen',
            header: 'IMAGENES',
            size: TABLE_CONSTANTS.COLUMN_WIDTH_MEDIUM,
            enableColumnFilter: false,
            enableSorting: false,
            Cell: ({ row }: any) => {
              return (
                <ImgModalComponent
                  urls={{
                    foto_aceptacion: row.original.url_foto_aceptacion || '',
                    foto_cedula_frontal:
                        row.original.url_foto_cedula_frontal || '',
                    foto_cedula_trasera:
                        row.original.url_foto_cedula_trasera || '',
                    foto_documento_cuenta:
                        row.original.url_foto_documento_cuenta || '',
                    foto_tarjeta: row.original.url_foto_tarjeta || '',
                    foto_vivienda: row.original.url_foto_vivienda || '',
                  }}
                />
              );
            },
          },
        ]
        : []),

      {
        accessorKey: 'created_at',
        header: 'CREADO',
        size: TABLE_CONSTANTS.COLUMN_WIDTH_MEDIUM,
        enableColumnFilter: false,
        enableSorting: false,
        Cell: ({ row }) => formatDateWithTimeCell(row, 'created_at'),
      },
    ],
    [user?.is_valid_salesman],
  );

  // table columns ---------------------
  const preventaBaseColumns = useMemo<MRT_ColumnDef<Preventa>[]>(
    () => [...preventaBaseColumns01, ...preventaBaseColumns02],
    [preventaBaseColumns01, preventaBaseColumns02],
  );

  const preventaRealizadas = useMemo<MRT_ColumnDef<Preventa>[]>(
    () => [
      ...preventaBaseColumns,
      {
        accessorKey: 'razon_social__finaliza_preventa',
        header: 'FINALIZADO POR',
        size: TABLE_CONSTANTS.COLUMN_WIDTH_MEDIUM,
        enableColumnFilter: true,
        enableSorting: true,
        Cell: ({ row }) => {
          return formatTrazabilidadCell(
            row,
            SalesStatesActionsEnumChoice.PREVENTA__FINALIZADO,
            'user_data.razon_social',
            true,
          );
        },
      },
      {
        accessorKey: 'fecha_finalizado',
        header: 'FECHA FINALIZADO',
        enableColumnFilter: false,
        size: TABLE_CONSTANTS.COLUMN_WIDTH_MEDIUM,
        Cell: ({ row }: MRTSServiceType) =>
          formatTrazabilidadCell(
            row,
            SalesStatesActionsEnumChoice.PREVENTA__FINALIZADO,
            'timestamp',
          ),
      },
    ],
    [preventaBaseColumns],
  );

  const preventaFallidas = useMemo<MRT_ColumnDef<Preventa>[]>(
    () => [
      ...preventaBaseColumns01,
      ...preventaBaseColumns,
      {
        accessorKey: 'razon_social__cancela_preventa',
        header: 'CANCELADO POR',
        size: TABLE_CONSTANTS.COLUMN_WIDTH_LARGE,
        Cell: ({ row }: MRTSServiceType) =>
          formatTrazabilidadCell(
            row,
            SalesStatesActionsEnumChoice.PREVENTA__CANCELADO,
            'user_data.razon_social',
            true,
          ),
      },
      {
        accessorKey: 'fecha_cancelado',
        header: 'FECHA CANCELADO',
        enableColumnFilter: false,
        size: TABLE_CONSTANTS.COLUMN_WIDTH_MEDIUM,
        Cell: ({ row }: MRTSServiceType) =>
          formatTrazabilidadCell(
            row,
            SalesStatesActionsEnumChoice.PREVENTA__CANCELADO,
            'timestamp',
          ),
      },
    ],
    [preventaBaseColumns, preventaBaseColumns01],
  );

  const preventaSinGestion = useMemo<MRT_ColumnDef<Preventa>[]>(
    () => [
      ...preventaBaseColumns,
      {
        accessorKey: 'vendedor_solicita_desbloqueo',
        header: 'SOICITO DESBLOQUEO',
        size: TABLE_CONSTANTS.COLUMN_WIDTH_LARGE,
        enableColumnFilter: false,
        Cell: ({ row }: MRTSServiceType) =>
          formatTrazabilidadCell(
            row,
            SalesStatesActionsEnumChoice.PREVENTA__SIN_GESTION,
            'user_data.razon_social',
          ),
      },
      {
        accessorKey: 'admin_aprueba_desbloqueo',
        header: 'APRUEBA DESBLOQUEO',
        size: TABLE_CONSTANTS.COLUMN_WIDTH_LARGE,
        enableColumnFilter: false,
        Cell: ({ row }: MRTSServiceType) =>
          formatTrazabilidadCell(
            row,
            SalesStatesActionsEnumChoice.PREVENTA__SIN_GESTION,
            'user_data.razon_social',
          ),
      },
    ],
    [preventaBaseColumns],
  );

  const preventasEsperaAceptacionColumns = useMemo<MRT_ColumnDef<Preventa>[]>(
    () => [
      ...preventaBaseColumns01,
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
      ...preventaBaseColumns02,
    ],
    [preventaBaseColumns01, preventaBaseColumns02],
  );

  const preventaEsperaPagoColumns = useMemo<MRT_ColumnDef<Preventa>[]>(
    () => [...preventaBaseColumns],
    [preventaBaseColumns],
  );

  const preventaRequiereCorreccionAceptacion = useMemo<
    MRT_ColumnDef<Preventa>[]
  >(() => [...preventaBaseColumns], [preventaBaseColumns]);

  return {
    preventaBaseColumns,
    preventaRealizadas,
    preventaFallidas,
    preventaSinGestion,
    preventasEsperaAceptacionColumns,
    preventaEsperaPagoColumns,
    preventaRequiereCorreccionAceptacion,
  };
};
