import { useFetchRubros } from '@/actions/app';
import {
  LineaServicio,
  Rubro,
  useColumnsRubrosCliente,
  useLoaders,
  useTableFilter,
  useTableServerSideFiltering,
} from '@/shared';
import { CustomSingleButton, CustomTable } from '@/shared/components';
import { Grid } from '@mui/material';
import { FiPlus } from 'react-icons/fi';

export type ClienteFibraRubroTabProps = {
  serviceLine?: LineaServicio;
};

const ClienteFibraRubroTab: React.FC<ClienteFibraRubroTabProps> = ({
  serviceLine,
}) => {
  ///* table -------------------------
  // server side filters - colums table
  const { filterObject, columnFilters, setColumnFilters } =
    useTableServerSideFiltering();
  const {
    // globalFilter,
    pagination,
    searchTerm,
    // onChangeFilter,
    setPagination,
  } = useTableFilter();
  const { pageIndex, pageSize } = pagination;

  ///* fetch data -------------------------
  const {
    data: rubrosPagingRes,
    isLoading: isRubrosLoading,
    isRefetching: isRubrosRefetching,
  } = useFetchRubros({
    enabled: !!serviceLine?.uuid,
    params: {
      page: pageIndex + 1,
      page_size: pageSize,
      ...filterObject,

      cliente: serviceLine?.cliente,
      linea_servicio: serviceLine?.id,

      concepto: searchTerm,
    },
  });

  const isCustomLoading = isRubrosLoading || isRubrosRefetching;
  useLoaders(isCustomLoading);

  ///* columns -------------------------
  const { columnsRubrosClientView } = useColumnsRubrosCliente({
    showNumberRubro: false,
  });

  return (
    <>
      <Grid item container xs={12}>
        {/* ================= buttons ================= */}
        <Grid item container xs={12} my={3}>
          <span className="spacer"></span>

          <Grid item container md={6} justifyContent="flex-end" spacing={1}>
            <CustomSingleButton
              label="RUBRO LIBRE"
              color="primary"
              variant="text"
              startIcon={<FiPlus />}
              onClick={() => {
                console.log('open agregar equipo');
              }}
              justifyContent="flex-end"
            />

            <CustomSingleButton
              label="RUBRO DE SERVICIO"
              variant="text"
              startIcon={<FiPlus />}
              justifyContent="flex-end"
              onClick={() => {
                console.log('open rubro de servicio');
              }}
            />
          </Grid>
        </Grid>

        {/* ================= table ================= */}
        <Grid item xs={12}>
          <CustomTable<Rubro>
            columns={columnsRubrosClientView}
            data={rubrosPagingRes?.data?.items || []}
            isLoading={isRubrosLoading}
            isRefetching={isRubrosRefetching}
            // // filters - server side
            enableManualFiltering={true}
            columnFilters={columnFilters}
            onColumnFiltersChange={setColumnFilters}
            // // search
            enableGlobalFilter={false}
            // // pagination
            pagination={pagination}
            onPaging={setPagination}
            rowCount={rubrosPagingRes?.data?.meta?.count}
            // // actions
            enableActionsColumn={false}
            // crud
            canEdit={false}
            canDelete={false}
          />
        </Grid>
      </Grid>
    </>
  );
};

export default ClienteFibraRubroTab;
