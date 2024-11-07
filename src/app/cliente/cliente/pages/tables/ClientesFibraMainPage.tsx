import { PermissionsEnum, useColumnsClientes, useTableFilter } from '@/shared';
import { useCheckPermission } from '@/shared/hooks/auth';

export type ClientesFibraMainPageProps = {};

const ClientesFibraMainPage: React.FC<ClientesFibraMainPageProps> = () => {
  ///* hooks -----------------
  useCheckPermission(PermissionsEnum.clientes_view_cliente);

  // const navigate = useNavigate();

  // server side filters - colums table
  // const { filterObject, columnFilters, setColumnFilters } =
  //   useTableServerSideFiltering();

  ///* table ---------------------------
  const {
    // globalFilter,
    pagination,
    // searchTerm,
    // onChangeFilter,
    // setPagination,
  } = useTableFilter();
  // const { pageIndex, pageSize } = pagination;
  console.log(pagination);

  ///* columns ---------------------------
  const { clientesFibraColumnsActivos } = useColumnsClientes();
  console.log(clientesFibraColumnsActivos);

  return <>ClientesFibraMainPage</>;
};

export default ClientesFibraMainPage;
