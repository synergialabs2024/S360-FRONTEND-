import { useNavigate } from 'react-router';

import {
  CausaTM,
  useTableFilter,
  PermissionsEnum,
  TABLE_CONSTANTS,
  useColumnsCausaTM,
  useTableServerSideFiltering,
} from '@/shared';
import {
  CustomTable,
  CustomSearch,
  SingleTableBoxScene,
  GridTableTabsContainerOnly,
} from '@/shared/components';
import { useFetchCausaTMs } from '@/actions/app';
import { ROUTER_PATHS } from '@/router/constants';
import { useUiConfirmModalStore } from '@/store/ui';
import { hasAllPermissions } from '@/shared/utils/auth';
import { useCheckPermission } from '@/shared/hooks/auth';

export const returnUrlCausaTMPage = ROUTER_PATHS.tickets.causaTMNav;

export type CausaTMPageProps = {};

const CausaTMPage: React.FC<CausaTMPageProps> = () => {
  useCheckPermission(PermissionsEnum.tecnico_view_causaticketmasivo);

  const navigate = useNavigate();

  // server side filters - colums table
  const { filterObject, columnFilters, setColumnFilters } =
    useTableServerSideFiltering();

  ///* global state
  const setConfirmDialog = useUiConfirmModalStore(s => s.setConfirmDialog);
  const setConfirmDialogIsOpen = useUiConfirmModalStore(
    s => s.setConfirmDialogIsOpen,
  );

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
    data: CausaTMPagingRes,
    isLoading,
    isRefetching,
  } = useFetchCausaTMs({
    params: {
      page: pageIndex + 1,
      page_size: pageSize,
      name: searchTerm,
      ...filterObject,
      filterByState: false,
    },
  });

  ///* handlers
  const onEdit = (causa_tm: CausaTM) => {
    setConfirmDialog({
      isOpen: true,
      title: 'Editar Causa del Ticket Masivo',
      subtitle: '¿Está seguro que desea editar este registro?',
      onConfirm: () => {
        setConfirmDialogIsOpen(false);
        navigate(`${returnUrlCausaTMPage}/editar/${causa_tm.uuid}`);
      },
    });
  };

  ///* columns
  const { causatmColumns } = useColumnsCausaTM();

  return (
    <SingleTableBoxScene
      title="Causa Ticket Masivo"
      createPageUrl={`${returnUrlCausaTMPage}/crear`}
      isMainTableStates
    >
      <GridTableTabsContainerOnly>
        <CustomSearch
          onChange={onChangeFilter}
          value={globalFilter}
          text="por nombre"
        />

        <CustomTable<CausaTM>
          columns={causatmColumns}
          data={CausaTMPagingRes?.data?.items || []}
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
          rowCount={CausaTMPagingRes?.data?.meta?.count}
          // // actions
          actionsColumnSize={TABLE_CONSTANTS.ACTIONCOLUMN_WIDTH}
          enableActionsColumn={hasAllPermissions([
            PermissionsEnum.tecnico_view_causaticketmasivo,
          ])}
          // crud
          canEdit={hasAllPermissions([
            PermissionsEnum.tecnico_view_causaticketmasivo,
          ])}
          onEdit={onEdit}
        />
      </GridTableTabsContainerOnly>
    </SingleTableBoxScene>
  );
};

export default CausaTMPage;
