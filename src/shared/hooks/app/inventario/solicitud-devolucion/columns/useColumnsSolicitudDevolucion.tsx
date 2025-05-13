import { MRT_ColumnDef } from 'material-react-table';
import { useMemo } from 'react';

import {
  emptyCellNested,
  emptyCellOneLevel,
  formatDateWithTimeCell,
} from '@/shared/utils';
import { TABLE_CONSTANTS } from '@/shared/constants';
import { SolicitudDevolucion } from '@/shared/interfaces';
import { ViewMoreTextModalTableCell } from '@/shared/components';
import ShowSolicitudMaterialModal from '@/app/inventario/solicitud-material/pages/modal/ShowSolicitudMaterialModal';

export const useColumnsSolicitudDevolucion = () => {
  const solicitudDevolucionBaseColumns01 = useMemo<
    MRT_ColumnDef<SolicitudDevolucion>[]
  >(
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
          return <ShowSolicitudMaterialModal Arrays={row.original} />;
        },
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
    ],
    [],
  );

  const solicitudDevolucionBaseColumns02 = useMemo<
    MRT_ColumnDef<SolicitudDevolucion>[]
  >(
    () => [
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
        Cell: ({ row }) => emptyCellNested(row, ['ubicacion_data', 'nombre']),
      },
      {
        accessorKey: 'ingreso_material__secuencial',
        header: 'INGRESO MATERIAL',
        size: TABLE_CONSTANTS.COLUMN_WIDTH_MEDIUM,
        enableColumnFilter: true,
        enableSorting: true,
        Cell: ({ row }) =>
          emptyCellNested(row, ['ingreso_material_data', 'secuencial']),
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

  const solicitudDevolucionColumns = useMemo<
    MRT_ColumnDef<SolicitudDevolucion>[]
  >(
    () => [
      ...solicitudDevolucionBaseColumns01,
      ...solicitudDevolucionBaseColumns02,
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
    [solicitudDevolucionBaseColumns01, solicitudDevolucionBaseColumns02],
  );
  return {
    solicitudDevolucionColumns,
  };
};
