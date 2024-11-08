import { Box, Container, Stack, Typography } from '@mui/material';

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
import { CustomSearch, CustomTable } from '@/shared/components';
import { useCheckPermission } from '@/shared/hooks/auth';
import { hasPermission } from '@/shared/utils/auth';

export const returnUrlClientesFibraPage =
  ROUTER_PATHS.clientes.clientesFibraNav;

export type ClientesFibraMainPageProps = {};

const ClientesFibraMainPage: React.FC<ClientesFibraMainPageProps> = () => {
  ///* hooks -----------------
  useCheckPermission(PermissionsEnum.clientes_view_cliente);

  // const navigate = useNavigate();

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
    console.log('onEdit', cliente);
  };

  ///* columns ---------------------------
  const { clientesFibraColumnsActivos } = useColumnsClientes();

  return (
    <Box
      component="main"
      sx={{
        flexGrow: 1,
        py: 8,
      }}
    >
      <Container maxWidth="xl">
        <Stack spacing={3}>
          {/* ========= title & create btn ========= */}
          <Stack direction="row" justifyContent="space-between" spacing={4}>
            <Stack spacing={1} pb={2}>
              <Typography variant="h4">Clientes Fibra Óptica</Typography>
            </Stack>
          </Stack>

          {/* ========= Search ========= */}
          <CustomSearch
            onChange={onChangeFilter}
            value={globalFilter}
            text="por identificación del cliente"
          />

          {/* ========= Search ========= */}
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
          />
        </Stack>
      </Container>
    </Box>
  );
};

export default ClientesFibraMainPage;
