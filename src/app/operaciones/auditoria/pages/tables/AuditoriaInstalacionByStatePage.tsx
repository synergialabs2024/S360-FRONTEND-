import { useNavigate } from 'react-router';

import { useFetchOrdenTrabajos } from '@/actions/app';
import {
  EstadoAuditoriaOTInstallEnumChoice,
  OrdenTrabajo,
  PermissionsEnum,
  TABLE_CONSTANTS,
  TipoOrdenTrabajoEnumChoice,
  useColumnsOrdenTrabajo,
  useTableFilter,
  useTableServerSideFiltering,
} from '@/shared';
import {
  CustomSearch,
  CustomTable,
  GridTableTabsContainerOnly,
} from '@/shared/components';
import { useCheckPermission } from '@/shared/hooks/auth';

export type AuditoriaInstalacionByStatePageProps = {
  estadoAuditoria: EstadoAuditoriaOTInstallEnumChoice;
};

const AuditoriaInstalacionByStatePage: React.FC<
  AuditoriaInstalacionByStatePageProps
> = ({ estadoAuditoria }) => {
  ///* hooks ---------------
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

  ///* fetch data ---------------
  const {
    data: ordensTrabajoPagingRes,
    isLoading,
    isRefetching,
  } = useFetchOrdenTrabajos({
    enabled: true,
    params: {
      page: pageIndex + 1,
      page_size: pageSize,
      identificacion: searchTerm,
      ...filterObject,
      filterByState: false,

      tipo_orden_trabajo: TipoOrdenTrabajoEnumChoice.INSTALACION,
      estado_auditoria: estadoAuditoria,
    },
  });

  ///* handlers ---------------
  const calcEnableActionsColumn = () => {
    if (
      estadoAuditoria === EstadoAuditoriaOTInstallEnumChoice.PENDIENTE ||
      estadoAuditoria ===
        EstadoAuditoriaOTInstallEnumChoice.ACTUALIZADOS_TECNICO_ESPERA_REVISION
    ) {
      return true;
    }

    return false;
  };
  const onEdit = (row: OrdenTrabajo) => {
    if (estadoAuditoria === EstadoAuditoriaOTInstallEnumChoice.PENDIENTE) {
      navigate(`/operaciones/auditoria/instalaciones/${row.uuid}`);
    } else if (
      estadoAuditoria ===
      EstadoAuditoriaOTInstallEnumChoice.ACTUALIZADOS_TECNICO_ESPERA_REVISION
    ) {
      navigate(`/operaciones/auditoria/instalaciones-actualizadas/${row.uuid}`);
    }
  };

  ///* columns ---------------
  const {
    installEsperaAuditoriaOTColumns,
    installEsperaCorreccionAuditoriaOTColumns,
    installAprobadasAuditoriaOTColumns,
  } = useColumnsOrdenTrabajo();

  return (
    <GridTableTabsContainerOnly>
      <CustomSearch
        onChange={onChangeFilter}
        value={globalFilter}
        text="por identificación"
        sxContainer={{
          mb: 5,
        }}
      />

      <CustomTable<OrdenTrabajo>
        columns={
          estadoAuditoria === EstadoAuditoriaOTInstallEnumChoice.PENDIENTE
            ? installEsperaAuditoriaOTColumns
            : estadoAuditoria ===
                EstadoAuditoriaOTInstallEnumChoice.ACTUALIZADOS_TECNICO_ESPERA_REVISION
              ? installEsperaCorreccionAuditoriaOTColumns
              : estadoAuditoria === EstadoAuditoriaOTInstallEnumChoice.APROBADO
                ? installAprobadasAuditoriaOTColumns
                : []
        }
        data={ordensTrabajoPagingRes?.data?.items || []}
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
        rowCount={ordensTrabajoPagingRes?.data?.meta?.count}
        // // actions
        actionsColumnSize={TABLE_CONSTANTS.ACTIONCOLUMN_WIDTH}
        enableActionsColumn={calcEnableActionsColumn()}
        // crud
        canEdit={calcEnableActionsColumn()}
        onEdit={onEdit}
        arrowIcon
        editIconToolTipTitle="Gestionar"
        canDelete={false}
      />
    </GridTableTabsContainerOnly>
  );
};

export default AuditoriaInstalacionByStatePage;
