import { useNavigate } from 'react-router';

import { useFetchCalendarioFacturaciones } from '@/actions/app';
import { ROUTER_PATHS } from '@/router/constants';
import {
  CalendarioFacturacion,
  PermissionsEnum,
  TABLE_CONSTANTS,
  useColumnsCalendarioFacturacion,
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
import { useUiConfirmModalStore } from '@/store/ui';

export const returnUrlCalendarioFacturacionesPage =
  ROUTER_PATHS.administracion.calendariofacturacionesNav;

export type CalendarioFacturacionPageProps = {};

const CalendarioFacturacionPage: React.FC<
  CalendarioFacturacionPageProps
> = () => {
  useCheckPermission(PermissionsEnum.administration_view_calendariofacturacion);

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
    data: calendarioFacturacionesPagingRes,
    isLoading,
    isRefetching,
  } = useFetchCalendarioFacturaciones({
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
  const onEdit = (calendariofacturacion: CalendarioFacturacion) => {
    setConfirmDialog({
      isOpen: true,
      title: 'Editar Calendario Facturacion',
      subtitle: '¿Está seguro que desea editar este registro?',
      onConfirm: () => {
        setConfirmDialogIsOpen(false);
        navigate(
          `${returnUrlCalendarioFacturacionesPage}/editar/${calendariofacturacion.uuid}`,
        );
      },
    });
  };

  ///* columns
  const { calendarioFacturacionColumns } = useColumnsCalendarioFacturacion();

  return (
    <SingleTableBoxScene
      title="Calendario Facturación"
      createPageUrl={`${returnUrlCalendarioFacturacionesPage}/crear`}
      showCreateBtn={false}
    >
      <CustomSearch
        onChange={onChangeFilter}
        value={globalFilter}
        text="por nombre"
      />

      <CustomTable<CalendarioFacturacion>
        columns={calendarioFacturacionColumns}
        data={calendarioFacturacionesPagingRes?.data?.items || []}
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
        rowCount={calendarioFacturacionesPagingRes?.data?.meta?.count}
        // // actions
        actionsColumnSize={TABLE_CONSTANTS.ACTIONCOLUMN_WIDTH}
        // crud
        canEdit={hasPermission(
          PermissionsEnum.administration_change_calendariofacturacion,
        )}
        onEdit={onEdit}
        canDelete={false}
      />
    </SingleTableBoxScene>
  );
};

export default CalendarioFacturacionPage;
