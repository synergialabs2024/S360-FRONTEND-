import { useFetchSolicitudMaterial } from '@/actions/app/inventario/solicitud-material';
import { useTableFilter, useTableServerSideFiltering } from '@/shared';
import {
  CustomSearch,
  CustomTable,
  GridTableTabsContainerOnly,
} from '@/shared/components';
import { useColumnsSolicitudMaterial } from '@/shared/hooks/app/inventario/useColumnsSolicitudMaterial';
import { SolicitudMaterial } from '@/shared/interfaces/app/inventario/solicitud-material.ts';

export type RecepcionMaterialByStatePageProps = {
  state: string;
};

const RecepcionMaterialByStatePage: React.FC<
  RecepcionMaterialByStatePageProps
> = ({ state }) => {
  console.log(state);
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

  ///* fetch data
  const {
    data: solicitudMaterialPagingRes,
    isLoading,
    isRefetching,
  } = useFetchSolicitudMaterial({
    enabled: true,
    params: {
      page: pageIndex + 1,
      page_size: pageSize,
      name: searchTerm,
      ...filterObject,
      filterByState: false,
    },
  });

  ///* columns
  const { solicitudMaterialColumns } = useColumnsSolicitudMaterial();

  return (
    <GridTableTabsContainerOnly>
      <CustomSearch
        onChange={onChangeFilter}
        value={globalFilter}
        text="por identificación"
      />
      <CustomTable<SolicitudMaterial>
        columns={solicitudMaterialColumns}
        data={solicitudMaterialPagingRes?.data?.items || []}
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
        rowCount={solicitudMaterialPagingRes?.data?.meta?.count}
        enableActionsColumn={false}
      />
    </GridTableTabsContainerOnly>
  );
};

export default RecepcionMaterialByStatePage;
