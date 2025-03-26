import { useNavigate } from 'react-router-dom';

import {
  CustomTable,
  CustomSearch,
  SingleTableBoxScene,
} from '@/shared/components';
import {
  useColumnsParametroSistema,
  useTableFilter,
  useTableServerSideFiltering,
} from '@/shared/hooks';
import { ROUTER_PATHS } from '@/router/constants';
import { hasPermission } from '@/shared/utils/auth';
import { useUiConfirmModalStore } from '@/store/ui';
import { TABLE_CONSTANTS } from '@/shared/constants/ui';
import { useCheckPermission } from '@/shared/hooks/auth';
import { useFetchParametrosSistemas } from '@/actions/app';
import { ParametroSistema, PermissionsEnum } from '@/shared/interfaces';

export const returnUrlParamestrosSistemasPage =
  ROUTER_PATHS.administracion.parametrosSistemasNav;

export type ParamestrosSistemasPageProps = {};

const ParamestrosSistemasPage: React.FC<ParamestrosSistemasPageProps> = () => {
  useCheckPermission(PermissionsEnum.administration_view_parametrosistema);

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
    data: ParametroSistemasPagingRes,
    isLoading,
    isRefetching,
  } = useFetchParametrosSistemas({
    enabled: true,
    params: {
      page: pageIndex + 1,
      page_size: pageSize,
      name: searchTerm,
      ...filterObject,
      filterByState: false,
    },
  });

  ///* handlers
  const onEdit = (parametroSistema: ParametroSistema) => {
    setConfirmDialog({
      isOpen: true,
      title: 'Editar Parametro Sistema',
      subtitle: '¿Está seguro que desea editar este registro?',
      onConfirm: () => {
        setConfirmDialogIsOpen(false);
        navigate(
          `${returnUrlParamestrosSistemasPage}/editar/${parametroSistema.uuid}`,
        );
      },
    });
  };

  ///* columns
  const { parametrosistemaColumns } = useColumnsParametroSistema();
  return (
    <SingleTableBoxScene
      title="Parámetro del Sistema"
      createPageUrl={`${returnUrlParamestrosSistemasPage}/crear`}
      showCreateBtn={false}
    >
      <CustomSearch
        onChange={onChangeFilter}
        value={globalFilter}
        text="por nombre"
      />

      <CustomTable<ParametroSistema>
        columns={parametrosistemaColumns}
        data={ParametroSistemasPagingRes?.data?.items || []}
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
        rowCount={ParametroSistemasPagingRes?.data?.meta.count}
        // // actions
        actionsColumnSize={TABLE_CONSTANTS.ACTIONCOLUMN_WIDTH}
        enableActionsColumn={hasPermission(
          PermissionsEnum.administration_change_parametrosistema,
        )}
        // crud
        canEdit={hasPermission(
          PermissionsEnum.administration_change_parametrosistema,
        )}
        onEdit={onEdit}
        canDelete={false}
      />
    </SingleTableBoxScene>
  );
};

export default ParamestrosSistemasPage;
