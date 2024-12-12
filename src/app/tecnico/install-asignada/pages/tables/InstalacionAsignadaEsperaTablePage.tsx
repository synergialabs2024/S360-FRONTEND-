import { useNavigate } from 'react-router';

import { useFetchOrdenTrabajos } from '@/actions/app';
import {
  EstadoActivacionEnumChoice,
  EstadoOrdenTrabajoEnumChoice,
  OrdenTrabajo,
  PermissionsEnum,
  TABLE_CONSTANTS,
  TipoOrdenTrabajoEnumChoice,
  ToastWrapper,
  useColumnsOrdenTrabajo,
  UserRolesEnumChoice,
  useTableFilter,
  useTableServerSideFiltering,
} from '@/shared';
import {
  CustomSearch,
  CustomTable,
  GridTableTabsContainerOnly,
} from '@/shared/components';
import { useCheckPermission } from '@/shared/hooks/auth';
import { useAuthStore } from '@/store/auth';
import { InstallAsignPendienteTableBtns } from '../../shared/components/tables';

export type InstalacionAsignadaEsperaTablePageProps = {};

const InstalacionAsignadaEsperaTablePage: React.FC<
  InstalacionAsignadaEsperaTablePageProps
> = () => {
  ///* hooks ---------------------
  useCheckPermission(PermissionsEnum.tecnico_view_ordentrabajo);
  const navigate = useNavigate();

  // server side filters - colums table
  const { filterObject, columnFilters, setColumnFilters } =
    useTableServerSideFiltering();

  const user = useAuthStore(s => s.user);

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
      estado_orden_trabajo: EstadoOrdenTrabajoEnumChoice.PENDIENTE,

      // filter by tecnico
      ...(user?.role === UserRolesEnumChoice.TECNICO && {
        oneAtTime: true,
      }),
    },
  });

  ///* handlers ---------------------
  const onEdit = (row: OrdenTrabajo) => {
    // requiere gestion de activaciones para poder subir cambios
    if (
      row?.estado_activacion !== EstadoActivacionEnumChoice.GESTIONADA &&
      user?.role === UserRolesEnumChoice.TECNICO
    ) {
      ToastWrapper.error(
        'La instalación asignada aún no ha sido gestionada por activaciones.',
      );
      return;
    }

    navigate(`/tecnico/instalaciones-asignadas/${row.uuid}`);
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
        onConditionEdit={ot => {
          if (user?.role !== UserRolesEnumChoice.TECNICO) return true;

          return (
            ot.estado_orden_trabajo ===
              EstadoOrdenTrabajoEnumChoice.PENDIENTE && !!ot?.can_be_managed
          );
        }}
        arrowIcon
        canDelete={false}
        // custom btns
        showCustomButtonsSpaceEnd={true}
        customButtonsSpaceEnd={ot => {
          return <InstallAsignPendienteTableBtns ot={ot!} />;
        }}
      />
    </GridTableTabsContainerOnly>
  );
};

export default InstalacionAsignadaEsperaTablePage;
