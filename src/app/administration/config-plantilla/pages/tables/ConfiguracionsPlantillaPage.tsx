import { useNavigate } from 'react-router-dom';

import { useFetchConfiguracionPlantillas } from '@/actions/app';
import { ROUTER_PATHS } from '@/router/constants';
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
import { hasPermission } from '@/shared/utils/auth';
import { useUiConfirmModalStore } from '@/store/ui';
import { useColumnsConfigPlantillaCliente } from '../../shared/hooks/useColumnsConfigPlantillaCliente';

export const returnUrlConfiguracionsPlantillaPage =
  ROUTER_PATHS.administracion.configuracionPlantillasNav;

export type ConfiguracionsPlantillaPageProps = {};

const ConfiguracionsPlantillaPage: React.FC<
  ConfiguracionsPlantillaPageProps
> = () => {
  useCheckPermission(
    PermissionsEnum.administration_view_configplantillacliente,
  );

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
      tipo_configuracion: TipoPlantillaConfigClienteEnumChoice.GENERAL,
    },
  });

  ///* handlers
  const onEdit = (configuracionplantilla: ConfiguracionPlantillaCliente) => {
    setConfirmDialog({
      isOpen: true,
      title: 'Editar ConfiguracionPlantilla',
      subtitle: '¿Está seguro que desea editar este registro?',
      onConfirm: () => {
        setConfirmDialogIsOpen(false);
        navigate(
          `${returnUrlConfiguracionsPlantillaPage}/editar/${configuracionplantilla.uuid}`,
        );
      },
    });
  };

  ///* columns
  const { genericColumns } = useColumnsConfigPlantillaCliente();

  return (
    <SingleTableBoxScene title="Configuracion Plantilla" showCreateBtn={false}>
      <CustomSearch
        onChange={onChangeFilter}
        value={globalFilter}
        text="por nombre"
      />

      <CustomTable<ConfiguracionPlantillaCliente>
        columns={genericColumns}
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
        enableActionsColumn={hasPermission(
          PermissionsEnum.administration_change_configplantillacliente,
        )}
        // crud
        canEdit={hasPermission(
          PermissionsEnum.administration_change_configplantillacliente,
        )}
        onEdit={onEdit}
        canDelete={false}
      />
    </SingleTableBoxScene>
  );
};

export default ConfiguracionsPlantillaPage;
