import { MdArrowRightAlt } from 'react-icons/md';
import { useNavigate } from 'react-router';

import { useFetchOrdenTrabajos } from '@/actions/app';
import {
  EstadoOrdenTrabajoEnumChoice,
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

export type InstalacionAsignadaOTByStateProps = {
  state: EstadoOrdenTrabajoEnumChoice;
  isRecoordinada?: boolean;
};

const InstalacionAsignadaOTByState: React.FC<
  InstalacionAsignadaOTByStateProps
> = ({ state, isRecoordinada = false }) => {
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

  ///* fetch data
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
      estado_orden_trabajo: state,

      // apply only to PENDIENTE
      is_recoordinada: isRecoordinada,
    },
  });

  ///* handlers
  const calcEnableActionsColumn = () => {
    return state === EstadoOrdenTrabajoEnumChoice.PENDIENTE;
  };
  const calcOnEdit = (row: OrdenTrabajo) => {
    navigate(`/tecnico/instalaciones-asignadas/${row.uuid}`);
  };

  ///* columns
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
        columns={
          // solicitudServicioBase
          state === EstadoOrdenTrabajoEnumChoice.PENDIENTE
            ? installAsignadasEsperaOTColumns
            : []
        }
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
        enableActionsColumn={calcEnableActionsColumn()}
        // crud
        canEdit={calcEnableActionsColumn()}
        onEdit={calcOnEdit}
        editIcon={<MdArrowRightAlt />}
        // editIconToolTipTitle="Crear preventa"
        canDelete={false}
      />
    </GridTableTabsContainerOnly>
  );
};

export default InstalacionAsignadaOTByState;
