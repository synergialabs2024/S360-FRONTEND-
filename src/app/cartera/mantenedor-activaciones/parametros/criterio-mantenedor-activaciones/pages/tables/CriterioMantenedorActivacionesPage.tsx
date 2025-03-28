import { MRT_ColumnDef } from 'material-react-table';
import { useMemo } from 'react';

import { ROUTER_PATHS } from '@/router/constants';
import {
  CustomSearch,
  CustomSwitch,
  CustomTable,
  SingleTableBoxScene,
} from '@/shared/components';
import { MODEL_STATE_BOOLEAN, TABLE_CONSTANTS } from '@/shared/constants/ui';
import { useTableFilter, useTableServerSideFiltering } from '@/shared/hooks';
import { useCheckPermission } from '@/shared/hooks/auth';
import { PermissionsEnum } from '@/shared/interfaces';
import { emptyCellOneLevel } from '@/shared/utils';
import { hasPermission } from '@/shared/utils/auth';
import { useUiConfirmModalStore } from '@/store/ui';
import {
  useFetchCriterioMantenedorActivaciones,
  useUpdateCriterioMantenedorActivacion,
} from '@/actions/app/cartera/buzon-tareas/parametros/criterio-mantenedor-activaciones';
import { CriterioMantenedorActivacion } from '@/shared/interfaces/app/cartera/mantenedor-activaciones';
import { useNavigate } from 'react-router';

export const returnUrlCriterioMantenedorActivacionesPage =
  ROUTER_PATHS.cartera.parametrosTipoMantenedorBeneficiosNav;

export type CriterioMantenedorActivacionesPageProps = {};

const CriterioMantenedorActivacionesPage: React.FC<
  CriterioMantenedorActivacionesPageProps
> = () => {
  const navigate = useNavigate();

  useCheckPermission(PermissionsEnum.cartera_view_criteriomantenedoractivacion);

  /* const navigate = useNavigate(); */

  // server side filters - colums table
  const { filterObject, columnFilters, setColumnFilters } =
    useTableServerSideFiltering();

  ///* global state
  const setConfirmDialog = useUiConfirmModalStore(s => s.setConfirmDialog);
  const setConfirmDialogIsOpen = useUiConfirmModalStore(
    s => s.setConfirmDialogIsOpen,
  );

  ///* mutations
  const changeState = useUpdateCriterioMantenedorActivacion({
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
    data: criterioMantenedorActivacionesRes,
    isLoading,
    isRefetching,
  } = useFetchCriterioMantenedorActivaciones({
    enabled: true,
    params: {
      page: pageIndex + 1,
      page_size: pageSize,
      name: searchTerm,
      ...filterObject,
      filterByState: false,
    },
  });

  ///* columns
  const columns = useMemo<MRT_ColumnDef<CriterioMantenedorActivacion>[]>(
    () => [
      {
        accessorKey: 'name',
        header: 'NOMBRE',
        size: TABLE_CONSTANTS.COLUMN_WIDTH_MEDIUM,
        enableColumnFilter: true,
        enableSorting: true,
        Cell: ({ row }) => emptyCellOneLevel(row, 'name'),
      },

      {
        accessorKey: 'description',
        header: 'descripcion',
        size: TABLE_CONSTANTS.COLUMN_WIDTH_MEDIUM,
        enableColumnFilter: true,
        enableSorting: true,
        Cell: ({ row }) => emptyCellOneLevel(row, 'description'),
      },

      {
        accessorKey: 'code',
        header: 'Codigo',
        size: TABLE_CONSTANTS.COLUMN_WIDTH_MEDIUM,
        enableColumnFilter: true,
        enableSorting: true,
        Cell: ({ row }) => emptyCellOneLevel(row, 'code'),
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
                if (!hasPermission(PermissionsEnum.tecnico_change_asuntoticket))
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
    ],
    [changeState, setConfirmDialog, setConfirmDialogIsOpen],
  );

  const onEdit = (row: CriterioMantenedorActivacion) => {
    navigate(
      `${returnUrlCriterioMantenedorActivacionesPage}/editar/${row.uuid}`,
    );
  };

  return (
    <SingleTableBoxScene
      title="criterio Mantenedor Activaciones"
      createPageUrl={`${returnUrlCriterioMantenedorActivacionesPage}/crear`}
      showCreateBtn={hasPermission(PermissionsEnum.tecnico_view_tickettecnico)}
    >
      <CustomSearch
        onChange={onChangeFilter}
        value={globalFilter}
        text="por nombre"
      />

      <CustomTable<CriterioMantenedorActivacion>
        columns={columns}
        data={criterioMantenedorActivacionesRes?.data?.items || []}
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
        rowCount={criterioMantenedorActivacionesRes?.data?.meta?.count}
        // // actions
        /* actionsColumnSize={TABLE_CONSTANTS.ACTIONCOLUMN_WIDTH}
        enableActionsColumn={hasPermission(
          PermissionsEnum.tecnico_change_asuntoticket,
        )} */
        // crud
        onEdit={onEdit}
        canDelete={false}
      />
    </SingleTableBoxScene>
  );
};

export default CriterioMantenedorActivacionesPage;
