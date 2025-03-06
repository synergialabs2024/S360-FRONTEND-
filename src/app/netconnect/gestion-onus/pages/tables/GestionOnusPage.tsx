import { MRT_ColumnDef } from 'material-react-table';
import { useForm } from 'react-hook-form';
import { useMemo } from 'react';

import {
  CustomSearch,
  CustomTable,
  SingleTableBoxScene,
} from '@/shared/components';
import { ROUTER_PATHS } from '@/router/constants';
import { emptyCellOneLevel } from '@/shared/utils';
import { GestionOnu, OLT } from '@/shared/interfaces';
import { SelectOLTItemsNMS } from '@/app/netconnect/custom';
import { useFetchGestionOnus, useFetchOLTs } from '@/actions/app';
import { useTableFilter, useTableServerSideFiltering } from '@/shared/hooks';

export const returnUrlGestionOnusPage = ROUTER_PATHS.netconnect.gestionOnusNav;

export type GestionOnusPageProps = {};

interface OLTForm extends OLT {
  olt: string | number;
}

const GestionOnusPage: React.FC<GestionOnusPageProps> = () => {
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
    data: GestionOnusPagingRes,
    isLoading,
    isRefetching,
  } = useFetchGestionOnus({
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
  const columns = useMemo<MRT_ColumnDef<GestionOnu>[]>(
    () => [
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
        accessorKey: 'estado_onu',
        header: 'ESTADO ONU',
        size: 180,
        enableColumnFilter: false,
        enableSorting: false,
        Cell: ({ row }) => emptyCellOneLevel(row, 'estado_onu'),
      },
    ],
    [],
  );

  return (
    <SingleTableBoxScene
      title="Gestion de ONUs"
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

      <CustomTable<GestionOnu>
        columns={columns}
        data={GestionOnusPagingRes?.data?.items || []}
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
        rowCount={GestionOnusPagingRes?.data?.meta?.count}
        enableActionsColumn={false}
      />
    </SingleTableBoxScene>
  );
};

export default GestionOnusPage;
