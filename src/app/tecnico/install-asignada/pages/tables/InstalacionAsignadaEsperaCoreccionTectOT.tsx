import { useNavigate } from 'react-router';

import { useFetchOrdenTrabajos } from '@/actions/app';
import {
  EstadoAuditoriaOTInstallEnumChoice,
  EstadoOrdenTrabajoEnumChoice,
  MotivoCorreccionOTAuditoriaEnumChoice,
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

export type InstalacionAsignadaEsperaCoreccionTectOTProps = {};

const InstalacionAsignadaEsperaCoreccionTectOT: React.FC<
  InstalacionAsignadaEsperaCoreccionTectOTProps
> = () => {
  ///* hooks ---------------------
  useCheckPermission(PermissionsEnum.tecnico_view_ordentrabajo);
  const navigate = useNavigate();

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
    data: OrdensTrabajoPagingRes,
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
      estado_orden_trabajo: EstadoOrdenTrabajoEnumChoice.ESPERA_CORRECCION,
      estado_auditoria: EstadoAuditoriaOTInstallEnumChoice.ESPERA_CORRECCION,

      // // filter by tecnico
      // ...(user?.role === UserRolesEnumChoice.TECNICO && {
      //   oneAtTime: true,
      // }),
    },
  });

  ///* handlers ---------------------
  const onEdit = (row: OrdenTrabajo) => {
    if (
      row?.motivo_correccion ===
      MotivoCorreccionOTAuditoriaEnumChoice.FOTOS_INCORRECTAS
    ) {
      navigate(`/tecnico/coreccion-fotos/${row.uuid}`);
    } else if (
      row?.motivo_correccion ===
      MotivoCorreccionOTAuditoriaEnumChoice.INFORMACION_INCORRECTA
    ) {
      navigate(`/tecnico/correccion-datos/${row.uuid}`);
    }
  };

  ///* columns ---------------------
  const { installAsignadasEsperaOTColumns } = useColumnsOrdenTrabajo();

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
        columns={installAsignadasEsperaOTColumns}
        data={OrdensTrabajoPagingRes?.data?.items || []}
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
        rowCount={OrdensTrabajoPagingRes?.data?.meta?.count}
        // // actions
        actionsColumnSize={TABLE_CONSTANTS.ACTIONCOLUMN_WIDTH}
        enableActionsColumn={true}
        // crud
        canEdit={true}
        onEdit={onEdit}
        arrowIcon
        canDelete={false}
      />
    </GridTableTabsContainerOnly>
  );
};

export default InstalacionAsignadaEsperaCoreccionTectOT;
