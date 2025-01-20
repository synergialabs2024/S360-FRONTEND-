import { ViewMoreTextModalTableCell } from '@/shared/components';
import { TABLE_CONSTANTS } from '@/shared/constants';
import { MovimientoMaterial } from '@/shared/interfaces';
import {
  emptyCellNested,
  emptyCellOneLevel,
  formatDateWithTimeCell,
} from '@/shared/utils';
import { MRT_ColumnDef } from 'material-react-table';
import { useMemo } from 'react';

export const useColumnsMovimientoMaterial = () => {
  ///* global state

  const movimientoMaterialBaseColumns01 = useMemo<
    MRT_ColumnDef<MovimientoMaterial>[]
  >(
    () => [
      {
        accessorKey: 'uuid',
        header: 'REFERENCIA',
        size: TABLE_CONSTANTS.COLUMN_WIDTH_MEDIUM,
        Cell: ({ row }) => emptyCellNested(row, ['uuid']),
      },
      {
        accessorKey: 'cantidad',
        header: 'CANTIDAD',
        size: TABLE_CONSTANTS.COLUMN_WIDTH_MEDIUM,
        Cell: ({ row }) => emptyCellOneLevel(row, 'cantidad'),
      },
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
        accessorKey: 'tipo_movimiento',
        header: 'TIPO MOVIMIENTO',
        size: TABLE_CONSTANTS.COLUMN_WIDTH_MEDIUM,
        Cell: ({ row }) => emptyCellOneLevel(row, 'tipo_movimiento'),
      },
    ],
    [],
  );

  const movimientoMaterialBaseColumns02 = useMemo<
    MRT_ColumnDef<MovimientoMaterial>[]
  >(
    () => [
      {
        accessorKey: 'producto',
        header: 'PRODUCTO',
        size: TABLE_CONSTANTS.COLUMN_WIDTH_MEDIUM,
        Cell: ({ row }) => emptyCellNested(row, ['producto_data', 'nombre']),
      },
      {
        accessorKey: 'bodega_origen',
        header: 'BODEGA ORIGEN',
        size: TABLE_CONSTANTS.COLUMN_WIDTH_MEDIUM,
        enableColumnFilter: true,
        enableSorting: true,
        Cell: ({ row }) => {
          const str = row?.original?.bodega_origen_data?.nombre
            ? row.original.bodega_origen_data.nombre
            : 'No contiene';
          return (
            <ViewMoreTextModalTableCell
              longText={str}
              limit={27}
              modalTitle="Bodega Origen"
            />
          );
        },
      },
      {
        accessorKey: 'ubicacion_origen',
        header: 'UBICACIÓN ORIGEN',
        size: TABLE_CONSTANTS.COLUMN_WIDTH_MEDIUM,
        enableColumnFilter: true,
        enableSorting: true,
        Cell: ({ row }) => {
          const str = row?.original?.ubicacion_origen_data?.nombre
            ? row.original.ubicacion_origen_data.nombre
            : 'No contiene';
          return (
            <ViewMoreTextModalTableCell
              longText={str}
              limit={27}
              modalTitle="Ubicacion Origen"
            />
          );
        },
      },
      {
        accessorKey: 'bodega_destino',
        header: 'BODEGA DESTINO',
        size: TABLE_CONSTANTS.COLUMN_WIDTH_MEDIUM,
        enableColumnFilter: true,
        enableSorting: true,
        Cell: ({ row }) => {
          const str = row?.original?.bodega_destino_data?.nombre
            ? row.original.bodega_destino_data.nombre
            : 'No contiene';
          return (
            <ViewMoreTextModalTableCell
              longText={str}
              limit={27}
              modalTitle="Bodega Destino"
            />
          );
        },
      },
      {
        accessorKey: 'ubicacion_destino',
        header: 'UBICACIÓN DESTINO',
        size: TABLE_CONSTANTS.COLUMN_WIDTH_MEDIUM,
        enableColumnFilter: true,
        enableSorting: true,
        Cell: ({ row }) => {
          const str = row?.original?.ubicacion_destino_data?.nombre
            ? row.original.ubicacion_destino_data.nombre
            : 'No contiene';
          return (
            <ViewMoreTextModalTableCell
              longText={str}
              limit={27}
              modalTitle="Ubicacion Destino"
            />
          );
        },
      },
    ],
    [],
  );

  const movimientoMaterialColumns = useMemo<
    MRT_ColumnDef<MovimientoMaterial>[]
  >(
    () => [
      ...movimientoMaterialBaseColumns01,
      ...movimientoMaterialBaseColumns02,
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
    [movimientoMaterialBaseColumns01, movimientoMaterialBaseColumns02],
  );
  return {
    movimientoMaterialColumns,
  };
};
