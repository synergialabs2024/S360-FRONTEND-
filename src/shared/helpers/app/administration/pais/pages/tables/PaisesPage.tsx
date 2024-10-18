import { MRT_ColumnDef } from 'material-react-table';
import { useMemo } from 'react';
import { useNavigate } from 'react-router-dom';

import { useFetchPaises, useUpdatePais } from '@/actions/app';
import { ROUTER_PATHS } from '@/router/constants';
import {
  CustomSearch,
  CustomSwitch,
  CustomTable,
  SingleTableBoxScene,
} from '@/shared/components';
import {
  MODEL_BOOLEAN,
  MODEL_STATE_BOOLEAN,
  TABLE_CONSTANTS,
} from '@/shared/constants/ui';
import { useTableFilter, useTableServerSideFiltering } from '@/shared/hooks';
import { useCheckPermission } from '@/shared/hooks/auth';
import {
  ChangeModelStateData,
  Pais,
  PermissionsEnum,
} from '@/shared/interfaces';
import { hasPermission } from '@/shared/utils/auth';
import {
  emptyCellOneLevel,
  formatDateWithTimeCell,
} from '@/shared/utils/format-data';
import { useUiConfirmModalStore } from '@/store/ui';

export const returnUrlPaisesPage = ROUTER_PATHS.administracion.paisNav;

export type PaisesPageProps = {};

const PaisesPage: React.FC<PaisesPageProps> = () => {
  useCheckPermission(PermissionsEnum.administration_view_pais);

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
  const changeState = useUpdatePais<ChangeModelStateData>({
    enableNavigate: false,
  });
  const changeHasCoverage = useUpdatePais<{ has_coverage: boolean }>({
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
    data: PaissPagingRes,
    isLoading,
    isRefetching,
  } = useFetchPaises({
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
  const onEdit = (pais: Pais) => {
    setConfirmDialog({
      isOpen: true,
      title: 'Editar Pais',
      subtitle: '¿Está seguro que desea editar este registro?',
      onConfirm: () => {
        setConfirmDialogIsOpen(false);
        navigate(`${returnUrlPaisesPage}/editar/${pais.uuid}`);
      },
    });
  };

  // const onDelete = (pais: Pais) => {
  //   setConfirmDialog({
  //     isOpen: true,
  //     title: 'Eliminar Pais',
  //     subtitle: '¿Está seguro que desea eliminar este registro?',
  //     onConfirm: () => {
  //       setConfirmDialogIsOpen(false);
  //       deletePais.mutate(pais.id!);
  //     },
  //   });
  // };

  ///* columns
  const columns = useMemo<MRT_ColumnDef<Pais>[]>(
    () => [
      {
        accessorKey: 'name',
        header: 'NOMBRE',
        size: TABLE_CONSTANTS.COLUMN_WIDTH_MEDIUM,
        Cell: ({ row }) => emptyCellOneLevel(row, 'name'),
      },
      {
        accessorKey: 'iso_code',
        header: 'ISO CODE',
        size: TABLE_CONSTANTS.COLUMN_WIDTH_SMALL,
        Cell: ({ row }) => emptyCellOneLevel(row, 'iso_code'),
      },
      {
        accessorKey: 'nationality',
        header: 'NACIONALIDAD',
        size: TABLE_CONSTANTS.COLUMN_WIDTH_MEDIUM,
        Cell: ({ row }) => emptyCellOneLevel(row, 'nationality'),
      },
      {
        accessorKey: 'has_coverage',
        header: 'COBERTURA',
        size: TABLE_CONSTANTS.COLUMN_WIDTH_MEDIUM,
        filterVariant: 'select',
        filterSelectOptions: MODEL_BOOLEAN,
        Cell: ({ row }) => (
          <CustomSwitch
            title="Cobertura"
            checked={row.original?.has_coverage}
            isSimpleBoolean
            onChangeChecked={() => {
              if (!hasPermission(PermissionsEnum.administration_change_pais))
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
        accessorKey: 'state',
        header: 'ESTADO',
        size: TABLE_CONSTANTS.COLUMN_WIDTH_MEDIUM,
        filterVariant: 'select',
        filterSelectOptions: MODEL_STATE_BOOLEAN,
        Cell: ({ row }) => (
          <CustomSwitch
            title="Estado"
            checked={row.original?.state}
            onChangeChecked={() => {
              if (!hasPermission(PermissionsEnum.administration_change_pais))
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
      title="Paises"
      createPageUrl={`${returnUrlPaisesPage}/crear`}
      showCreateBtn={hasPermission(PermissionsEnum.administration_add_pais)}
    >
      <CustomSearch
        onChange={onChangeFilter}
        value={globalFilter}
        text="por nombre"
      />

      <CustomTable<Pais>
        columns={columns}
        data={PaissPagingRes?.data?.items || []}
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
        rowCount={PaissPagingRes?.data?.meta.count}
        // // actions
        actionsColumnSize={TABLE_CONSTANTS.ACTIONCOLUMN_WIDTH}
        enableActionsColumn={hasPermission(
          PermissionsEnum.administration_change_pais,
        )}
        // crud
        canEdit={hasPermission(PermissionsEnum.administration_change_pais)}
        onEdit={onEdit}
        canDelete={false}
      />
    </SingleTableBoxScene>
  );
};

export default PaisesPage;
