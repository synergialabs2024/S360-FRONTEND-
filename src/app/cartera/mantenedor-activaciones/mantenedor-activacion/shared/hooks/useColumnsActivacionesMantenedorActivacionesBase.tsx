/* eslint-disable indent */
import type { MRT_ColumnDef, MRT_Row } from 'material-react-table';
import { useMemo } from 'react';
import {
  ActivacionesSeleccionadosProductoType,
  ActivacionesSeleccionadosTableType,
} from '../components/SaveMantenedorActivacion/form/activaciones/ActivacionesSeleccionadosMantenedorActivacionesBase';
import { emptyCellNested, formatBooleanCell, TABLE_CONSTANTS } from '@/shared';

type MRTProductoTableType = {
  row: MRT_Row<ActivacionesSeleccionadosProductoType>;
};

type useColumnsEquiposBeneficioMantenedorBeneficios = {
  showActionColumn?: boolean;
  onActionRowNode?: (
    item: ActivacionesSeleccionadosTableType,
  ) => React.ReactNode;
  onActionRowNodeProducto?: (
    item: ActivacionesSeleccionadosProductoType,
  ) => React.ReactNode;
};
export const useColumnsActivacionesMantenedorActivacionesBase = ({
  showActionColumn = true,
  onActionRowNodeProducto,
}: useColumnsEquiposBeneficioMantenedorBeneficios = {}) => {
  ///* base columns -------------------------------

  ///* productos ------------------------
  const activacionesBaseColumns = useMemo<
    MRT_ColumnDef<ActivacionesSeleccionadosProductoType>[]
  >(
    () => [
      {
        accessorKey: 'code',
        header: 'CODIGO',
      },
      {
        accessorKey: 'mantenedor_activaciones__motivo',
        header: 'MOTIVO',
        size: TABLE_CONSTANTS.COLUMN_WIDTH_MEDIUM,
        enableColumnFilter: true,
        enableSorting: true,
        Cell: ({ row }) => emptyCellNested(row, ['motivo_data', 'nombre']),
      },

      {
        accessorKey: 'tiempo_bloqueo',
        header: 'TIEMPO BLOQUEO',
      },

      {
        accessorKey: 'tiempo_limite',
        header: 'TIEMPO LIMITE',
      },

      {
        accessorKey: 'incluye_facturacion',
        header: 'INCLUYE FACTURACION',
        size: TABLE_CONSTANTS.COLUMN_WIDTH_MEDIUM,
        enableColumnFilter: true,
        enableSorting: true,
        Cell: ({ row }) => formatBooleanCell(row, 'incluye_facturacion'),
      },

      {
        accessorKey: 'incluye_notificacion',
        header: 'INCLUYE NOTIFICACION',
        size: TABLE_CONSTANTS.COLUMN_WIDTH_MEDIUM,
        enableColumnFilter: true,
        enableSorting: true,
        Cell: ({ row }) => formatBooleanCell(row, 'incluye_notificacion'),
      },

      ...(showActionColumn
        ? [
            {
              accessorKey: 'action',
              enableColumnFilter: false,
              header: 'ACCIÓN',
              Cell: ({ row }: MRTProductoTableType) =>
                onActionRowNodeProducto?.(row.original),
            },
          ]
        : []),
    ],
    [onActionRowNodeProducto, showActionColumn],
  );

  return {
    activacionesBaseColumns,
  };
};
