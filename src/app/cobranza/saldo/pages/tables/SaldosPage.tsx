import { useNavigate } from 'react-router-dom';

import { useFetchSaldos } from '@/actions/app';
import { ROUTER_PATHS } from '@/router/constants';
import {
  CustomSearch,
  CustomTable,
  SingleTableBoxScene,
} from '@/shared/components';
import { TABLE_CONSTANTS } from '@/shared/constants/ui';
import {
  useColumnsSaldos,
  useTableFilter,
  useTableServerSideFiltering,
} from '@/shared/hooks';
import { useCheckPermission } from '@/shared/hooks/auth';
import { PermissionsEnum, Saldo } from '@/shared/interfaces';
import { hasPermission } from '@/shared/utils/auth';
import { useUiConfirmModalStore } from '@/store/ui';

export const returnUrlSaldosPage = ROUTER_PATHS.cobranza.saldosNav;

export type SaldosPageProps = {};

const SaldosPage: React.FC<SaldosPageProps> = () => {
  useCheckPermission(PermissionsEnum.cobranza_view_saldo);

  const navigate = useNavigate();

  // server side filters - colums table
  const { filterObject, columnFilters, setColumnFilters } =
    useTableServerSideFiltering();

  ///* global state ---------------------
  const setConfirmDialog = useUiConfirmModalStore(s => s.setConfirmDialog);
  const setConfirmDialogIsOpen = useUiConfirmModalStore(
    s => s.setConfirmDialogIsOpen,
  );

  ///* table ---------------------
  const {
    globalFilter,
    pagination,
    searchTerm,
    onChangeFilter,
    setPagination,
  } = useTableFilter();
  const { pageIndex, pageSize } = pagination;

  ///* fetch data ---------------------
  const {
    data: SaldosPagingRes,
    isLoading,
    isRefetching,
  } = useFetchSaldos({
    enabled: true,
    params: {
      page: pageIndex + 1,
      page_size: pageSize,
      name: searchTerm,
      ...filterObject,
      filterByState: false,
    },
  });

  ///* handlers ---------------------
  const onEdit = (saldo: Saldo) => {
    setConfirmDialog({
      isOpen: true,
      title: 'Editar Saldo',
      subtitle: '¿Está seguro que desea editar este registro?',
      onConfirm: () => {
        setConfirmDialogIsOpen(false);
        navigate(`${returnUrlSaldosPage}/editar/${saldo.uuid}`);
      },
    });
  };

  ///* columns ---------------------
  const { genericColumns } = useColumnsSaldos();

  return (
    <SingleTableBoxScene
      title="Saldos"
      createPageUrl={`${returnUrlSaldosPage}/crear`}
      showCreateBtn={hasPermission(PermissionsEnum.cobranza_add_saldo)}
    >
      <CustomSearch
        onChange={onChangeFilter}
        value={globalFilter}
        text="por nombre"
      />

      <CustomTable<Saldo>
        columns={genericColumns}
        data={SaldosPagingRes?.data?.items || []}
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
        rowCount={SaldosPagingRes?.data?.meta?.count}
        // // actions
        actionsColumnSize={TABLE_CONSTANTS.ACTIONCOLUMN_WIDTH}
        enableActionsColumn={hasPermission(
          PermissionsEnum.cobranza_change_saldo,
        )}
        // crud
        canEdit={hasPermission(PermissionsEnum.cobranza_change_saldo)}
        onEdit={onEdit}
      />
    </SingleTableBoxScene>
  );
};

export default SaldosPage;
