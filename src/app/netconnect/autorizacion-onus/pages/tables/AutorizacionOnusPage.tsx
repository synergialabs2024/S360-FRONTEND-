import { MRT_ColumnDef } from 'material-react-table';
import { useMemo } from 'react';

import { useFetchAutorizacionOnus, useFetchOLTs } from '@/actions/app';
import { ROUTER_PATHS } from '@/router/constants';
import {
  CustomSearch,
  CustomTable,
  SingleTableBoxScene,
} from '@/shared/components';
import { TABLE_CONSTANTS } from '@/shared/constants/ui';
import { useTableFilter, useTableServerSideFiltering } from '@/shared/hooks';
import { useCheckPermission } from '@/shared/hooks/auth';
import { AutorizacionOnu, OLT, PermissionsEnum } from '@/shared/interfaces';
import { emptyCellOneLevel } from '@/shared/utils';
import { SelectOLTItemsNMS } from '@/app/netconnect/custom';
import { useForm } from 'react-hook-form';

export const returnUrlAutorizacionOnusPage =
  ROUTER_PATHS.netconnect.autorizacionOnusNav;

export type AutorizacionOnusPageProps = {};

interface OLTForm extends OLT {
  olt: string | number;
}

const AutorizacionOnusPage: React.FC<AutorizacionOnusPageProps> = () => {
  ///* Pendiente a cambio
  useCheckPermission(PermissionsEnum.administration_view_pais);

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
    data: AutorizacionOnusPagingRes,
    isLoading,
    isRefetching,
  } = useFetchAutorizacionOnus({
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
  const columns = useMemo<MRT_ColumnDef<AutorizacionOnu>[]>(
    () => [
      {
        accessorKey: 'board',
        header: 'BOARD',
        size: TABLE_CONSTANTS.COLUMN_WIDTH_MEDIUM,
        enableColumnFilter: true,
        enableSorting: true,
        Cell: ({ row }) => emptyCellOneLevel(row, 'board'),
      },
      {
        accessorKey: 'port',
        header: 'PORT',
        size: TABLE_CONSTANTS.COLUMN_WIDTH_MEDIUM,
        enableColumnFilter: true,
        enableSorting: true,
        Cell: ({ row }) => emptyCellOneLevel(row, 'port'),
      },
      {
        accessorKey: 'type',
        header: 'TYPE',
        size: TABLE_CONSTANTS.COLUMN_WIDTH_MEDIUM,
        enableColumnFilter: true,
        enableSorting: true,
        Cell: ({ row }) => emptyCellOneLevel(row, 'type'),
      },
      {
        accessorKey: 'serial_number',
        header: 'SERIAL NUMBER',
        size: TABLE_CONSTANTS.COLUMN_WIDTH_MEDIUM,
        enableColumnFilter: true,
        enableSorting: true,
        Cell: ({ row }) => emptyCellOneLevel(row, 'serial_number'),
      },
    ],
    [],
  );

  return (
    <SingleTableBoxScene
      title="Autorizacion de ONUs"
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

      <CustomTable<AutorizacionOnu>
        columns={columns}
        data={AutorizacionOnusPagingRes?.data?.items || []}
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
        rowCount={AutorizacionOnusPagingRes?.data?.meta?.count}
        enableActionsColumn={false}
      />
    </SingleTableBoxScene>
  );
};

export default AutorizacionOnusPage;
