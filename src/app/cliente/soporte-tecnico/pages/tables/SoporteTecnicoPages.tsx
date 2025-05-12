import { MdArrowRightAlt } from 'react-icons/md';
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
  useTableServerSideFiltering,
  useColumnsClientes,
} from '@/shared';
import { ROUTER_PATHS } from '@/router/constants';
import { useFetchClientes } from '@/actions/app';
import { useCheckPermission } from '@/shared/hooks/auth';
import { hasAllPermissions, hasPermission } from '@/shared/utils/auth';

export const returnUrlSoporteTecnico = ROUTER_PATHS.clientes.soporteTecnicoNav;

export type SoporteTecnicoPagesProps = {};

const SoporteTecnicoPages: React.FC<SoporteTecnicoPagesProps> = () => {
  useCheckPermission(PermissionsEnum.tecnico_view_ordentrabajo);

  const navigate = useNavigate();

  // server side filters - colums table
  const { filterObject, columnFilters, setColumnFilters } =
    useTableServerSideFiltering();

  ///* table
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
    navigate(`${returnUrlSoporteTecnico}/${firstLine?.uuid}`);
  };
  ///* columns ---------------------------
  const { clientesFibraColumnsActivosNoLink } = useColumnsClientes();

  return (
    <SingleTableBoxScene
      title="Soporte Tecnico"
      showCreateBtn={false}
      isMainTableStates
    >
      <CustomSearch
        onChange={onChangeFilter}
        value={globalFilter}
        text="por identificación"
      />

      <CustomTable<Cliente>
        columns={clientesFibraColumnsActivosNoLink}
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
        rowCount={clientesPagingRes?.data?.meta?.count}
        // // actions
        actionsColumnSize={TABLE_CONSTANTS.ACTIONCOLUMN_WIDTH}
        enableActionsColumn={hasPermission(
          PermissionsEnum.clientes_change_cliente,
        )}
        // crud
        canEdit={hasAllPermissions([
          PermissionsEnum.clientes_change_cliente,
          PermissionsEnum.clientes_view_cliente,
        ])}
        onEdit={onEdit}
        canDelete={false}
        editIcon={<MdArrowRightAlt />}
        editIconToolTipTitle="Ver detalle"
        editIconTooltipPlacement="left"
      />
    </SingleTableBoxScene>
  );
};

export default SoporteTecnicoPages;
