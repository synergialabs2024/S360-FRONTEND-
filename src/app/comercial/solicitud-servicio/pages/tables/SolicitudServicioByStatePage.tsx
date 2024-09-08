import { HiDocumentPlus } from 'react-icons/hi2';
import { useNavigate } from 'react-router-dom';

import { useFetchSolicitudServicios } from '@/actions/app';
import { returnUrlPreventasPage } from '@/app/comercial/preventa/pages/tables/PreventasMainPage';
import { EstadoSolicitudServicioEnumChoice } from '@/shared';
import {
  CustomSearch,
  CustomTable,
  GridTableTabsContainerOnly,
} from '@/shared/components';
import { TABLE_CONSTANTS } from '@/shared/constants/ui';
import {
  useColumnsSolicitusService,
  useTableFilter,
  useTableServerSideFiltering,
} from '@/shared/hooks';
import { SolicitudServicio } from '@/shared/interfaces';

export type SolicitudServicioByStatePageProps = {
  state: string;
};

const SolicitudServicioByStatePage: React.FC<
  SolicitudServicioByStatePageProps
> = ({ state }) => {
  // hooks
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
    data: SolicitudsServicioPagingRes,
    isLoading,
    isRefetching,
  } = useFetchSolicitudServicios({
    enabled: true,
    params: {
      identificacion: searchTerm,
      ...filterObject,
      estado_solicitud: state,
      page_size: pageSize,
      page: pageIndex + 1,
    },
  });

  ///* handlers
  const calcEnableActionsColumn = (): boolean => {
    if (state === EstadoSolicitudServicioEnumChoice.INGRESADO) {
      return true;
    }

    return false;
  };
  const calcOnEdit = (data: SolicitudServicio) => {
    if (state === EstadoSolicitudServicioEnumChoice.INGRESADO) {
      navigate(`${returnUrlPreventasPage}/crear/${data.uuid}`);
    }
  };

  ///* columns
  const { solicitudServicioBase, solicitudServicioWithoutGestion } =
    useColumnsSolicitusService();

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

      <CustomTable<SolicitudServicio>
        columns={
          // solicitudServicioBase
          state === EstadoSolicitudServicioEnumChoice.INGRESADO
            ? solicitudServicioBase
            : state === EstadoSolicitudServicioEnumChoice.SIN_GESTION
              ? solicitudServicioWithoutGestion
              : solicitudServicioBase
        }
        data={SolicitudsServicioPagingRes?.data?.items || []}
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
        rowCount={SolicitudsServicioPagingRes?.data?.meta?.count}
        // // actions
        actionsColumnSize={TABLE_CONSTANTS.ACTIONCOLUMN_WIDTH}
        enableActionsColumn={calcEnableActionsColumn()}
        // crud
        canEdit={calcEnableActionsColumn()}
        onEdit={calcOnEdit}
        editIcon={<HiDocumentPlus />}
        editIconToolTipTitle="Crear preventa"
        canDelete={false}
      />
    </GridTableTabsContainerOnly>
  );
};

export default SolicitudServicioByStatePage;
