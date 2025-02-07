import {
  Alquiler,
  useTableFilter,
  PermissionsEnum,
  useTableServerSideFiltering,
} from '@/shared';
import {
  CustomTable,
  CustomSearch,
  SingleTableBoxScene,
  GridTableTabsContainerOnly,
} from '@/shared/components';
import { ROUTER_PATHS } from '@/router/constants';
import { useFetchAlquileres } from '@/actions/app';
import { useCheckPermission } from '@/shared/hooks/auth';
import { useColumnsAlquiler } from '@/shared/hooks/app/cartera';

export const returnUrlAlquilerPage = ROUTER_PATHS.cartera.alquileresNav;

export type AlquilerPageProps = {};

const AlquilerPage: React.FC<AlquilerPageProps> = () => {
  useCheckPermission(PermissionsEnum.cobranza_view_alquileres);

  //const navigate = useNavigate();

  // server side filters - colums table
  const { filterObject, columnFilters, setColumnFilters } =
    useTableServerSideFiltering();

  /*
  ///* global state
  const setConfirmDialog = useUiConfirmModalStore(s => s.setConfirmDialog);
  const setConfirmDialogIsOpen = useUiConfirmModalStore(
    s => s.setConfirmDialogIsOpen,
  );
  */

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
    data: AlquilerPagingRes,
    isLoading,
    isRefetching,
  } = useFetchAlquileres({
    params: {
      page: pageIndex + 1,
      page_size: pageSize,
      descripcion: searchTerm,

      ...filterObject,
    },
  });

  /*
  ///* handlers
  const onEdit = (alquiler: Alquiler) => {
    setConfirmDialog({
      isOpen: true,
      title: 'Editar Alquiler',
      subtitle: '¿Está seguro que desea editar este registro?',
      onConfirm: () => {
        setConfirmDialogIsOpen(false);
        navigate(`${returnUrlAlquilerPage}/editar/${alquiler.uuid}`);
      },
    });
  };
  */

  ///* columns
  const { alquilerColumns } = useColumnsAlquiler();

  return (
    <SingleTableBoxScene
      title="Alquiler"
      showCreateBtn={false}
      isMainTableStates
    >
      <GridTableTabsContainerOnly>
        <CustomSearch
          onChange={onChangeFilter}
          value={globalFilter}
          text="por nombre"
        />

        <CustomTable<Alquiler>
          columns={alquilerColumns}
          data={AlquilerPagingRes?.data?.items || []}
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
          rowCount={AlquilerPagingRes?.data?.meta?.count}
          enableActionsColumn={false}
        />
      </GridTableTabsContainerOnly>
    </SingleTableBoxScene>
  );
};

export default AlquilerPage;
