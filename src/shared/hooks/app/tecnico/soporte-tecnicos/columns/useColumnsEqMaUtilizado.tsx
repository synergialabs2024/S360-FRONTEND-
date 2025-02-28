import { MRT_ColumnDef } from 'material-react-table';
import { useMemo } from 'react';

import { TABLE_CONSTANTS } from '@/shared/constants';
import ShowSerieSTModal from '../modal/ShowSerieSTModal';
import { emptyCellNested, emptyCellOneLevel } from '@/shared/utils';
import { Eq_Ma_Utilizados } from '../modal/ShowEquipoMaterialUtilizadosModal';

export const useColumnsEqMaUtilizado = () => {
  const utilizadosBaseColumns01 = useMemo<MRT_ColumnDef<Eq_Ma_Utilizados>[]>(
    () => [
      {
        accessorKey: 'codigo',
        header: 'Codigo',
        size: TABLE_CONSTANTS.COLUMN_WIDTH_MEDIUM,
        enableColumnFilter: true,
        enableSorting: true,
        Cell: ({ row }) => emptyCellOneLevel(row, 'codigo'),
      },
      {
        accessorKey: 'cantidad',
        header: 'Cantidad',
        size: TABLE_CONSTANTS.COLUMN_WIDTH_MEDIUM,
        enableColumnFilter: true,
        enableSorting: true,
        Cell: ({ row }) => emptyCellOneLevel(row, 'cantidad'),
      },
      {
        accessorKey: 'producto__nombre',
        header: 'Producto',
        size: TABLE_CONSTANTS.COLUMN_WIDTH_MEDIUM,
        enableColumnFilter: true,
        enableSorting: true,
        Cell: ({ row }) => emptyCellNested(row, ['producto_data', 'nombre']),
      },
      {
        accessorKey: 'series',
        header: 'SERIES',
        enableColumnFilter: false,
        size: TABLE_CONSTANTS.COLUMN_WIDTH_SMALL,
        Cell: ({ row }) => {
          return <ShowSerieSTModal Arrays={row.original.series} />;
        },
      },
    ],
    [],
  );

  const generalUtilizadoColumns = useMemo<MRT_ColumnDef<Eq_Ma_Utilizados>[]>(
    () => [...utilizadosBaseColumns01],
    [utilizadosBaseColumns01],
  );
  const materialUtilizadoColumns = useMemo<MRT_ColumnDef<Eq_Ma_Utilizados>[]>(
    () => [...utilizadosBaseColumns01],
    [utilizadosBaseColumns01],
  );
  const equipoUtilizadoColumns = useMemo<MRT_ColumnDef<Eq_Ma_Utilizados>[]>(
    () => [...utilizadosBaseColumns01],
    [utilizadosBaseColumns01],
  );

  return {
    materialUtilizadoColumns,
    equipoUtilizadoColumns,
    generalUtilizadoColumns,
  };
};
