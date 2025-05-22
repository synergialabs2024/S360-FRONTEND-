import { MRT_ColumnDef } from 'material-react-table';
import { ROUTER_PATHS } from '@/router/constants';
import { useMemo } from 'react';

import {
  CustomTable,
  CustomSearch,
  SingleTableBoxScene,
} from '@/shared/components';
import {
  useTableFilter,
  TABLE_CONSTANTS,
  PermissionsEnum,
  emptyCellOneLevel,
  formatDateWithTimeCell,
  useTableServerSideFiltering,
  EstadoTicketTecnicoEnumChoice,
  PROMESA_PAGO_ESTADO_PROMESA_ARRAY_CHOICES,
  PROMESA_PAGO_ESTADO_LINEA_REGISTRAR_ARRAY_CHOICES,
} from '@/shared';
import { useCheckPermission } from '@/shared/hooks/auth';
import { CambioPlan } from '@/shared/interfaces/app/cartera';
import { useFetchPromesasPago } from '@/actions/app/cartera/promesa-pago/promesa-pago.actions';
import { PromesaPago } from '@/shared/interfaces/app/cartera/promesa-pago/promesa-pago.interface';

export const returnUrlPromesaPagoPage = ROUTER_PATHS.cartera.promesapagoNav;

export type PromesaPagoByStatePageProps = {
  state: EstadoTicketTecnicoEnumChoice;
};

const PromesaPagoByStatePage: React.FC<PromesaPagoByStatePageProps> = () => {
  useCheckPermission(PermissionsEnum.cartera_view_promesapago);

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
    data: CambioPlanesPagingRes,
    isLoading,
    isRefetching,
  } = useFetchPromesasPago({
    enabled: true,
    params: {
      page: pageIndex + 1,
      page_size: pageSize,
      observacion: searchTerm,
      ...filterObject,
      filterByState: false,
    },
  });

  ///* columns
  const columns = useMemo<MRT_ColumnDef<CambioPlan>[]>(
    () => [
      {
        accessorKey: 'estado_promesa',
        header: 'ESTADO PROMESA',
        size: TABLE_CONSTANTS.COLUMN_WIDTH_MEDIUM,
        enableColumnFilter: true,
        enableSorting: true,
        filterVariant: 'select',
        filterSelectOptions: PROMESA_PAGO_ESTADO_PROMESA_ARRAY_CHOICES,
        Cell: ({ row }) => emptyCellOneLevel(row, 'estado_promesa'),
      },
      {
        accessorKey: 'estado_linea_al_registrar',
        header: 'ESTADO LINEA AL REGISTRAR',
        size: TABLE_CONSTANTS.COLUMN_WIDTH_MEDIUM,
        enableColumnFilter: true,
        enableSorting: true,
        filterVariant: 'select',
        filterSelectOptions: PROMESA_PAGO_ESTADO_LINEA_REGISTRAR_ARRAY_CHOICES,
        Cell: ({ row }) => emptyCellOneLevel(row, 'estado_linea_al_registrar'),
      },
      {
        accessorKey: 'observacion',
        header: 'OBSERVACION',
        size: TABLE_CONSTANTS.COLUMN_WIDTH_MEDIUM,
        Cell: ({ row }) => emptyCellOneLevel(row, 'observacion'),
      },
      {
        accessorKey: 'created_at',
        header: 'FECHA CREACION',
        size: 180,
        enableColumnFilter: false,
        enableSorting: false,
        Cell: ({ row }) => formatDateWithTimeCell(row, 'created_at'),
      },
      {
        accessorKey: 'fecha_promesa_pago',
        header: 'FECHA PROMESA PAGO',
        size: 180,
        enableColumnFilter: false,
        enableSorting: false,
        Cell: ({ row }) => formatDateWithTimeCell(row, 'fecha_promesa_pago'),
      },
    ],
    [],
  );

  return (
    <SingleTableBoxScene
      title="Promesas pago"
      createPageUrl={`${returnUrlPromesaPagoPage}/crear`}
      showCreateBtn={true}
    >
      <CustomSearch
        onChange={onChangeFilter}
        value={globalFilter}
        text="por observación"
      />

      <CustomTable<PromesaPago>
        columns={columns}
        data={CambioPlanesPagingRes?.data?.items || []}
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
        rowCount={CambioPlanesPagingRes?.data?.meta?.count}
        // // actions
        enableActionsColumn={false}
      />
    </SingleTableBoxScene>
  );
};

export default PromesaPagoByStatePage;
