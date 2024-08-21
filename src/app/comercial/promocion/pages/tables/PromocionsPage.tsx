import { MRT_ColumnDef } from 'material-react-table';
import { useMemo } from 'react';
import { useNavigate } from 'react-router-dom';

import { useFetchPromocions, useUpdatePromocion } from '@/actions/app';
import { ROUTER_PATHS } from '@/router/constants';
import {
  CustomSearch,
  CustomSwitch,
  CustomTable,
  SingleTableBoxScene,
  ViewMoreTextModalTableCell,
} from '@/shared/components';
import {
  DiscountTypeEnumChoice,
  SAVE_PROMOCION_PERMISSIONS,
} from '@/shared/constants/app';
import { MODEL_STATE_BOOLEAN, TABLE_CONSTANTS } from '@/shared/constants/ui';
import { useTableFilter, useTableServerSideFiltering } from '@/shared/hooks';
import { useCheckPermission } from '@/shared/hooks/auth';
import { PermissionsEnum, Promocion } from '@/shared/interfaces';
import { emptyCellOneLevel, formatDateWithTimeCell } from '@/shared/utils';
import { hasAllPermissions, hasPermission } from '@/shared/utils/auth';
import { useUiConfirmModalStore } from '@/store/ui';

export const returnUrlPromocionsPage = ROUTER_PATHS.comercial.promocionesNav;

export type PromocionsPageProps = {};

const PromocionsPage: React.FC<PromocionsPageProps> = () => {
  useCheckPermission(PermissionsEnum.comercial_view_promocion);

  const navigate = useNavigate();

  // server side filters - colums table
  const { filterObject, columnFilters, setColumnFilters } =
    useTableServerSideFiltering();

  ///* global state
  const setConfirmDialog = useUiConfirmModalStore(s => s.setConfirmDialog);
  const setConfirmDialogIsOpen = useUiConfirmModalStore(
    s => s.setConfirmDialogIsOpen,
  );

  ///* mutations
  const changeState = useUpdatePromocion({
    enableNavigate: false,
  });

  ///* table
  const {
    globalFilter,
    pagination,
    searchTerm,
    onChangeFilter,
    setPagination,
  } = useTableFilter();
  const { pageIndex, pageSize } = pagination;

  ///* fetch data
  const {
    data: PromocionsPagingRes,
    isLoading,
    isRefetching,
  } = useFetchPromocions({
    enabled: true,
    params: {
      page: pageIndex + 1,
      page_size: pageSize,
      name: searchTerm,
      ...filterObject,
      filterByState: false,
    },
  });

  ///* handlers
  const onEdit = (promocion: Promocion) => {
    setConfirmDialog({
      isOpen: true,
      title: 'Editar Promocion',
      subtitle: '¿Está seguro que desea editar este registro?',
      onConfirm: () => {
        setConfirmDialogIsOpen(false);
        navigate(`${returnUrlPromocionsPage}/editar/${promocion.uuid}`);
      },
    });
  };

  ///* columns
  const columns = useMemo<MRT_ColumnDef<Promocion>[]>(
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

      {
        accessorKey: 'prioridad',
        header: 'PRIORIDAD',
        size: TABLE_CONSTANTS.COLUMN_WIDTH_MEDIUM,
        enableColumnFilter: true,
        enableSorting: true,
        Cell: ({ row }) => emptyCellOneLevel(row, 'prioridad'),
      },
      {
        accessorKey: 'recurrencia',
        header: 'RECURRENCIA',
        size: TABLE_CONSTANTS.COLUMN_WIDTH_MEDIUM,
        enableColumnFilter: true,
        enableSorting: true,
        Cell: ({ row }) => emptyCellOneLevel(row, 'recurrencia'),
      },

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
      {
        accessorKey: 'meses_gratis',
        header: 'MESES GRATIS',
        size: TABLE_CONSTANTS.COLUMN_WIDTH_MEDIUM,
        enableColumnFilter: true,
        enableSorting: true,
        Cell: ({ row }) => {
          const str = row?.original?.meses_gratis
            ? row.original.meses_gratis.join(', ')
            : 'SIN SELECCIONAR';
          return (
            <ViewMoreTextModalTableCell
              longText={str}
              limit={27}
              modalTitle="Meses gratis con promoción"
            />
          );
        },
      },
      {
        accessorKey: 'meses_descuento',
        header: 'MESES DESCUENTO',
        size: TABLE_CONSTANTS.COLUMN_WIDTH_MEDIUM,
        enableColumnFilter: true,
        enableSorting: true,
        Cell: ({ row }) => {
          const str = row?.original?.meses_descuento
            ? row.original.meses_descuento.join(', ')
            : 'SIN SELECCIONAR';
          return (
            <ViewMoreTextModalTableCell
              longText={str}
              limit={27}
              modalTitle="Meses descuento con promoción"
            />
          );
        },
      },

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
                if (!hasPermission(PermissionsEnum.comercial_change_promocion))
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
    [changeState, setConfirmDialog, setConfirmDialogIsOpen],
  );

  return (
    <SingleTableBoxScene
      title="Promociones"
      createPageUrl={`${returnUrlPromocionsPage}/crear`}
      showCreateBtn={hasAllPermissions([
        PermissionsEnum.comercial_add_promocion,
        ...SAVE_PROMOCION_PERMISSIONS,
      ])}
    >
      <CustomSearch
        onChange={onChangeFilter}
        value={globalFilter}
        text="por nombre"
      />

      <CustomTable<Promocion>
        columns={columns}
        data={PromocionsPagingRes?.data?.items || []}
        isLoading={isLoading}
        isRefetching={isRefetching}
        // // filters - server side
        enableManualFiltering={true}
        columnFilters={columnFilters}
        onColumnFiltersChange={setColumnFilters}
        // // search
        enableGlobalFilter={false}
        // // pagination
        pagination={pagination}
        onPaging={setPagination}
        rowCount={PromocionsPagingRes?.data?.meta?.count}
        // // actions
        actionsColumnSize={TABLE_CONSTANTS.ACTIONCOLUMN_WIDTH}
        enableActionsColumn={hasAllPermissions([
          PermissionsEnum.comercial_change_promocion,
          ...SAVE_PROMOCION_PERMISSIONS,
        ])}
        // crud
        canEdit={hasAllPermissions([
          PermissionsEnum.comercial_change_promocion,
          ...SAVE_PROMOCION_PERMISSIONS,
        ])}
        onEdit={onEdit}
        canDelete={false}
      />
    </SingleTableBoxScene>
  );
};

export default PromocionsPage;
