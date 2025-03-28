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
  useFetchSolucionMantenedorBeneficios,
  useUpdateSolucionMantenedorBeneficio,
} from '@/actions/app/cartera/buzon-tareas/parametros/solucion-mantenedor-beneficios';
import {
  CausaMantenedorBeneficios,
  SolucionMantenedorBeneficios,
} from '@/shared/interfaces/app/cartera/buzon-tareas';
import { useNavigate } from 'react-router';

export const returnUrlSolucionMantenedorBeneficiosPage =
  ROUTER_PATHS.cartera.parametrosSolucionMantenedorBeneficiosNav;

export type SolucionMantenedorBeneficiosPageProps = {};

const SolucionMantenedorBeneficiosPage: React.FC<
  SolucionMantenedorBeneficiosPageProps
> = () => {
  const navigate = useNavigate();

  useCheckPermission(PermissionsEnum.cartera_view_solucionmantenedorbeneficio);

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
  const changeState = useUpdateSolucionMantenedorBeneficio({
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
    data: solucionMantenedorBeneficiosPaginatedRes,
    isLoading,
    isRefetching,
  } = useFetchSolucionMantenedorBeneficios({
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
  const columns = useMemo<MRT_ColumnDef<SolucionMantenedorBeneficios>[]>(
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

  const onEdit = (row: CausaMantenedorBeneficios) => {
    navigate(`${returnUrlSolucionMantenedorBeneficiosPage}/editar/${row.uuid}`);
  };

  return (
    <SingleTableBoxScene
      title="Solucion Mantenedor Beneficios"
      createPageUrl={`${returnUrlSolucionMantenedorBeneficiosPage}/crear`}
      showCreateBtn={hasPermission(
        PermissionsEnum.cartera_add_solucionmantenedorbeneficio,
      )}
    >
      <CustomSearch
        onChange={onChangeFilter}
        value={globalFilter}
        text="por nombre"
      />

      <CustomTable<SolucionMantenedorBeneficios>
        columns={columns}
        data={solucionMantenedorBeneficiosPaginatedRes?.data?.items || []}
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
        rowCount={solucionMantenedorBeneficiosPaginatedRes?.data?.meta?.count}
        // // actions
        /* actionsColumnSize={TABLE_CONSTANTS.ACTIONCOLUMN_WIDTH}
        enableActionsColumn={hasPermission(
          PermissionsEnum.tecnico_change_asuntoticket,
        )} */
        // crud
        /* canEdit={hasPermission(PermissionsEnum.tecnico_change_asuntoticket)} */
        canEdit={hasPermission(
          PermissionsEnum.cartera_change_solucionmantenedorbeneficio,
        )}
        onEdit={onEdit}
        canDelete={false}
      />
    </SingleTableBoxScene>
  );
};

export default SolucionMantenedorBeneficiosPage;
