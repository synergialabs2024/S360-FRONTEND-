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
  useFetchSubtipoMantenedorBeneficios,
  useUpdateSubtipoMantenedorBeneficio,
} from '@/actions/app/cartera/buzon-tareas/parametros/subtipo-mantenedor-beneficios';
import { SubtipoMantenedorBeneficios } from '@/shared/interfaces/app/cartera/buzon-tareas/parametros/subtipo-mantenedor-beneficios';

export const returnUrlSubtipoMantenedorBeneficiosPage =
  ROUTER_PATHS.cartera.parametrosSubtipoMantenedorBeneficiosNav;

export type SubtipoMantenedorBeneficiosPageProps = {};

const SubtipoMantenedorBeneficiosPage: React.FC<
  SubtipoMantenedorBeneficiosPageProps
> = () => {
  useCheckPermission(
    PermissionsEnum.cartera_change_subtipomantenedorbeneficios,
  );

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
  const changeState = useUpdateSubtipoMantenedorBeneficio({
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
    data: subTipoMantenedorBeneficiosPaginatedRes,
    isLoading,
    isRefetching,
  } = useFetchSubtipoMantenedorBeneficios({
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
  /* const onEdit = (TipoMantenedorBeneficios: TipoMantenedorBeneficios) => {
    setConfirmDialog({
      isOpen: true,
      title: 'Editar Tipo',
      subtitle: '¿Está seguro que desea editar este registro?',
      onConfirm: () => {
        setConfirmDialogIsOpen(false);
        navigate(
          `${returnUrlTipoMantenedorBeneficiosPage}/editar/${TipoMantenedorBeneficios.uuid}`,
        );
      },
    });
  }; */

  ///* columns
  const columns = useMemo<MRT_ColumnDef<SubtipoMantenedorBeneficios>[]>(
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

      {
        accessorKey: 'motivo',
        header: 'Motivo',
        size: TABLE_CONSTANTS.COLUMN_WIDTH_MEDIUM,
        enableColumnFilter: true,
        enableSorting: true,
        Cell: ({ row }) => emptyCellOneLevel(row, 'motivo'),
      },

      {
        accessorKey: 'causa',
        header: 'Causa',
        size: TABLE_CONSTANTS.COLUMN_WIDTH_MEDIUM,
        enableColumnFilter: true,
        enableSorting: true,
        Cell: ({ row }) => emptyCellOneLevel(row, 'causa'),
      },

      {
        accessorKey: 'solucion',
        header: 'Solucion',
        size: TABLE_CONSTANTS.COLUMN_WIDTH_MEDIUM,
        enableColumnFilter: true,
        enableSorting: true,
        Cell: ({ row }) => emptyCellOneLevel(row, 'solucion'),
      },
    ],
    [changeState, setConfirmDialog, setConfirmDialogIsOpen],
  );

  return (
    <SingleTableBoxScene
      title="Subtipo Mantenedor Beneficios"
      createPageUrl={`${returnUrlSubtipoMantenedorBeneficiosPage}/crear`}
      showCreateBtn={hasPermission(PermissionsEnum.tecnico_view_tickettecnico)}
    >
      <CustomSearch
        onChange={onChangeFilter}
        value={globalFilter}
        text="por nombre"
      />

      <CustomTable<SubtipoMantenedorBeneficios>
        columns={columns}
        data={subTipoMantenedorBeneficiosPaginatedRes?.data?.items || []}
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
        rowCount={subTipoMantenedorBeneficiosPaginatedRes?.data?.meta?.count}
        // // actions
        /* actionsColumnSize={TABLE_CONSTANTS.ACTIONCOLUMN_WIDTH}
        enableActionsColumn={hasPermission(
          PermissionsEnum.tecnico_change_asuntoticket,
        )} */
        // crud
        /* canEdit={hasPermission(PermissionsEnum.tecnico_change_asuntoticket)}
        onEdit={onEdit}
        canDelete={false} */
      />
    </SingleTableBoxScene>
  );
};

export default SubtipoMantenedorBeneficiosPage;
