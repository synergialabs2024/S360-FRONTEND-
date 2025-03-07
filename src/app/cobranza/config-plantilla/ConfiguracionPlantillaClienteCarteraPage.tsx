import { useFetchConfiguracionPlantillas } from '@/actions/app';
import { useColumnsConfigPlantillaCliente } from '@/app/administration/config-plantilla/shared/hooks/useColumnsConfigPlantillaCliente';
import { TipoPlantillaConfigClienteEnumChoice } from '@/shared';
import {
  CustomSearch,
  CustomTable,
  SingleTableBoxScene,
} from '@/shared/components';
import { TABLE_CONSTANTS } from '@/shared/constants/ui';
import { useTableFilter, useTableServerSideFiltering } from '@/shared/hooks';
import { useCheckPermission } from '@/shared/hooks/auth';
import {
  ConfiguracionPlantillaCliente,
  PermissionsEnum,
} from '@/shared/interfaces';

export type ConfiguracionPlantillaClienteCarteraPageProps = {};

const ConfiguracionPlantillaClienteCarteraPage: React.FC<
  ConfiguracionPlantillaClienteCarteraPageProps
> = () => {
  useCheckPermission(
    PermissionsEnum.administration_view_configplantillacliente,
  );

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
    data: ConfiguracionsPlantillaPagingRes,
    isLoading,
    isRefetching,
  } = useFetchConfiguracionPlantillas({
    enabled: true,
    params: {
      page: pageIndex + 1,
      page_size: pageSize,
      name: searchTerm,
      ...filterObject,
      filterByState: false,
      tipo_configuracion: TipoPlantillaConfigClienteEnumChoice.PERSONALIZADO,
    },
  });

  ///* columns
  const { carteraColumns } = useColumnsConfigPlantillaCliente();

  return (
    <SingleTableBoxScene title="Configuracion Plantilla" showCreateBtn={false}>
      <CustomSearch
        onChange={onChangeFilter}
        value={globalFilter}
        text="por nombre"
      />

      <CustomTable<ConfiguracionPlantillaCliente>
        columns={carteraColumns}
        data={ConfiguracionsPlantillaPagingRes?.data?.items || []}
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
        rowCount={ConfiguracionsPlantillaPagingRes?.data?.meta?.count}
        // // actions
        actionsColumnSize={TABLE_CONSTANTS.ACTIONCOLUMN_WIDTH}
        enableActionsColumn={false}
        // crud
        canEdit={false}
        canDelete={false}
      />
    </SingleTableBoxScene>
  );
};

export default ConfiguracionPlantillaClienteCarteraPage;
