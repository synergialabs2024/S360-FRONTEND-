/* eslint-disable indent */
import type { MRT_ColumnDef, MRT_Row } from 'material-react-table';
import { useMemo } from 'react';
import {
  CuotaServiciosSeleccionadosProductoType,
  CuotaServiciosSeleccionadosTableType,
} from '../components/SaveBeneficioMantenedorBeneficios/form/cuota-servicios/CuotaServiciosSeleccionadosBeneficioMantenedorBeneficios';

type MRTProductoTableType = {
  row: MRT_Row<CuotaServiciosSeleccionadosProductoType>;
};

type useColumnsEquiposBeneficioMantenedorBeneficios = {
  showActionColumn?: boolean;
  onActionRowNode?: (
    item: CuotaServiciosSeleccionadosTableType,
  ) => React.ReactNode;
  onActionRowNodeProducto?: (
    item: CuotaServiciosSeleccionadosProductoType,
  ) => React.ReactNode;
};
export const useColumnsCuotaServiciosBeneficioMantenedorBeneficios = ({
  showActionColumn = true,
  onActionRowNodeProducto,
}: useColumnsEquiposBeneficioMantenedorBeneficios = {}) => {
  ///* base columns -------------------------------

  ///* productos ------------------------
  const cuotasBaseColumns = useMemo<
    MRT_ColumnDef<CuotaServiciosSeleccionadosProductoType>[]
  >(
    () => [
      {
        accessorKey: 'cuota',
        header: 'CUOTA',
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
    cuotasBaseColumns,
  };
};
