import { MRT_ColumnDef } from 'material-react-table';
import { useMemo } from 'react';
import { useNavigate } from 'react-router-dom';

import { useFetchCiudades, useUpdateCiudad } from '@/actions/app';
import { ROUTER_PATHS } from '@/router/constants';
import {
  CustomSearch,
  CustomSwitch,
  CustomTable,
  SingleTableBoxScene,
} from '@/shared/components';
import { SAVE_CIUDAD_PERMISSIONS } from '@/shared/constants/app';
import {
  MODEL_BOOLEAN,
  MODEL_STATE_BOOLEAN,
  TABLE_CONSTANTS,
} from '@/shared/constants/ui';
import { useTableFilter, useTableServerSideFiltering } from '@/shared/hooks';
import { useCheckPermission } from '@/shared/hooks/auth';
import {
  ChangeModelStateData,
  Ciudad,
  PermissionsEnum,
} from '@/shared/interfaces';
import {
  emptyCellNested,
  emptyCellOneLevel,
  formatDateWithTimeCell,
  formatQuantity,
} from '@/shared/utils';
import { hasAllPermissions, hasPermission } from '@/shared/utils/auth';
import { useUiConfirmModalStore } from '@/store/ui';

export const returnUrlCiudadesPage = ROUTER_PATHS.administracion.ciudadesNav;

export type CiudadesPageProps = {};

const CiudadesPage: React.FC<CiudadesPageProps> = () => {
  useCheckPermission(PermissionsEnum.administration_view_ciudad);

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
  const changeHasCoverage = useUpdateCiudad<{ has_coverage: boolean }>({
    enableNavigate: false,
  });
  const changeState = useUpdateCiudad<ChangeModelStateData>({
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
    data: CiudadesPagingRes,
    isLoading,
    isRefetching,
  } = useFetchCiudades({
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
  const onEdit = (ciudad: Ciudad) => {
    setConfirmDialog({
      isOpen: true,
      title: 'Editar Ciudad',
      subtitle: '¿Está seguro que desea editar este registro?',
      onConfirm: () => {
        setConfirmDialogIsOpen(false);
        navigate(`${returnUrlCiudadesPage}/editar/${ciudad.uuid}`);
      },
    });
  };

  ///* columns
  const columns = useMemo<MRT_ColumnDef<Ciudad>[]>(
    () => [
      {
        accessorKey: 'name',
        header: 'NOMBRE',
        size: TABLE_CONSTANTS.COLUMN_WIDTH_MEDIUM,
        Cell: ({ row }) => emptyCellOneLevel(row, 'name'),
      },
      {
        accessorKey: 'metraje_autorizado',
        header: 'METRAJE AUTORIZADO',
        size: TABLE_CONSTANTS.COLUMN_WIDTH_SMALL,
        Cell: ({ row }) => {
          return row.original?.metraje_autorizado
            ? `${formatQuantity(row.original?.metraje_autorizado || 0)} m`
            : 'N/A';
        },
      },
      {
        accessorKey: 'has_coverage',
        header: 'COBERTURA',
        size: TABLE_CONSTANTS.COLUMN_WIDTH_SMALL,
        filterVariant: 'select',
        filterSelectOptions: MODEL_BOOLEAN,
        Cell: ({ row }) => (
          <CustomSwitch
            title="Cobertura"
            isSimpleBoolean
            checked={row.original?.has_coverage}
            onChangeChecked={() => {
              if (!hasPermission(PermissionsEnum.administration_change_ciudad))
                return;

              setConfirmDialog({
                isOpen: true,
                title: 'Cambiar Cobertura',
                subtitle:
                  '¿Está seguro que desea cambiar la cobertura de este registro?',
                onConfirm: () => {
                  setConfirmDialogIsOpen(false);
                  changeHasCoverage.mutate({
                    id: row.original.id!,
                    data: {
                      has_coverage: !row.original?.has_coverage,
                    },
                  });
                },
              });
            }}
          />
        ),
      },

      {
        accessorKey: 'pais__name',
        header: 'PAIS',
        size: TABLE_CONSTANTS.COLUMN_WIDTH_MEDIUM,
        Cell: ({ row }) => emptyCellNested(row, ['pais_data', 'name']),
      },
      {
        accessorKey: 'provincia__name',
        header: 'PROVINCIA',
        size: TABLE_CONSTANTS.COLUMN_WIDTH_MEDIUM,
        Cell: ({ row }) => emptyCellNested(row, ['provincia_data', 'name']),
      },

      {
        accessorKey: 'state',
        header: 'ESTADO',
        size: TABLE_CONSTANTS.COLUMN_WIDTH_SMALL,
        filterVariant: 'select',
        filterSelectOptions: MODEL_STATE_BOOLEAN,
        Cell: ({ row }) => (
          <CustomSwitch
            title="Estado"
            checked={row.original?.state}
            onChangeChecked={() => {
              if (
                !hasPermission(PermissionsEnum.administration_change_provincia)
              )
                return;

              setConfirmDialog({
                isOpen: true,
                title: 'Cambiar Estado',
                subtitle:
                  '¿Está seguro que desea cambiar el estado de este registro?',
                onConfirm: () => {
                  setConfirmDialogIsOpen(false);
                  changeState.mutate({
                    id: row.original.id!,
                    data: {
                      state: !row.original?.state,
                    },
                  });
                },
              });
            }}
          />
        ),
      },
      {
        accessorKey: 'uuid',
        header: 'UUID',
        size: TABLE_CONSTANTS.COLUMN_WIDTH_MEDIUM,
        Cell: ({ row }) => emptyCellOneLevel(row, 'uuid'),
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
    [changeHasCoverage, changeState, setConfirmDialog, setConfirmDialogIsOpen],
  );

  return (
    <SingleTableBoxScene
      title="Ciudades"
      createPageUrl={`${returnUrlCiudadesPage}/crear`}
      showCreateBtn={hasAllPermissions([
        PermissionsEnum.administration_add_ciudad,
        ...SAVE_CIUDAD_PERMISSIONS,
      ])}
    >
      <CustomSearch
        onChange={onChangeFilter}
        value={globalFilter}
        text="por nombre"
      />

      <CustomTable<Ciudad>
        columns={columns}
        data={CiudadesPagingRes?.data?.items || []}
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
        rowCount={CiudadesPagingRes?.data?.meta?.count}
        // // actions
        actionsColumnSize={TABLE_CONSTANTS.ACTIONCOLUMN_WIDTH}
        enableActionsColumn={hasAllPermissions([
          PermissionsEnum.administration_change_ciudad,
          ...SAVE_CIUDAD_PERMISSIONS,
        ])}
        // crud
        canEdit={hasAllPermissions([
          PermissionsEnum.administration_change_ciudad,
          ...SAVE_CIUDAD_PERMISSIONS,
        ])}
        onEdit={onEdit}
        canDelete={false}
      />
    </SingleTableBoxScene>
  );
};

export default CiudadesPage;
