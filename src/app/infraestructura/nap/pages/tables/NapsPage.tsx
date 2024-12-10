import { useNavigate } from 'react-router-dom';

import { useFetchNaps } from '@/actions/app';
import { ROUTER_PATHS } from '@/router/constants';
import {
  CustomSearch,
  CustomTable,
  SingleTableBoxScene,
} from '@/shared/components';
import { TABLE_CONSTANTS } from '@/shared/constants/ui';
import {
  useColumnsSecondaryNap,
  useTableFilter,
  useTableServerSideFiltering,
} from '@/shared/hooks';
import { useCheckPermission } from '@/shared/hooks/auth';
import { Nap, PermissionsEnum } from '@/shared/interfaces';

import { hasPermission } from '@/shared/utils/auth';
import { useUiConfirmModalStore } from '@/store/ui';

export const returnUrlNapsPage = ROUTER_PATHS.infraestructura.secondarynapsNav;

export type NapsPageProps = {};

const NapsPage: React.FC<NapsPageProps> = () => {
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
    data: NapsPagingRes,
    isLoading,
    isRefetching,
  } = useFetchNaps({
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
  const onEdit = (nap: Nap) => {
    setConfirmDialog({
      isOpen: true,
      title: 'Editar Nap Secundaria',
      subtitle: '¿Está seguro que desea editar este registro?',
      onConfirm: () => {
        setConfirmDialogIsOpen(false);
        navigate(`${returnUrlNapsPage}/editar/${nap.uuid}`);
      },
    });
  };

  ///* columns
  const { secondaryNapColumns } = useColumnsSecondaryNap();

  return (
    <SingleTableBoxScene
      title="Cajas Naps Secundarias"
      createPageUrl={`${returnUrlNapsPage}/crear`}
      showCreateBtn={hasPermission(PermissionsEnum.infraestructura_add_nap)}
    >
      <CustomSearch
        onChange={onChangeFilter}
        value={globalFilter}
        text="por nombre"
      />

      <CustomTable<Nap>
        columns={secondaryNapColumns}
        data={NapsPagingRes?.data?.items || []}
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
        rowCount={NapsPagingRes?.data?.meta?.count}
        // // actions
        actionsColumnSize={TABLE_CONSTANTS.ACTIONCOLUMN_WIDTH}
        enableActionsColumn={hasPermission(
          PermissionsEnum.infraestructura_change_nap,
        )}
        // crud
        canEdit={hasPermission(PermissionsEnum.infraestructura_change_nap)}
        onEdit={onEdit}
        canDelete={false}
      />
    </SingleTableBoxScene>
  );
};

export default NapsPage;
