/* eslint-disable indent */
import type { MRT_ColumnDef, MRT_Row } from 'material-react-table';
import { useMemo } from 'react';

import { emptyCellOneLevel } from '@/shared';
import { SelectedEqPromoctionType } from '../SavePromocion';

type UseColumnsEquiposPromocion = {
  showActionColumn?: boolean;
  onActionRowNode?: (item: SelectedEqPromoctionType) => React.ReactNode;
};
type MRTEquiposPromocionTableType = {
  row: MRT_Row<SelectedEqPromoctionType>;
};

export const useSelectEqPromocion = ({
  showActionColumn,
  onActionRowNode,
}: UseColumnsEquiposPromocion = {}) => {
  const baseColumnsPreventa01 = useMemo<
    MRT_ColumnDef<SelectedEqPromoctionType>[]
  >(
    () => [
      {
        accessorKey: 'codigo',
        header: 'CÓDIGO',
        enableColumnFilter: false,
        Cell: ({ row }) => emptyCellOneLevel(row, 'codigo'),
      },
      {
        accessorKey: 'nombre',
        header: 'NOMBRE',
        Cell: ({ row }) => emptyCellOneLevel(row, 'nombre'),
      },

      ...(showActionColumn
        ? [
            {
              accessorKey: 'action',
              enableColumnFilter: false,
              header: 'ACCIÓN',
              Cell: ({ row }: MRTEquiposPromocionTableType) =>
                onActionRowNode?.(row.original),
            },
          ]
        : []),
    ],
    [onActionRowNode, showActionColumn],
  );

  return {
    baseColumnsPreventa01,
  };
};
