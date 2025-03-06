import { MRT_ColumnDef } from 'material-react-table';
import { useForm } from 'react-hook-form';
import { useMemo } from 'react';

import {
  CustomSearch,
  CustomTable,
  SingleTableBoxScene,
} from '@/shared/components';
import { OLT } from '@/shared/interfaces';
import { ROUTER_PATHS } from '@/router/constants';
import { emptyCellOneLevel } from '@/shared/utils';
import { TABLE_CONSTANTS } from '@/shared/constants/ui';
import { SelectOLTItemsNMS } from '@/app/netconnect/custom';
import { OnusConfigurada } from '@/shared/interfaces/app/netconnect';
import { useFetchOLTs, useFetchOnusConfiguradas } from '@/actions/app';
import { useTableFilter, useTableServerSideFiltering } from '@/shared/hooks';

export const returnUrlOnusConfiguradasPage =
  ROUTER_PATHS.netconnect.onusConfiguradasNav;

export type OnusConfiguradasPageProps = {};

interface OLTForm extends OLT {
  olt: string | number;
}

const OnusConfiguradasPage: React.FC<OnusConfiguradasPageProps> = () => {
  ///* Pendiente a cambio
  //useCheckPermission(PermissionsEnum.administration_view_pais);

  // Fetch data
  const { data: OsLTPagingRes, isLoading: isOLTsLoading } = useFetchOLTs({
    enabled: true,
  });

  // Memorizar `oltData` para recalcular solo cuando `OsLTPagingRes` cambie
  const oltData = useMemo(() => {
    return OsLTPagingRes?.data?.items || [];
  }, [OsLTPagingRes]);

  // Form setup
  const form = useForm<OLTForm>({
    defaultValues: {
      olt: '',
    },
  });

  // server side filters - columns table
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
    data: OnusConfiguradasPagingRes,
    isLoading,
    isRefetching,
  } = useFetchOnusConfiguradas({
    enabled: true,
    params: {
      page: pageIndex + 1,
      page_size: pageSize,
      name: searchTerm,
      ...filterObject,
      filterByState: false,
    },
  });

  ///* columns
  const columns = useMemo<MRT_ColumnDef<OnusConfigurada>[]>(
    () => [
      {
        accessorKey: 'estado_cliente',
        header: 'ESTADO CLIENTE',
        size: TABLE_CONSTANTS.COLUMN_WIDTH_MEDIUM,
        enableColumnFilter: true,
        enableSorting: true,
        Cell: ({ row }) => emptyCellOneLevel(row, 'estado_cliente'),
      },
      {
        accessorKey: 'nombre',
        header: 'NOMBRE',
        size: 180,
        enableColumnFilter: false,
        enableSorting: false,
        Cell: ({ row }) => emptyCellOneLevel(row, 'nombre'),
      },
      {
        accessorKey: 'alias',
        header: 'ALIAS',
        size: 180,
        enableColumnFilter: false,
        enableSorting: false,
        Cell: ({ row }) => emptyCellOneLevel(row, 'alias'),
      },
      {
        accessorKey: 'sn_mac',
        header: 'SN/MAC',
        size: 180,
        enableColumnFilter: false,
        enableSorting: false,
        Cell: ({ row }) => emptyCellOneLevel(row, 'sn_mac'),
      },
      {
        accessorKey: 'potencia',
        header: 'POTENCIA',
        size: 180,
        enableColumnFilter: false,
        enableSorting: false,
        Cell: ({ row }) => emptyCellOneLevel(row, 'potencia'),
      },
      {
        accessorKey: 'estado_onu',
        header: 'ESTADO ONU',
        size: 180,
        enableColumnFilter: false,
        enableSorting: false,
        Cell: ({ row }) => emptyCellOneLevel(row, 'estado_onu'),
      },
      {
        accessorKey: 'last_down_cause',
        header: 'LAST DOWN CAUSE',
        size: 180,
        enableColumnFilter: false,
        enableSorting: false,
        Cell: ({ row }) => emptyCellOneLevel(row, 'last_down_cause'),
      },
      {
        accessorKey: 'pppuser',
        header: 'PPPUSER',
        size: 180,
        enableColumnFilter: false,
        enableSorting: false,
        Cell: ({ row }) => emptyCellOneLevel(row, 'pppuser'),
      },
      {
        accessorKey: 'pppass',
        header: 'PPPASS',
        size: 180,
        enableColumnFilter: false,
        enableSorting: false,
        Cell: ({ row }) => emptyCellOneLevel(row, 'pppass'),
      },
      {
        accessorKey: 'plan',
        header: 'PLAN',
        size: 180,
        enableColumnFilter: false,
        enableSorting: false,
        Cell: ({ row }) => emptyCellOneLevel(row, 'plan'),
      },
      {
        accessorKey: 'ip',
        header: 'IP',
        size: 180,
        enableColumnFilter: false,
        enableSorting: false,
        Cell: ({ row }) => emptyCellOneLevel(row, 'ip'),
      },
      {
        accessorKey: 'nodo',
        header: 'NODO',
        size: 180,
        enableColumnFilter: false,
        enableSorting: false,
        Cell: ({ row }) => emptyCellOneLevel(row, 'nodo'),
      },
      {
        accessorKey: 'modelo',
        header: 'MODELO',
        size: 180,
        enableColumnFilter: false,
        enableSorting: false,
        Cell: ({ row }) => emptyCellOneLevel(row, 'modelo'),
      },
      {
        accessorKey: 'srv_port',
        header: 'SRV PORT',
        size: 180,
        enableColumnFilter: false,
        enableSorting: false,
        Cell: ({ row }) => emptyCellOneLevel(row, 'srv_port'),
      },
      {
        accessorKey: 'vlan',
        header: 'VLAN',
        size: 180,
        enableColumnFilter: false,
        enableSorting: false,
        Cell: ({ row }) => emptyCellOneLevel(row, 'vlan'),
      },
    ],
    [],
  );

  return (
    <SingleTableBoxScene
      title="Registro de Onus Configurada"
      showCreateBtn={false}
      isMainTableStates
    >
      <CustomSearch
        onChange={onChangeFilter}
        value={globalFilter}
        text="por nombre"
        sxContainer={{
          mb: 5,
        }}
        customSpaceNode={
          // Asegúrate de pasar 'oltData' como 'data'
          <SelectOLTItemsNMS
            data={oltData}
            label="Seleccione OLT"
            name="olt"
            control={form.control}
            onChange={selectedValue => {
              console.log(selectedValue);
            }}
          />
        }
      />

      <CustomTable<OnusConfigurada>
        columns={columns}
        data={OnusConfiguradasPagingRes?.data?.items || []}
        isLoading={isLoading || isOLTsLoading}
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
        rowCount={OnusConfiguradasPagingRes?.data?.meta?.count}
        enableActionsColumn={false}
      />
    </SingleTableBoxScene>
  );
};

export default OnusConfiguradasPage;
