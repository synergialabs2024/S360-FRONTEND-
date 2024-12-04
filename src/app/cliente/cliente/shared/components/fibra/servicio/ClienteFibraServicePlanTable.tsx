import type { MRT_ColumnDef } from 'material-react-table';
import { useMemo } from 'react';

import {
  Contrato,
  formatCurrencyCell,
  LineaServicio,
  OrdenTrabajo,
  Preventa,
  SolicitudServicio,
  TABLE_CONSTANTS,
} from '@/shared';
import {
  CustomMinimalTable,
  PasswordTableCell,
  PDFIconButton,
} from '@/shared/components';

export type ClienteFibraServicePlanTableProps = {
  serviceLine: LineaServicio;
};

type ServicePlanType = Pick<LineaServicio, 'uuid' | 'estado_linea'> &
  Pick<Contrato, 'numero_contrato' | 'identificacion_pago' | 'url_contrato'> &
  Pick<SolicitudServicio, 'direccion'> &
  Pick<Preventa, 'tipo_servicio' | 'tipo_plan'> &
  Pick<OrdenTrabajo, 'ipv4' | 'ipv6' | 'pppoe' | 'pppassword'> & {
    plan_contratado__name: string;
    plan_contratado__precio: string;
  };

const ClienteFibraServicePlanTable: React.FC<
  ClienteFibraServicePlanTableProps
> = ({ serviceLine }) => {
  const data: ServicePlanType[] = [
    {
      uuid: serviceLine?.uuid, //
      estado_linea: serviceLine?.estado_linea,

      numero_contrato: serviceLine?.contrato_data?.numero_contrato!,
      identificacion_pago: serviceLine?.contrato_data?.identificacion_pago!,
      url_contrato: serviceLine?.contrato_data?.url_contrato!,

      direccion: serviceLine?.solicitud_servicio_data?.direccion_referencia!,

      tipo_servicio: serviceLine?.preventa_data?.tipo_servicio!,
      tipo_plan: serviceLine?.preventa_data?.tipo_plan!,

      ipv4: serviceLine?.orden_trabajo_data?.ipv4!,
      ipv6: serviceLine?.orden_trabajo_data?.ipv6!,
      pppoe: serviceLine?.orden_trabajo_data?.pppoe!,
      pppassword: serviceLine?.orden_trabajo_data?.pppassword!,

      plan_contratado__name:
        serviceLine?.contrato_data?.plan_internet_actual_data?.name!, //
      plan_contratado__precio:
        serviceLine?.contrato_data?.plan_internet_actual_data?.valor!,
    },
  ];

  ///* columns ---------------------
  const columns = useMemo<MRT_ColumnDef<ServicePlanType>[]>(
    () => [
      {
        accessorKey: 'uuid',
        header: 'LINEA ID',
        size: TABLE_CONSTANTS.COLUMN_WIDTH_MEDIUM,
      },
      {
        accessorKey: 'plan_contratado__name',
        header: 'PLAN CONTRATADO',
        size: TABLE_CONSTANTS.COLUMN_WIDTH_MEDIUM,
      },
      {
        accessorKey: 'tipo_servicio',
        header: 'TIPO DE SERVICIO',
        size: TABLE_CONSTANTS.COLUMN_WIDTH_MEDIUM,
      },
      {
        accessorKey: 'tipo_plan',
        header: 'TIPO DE PLAN',
        size: TABLE_CONSTANTS.COLUMN_WIDTH_MEDIUM,
      },

      {
        accessorKey: 'estado_linea',
        header: 'ESTADO DE LA LÍNEA',
        size: TABLE_CONSTANTS.COLUMN_WIDTH_MEDIUM,
      },

      {
        accessorKey: 'plan_contratado__precio',
        header: 'PRECIO DEL PLAN',
        size: TABLE_CONSTANTS.COLUMN_WIDTH_MEDIUM,
        Cell: ({ row }) => formatCurrencyCell(row, 'plan_contratado__precio'),
      },

      {
        accessorKey: 'numero_contrato',
        header: 'NÚMERO DE CONTRATO',
        size: TABLE_CONSTANTS.COLUMN_WIDTH_MEDIUM,
      },
      {
        accessorKey: 'identificacion_pago',
        header: 'IDENTIFICACIÓN DE PAGO',
        size: TABLE_CONSTANTS.COLUMN_WIDTH_MEDIUM,
      },
      {
        accessorKey: 'url_contrato',
        header: 'URL CONTRATO',
        size: TABLE_CONSTANTS.COLUMN_WIDTH_MEDIUM,
        Cell: ({ row }) => {
          const url = row.original.url_contrato;
          return url ? <PDFIconButton url={url} /> : 'N/A';
        },
      },
      {
        accessorKey: 'direccion',
        header: 'DIRECCIÓN',
        size: TABLE_CONSTANTS.COLUMN_WIDTH_MEDIUM,
      },
      {
        accessorKey: 'ipv4',
        header: 'IPv4',
        size: TABLE_CONSTANTS.COLUMN_WIDTH_MEDIUM,
      },
      {
        accessorKey: 'ipv6',
        header: 'IPv6',
        size: TABLE_CONSTANTS.COLUMN_WIDTH_MEDIUM,
      },
      {
        accessorKey: 'pppoe',
        header: 'PPPoE',
        size: TABLE_CONSTANTS.COLUMN_WIDTH_MEDIUM,
      },
      {
        accessorKey: 'pppassword',
        header: 'PPPASSWORD',
        size: TABLE_CONSTANTS.COLUMN_WIDTH_MEDIUM,
        Cell: ({ row }) => {
          return (
            <PasswordTableCell password={row.original?.pppassword || 'N/A'} />
          );
        },
      },
    ],
    [],
  );

  return (
    <>
      <CustomMinimalTable<ServicePlanType>
        columns={columns}
        data={data || []}
        enablePagination
        density="comfortable"
      />
    </>
  );
};

export default ClienteFibraServicePlanTable;
