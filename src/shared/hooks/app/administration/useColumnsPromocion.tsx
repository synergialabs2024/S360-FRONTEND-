import { MRT_ColumnDef } from 'material-react-table';
import { useMemo } from 'react';

import { useUpdatePromocion } from '@/actions/app';
import { CustomSwitch, ViewMoreTextModalTableCell } from '@/shared/components';
import {
  DiscountTypeEnumChoice,
  MODEL_STATE_BOOLEAN,
  TABLE_CONSTANTS,
} from '@/shared/constants';
import { PermissionsEnum, Promocion } from '@/shared/interfaces';
import { emptyCellOneLevel, formatDateWithTimeCell } from '@/shared/utils';
import { hasPermission } from '@/shared/utils/auth';
import { useUiConfirmModalStore } from '@/store/ui';

type UseColumsPromocionParams = {
  canUpdStateInTable?: boolean;
};

export const useColumnsPromocion = ({
  canUpdStateInTable = true,
}: UseColumsPromocionParams = {}) => {
  ///* mutations ----------------
  const changeState = useUpdatePromocion({
    enableNavigate: false,
  });

  ///* global state ----------------
  const setConfirmDialog = useUiConfirmModalStore(s => s.setConfirmDialog);
  const setConfirmDialogIsOpen = useUiConfirmModalStore(
    s => s.setConfirmDialogIsOpen,
  );

  ///* columns ----------------
  const baseColumns00 = useMemo<MRT_ColumnDef<Promocion>[]>(
    () => [
      {
        accessorKey: 'name',
        header: 'NOMBRE',
        size: TABLE_CONSTANTS.COLUMN_WIDTH_LARGE,
        enableColumnFilter: true,
        enableSorting: true,
        Cell: ({ row }) => emptyCellOneLevel(row, 'name'),
      },
      {
        accessorKey: 'tipo_descuento',
        header: 'TIPO DESCUENTO',
        size: TABLE_CONSTANTS.COLUMN_WIDTH_MEDIUM,
        enableColumnFilter: true,
        enableSorting: true,
        Cell: ({ row }) => emptyCellOneLevel(row, 'tipo_descuento'),
      },
      {
        accessorKey: 'valor_descuento',
        header: 'VALOR DESCUENTO',
        size: TABLE_CONSTANTS.COLUMN_WIDTH_MEDIUM,
        enableColumnFilter: true,
        enableSorting: true,
        Cell: ({ row }) => {
          return row?.original?.valor_descuento
            ? `${row.original.valor_descuento} ${row.original?.tipo_descuento === DiscountTypeEnumChoice.PORCENTAJE ? '%' : 'USD'}`
            : 'N/A';
        },
      },
    ],
    [],
  );

  const baseColumns01DisccountFreeMonth = useMemo<MRT_ColumnDef<Promocion>[]>(
    () => [
      {
        accessorKey: 'facturas_descuento',
        header: 'FACTURAS DESCUENTO',
        size: TABLE_CONSTANTS.COLUMN_WIDTH_MEDIUM,
        enableColumnFilter: true,
        enableSorting: true,
        Cell: ({ row }) => {
          const str = row?.original?.facturas_descuento
            ? row.original.facturas_descuento.join(', ')
            : 'SIN SELECCIONAR';
          return (
            <ViewMoreTextModalTableCell
              longText={str}
              limit={27}
              modalTitle="Facturas con descuento"
            />
          );
        },
      },

      {
        accessorKey: 'facturas_gratis',
        header: 'FACTURAS GRATIS',
        size: TABLE_CONSTANTS.COLUMN_WIDTH_MEDIUM,
        enableColumnFilter: true,
        enableSorting: true,
        Cell: ({ row }) => {
          const str = row?.original?.facturas_gratis
            ? row.original.facturas_gratis.join(', ')
            : 'SIN SELECCIONAR';
          return (
            <ViewMoreTextModalTableCell
              longText={str}
              limit={27}
              modalTitle="Facturas gratuitas"
            />
          );
        },
      },
    ],
    [],
  );

  const promocionsColumns = useMemo<MRT_ColumnDef<Promocion>[]>(
    () => [
      ...baseColumns00,

      {
        accessorKey: 'fecha_inicio',
        header: 'FECHA INICIO',
        size: TABLE_CONSTANTS.COLUMN_WIDTH_MEDIUM,
        enableColumnFilter: true,
        enableSorting: true,
        Cell: ({ row }) => emptyCellOneLevel(row, 'fecha_inicio'),
      },
      {
        accessorKey: 'fecha_fin',
        header: 'FECHA FIN',
        size: TABLE_CONSTANTS.COLUMN_WIDTH_MEDIUM,
        enableColumnFilter: true,
        enableSorting: true,
        Cell: ({ row }) => emptyCellOneLevel(row, 'fecha_fin'),
      },

      // {
      //   accessorKey: 'prioridad',
      //   header: 'PRIORIDAD',
      //   size: TABLE_CONSTANTS.COLUMN_WIDTH_MEDIUM,
      //   enableColumnFilter: true,
      //   enableSorting: true,
      //   Cell: ({ row }) => emptyCellOneLevel(row, 'prioridad'),
      // },
      // {
      //   accessorKey: 'recurrencia',
      //   header: 'RECURRENCIA',
      //   size: TABLE_CONSTANTS.COLUMN_WIDTH_MEDIUM,
      //   enableColumnFilter: true,
      //   enableSorting: true,
      //   Cell: ({ row }) => emptyCellOneLevel(row, 'recurrencia'),
      // },

      // {
      //   accessorKey: 'paises',
      //   header: 'PAISES',
      //   size: TABLE_CONSTANTS.COLUMN_WIDTH_MEDIUM,
      //   enableColumnFilter: true,
      //   enableSorting: true,
      //   Cell: ({ row }) => emptyCellOneLevel(row, 'paises'),
      // },
      {
        accessorKey: 'planes',
        header: 'PLANES',
        size: TABLE_CONSTANTS.COLUMN_WIDTH_MEDIUM,
        enableColumnFilter: true,
        enableSorting: true,
        Cell: ({ row }) => {
          const str = row?.original?.planes_data?.length
            ? (row.original.planes_data as any[]).includes('*')
              ? 'TODOS'
              : row.original.planes_data.map(item => item.name).join(', ')
            : 'NO SELECCIONADOS';
          return (
            <ViewMoreTextModalTableCell
              longText={str}
              limit={27}
              modalTitle="Planes con promoción"
            />
          );
        },
      },
      {
        accessorKey: 'provincias',
        header: 'PROVINCIAS',
        size: TABLE_CONSTANTS.COLUMN_WIDTH_MEDIUM,
        enableColumnFilter: true,
        enableSorting: true,
        Cell: ({ row }) => {
          const str = row?.original?.provincias_data?.length
            ? (row.original.provincias_data as any[]).includes('*')
              ? 'TODOS'
              : row.original.provincias_data.map(item => item.name).join(', ')
            : 'NO SELECCIONADOS';
          return (
            <ViewMoreTextModalTableCell
              longText={str}
              limit={27}
              modalTitle="Provincias con promoción"
            />
          );
        },
      },
      {
        accessorKey: 'ciudades',
        header: 'CIUDADES',
        size: TABLE_CONSTANTS.COLUMN_WIDTH_MEDIUM,
        enableColumnFilter: true,
        enableSorting: true,
        Cell: ({ row }) => {
          const str = row?.original?.ciudades_data?.length
            ? (row.original.ciudades_data as any[]).includes('*')
              ? 'TODOS'
              : row.original.ciudades_data.map(item => item.name).join(', ')
            : 'NO SELECCIONADOS';
          return (
            <ViewMoreTextModalTableCell
              longText={str}
              limit={27}
              modalTitle="Ciudades con promoción"
            />
          );
        },
      },
      {
        accessorKey: 'zonas',
        header: 'ZONAS',
        size: TABLE_CONSTANTS.COLUMN_WIDTH_MEDIUM,
        enableColumnFilter: true,
        enableSorting: true,
        Cell: ({ row }) => {
          const str = row?.original?.zonas_data?.length
            ? (row.original.zonas_data as any[]).includes('*')
              ? 'TODOS'
              : row.original.zonas_data.map(item => item.name).join(', ')
            : 'NO SELECCIONADOS';
          return (
            <ViewMoreTextModalTableCell
              longText={str}
              limit={27}
              modalTitle="Zonas con promoción"
            />
          );
        },
      },
      {
        accessorKey: 'sectores',
        header: 'SECTORES',
        size: TABLE_CONSTANTS.COLUMN_WIDTH_MEDIUM,
        enableColumnFilter: true,
        enableSorting: true,
        Cell: ({ row }) => {
          const str = row?.original?.sectores_data?.length
            ? (row.original.sectores_data as any[]).includes('*')
              ? 'TODOS'
              : row.original.sectores_data.map(item => item.name).join(', ')
            : 'SIN SELECCIONAR';
          return (
            <ViewMoreTextModalTableCell
              longText={str}
              limit={27}
              modalTitle="Sectores con promoción"
            />
          );
        },
      },
      // {
      //   accessorKey: 'canales_venta',
      //   header: 'CANALES VENTA',
      //   size: TABLE_CONSTANTS.COLUMN_WIDTH_MEDIUM,
      //   enableColumnFilter: true,
      //   enableSorting: true,
      //   Cell: ({ row }) => emptyCellOneLevel(row, 'canales_venta'),
      // },

      ...baseColumns01DisccountFreeMonth,

      {
        accessorKey: 'state',
        header: 'ESTADO',
        size: TABLE_CONSTANTS.COLUMN_WIDTH_SMALL,
        enableSorting: false,
        filterVariant: 'select',
        filterSelectOptions: MODEL_STATE_BOOLEAN,
        Cell: ({ row }) => {
          return typeof row.original?.state === 'boolean' ? (
            <CustomSwitch
              title="state"
              checked={row.original?.state}
              onChangeChecked={() => {
                if (
                  !hasPermission(
                    PermissionsEnum.comercial_change_promocion ||
                      !canUpdStateInTable,
                  )
                )
                  return;

                setConfirmDialog({
                  isOpen: true,
                  title: 'Cambiar state',
                  subtitle:
                    '¿Está seguro que desea cambiar el state de este registro?',
                  onConfirm: () => {
                    changeState.mutate({
                      id: row.original.id!,
                      data: {
                        state: !row.original.state,
                      },
                    });
                    setConfirmDialogIsOpen(false);
                  },
                });
              }}
            />
          ) : (
            'N/A'
          );
        },
      },

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
    [
      baseColumns00,
      baseColumns01DisccountFreeMonth,
      canUpdStateInTable,
      changeState,
      setConfirmDialog,
      setConfirmDialogIsOpen,
    ],
  );

  const promocionPreventaColumns = useMemo<MRT_ColumnDef<Promocion>[]>(
    () => [...baseColumns00, ...baseColumns01DisccountFreeMonth],
    [baseColumns00, baseColumns01DisccountFreeMonth],
  );

  return { promocionsColumns, promocionPreventaColumns };
};
