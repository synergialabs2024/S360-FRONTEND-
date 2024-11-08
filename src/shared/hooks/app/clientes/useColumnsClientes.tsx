import type { MRT_ColumnDef, MRT_Row } from 'material-react-table';
import { useMemo } from 'react';

import { returnUrlClientesFibraPage } from '@/app/cliente/cliente/pages/tables/ClientesFibraMainPage';
import { CustomTableLink } from '@/shared/components';
import { TABLE_CONSTANTS } from '@/shared/constants';
import { Cliente } from '@/shared/interfaces';
import { emptyCellNestedWithArray, emptyCellOneLevel } from '@/shared/utils';

type MRTClienteType = { row: MRT_Row<Cliente> };

export const useColumnsClientes = () => {
  const clientesFibraColumnsB01 = useMemo<MRT_ColumnDef<Cliente>[]>(
    () => [
      {
        accessorKey: 'identificacion',
        header: 'IDENTIFICACION',
        size: 180,
        enableColumnFilter: true,
        enableSorting: true,
        Cell: ({ row }: MRTClienteType) => {
          const original = row?.original;

          return (
            <CustomTableLink
              url={`${returnUrlClientesFibraPage}/${row.original?.uuid}`}
              text={original?.identificacion}
            />
          );
        },
      },
      {
        accessorKey: 'razon_social',
        header: 'NOMBRES',
        size: 312,
        enableColumnFilter: true,
        enableSorting: true,
        Cell: ({ row }: MRTClienteType) => {
          const original = row?.original;
          return (
            <CustomTableLink
              url={`${returnUrlClientesFibraPage}/${row.original?.uuid}`}
              text={original?.razon_social}
            />
          );
        },
      },
      {
        accessorKey: 'tipo_identificacion',
        header: 'TIPO IDENTIFICACION',
        size: TABLE_CONSTANTS.COLUMN_WIDTH_MEDIUM,
        enableColumnFilter: true,
        enableSorting: true,
        Cell: ({ row }: MRTClienteType) =>
          emptyCellOneLevel(row, 'tipo_identificacion'),
      },

      // first linea_servicio - contrato
      {
        accessorKey: 'numero_contrato__first_line',
        header: 'NUMERO CONTRATO',
        size: TABLE_CONSTANTS.COLUMN_WIDTH_MEDIUM,
        enableColumnFilter: true,
        enableSorting: true,
        Cell: ({ row }: MRTClienteType) => {
          return emptyCellNestedWithArray(
            row,
            ['linea_servicio_data', 'contrato_data', 'numero_contrato'],
            'h6',
            0,
          );
        },
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
