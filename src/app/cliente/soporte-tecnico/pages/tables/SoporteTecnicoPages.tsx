import { useNavigate } from 'react-router';

import {
  CustomTable,
  CustomSearch,
  SingleTableBoxScene,
} from '@/shared/components';
import {
  Cliente,
  useTableFilter,
  PermissionsEnum,
  TABLE_CONSTANTS,
  useColumnsSoporteTecnico,
  useTableServerSideFiltering,
} from '@/shared';
import { useFetchOrdenTrabajos } from '@/actions/app';
import { ROUTER_PATHS } from '@/router/constants';
import { useUiConfirmModalStore } from '@/store/ui';
import { hasPermission } from '@/shared/utils/auth';
import { useCheckPermission } from '@/shared/hooks/auth';

export const returnUrlSoporteTecnico = ROUTER_PATHS.clientes.soporteTecnicoNav;

export type SoporteTecnicoPagesProps = {};

const SoporteTecnicoPages: React.FC<SoporteTecnicoPagesProps> = () => {
  useCheckPermission(PermissionsEnum.tecnico_view_ordentrabajo);

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

  const {
    data: OTPagingRes,
    isLoading: isLoadingOT,
    isRefetching: isRefetchingOT,
  } = useFetchOrdenTrabajos({
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
  const onEdit = (cliente: Cliente) => {
    setConfirmDialog({
      isOpen: true,
      title: 'Editar Cliente',
      subtitle: '¿Está seguro que desea editar este registro?',
      onConfirm: () => {
        setConfirmDialogIsOpen(false);
        navigate(`${returnUrlSoporteTecnico}/editar/${cliente.uuid}`);
      },
    });
  };
  const { soporteTecnicoColumns } = useColumnsSoporteTecnico();

  return (
    <SingleTableBoxScene
      title="Soporte Tecnico"
      showCreateBtn={false}
      isMainTableStates
    >
      <CustomSearch
        onChange={onChangeFilter}
        value={globalFilter}
        text="por nombre"
      />

      <CustomTable<Cliente>
        columns={soporteTecnicoColumns}
        data={OTPagingRes?.data?.items || []}
        isLoading={isLoadingOT}
        isRefetching={isRefetchingOT}
        // // filters - server side
        enableManualFiltering={true}
        columnFilters={columnFilters}
        onColumnFiltersChange={setColumnFilters}
        // // search
        enableGlobalFilter={false}
        // // pagination
        pagination={pagination}
        onPaging={setPagination}
        rowCount={OTPagingRes?.data?.meta?.count}
        // // actions
        actionsColumnSize={TABLE_CONSTANTS.ACTIONCOLUMN_WIDTH}
        enableActionsColumn={hasPermission(
          PermissionsEnum.clientes_change_cliente,
        )}
        // crud
        canEdit={hasPermission(PermissionsEnum.clientes_change_cliente)}
        onEdit={onEdit}
        canDelete={false}
      />
    </SingleTableBoxScene>
  );
};

export default SoporteTecnicoPages;
