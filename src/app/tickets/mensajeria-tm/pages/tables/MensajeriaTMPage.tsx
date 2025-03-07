import { useNavigate } from 'react-router';

import {
  CustomTable,
  CustomSearch,
  SingleTableBoxScene,
  GridTableTabsContainerOnly,
} from '@/shared/components';
import {
  MensajeriaTM,
  useTableFilter,
  PermissionsEnum,
  TABLE_CONSTANTS,
  useColumnsMensajeriaTM,
  useTableServerSideFiltering,
} from '@/shared';
import { ROUTER_PATHS } from '@/router/constants';
import { useUiConfirmModalStore } from '@/store/ui';
import { useFetchMensajeriaTMs } from '@/actions/app';
import { hasAllPermissions } from '@/shared/utils/auth';
import { useCheckPermission } from '@/shared/hooks/auth';

export const returnUrlMensajeriaTMPage = ROUTER_PATHS.tickets.mensajeriaTMNav;

export type MensajeriaTMPageProps = {};

const MensajeriaTMPage: React.FC<MensajeriaTMPageProps> = () => {
  useCheckPermission(PermissionsEnum.tecnico_view_mensajeriaticketmasivo);

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
    data: MensajeriaTMPagingRes,
    isLoading,
    isRefetching,
  } = useFetchMensajeriaTMs({
    params: {
      page: pageIndex + 1,
      page_size: pageSize,

      name: searchTerm,

      ...filterObject,
      filterByState: false,
    },
  });

  ///* handlers
  const onEdit = (mensajeria_tm: MensajeriaTM) => {
    setConfirmDialog({
      isOpen: true,
      title: 'Editar Mensajeria del Ticket Masivo',
      subtitle: '¿Está seguro que desea editar este registro?',
      onConfirm: () => {
        setConfirmDialogIsOpen(false);
        navigate(`${returnUrlMensajeriaTMPage}/editar/${mensajeria_tm.uuid}`);
      },
    });
  };

  ///* columns
  const { mensajeriatmColumns } = useColumnsMensajeriaTM();

  return (
    <SingleTableBoxScene
      title="Mensajeria Ticket Masivo"
      createPageUrl={`${returnUrlMensajeriaTMPage}/crear`}
      isMainTableStates
    >
      <GridTableTabsContainerOnly>
        <CustomSearch
          onChange={onChangeFilter}
          value={globalFilter}
          text="por nombre"
        />

        <CustomTable<MensajeriaTM>
          columns={mensajeriatmColumns}
          data={MensajeriaTMPagingRes?.data?.items || []}
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
          rowCount={MensajeriaTMPagingRes?.data?.meta?.count}
          // // actions
          actionsColumnSize={TABLE_CONSTANTS.ACTIONCOLUMN_WIDTH}
          enableActionsColumn={hasAllPermissions([
            PermissionsEnum.tecnico_view_mensajeriaticketmasivo,
          ])}
          // crud
          canEdit={hasAllPermissions([
            PermissionsEnum.tecnico_view_mensajeriaticketmasivo,
          ])}
          onEdit={onEdit}
        />
      </GridTableTabsContainerOnly>
    </SingleTableBoxScene>
  );
};

export default MensajeriaTMPage;
