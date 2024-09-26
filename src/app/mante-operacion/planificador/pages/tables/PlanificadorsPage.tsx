import dayjs from 'dayjs';
import { useNavigate } from 'react-router-dom';

import { useFetchFlotas } from '@/actions/app';
import { ROUTER_PATHS } from '@/router/constants';
import {
  CustomSearch,
  CustomTable,
  SingleTableBoxScene,
} from '@/shared/components';
import { TABLE_CONSTANTS } from '@/shared/constants/ui';
import {
  useColumnsFlota,
  useTableFilter,
  useTableServerSideFiltering,
} from '@/shared/hooks';
import { useCheckPermission } from '@/shared/hooks/auth';
import { Flota, PermissionsEnum } from '@/shared/interfaces';
import { hasAllPermissions } from '@/shared/utils/auth';
import { usePlanificadoresStore } from '@/store/app';
import { useUiConfirmModalStore } from '@/store/ui';

export const returnUrlPlanificadorsPage =
  ROUTER_PATHS.mantenimientoOperacion.planificadoresNav;

export type PlanificadorsPageProps = {};

const PlanificadorsPage: React.FC<PlanificadorsPageProps> = () => {
  useCheckPermission(PermissionsEnum.mantenimientoope_view_planificador);

  const navigate = useNavigate();

  // server side filters - colums table
  const { filterObject, columnFilters, setColumnFilters } =
    useTableServerSideFiltering();

  ///* global state ---------------------
  const setConfirmDialog = useUiConfirmModalStore(s => s.setConfirmDialog);
  const setConfirmDialogIsOpen = useUiConfirmModalStore(
    s => s.setConfirmDialogIsOpen,
  );
  const setSelectedFleet = usePlanificadoresStore(s => s.setSelectedFleet);

  ///* table ---------------------
  const {
    globalFilter,
    pagination,
    searchTerm,
    onChangeFilter,
    setPagination,
  } = useTableFilter();
  const { pageIndex, pageSize } = pagination;

  ///* fetch data ---------------
  const {
    data: flotasPagingRes,
    isLoading,
    isRefetching,
  } = useFetchFlotas({
    enabled: true,
    params: {
      page: pageIndex + 1,
      page_size: pageSize,
      name: searchTerm,
      ...filterObject,
    },
  });

  ///* handlers ---------------------
  const onEdit = (flota: Flota) => {
    setConfirmDialog({
      isOpen: true,
      title: 'Administrar el planificador de cuadrilla',
      subtitle:
        '¿Está seguro que desea gestionar el planificador de cuadrilla?',
      onConfirm: () => {
        setSelectedFleet(flota);
        setConfirmDialogIsOpen(false);

        // build url ----------
        const weekMonday = dayjs()
          .startOf('week')
          .add(1, 'day')
          .format('YYYY-MM-DD');

        const url = `${returnUrlPlanificadorsPage}/flota/${flota.uuid}?initial_date=${weekMonday}`;

        navigate(url);
      },
    });
  };

  ///* columns
  const { flotasColumns } = useColumnsFlota();

  return (
    <SingleTableBoxScene title="Planificador" showCreateBtn={false}>
      <CustomSearch
        onChange={onChangeFilter}
        value={globalFilter}
        text="por nombre"
      />

      <CustomTable<Flota>
        columns={flotasColumns}
        data={flotasPagingRes?.data?.items || []}
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
        rowCount={flotasPagingRes?.data?.meta?.count}
        // // actions
        actionsColumnSize={TABLE_CONSTANTS.ACTIONCOLUMN_WIDTH}
        enableActionsColumn={hasAllPermissions([
          PermissionsEnum.mantenimientoope_change_planificador,
          PermissionsEnum.mantenimientoope_view_flota,
        ])}
        // crud
        canEdit={hasAllPermissions([
          PermissionsEnum.mantenimientoope_change_planificador,
          PermissionsEnum.mantenimientoope_view_flota,
        ])}
        onEdit={onEdit}
        canDelete={false}
      />
    </SingleTableBoxScene>
  );
};

export default PlanificadorsPage;
