import {
  CustomSearch,
  CustomTable,
  GridTableTabsContainerOnly,
} from '@/shared/components';
import {
  useColumnsCambioDomicilio,
  useTableFilter,
  useTableServerSideFiltering,
} from '@/shared/hooks';
import { useCheckPermission } from '@/shared/hooks/auth';
import { CambioDomicilio, PermissionsEnum } from '@/shared/interfaces';
import { hasPermission } from '@/shared/utils/auth';
import { useNavigate } from 'react-router';
import { useFetchCambioDomicilios } from '@/actions/app/cartera/cambio-domicilio';
import { EstadoCambioDomicilioEnumChoice } from '@/shared';
import { returnUrlCambioDomicilioPage } from './CambioDomicilioPage';

export type CambioDomicilioByStatePageProps = {
  state: EstadoCambioDomicilioEnumChoice;
};

const CambioDomicilioByStatePage: React.FC<CambioDomicilioByStatePageProps> = ({
  state,
}) => {
  const navigate = useNavigate();

  useCheckPermission(PermissionsEnum.tecnico_view_tickettecnico);

  /* const navigate = useNavigate(); */

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
    data: TipoMantenedorBeneficiosPaginatedRes,
    isLoading,
    isRefetching,
  } = useFetchCambioDomicilios({
    enabled: true,
    params: {
      page: pageIndex + 1,
      page_size: pageSize,
      linea_servicio_data__cliente_data__name: searchTerm,
      ...filterObject,
      filterByState: false,
      estado_cambio_domicilio: state,
    },
  });

  ///* handlers
  /* const onEdit = (TipoMantenedorBeneficios: TipoMantenedorBeneficios) => {
    setConfirmDialog({
      isOpen: true,
      title: 'Editar Tipo',
      subtitle: '¿Está seguro que desea editar este registro?',
      onConfirm: () => {
        setConfirmDialogIsOpen(false);
        navigate(
          `${returnUrlTipoMantenedorBeneficiosPage}/editar/${TipoMantenedorBeneficios.uuid}`,
        );
      },
    });
  }; */

  ///* columns
  const { cambioDomicilioColumns } = useColumnsCambioDomicilio();

  const calcEnableActionsColumn = () => {
    const permisos = hasPermission(
      PermissionsEnum.cartera_change_cambiodomicilio,
    );

    if (permisos && state === EstadoCambioDomicilioEnumChoice.ESPERA) {
      return true;
    }
    return false;
  };
  const onEdit = (row: CambioDomicilio) => {
    navigate(`${returnUrlCambioDomicilioPage}/editar/${row.uuid}`);
  };

  return (
    <GridTableTabsContainerOnly>
      <CustomSearch
        onChange={onChangeFilter}
        value={globalFilter}
        text="por identificación"
      />

      <CustomTable<CambioDomicilio>
        columns={
          state === EstadoCambioDomicilioEnumChoice.ESPERA
            ? cambioDomicilioColumns
            : state === EstadoCambioDomicilioEnumChoice.FINALIZADO
              ? cambioDomicilioColumns
              : state === EstadoCambioDomicilioEnumChoice.SIN_FACTIBILIDAD
                ? cambioDomicilioColumns
                : state === EstadoCambioDomicilioEnumChoice.CANCELADO
                  ? cambioDomicilioColumns
                  : cambioDomicilioColumns
        }
        data={TipoMantenedorBeneficiosPaginatedRes?.data?.items || []}
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
        rowCount={TipoMantenedorBeneficiosPaginatedRes?.data?.meta?.count}
        // // actions
        /* actionsColumnSize={TABLE_CONSTANTS.ACTIONCOLUMN_WIDTH}
        enableActionsColumn={hasPermission(
          PermissionsEnum.tecnico_change_asuntoticket,
        )} */
        // crud
        canEdit={calcEnableActionsColumn()}
        onEdit={onEdit}
        canDelete={false}
      />
    </GridTableTabsContainerOnly>
  );
};

export default CambioDomicilioByStatePage;
