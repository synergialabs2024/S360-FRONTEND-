import { useMemo } from 'react';
import { MRT_ColumnDef } from 'material-react-table';

import { ViewMoreTextModalTableCell } from '@/shared/components';
import { TABLE_CONSTANTS } from '@/shared/constants';
import { IngresoMaterial } from '@/shared/interfaces';
import { emptyCellNested, formatDateWithTimeCell } from '@/shared/utils';
import ShowSeriesModal from '@/app/inventario/egreso-material/pages/modal/ShowSeriesModal';

export const useColumnsIngresoMaterial = () => {
  const ingresoProductoBaseColumns = useMemo<MRT_ColumnDef<IngresoMaterial>[]>(
    () => [
      {
        accessorKey: 'created_at',
        header: 'FECHA CREADA',
        size: TABLE_CONSTANTS.COLUMN_WIDTH_MEDIUM,
        enableColumnFilter: false,
        enableSorting: false,
        Cell: ({ row }) => formatDateWithTimeCell(row, 'created_at'),
      },
      {
        accessorKey: 'productos',
        header: 'PRODUCTOS',
        enableColumnFilter: false,
        size: TABLE_CONSTANTS.COLUMN_WIDTH_MEDIUM,
        Cell: ({ row }) => {
          return (
            <ShowSeriesModal
              productoBoolean={true}
              Arrays={row.original.productos}
            />
          );
        },
      },
    ],
    [],
  );

  const ingresoMaterialBaseColumns01 = useMemo<
    MRT_ColumnDef<IngresoMaterial>[]
  >(
    () => [
      {
        accessorKey: 'observacion',
        header: 'OBSERVACIÓN',
        size: TABLE_CONSTANTS.COLUMN_WIDTH_MEDIUM,
        enableColumnFilter: true,
        enableSorting: true,
        Cell: ({ row }) => {
          const str = row?.original?.observacion
            ? row.original.observacion
            : 'N/A';
          return (
            <ViewMoreTextModalTableCell
              longText={str}
              limit={27}
              modalTitle="Observacion"
            />
          );
        },
      },
      {
        accessorKey: 'bodega__name',
        header: 'BODEGA',
        size: TABLE_CONSTANTS.COLUMN_WIDTH_MEDIUM,
        Cell: ({ row }) => emptyCellNested(row, ['bodega_data', 'nombre']),
      },
      {
        accessorKey: 'ubicacion__name',
        header: 'UBICACIÓN',
        size: TABLE_CONSTANTS.COLUMN_WIDTH_MEDIUM,
        Cell: ({ row }) => emptyCellNested(row, ['ubicacion_data', 'nombre']),
      },
    ],
    [],
  );

  const ingresoMaterialColumns = useMemo<MRT_ColumnDef<IngresoMaterial>[]>(
    () => [
      ...ingresoProductoBaseColumns,
      ...ingresoMaterialBaseColumns01,
      {
        accessorKey: 'modified_at',
        header: 'MODIFICADO',
        size: TABLE_CONSTANTS.COLUMN_WIDTH_MEDIUM,
        enableColumnFilter: false,
        enableSorting: false,
        Cell: ({ row }) => formatDateWithTimeCell(row, 'modified_at'),
      },
    ],
    [ingresoMaterialBaseColumns01, ingresoProductoBaseColumns],
  );
  return {
    ingresoMaterialColumns,
  };
};
