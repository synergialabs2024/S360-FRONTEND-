import { MRT_ColumnDef } from 'material-react-table';
import { useMemo } from 'react';

import { ROUTER_PATHS } from '@/router/constants';
import {
  CustomSearch,
  CustomTable,
  SingleTableBoxScene,
} from '@/shared/components';
import { TABLE_CONSTANTS } from '@/shared/constants/ui';
import { useTableFilter, useTableServerSideFiltering } from '@/shared/hooks';
import { useCheckPermission } from '@/shared/hooks/auth';
import { CambioDomicilio, PermissionsEnum } from '@/shared/interfaces';
import { emptyCellOneLevel } from '@/shared/utils';
import { hasPermission } from '@/shared/utils/auth';
import { useUiConfirmModalStore } from '@/store/ui';
import { useUpdateTipoMantenedorBeneficio } from '@/actions/app/cartera/buzon-tareas/parametros/tipo-mantenedor-beneficios';
import { useNavigate } from 'react-router';
import { useFetchCambioDomicilios } from '@/actions/app/cartera/cambio-domicilio';

export const returnUrlCambioDomicilioPage =
  ROUTER_PATHS.cartera.cambiodomicilioNav;

export type CambioDomicilioPageProps = {};

const CambioDomicilioPage: React.FC<CambioDomicilioPageProps> = () => {
  const navigate = useNavigate();

  useCheckPermission(PermissionsEnum.tecnico_view_tickettecnico);

  /* const navigate = useNavigate(); */

  // server side filters - colums table
  const { filterObject, columnFilters, setColumnFilters } =
    useTableServerSideFiltering();

  ///* global state
  const setConfirmDialog = useUiConfirmModalStore(s => s.setConfirmDialog);
  const setConfirmDialogIsOpen = useUiConfirmModalStore(
    s => s.setConfirmDialogIsOpen,
  );

  ///* mutations
  const changeState = useUpdateTipoMantenedorBeneficio({
    enableNavigate: false,
  });

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
      name: searchTerm,
      ...filterObject,
      filterByState: false,
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
  const columns = useMemo<MRT_ColumnDef<CambioDomicilio>[]>(
    () => [
      {
        accessorKey: 'estado_cambio_domicilio',
        header: 'ESTADO',
        size: TABLE_CONSTANTS.COLUMN_WIDTH_MEDIUM,
        enableColumnFilter: true,
        enableSorting: true,
        Cell: ({ row }) => emptyCellOneLevel(row, 'estado_cambio_domicilio'),
      },
      {
        accessorKey: 'new_direccion_referencia',
        header: 'NUEVA DIRECCION REFERENCIA',
        size: TABLE_CONSTANTS.COLUMN_WIDTH_MEDIUM,
        enableColumnFilter: true,
        enableSorting: true,
        Cell: ({ row }) => emptyCellOneLevel(row, 'new_direccion_referencia'),
      },
    ],
    [changeState, setConfirmDialog, setConfirmDialogIsOpen],
  );

  const onEdit = (row: CambioDomicilio) => {
    navigate(`${returnUrlCambioDomicilioPage}/editar/${row.uuid}`);
  };

  return (
    <SingleTableBoxScene
      title="Cambio domicilio"
      createPageUrl={`${returnUrlCambioDomicilioPage}/crear`}
      showCreateBtn={hasPermission(
        PermissionsEnum.cartera_add_tipomantenedorbeneficios,
      )}
    >
      <CustomSearch
        onChange={onChangeFilter}
        value={globalFilter}
        text="por nombre"
      />

      <CustomTable<CambioDomicilio>
        columns={columns}
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
        canEdit={hasPermission(
          PermissionsEnum.cartera_change_tipomantenedorbeneficios,
        )}
        onEdit={onEdit}
        canDelete={false}
      />
    </SingleTableBoxScene>
  );
};

export default CambioDomicilioPage;
