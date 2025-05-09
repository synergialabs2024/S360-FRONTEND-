import { useNavigate } from 'react-router-dom';

import {
  CustomSearch,
  CustomTable,
  SingleTableBoxScene,
} from '@/shared/components';
import {
  useTableFilter,
  useColumnsMotivoRechazo,
  useTableServerSideFiltering,
} from '@/shared/hooks';
import { ROUTER_PATHS } from '@/router/constants';
import { useUiConfirmModalStore } from '@/store/ui';
import { hasPermission } from '@/shared/utils/auth';
import { useFetchMotivoRechazos } from '@/actions/app';
import { TABLE_CONSTANTS } from '@/shared/constants/ui';
import { useCheckPermission } from '@/shared/hooks/auth';
import { MotivoRechazo, PermissionsEnum } from '@/shared/interfaces';

export const returnUrlMotivosRechazoPage =
  ROUTER_PATHS.administracion.motivosRechazoNav;

export type MotivosRechazoPageProps = {};

const MotivosRechazoPage: React.FC<MotivosRechazoPageProps> = () => {
  useCheckPermission(PermissionsEnum.administration_view_motivorechazo);

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
    data: MotivosRechazoPagingRes,
    isLoading,
    isRefetching,
  } = useFetchMotivoRechazos({
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
  const onEdit = (motivorechazo: MotivoRechazo) => {
    setConfirmDialog({
      isOpen: true,
      title: 'Editar Motivo de Rechazo',
      subtitle: '¿Está seguro que desea editar este registro?',
      onConfirm: () => {
        setConfirmDialogIsOpen(false);
        navigate(`${returnUrlMotivosRechazoPage}/editar/${motivorechazo.uuid}`);
      },
    });
  };

  const { motivorechazoColumns } = useColumnsMotivoRechazo();

  return (
    <SingleTableBoxScene
      title="Motivos de Rechazo"
      createPageUrl={`${returnUrlMotivosRechazoPage}/crear`}
      showCreateBtn={hasPermission(
        PermissionsEnum.administration_add_motivorechazo,
      )}
    >
      <CustomSearch
        onChange={onChangeFilter}
        value={globalFilter}
        text="por nombre"
      />

      <CustomTable<MotivoRechazo>
        columns={motivorechazoColumns}
        data={MotivosRechazoPagingRes?.data?.items || []}
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
        rowCount={MotivosRechazoPagingRes?.data?.meta?.count}
        // // actions
        actionsColumnSize={TABLE_CONSTANTS.ACTIONCOLUMN_WIDTH}
        enableActionsColumn={hasPermission(
          PermissionsEnum.administration_change_motivorechazo,
        )}
        // crud
        canEdit={hasPermission(
          PermissionsEnum.administration_change_motivorechazo,
        )}
        onEdit={onEdit}
      />
    </SingleTableBoxScene>
  );
};

export default MotivosRechazoPage;
