import { MdArrowRightAlt } from 'react-icons/md';
import { useNavigate } from 'react-router';

import { useFetchClientes } from '@/actions/app';
import { ROUTER_PATHS } from '@/router/constants';
import {
  Cliente,
  PermissionsEnum,
  TABLE_CONSTANTS,
  useColumnsClientes,
  useTableFilter,
  useTableServerSideFiltering,
} from '@/shared';
import {
  CustomSearch,
  CustomTable,
  SingleTableBoxScene,
} from '@/shared/components';
import { useCheckPermission } from '@/shared/hooks/auth';
import { hasPermission } from '@/shared/utils/auth';

export const returnUrlCambioOnuClientesFibraPage =
  ROUTER_PATHS.inventario.cambioOnuNav;

export type ClientesCambioOnuMainPageProps = {};

const ClientesCambioOnuMainPage: React.FC<
  ClientesCambioOnuMainPageProps
> = () => {
  ///* hooks -----------------
  useCheckPermission(PermissionsEnum.clientes_view_cliente);

  const navigate = useNavigate();

  // server side filters - colums table
  const { filterObject, columnFilters, setColumnFilters } =
    useTableServerSideFiltering();

  ///* table ---------------------------
  const {
    globalFilter,
    pagination,
    searchTerm,
    onChangeFilter,
    setPagination,
  } = useTableFilter();
  const { pageIndex, pageSize } = pagination;

  ///* fetch data ---------------------------
  const {
    data: clientesPagingRes,
    isLoading: isLoadingClientes,
    isRefetching: isRefetchingClientes,
  } = useFetchClientes({
    params: {
      page: pageIndex + 1,
      page_size: pageSize,
      identificacion: searchTerm,
      ...filterObject,
      is_installed: true,
    },
  });

  ///* handlers ---------------------------
  const onEdit = (cliente: Cliente) => {
    const firstLine = cliente?.linea_servicio_data?.[0];
    navigate(
      `${returnUrlCambioOnuClientesFibraPage}/editar/${firstLine?.uuid}`,
    );
  };

  ///* columns ---------------------------
  const { clientesFibraColumnsActivos } = useColumnsClientes();

  return (
    <SingleTableBoxScene title="Clientes (Cambio Onu)" showCreateBtn={false}>
      <CustomSearch
        onChange={onChangeFilter}
        value={globalFilter}
        text="por identificación"
      />

      <CustomTable<Cliente>
        columns={clientesFibraColumnsActivos}
        data={clientesPagingRes?.data?.items || []}
        isLoading={isLoadingClientes}
        isRefetching={isRefetchingClientes}
        // // filters - server side
        enableManualFiltering={true}
        columnFilters={columnFilters}
        onColumnFiltersChange={setColumnFilters}
        // // search
        enableGlobalFilter={false}
        // // pagination
        pagination={pagination}
        onPaging={setPagination}
        rowCount={clientesPagingRes?.data?.meta.count}
        // // actions
        actionsColumnSize={TABLE_CONSTANTS.ACTIONCOLUMN_WIDTH}
        enableActionsColumn={hasPermission(
          PermissionsEnum.administration_change_pais,
        )}
        // crud
        canEdit={hasPermission(PermissionsEnum.clientes_view_cliente)}
        onEdit={onEdit}
        canDelete={false}
        editIcon={<MdArrowRightAlt />}
        editIconToolTipTitle="Ver detalle"
        editIconTooltipPlacement="left"
      />
    </SingleTableBoxScene>
  );
};

export default ClientesCambioOnuMainPage;
