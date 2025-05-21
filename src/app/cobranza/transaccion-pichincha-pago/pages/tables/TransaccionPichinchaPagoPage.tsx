import { useNavigate } from 'react-router';

import {
  CustomTable,
  CustomSearch,
  SingleTableBoxScene,
} from '@/shared/components';
import {
  useTableFilter,
  PermissionsEnum,
  TABLE_CONSTANTS,
  TransaccionPichinchaPago,
  useTableServerSideFiltering,
  useColumnsTransaccionPichinchaPago,
} from '@/shared';
import { ROUTER_PATHS } from '@/router/constants';
import { hasPermission } from '@/shared/utils/auth';
import { useUiConfirmModalStore } from '@/store/ui';
import { useCheckPermission } from '@/shared/hooks/auth';
import { useFetchTransaccionPichinchaPagos } from '@/actions/app';

export const returnUrlTransaccionPichinchaPagoPage =
  ROUTER_PATHS.cobranza.transaccionpichinchapagoNav;

export type TransaccionPichinchaPagosPageProps = {};

const TransaccionPichinchaPagosPage: React.FC<
  TransaccionPichinchaPagosPageProps
> = () => {
  useCheckPermission(PermissionsEnum.cobranza_view_transaccionpichinchapago);

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
    data: TransaccionPichinchaPagoPagingRes,
    isLoading,
    isRefetching,
  } = useFetchTransaccionPichinchaPagos({
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
  const onEdit = (tpp: TransaccionPichinchaPago) => {
    setConfirmDialog({
      isOpen: true,
      title: 'Editar Transaccion Pichincha Pago',
      subtitle: '¿Está seguro que desea editar este registro?',
      onConfirm: () => {
        setConfirmDialogIsOpen(false);
        navigate(`${returnUrlTransaccionPichinchaPagoPage}/editar/${tpp.uuid}`);
      },
    });
  };

  ///* columns
  const { transaccionPichinchaPagoColumns } =
    useColumnsTransaccionPichinchaPago();

  return (
    <SingleTableBoxScene
      title="Transaccion Pichincha Pago de Crédito"
      createPageUrl={`${returnUrlTransaccionPichinchaPagoPage}/crear`}
      showCreateBtn={hasPermission(
        PermissionsEnum.cobranza_add_transaccionpichinchapago,
      )}
    >
      <CustomSearch
        onChange={onChangeFilter}
        value={globalFilter}
        text="por nombre"
      />

      <CustomTable<TransaccionPichinchaPago>
        columns={transaccionPichinchaPagoColumns}
        data={TransaccionPichinchaPagoPagingRes?.data?.items || []}
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
        rowCount={TransaccionPichinchaPagoPagingRes?.data?.meta?.count}
        // // actions
        actionsColumnSize={TABLE_CONSTANTS.ACTIONCOLUMN_WIDTH}
        enableActionsColumn={hasPermission(
          PermissionsEnum.cobranza_change_transaccionpichinchapago,
        )}
        // crud
        canEdit={hasPermission(
          PermissionsEnum.cobranza_change_transaccionpichinchapago,
        )}
        onEdit={onEdit}
        canDelete={false}
      />
    </SingleTableBoxScene>
  );
};

export default TransaccionPichinchaPagosPage;
