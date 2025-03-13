import type { MRT_ColumnDef } from 'material-react-table';
import { useMemo } from 'react';

import {
  emptyCellNested,
  SystemUserItem,
  USER_ROLES_ARRAY_CHOICES,
} from '@/shared';

export const useSystemUsersColumns = () => {
  const userColumns = useMemo<MRT_ColumnDef<SystemUserItem>[]>(
    () => [
      {
        accessorKey: 'razon_social',
        header: 'NOMBRE',
        size: 222,
        Cell: ({ row }) => emptyCellNested(row, ['user', 'razon_social']),
      },
      {
        accessorKey: 'username',
        header: 'USUARIO',
        size: 150,
        Cell: ({ row }) => emptyCellNested(row, ['user', 'username']),
      },
      {
        accessorKey: 'email',
        header: 'EMAIL',
        size: 180,
        Cell: ({ row }) => emptyCellNested(row, ['user', 'email']),
      },

      // profile
      {
        accessorKey: 'identificacion',
        header: 'IDENTIFICACIÓN',
        size: 180,
        Cell: ({ row }) => emptyCellNested(row, ['user', 'identificacion']),
      },
      {
        accessorKey: 'role',
        header: 'ROL',
        size: 180,
        filterVariant: 'select',
        filterSelectOptions: USER_ROLES_ARRAY_CHOICES,
        Cell: ({ row }) => emptyCellNested(row, ['user', 'role']),
      },

      {
        accessorKey: 'tipoIdentificacion',
        header: 'TIPO IDENTIFICACIÓN',
        size: 180,
        Cell: ({ row }) =>
          emptyCellNested(row, ['user', 'tipo_identificacion']),
      },
      {
        accessorKey: 'area__name',
        header: 'ÁREA',
        size: 180,
        Cell: ({ row }) => emptyCellNested(row, ['user', 'area_data', 'name']),
      },
      {
        accessorKey: 'departamento__name',
        header: 'DEPARTAMENTO',
        size: 180,
        Cell: ({ row }) =>
          emptyCellNested(row, ['user', 'departamento_data', 'name']),
      },
      {
        accessorKey: 'canal_venta__name',
        header: 'CANAL DE VENTA',
        size: 180,
        Cell: ({ row }) =>
          emptyCellNested(row, ['user', 'canal_venta_data', 'name']),
      },
    ],
    [],
  );

  return { userColumns };
};
