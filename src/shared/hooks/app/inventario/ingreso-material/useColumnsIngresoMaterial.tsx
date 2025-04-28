import { MRT_ColumnDef } from 'material-react-table';
import { useMemo } from 'react';

import {
  emptyCellNested,
  emptyCellOneLevel,
  formatDateWithTimeCell,
} from '@/shared/utils';
import { ShowSeriesModal } from '../modals';
import { TABLE_CONSTANTS } from '@/shared/constants';
import { IngresoMaterial } from '@/shared/interfaces';
import { ViewMoreTextModalTableCell } from '@/shared/components';

export const useColumnsIngresoMaterial = () => {
  const ingresoProductoBaseColumns = useMemo<MRT_ColumnDef<IngresoMaterial>[]>(
    () => [
      {
        accessorKey: 'secuencial',
        header: 'NUMERO REGISTRO',
        size: TABLE_CONSTANTS.COLUMN_WIDTH_SMALL,
        enableColumnFilter: true,
        enableSorting: true,
        Cell: ({ row }) => emptyCellOneLevel(row, 'secuencial'),
      },
      {
        accessorKey: 'productos',
        header: 'PRODUCTOS',
        enableColumnFilter: false,
        size: TABLE_CONSTANTS.COLUMN_WIDTH_SMALL,
        Cell: ({ row }) => {
          return <ShowSeriesModal Arrays={row.original} />;
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
        accessorKey: 'bodega__nombre',
        header: 'BODEGA',
        size: TABLE_CONSTANTS.COLUMN_WIDTH_MEDIUM,
        enableColumnFilter: true,
        enableSorting: true,
        Cell: ({ row }) => emptyCellNested(row, ['bodega_data', 'nombre']),
      },
      {
        accessorKey: 'ubicacion__nombre',
        header: 'UBICACIÓN',
        size: TABLE_CONSTANTS.COLUMN_WIDTH_MEDIUM,
        enableColumnFilter: true,
        enableSorting: true,
        Cell: ({ row }) => emptyCellNested(row, ['ubicacion_data', 'nombre']),
      },
      {
        accessorKey: 'motivo_ingreso__nombre',
        header: 'MOTIVO',
        size: TABLE_CONSTANTS.COLUMN_WIDTH_MEDIUM,
        enableColumnFilter: true,
        enableSorting: true,
        Cell: ({ row }) =>
          emptyCellNested(row, ['motivo_ingreso_data', 'nombre']),
      },
      {
        accessorKey: 'user_create__razon_social',
        header: 'USUARIO',
        size: TABLE_CONSTANTS.COLUMN_WIDTH_MEDIUM,
        enableColumnFilter: true,
        enableSorting: true,
        Cell: ({ row }) =>
          emptyCellNested(row, ['user_create_data', 'razon_social']),
      },
    ],
    [],
  );

  const ingresoMaterialColumns = useMemo<MRT_ColumnDef<IngresoMaterial>[]>(
    () => [
      ...ingresoProductoBaseColumns,
      ...ingresoMaterialBaseColumns01,
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
    [ingresoMaterialBaseColumns01, ingresoProductoBaseColumns],
  );
  return {
    ingresoMaterialColumns,
  };
};
