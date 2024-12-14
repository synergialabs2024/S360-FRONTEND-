import type { MRT_ColumnDef, MRT_Row } from 'material-react-table';
import { useMemo } from 'react';

import { returnUrlClientesFibraPage } from '@/app/cliente/cliente/pages/tables/ClientesFibraMainPage';
import { CustomTableLink, PDFIconButton } from '@/shared/components';
import { TABLE_CONSTANTS } from '@/shared/constants';
import { Cliente } from '@/shared/interfaces';
import { emptyCellOneLevel, formatDateWithTimeCell } from '@/shared/utils';

type MRTClienteType = { row: MRT_Row<Cliente> };

export const useColumnsClientes = () => {
  const clientesFibraColumnsB01 = useMemo<MRT_ColumnDef<Cliente>[]>(
    () => [
      {
        accessorKey: 'identificacion',
        header: 'IDENTIFICACION',
        size: TABLE_CONSTANTS.COLUMN_WIDTH_SMALL,
        Cell: ({ row }: MRTClienteType) => {
          const original = row?.original;
          const firstLine = original?.linea_servicio_data?.[0];
          return (
            <CustomTableLink
              url={`${returnUrlClientesFibraPage}/${firstLine?.uuid}`}
              text={original?.identificacion}
            />
          );
        },
      },
      {
        accessorKey: 'razon_social',
        header: 'NOMBRES',
        size: TABLE_CONSTANTS.COLUMN_WIDTH_NAME,
        Cell: ({ row }: MRTClienteType) => {
          const original = row?.original;
          const firstLine = original?.linea_servicio_data?.[0];
          return (
            <CustomTableLink
              url={`${returnUrlClientesFibraPage}/${firstLine?.uuid}`}
              text={original?.razon_social}
            />
          );
        },
      },

      // first line service: contract, ...
      {
        accessorKey: 'numero_contrato__first_line',
        header: 'NUMERO CONTRATO',
        size: TABLE_CONSTANTS.COLUMN_WIDTH_MEDIUM,
        Cell: ({ row }: MRTClienteType) => {
          const original = row?.original;
          const firstLine = original?.linea_servicio_data?.[0];
          return firstLine?.contrato_data?.numero_contrato || 'N/A';
        },
      },
      {
        accessorKey: 'url_contrato_first_line',
        header: 'CONTRATO',
        size: TABLE_CONSTANTS.COLUMN_WIDTH_MEDIUM,
        enableColumnFilter: false,
        enableSorting: false,
        Cell: ({ row }: MRTClienteType) => {
          const original = row?.original;
          const firstLine = original?.linea_servicio_data?.[0];
          const contractUrl = firstLine?.contrato_data?.url_contrato;

          if (!contractUrl) return 'N/A';

          return <PDFIconButton url={contractUrl} />;
        },
      },

      {
        accessorKey: 'tipo_identificacion',
        header: 'TIPO IDENT.',
        size: TABLE_CONSTANTS.COLUMN_WIDTH_SMALL,
        Cell: ({ row }: MRTClienteType) =>
          emptyCellOneLevel(row, 'tipo_identificacion'),
      },
    ],
    [],
  );

  const clientesFibraColumnsB02 = useMemo<MRT_ColumnDef<Cliente>[]>(
    () => [
      {
        accessorKey: 'tipo_servicio',
        header: 'TIPO SERVICIO',
        size: TABLE_CONSTANTS.COLUMN_WIDTH_SMALL,
        Cell: ({ row }: MRTClienteType) =>
          emptyCellOneLevel(row, 'tipo_servicio'),
      },
      {
        accessorKey: 'tipo_plan',
        header: 'TIPO PLAN',
        size: TABLE_CONSTANTS.COLUMN_WIDTH_SMALL,
        Cell: ({ row }: MRTClienteType) => emptyCellOneLevel(row, 'tipo_plan'),
      },
    ],
    [],
  );

  const clientesFibraColumnsB03 = useMemo<MRT_ColumnDef<Cliente>[]>(
    () => [
      {
        accessorKey: 'linea_servicio__identificacion_pago',
        header: 'IDENTIFICACION DE PAGO',
        size: TABLE_CONSTANTS.COLUMN_WIDTH_LARGE,
        Cell: ({ row }: MRTClienteType) => {
          const original = row?.original;
          const firstLine = original?.linea_servicio_data?.[0];
          const idPago = firstLine?.contrato_data?.identificacion_pago;

          if (!idPago) return 'N/A';

          return idPago;
        },
      },
      {
        accessorKey: 'linea_servicio__tipo_plan',
        header: 'NOMBRE PLAN',
        size: TABLE_CONSTANTS.COLUMN_WIDTH_MEDIUM,
        Cell: ({ row }: MRTClienteType) => {
          const original = row?.original;
          const firstLine = original?.linea_servicio_data?.[0];
          const namePlan =
            firstLine?.contrato_data?.plan_internet_actual_data?.name;

          if (!namePlan) return 'N/A';

          return namePlan;
        },
      },

      {
        accessorKey: 'linea_servicio__direccion',
        header: 'DIRECCION',
        size: TABLE_CONSTANTS.COLUMN_WIDTH_MEDIUM,
        Cell: ({ row }: MRTClienteType) => {
          const original = row?.original;
          const firstLine = original?.linea_servicio_data?.[0];
          const direction = firstLine?.contrato_data?.direccion;

          if (!direction) return 'N/A';

          return direction;
        },
      },
    ],
    [],
  );

  const clientesFibraColumnsActivos = useMemo<MRT_ColumnDef<Cliente>[]>(
    () => [
      ...clientesFibraColumnsB01,
      ...clientesFibraColumnsB02,
      ...clientesFibraColumnsB03,
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
    [clientesFibraColumnsB01, clientesFibraColumnsB02, clientesFibraColumnsB03],
  );

  return {
    clientesFibraColumnsActivos,
  };
};
