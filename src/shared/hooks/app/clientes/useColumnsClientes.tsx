import type { MRT_ColumnDef, MRT_Row } from 'material-react-table';
import { useMemo } from 'react';

import { returnUrlClientesFibraPage } from '@/app/cliente/cliente/pages/tables/ClientesFibraMainPage';
import { CustomTableLink, PDFIconButton } from '@/shared/components';
import { TABLE_CONSTANTS } from '@/shared/constants';
import { Cliente } from '@/shared/interfaces';
import { emptyCellOneLevel } from '@/shared/utils';

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

  const clientesFibraColumnsActivos = useMemo<MRT_ColumnDef<Cliente>[]>(
    () => [...clientesFibraColumnsB01],
    [clientesFibraColumnsB01],
  );

  return {
    clientesFibraColumnsActivos,
  };
};
