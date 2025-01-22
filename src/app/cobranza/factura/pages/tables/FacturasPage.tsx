import { useNavigate } from 'react-router-dom';

import { useFetchFacturas } from '@/actions/app';
import { ROUTER_PATHS } from '@/router/constants';
import {
  CustomSearch,
  CustomTable,
  SingleTableBoxScene,
} from '@/shared/components';
import { TABLE_CONSTANTS } from '@/shared/constants/ui';
import {
  useColumsFactura,
  useTableFilter,
  useTableServerSideFiltering,
} from '@/shared/hooks';
import { useCheckPermission } from '@/shared/hooks/auth';
import { Factura, PermissionsEnum } from '@/shared/interfaces';
import { hasPermission } from '@/shared/utils/auth';
import { useUiConfirmModalStore } from '@/store/ui';

export const returnUrlFacturasPage = ROUTER_PATHS.cobranza.facturasNav;

export type FacturasPageProps = {};

const FacturasPage: React.FC<FacturasPageProps> = () => {
  useCheckPermission(PermissionsEnum.cobranza_view_factura);

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
    data: FacturasPagingRes,
    isLoading,
    isRefetching,
  } = useFetchFacturas({
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
  const onEdit = (factura: Factura) => {
    setConfirmDialog({
      isOpen: true,
      title: 'Editar Factura',
      subtitle: '¿Está seguro que desea editar este registro?',
      onConfirm: () => {
        setConfirmDialogIsOpen(false);
        navigate(`${returnUrlFacturasPage}/editar/${factura.uuid}`);
      },
    });
  };

  ///* columns ---------------------
  const { facturasGenericColumns } = useColumsFactura();

  return (
    <SingleTableBoxScene
      title="Factura"
      createPageUrl={`${returnUrlFacturasPage}/crear`}
      showCreateBtn={hasPermission(PermissionsEnum.cobranza_add_factura)}
    >
      <CustomSearch
        onChange={onChangeFilter}
        value={globalFilter}
        text="por nombre"
      />

      <CustomTable<Factura>
        columns={facturasGenericColumns}
        data={FacturasPagingRes?.data?.items || []}
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
        rowCount={FacturasPagingRes?.data?.meta?.count}
        // // actions
        actionsColumnSize={TABLE_CONSTANTS.ACTIONCOLUMN_WIDTH}
        enableActionsColumn={hasPermission(
          PermissionsEnum.cobranza_change_factura,
        )}
        // crud
        canEdit={hasPermission(PermissionsEnum.cobranza_change_factura)}
        onEdit={onEdit}
      />
    </SingleTableBoxScene>
  );
};

export default FacturasPage;
