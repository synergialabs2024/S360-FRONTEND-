import type { MRT_ColumnDef } from 'material-react-table';
import { useMemo } from 'react';

import { emptyCellNested, TABLE_CONSTANTS, type OrdenTrabajo } from '@/shared';

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
        accessorKey: 'razon_social',
        header: 'NOMBRES',
        size: TABLE_CONSTANTS.COLUMN_WIDTH_MEDIUM,
        Cell: ({ row }) =>
          emptyCellNested(row, ['solicitud_servicio_data', 'razon_social']),
      },
    ],
    [],
  );

  const installAsignadasEsperaOTColumns = useMemo<
    MRT_ColumnDef<OrdenTrabajo>[]
  >(() => [...otColumnsBase01], [otColumnsBase01]);

  return {
    installAsignadasEsperaOTColumns,
  };
};
