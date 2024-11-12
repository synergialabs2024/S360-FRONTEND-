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

      direccion: serviceLine?.solicitud_servicio_data?.direccion!,

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
        header: 'Linea ID',
        size: TABLE_CONSTANTS.COLUMN_WIDTH_MEDIUM,
      },
      {
        accessorKey: 'plan_contratado__name',
        header: 'Plan contratado',
        size: TABLE_CONSTANTS.COLUMN_WIDTH_MEDIUM,
      },
      {
        accessorKey: 'tipo_servicio',
        header: 'Tipo de servicio',
        size: TABLE_CONSTANTS.COLUMN_WIDTH_MEDIUM,
      },
      {
        accessorKey: 'tipo_plan',
        header: 'Tipo de plan',
        size: TABLE_CONSTANTS.COLUMN_WIDTH_MEDIUM,
      },

      {
        accessorKey: 'estado_linea',
        header: 'Estado de la línea',
        size: TABLE_CONSTANTS.COLUMN_WIDTH_MEDIUM,
      },

      {
        accessorKey: 'plan_contratado__precio',
        header: 'Precio del plan',
        size: TABLE_CONSTANTS.COLUMN_WIDTH_MEDIUM,
        Cell: ({ row }) => formatCurrencyCell(row, 'plan_contratado__precio'),
      },

      {
        accessorKey: 'numero_contrato',
        header: 'Número de contrato',
        size: TABLE_CONSTANTS.COLUMN_WIDTH_MEDIUM,
      },
      {
        accessorKey: 'identificacion_pago',
        header: 'Identificación de pago',
        size: TABLE_CONSTANTS.COLUMN_WIDTH_MEDIUM,
      },
      {
        accessorKey: 'url_contrato',
        header: 'URL contrato',
        size: TABLE_CONSTANTS.COLUMN_WIDTH_MEDIUM,
        Cell: ({ row }) => {
          const url = row.original.url_contrato;
          return url ? <PDFIconButton url={url} /> : 'N/A';
        },
      },
      {
        accessorKey: 'direccion',
        header: 'Dirección',
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
        header: 'PPPassword',
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
