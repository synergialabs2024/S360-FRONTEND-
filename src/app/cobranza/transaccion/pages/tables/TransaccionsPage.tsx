import { getExcelTransaccions, useFetchTransaccions } from '@/actions/app';
import { ROUTER_PATHS } from '@/router/constants';
import { gridSizeMdLg6 } from '@/shared';
import {
  CustomDatePicker,
  CustomSearch,
  CustomTable,
  SingleTableBoxScene,
} from '@/shared/components';
import {
  useColumnsTransaccionesCliente,
  useTableFilter,
  useTableServerSideFiltering,
} from '@/shared/hooks';
import { useCheckPermission } from '@/shared/hooks/auth';
import { PermissionsEnum, Transaccion } from '@/shared/interfaces';
import { Button, Grid } from '@mui/material';
import dayjs from 'dayjs';
import { useForm } from 'react-hook-form';

export const returnUrlTransaccionsPage = ROUTER_PATHS.cartera.transaccionesNav;

export type TransaccionsPageProps = {
  start_date?: string;
  end_date?: string;
};

type SaveFormData = {
  start_date?: string;
  end_date?: string;
};

const TransaccionsPage: React.FC<TransaccionsPageProps> = () => {
  useCheckPermission(PermissionsEnum.cobranza_view_transaccion);

  const form = useForm<SaveFormData>({
    defaultValues: {
      start_date: dayjs().format('YYYY-MM-DD'),
      end_date: dayjs().format('YYYY-MM-DD'),
    },
  });

  const {
    watch,
    formState: { errors },
  } = form;

  const watchedStartDay = watch('start_date');
  const watchedEndDay = watch('end_date');

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

  ///* fetch data -----------------
  const {
    data: TransaccionsPagingRes,
    isLoading,
    isRefetching,
  } = useFetchTransaccions({
    enabled: true,
    params: {
      page: pageIndex + 1,
      page_size: pageSize,
      cliente__razon_social: searchTerm,
      ...filterObject,
      filterByState: false,
      created_at_range_after: watchedStartDay ?? dayjs().format('YYYY-MM-DD'),
      created_at_range_before: watchedEndDay ?? dayjs().format('YYYY-MM-DD'),
    },
  });

  ///* columns -----------------
  const { generalTransaccionesColumns } = useColumnsTransaccionesCliente();

  const handleDownloadExcel = () => {
    getExcelTransaccions({
      page_size: 99999999,
      ...filterObject,
      filterByState: false,
      created_at_range_after: watchedStartDay ?? dayjs().format('YYYY-MM-DD'),
      created_at_range_before: watchedEndDay ?? dayjs().format('YYYY-MM-DD'),
    });
  };

  return (
    <SingleTableBoxScene
      title="Transacciones"
      createPageUrl={`${returnUrlTransaccionsPage}/crear`}
      // showCreateBtn={hasPermission(PermissionsEnum.cobranza_add_transaccion)}
      showCreateBtn={false}
    >
      <CustomSearch
        onChange={onChangeFilter}
        value={globalFilter}
        text="por nombre"
        customSpaceNode={
          <>
            <CustomDatePicker
              label="Dia inicio"
              name="start_date"
              control={form.control}
              defaultValue={dayjs().format('YYYY-MM-DD')}
              error={errors.start_date}
              helperText={errors.start_date?.message}
              size={gridSizeMdLg6}
            />
            <CustomDatePicker
              label="Dia fin"
              name="end_date"
              control={form.control}
              defaultValue={dayjs().format('YYYY-MM-DD')}
              error={errors.end_date}
              helperText={errors.end_date?.message}
              size={gridSizeMdLg6}
            />
            <Grid sx={{ m: '5px' }}>
              <Button onClick={handleDownloadExcel}>Descargar Excel</Button>
            </Grid>
          </>
        }
      />

      <CustomTable<Transaccion>
        columns={generalTransaccionesColumns}
        data={TransaccionsPagingRes?.data?.items || []}
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
        rowCount={TransaccionsPagingRes?.data?.meta?.count}
        // // actions
        enableActionsColumn={false}
        canEdit={false}
      />
    </SingleTableBoxScene>
  );
};

export default TransaccionsPage;
