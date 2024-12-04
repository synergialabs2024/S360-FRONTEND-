import { useNavigate } from 'react-router';

import { useFetchPrimaryNaps } from '@/actions/app';
import { ROUTER_PATHS } from '@/router/constants';
import {
  PermissionsEnum,
  PrimaryNap,
  TABLE_CONSTANTS,
  useTableFilter,
  useTableServerSideFiltering,
} from '@/shared';
import {
  CustomSearch,
  CustomTable,
  SingleTableBoxScene,
} from '@/shared/components';
import { useColumnsPrimaryNap } from '@/shared/hooks/app/infraestructura/useColumnsPrimaryNap';
import { useCheckPermission } from '@/shared/hooks/auth';
import { hasPermission } from '@/shared/utils/auth';
import { useUiConfirmModalStore } from '@/store/ui';

export const returnUrlPrimaryNapsPage =
  ROUTER_PATHS.infraestructura.primarynapsNav;

export type PrimaryNapsPageProps = {};

const PrimaryNapsPage: React.FC<PrimaryNapsPageProps> = () => {
  //Pendiente a cambio
  useCheckPermission(PermissionsEnum.infraestructura_view_nap);

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
    data: PrimaryNapsPagingRes,
    isLoading,
    isRefetching,
  } = useFetchPrimaryNaps({
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
  const onEdit = (primarynap: PrimaryNap) => {
    setConfirmDialog({
      isOpen: true,
      title: 'Editar Nap Primaria',
      subtitle: '¿Está seguro que desea editar este registro?',
      onConfirm: () => {
        setConfirmDialogIsOpen(false);
        navigate(`${returnUrlPrimaryNapsPage}/editar/${primarynap.uuid}`);
      },
    });
  };

  ///* columns
  const { primaryNapColumns } = useColumnsPrimaryNap();

  return (
    <SingleTableBoxScene
      title="Cajas Primarias Nap"
      createPageUrl={`${returnUrlPrimaryNapsPage}/crear`}
      // Pendiente a cambio
      showCreateBtn={hasPermission(PermissionsEnum.infraestructura_add_nap)}
    >
      <CustomSearch
        onChange={onChangeFilter}
        value={globalFilter}
        text="por nombre"
      />

      <CustomTable<PrimaryNap>
        columns={primaryNapColumns}
        data={PrimaryNapsPagingRes?.data?.items || []}
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
        rowCount={PrimaryNapsPagingRes?.data?.meta?.count}
        // // actions
        actionsColumnSize={TABLE_CONSTANTS.ACTIONCOLUMN_WIDTH}
        enableActionsColumn={hasPermission(
          // Pendiente a cambio
          PermissionsEnum.infraestructura_change_nap,
        )}
        // crud
        //Pendiente a cambio
        canEdit={hasPermission(PermissionsEnum.infraestructura_change_nap)}
        onEdit={onEdit}
        canDelete={false}
      />
    </SingleTableBoxScene>
  );
};

export default PrimaryNapsPage;
