import {
  useFetchParametrosSistemas,
  useUpdateParametroSistema,
} from '@/actions/app';
import { ROUTER_PATHS } from '@/router/constants';
import {
  CustomSearch,
  CustomSwitch,
  CustomTable,
  SingleTableBoxScene,
  ViewMoreTextModalTableCell,
} from '@/shared/components';
import { MODEL_STATE_BOOLEAN, TABLE_CONSTANTS } from '@/shared/constants/ui';
import { useTableFilter, useTableServerSideFiltering } from '@/shared/hooks';
import { useCheckPermission } from '@/shared/hooks/auth';
import {
  ChangeModelStateData,
  ParametroSistema,
  PermissionsEnum,
} from '@/shared/interfaces';
import { emptyCellOneLevel, formatDateWithTimeCell } from '@/shared/utils';
import { hasPermission } from '@/shared/utils/auth';
import { useUiConfirmModalStore } from '@/store/ui';
import { MRT_ColumnDef } from 'material-react-table';
import { useMemo } from 'react';
import { useNavigate } from 'react-router-dom';

export const returnUrlParamestrosSistemasPage =
  ROUTER_PATHS.administracion.parametrosSistemasNav;

export type ParamestrosSistemasPageProps = {};

const ParamestrosSistemasPage: React.FC<ParamestrosSistemasPageProps> = () => {
  useCheckPermission(PermissionsEnum.administration_view_parametrosistema);

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
  const changeState = useUpdateParametroSistema<ChangeModelStateData>({
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
    data: ParametroSistemasPagingRes,
    isLoading,
    isRefetching,
  } = useFetchParametrosSistemas({
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
  const onEdit = (parametroSistema: ParametroSistema) => {
    setConfirmDialog({
      isOpen: true,
      title: 'Editar Parametro Sistema',
      subtitle: '¿Está seguro que desea editar este registro?',
      onConfirm: () => {
        setConfirmDialogIsOpen(false);
        navigate(
          `${returnUrlParamestrosSistemasPage}/editar/${parametroSistema.uuid}`,
        );
      },
    });
  };

  ///* columns
  const columns = useMemo<MRT_ColumnDef<ParametroSistema>[]>(
    () => [
      {
        accessorKey: 'name',
        header: 'NOMBRE',
        size: TABLE_CONSTANTS.COLUMN_WIDTH_MEDIUM,
        Cell: ({ row }) => emptyCellOneLevel(row, 'name'),
      },
      {
        accessorKey: 'description',
        header: 'DESCRIPCION',
        size: TABLE_CONSTANTS.COLUMN_WIDTH_MEDIUM,
        enableColumnFilter: true,
        enableSorting: true,
        Cell: ({ row }) => {
          const str = row?.original?.description
            ? row.original.description
            : 'N/A';
          return (
            <ViewMoreTextModalTableCell
              longText={str}
              limit={27}
              modalTitle={`Descripcion de ${row?.original?.name}`}
            />
          );
        },
      },
      {
        accessorKey: 'value',
        header: 'VALUE',
        size: TABLE_CONSTANTS.COLUMN_WIDTH_SMALL,
        Cell: ({ row }) => emptyCellOneLevel(row, 'value'),
      },
      {
        accessorKey: 'slug',
        header: 'SLUG',
        size: TABLE_CONSTANTS.COLUMN_WIDTH_SMALL,
        Cell: ({ row }) => emptyCellOneLevel(row, 'slug'),
      },
      {
        accessorKey: 'type',
        header: 'TIPO',
        size: TABLE_CONSTANTS.COLUMN_WIDTH_SMALL,
        enableColumnFilter: true,
        enableSorting: true,
        Cell: ({ row }) => emptyCellOneLevel(row, 'type'),
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
              if (
                !hasPermission(
                  PermissionsEnum.administration_change_parametrosistema,
                )
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
      title="Parámetro del Sistema"
      createPageUrl={`${returnUrlParamestrosSistemasPage}/crear`}
      showCreateBtn={hasPermission(
        PermissionsEnum.administration_add_parametrosistema,
      )}
    >
      <CustomSearch
        onChange={onChangeFilter}
        value={globalFilter}
        text="por nombre"
      />

      <CustomTable<ParametroSistema>
        columns={columns}
        data={ParametroSistemasPagingRes?.data?.items || []}
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
        rowCount={ParametroSistemasPagingRes?.data?.meta.count}
        // // actions
        actionsColumnSize={TABLE_CONSTANTS.ACTIONCOLUMN_WIDTH}
        enableActionsColumn={hasPermission(
          PermissionsEnum.administration_change_parametrosistema,
        )}
        // crud
        canEdit={hasPermission(
          PermissionsEnum.administration_change_parametrosistema,
        )}
        onEdit={onEdit}
        canDelete={false}
      />
    </SingleTableBoxScene>
  );
};

export default ParamestrosSistemasPage;
