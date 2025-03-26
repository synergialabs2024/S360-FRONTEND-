import { MRT_ColumnDef } from 'material-react-table';
import { IconDiamond } from '@tabler/icons-react';
import { useMemo } from 'react';

import { TABLE_CONSTANTS } from '@/shared/constants';
import { ParametroSistema } from '@/shared/interfaces';
import {
  TableModalGeneric,
  ViewMoreTextModalTableCell,
} from '@/shared/components';
import { emptyCellOneLevel, formatDateWithTimeCell } from '@/shared/utils';

export const useColumnsParametroSistema = () => {
  const parametrosistemaBaseColumns01 = useMemo<
    MRT_ColumnDef<ParametroSistema>[]
  >(
    () => [
      {
        accessorKey: 'name',
        header: 'NOMBRE',
        size: TABLE_CONSTANTS.COLUMN_WIDTH_NAME,
        Cell: ({ row }) => emptyCellOneLevel(row, 'name'),
      },
      {
        accessorKey: 'description',
        header: 'DESCRIPCION',
        size: TABLE_CONSTANTS.COLUMN_WIDTH_MEDIUM,
        enableColumnFilter: true,
        enableSorting: true,
        Cell: ({ row }) => {
          const str = row?.original?.description || 'N/A';
          return (
            <ViewMoreTextModalTableCell
              longText={str}
              limit={27}
              modalTitle={`Descripcion de ${row?.original?.name}`}
            />
          );
        },
      },
      {
        accessorKey: 'value',
        header: 'VALUE',
        size: TABLE_CONSTANTS.COLUMN_WIDTH_SMALL,
        Cell: ({ row }) => {
          const type = row?.original?.type;
          const str = row?.original?.value;

          let parsedValue: string | any[] = str;

          if (typeof str === 'string') {
            try {
              parsedValue = JSON.parse(str);
            } catch (error) {
              parsedValue = [];
            }
          }

          return type === 'ARRAY' ? (
            <TableModalGeneric
              Arrays={parsedValue}
              icon={<IconDiamond />}
              Title="Valor de Array"
            />
          ) : (
            emptyCellOneLevel(row, 'value')
          );
        },
      },
      {
        accessorKey: 'slug',
        header: 'SLUG',
        size: TABLE_CONSTANTS.COLUMN_WIDTH_SMALL,
        Cell: ({ row }) => emptyCellOneLevel(row, 'slug'),
      },
      {
        accessorKey: 'type',
        header: 'TIPO',
        size: TABLE_CONSTANTS.COLUMN_WIDTH_SMALL,
        enableColumnFilter: true,
        enableSorting: true,
        Cell: ({ row }) => emptyCellOneLevel(row, 'type'),
      },
    ],
    [],
  );

  const parametrosistemaColumns = useMemo<MRT_ColumnDef<ParametroSistema>[]>(
    () => [
      ...parametrosistemaBaseColumns01,
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
    [parametrosistemaBaseColumns01],
  );

  return {
    parametrosistemaColumns,
  };
};
