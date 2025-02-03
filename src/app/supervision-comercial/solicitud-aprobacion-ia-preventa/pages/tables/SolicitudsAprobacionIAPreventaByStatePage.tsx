import { useState } from 'react';

import { useFetchSolicitudAprobacionIAPreventas } from '@/actions/app/supervision-comercial';
import { EstadoSolicitudAprobacionIAEnumChoice } from '@/shared';
import {
  CustomSearch,
  CustomTable,
  GridTableTabsContainerOnly,
} from '@/shared/components';
import { TABLE_CONSTANTS } from '@/shared/constants/ui';
import { useTableFilter, useTableServerSideFiltering } from '@/shared/hooks';
import { useCheckPermission } from '@/shared/hooks/auth';
import {
  PermissionsEnum,
  SolicitudAprobacionIAPreventa,
} from '@/shared/interfaces';
import { hasPermission } from '@/shared/utils/auth';
import { useColumnsSolicitudAprobacionIAPreventa } from '../../shared';
import HandleApproveIAModal from '../../shared/components/HandleApproveIAModal';

export type SolicitudsAprobacionIAPreventaByStatePageProps = {
  state: EstadoSolicitudAprobacionIAEnumChoice;
};

const SolicitudsAprobacionIAPreventaByStatePage: React.FC<
  SolicitudsAprobacionIAPreventaByStatePageProps
> = ({ state }) => {
  useCheckPermission(
    PermissionsEnum.comercial_view_solicitudaprobacioniapreventa,
  );

  ///* local state ---------------------
  const [open, setOpen] = useState(false);
  const [selectedRequestApprove, setSelectedRequestApprove] =
    useState<SolicitudAprobacionIAPreventa | null>(null);

  // server side filters - colums table
  const { filterObject, columnFilters, setColumnFilters } =
    useTableServerSideFiltering();

  ///* table ---------------------
  const {
    globalFilter,
    pagination,
    searchTerm,
    onChangeFilter,
    setPagination,
  } = useTableFilter();
  const { pageIndex, pageSize } = pagination;

  ///* fetch data ---------------------
  const {
    data: SolicitudsAprobacionIAPreventaPagingRes,
    isLoading,
    isRefetching,
  } = useFetchSolicitudAprobacionIAPreventas({
    enabled: true,
    params: {
      page: pageIndex + 1,
      page_size: pageSize,
      name: searchTerm,
      ...filterObject,
      filterByState: false,

      estado_solicitud: state,
    },
  });

  ///* handlers ---------------------
  const onEdit = (
    solicitudaprobacioniapreventa: SolicitudAprobacionIAPreventa,
  ) => {
    setSelectedRequestApprove(solicitudaprobacioniapreventa);
    setOpen(true);
  };

  ///* columns ---------------------
  const { esperaColumns, aprobadoColumns, rechazadoColumns } =
    useColumnsSolicitudAprobacionIAPreventa();

  return (
    <GridTableTabsContainerOnly>
      <CustomSearch
        onChange={onChangeFilter}
        value={globalFilter}
        text="por nombre"
      />

      <CustomTable<SolicitudAprobacionIAPreventa>
        columns={
          state === EstadoSolicitudAprobacionIAEnumChoice.ESPERA
            ? esperaColumns
            : state === EstadoSolicitudAprobacionIAEnumChoice.APROBADO
              ? aprobadoColumns
              : rechazadoColumns
        }
        data={SolicitudsAprobacionIAPreventaPagingRes?.data?.items || []}
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
        rowCount={SolicitudsAprobacionIAPreventaPagingRes?.data?.meta?.count}
        // // actions
        actionsColumnSize={TABLE_CONSTANTS.ACTIONCOLUMN_WIDTH}
        enableActionsColumn={
          hasPermission(
            PermissionsEnum.comercial_change_solicitudaprobacioniapreventa,
          ) && state === EstadoSolicitudAprobacionIAEnumChoice.ESPERA
        }
        arrowIcon
        // crud
        canEdit={hasPermission(
          PermissionsEnum.comercial_change_solicitudaprobacioniapreventa,
        )}
        onEdit={onEdit}
      />

      {/* ================== modals ================== */}
      {open && selectedRequestApprove && (
        <HandleApproveIAModal
          open={open}
          setOpen={setOpen}
          solicitudAprobacion={selectedRequestApprove!}
        />
      )}
    </GridTableTabsContainerOnly>
  );
};

export default SolicitudsAprobacionIAPreventaByStatePage;
