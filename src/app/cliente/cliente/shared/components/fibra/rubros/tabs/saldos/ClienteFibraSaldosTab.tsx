import { Grid } from '@mui/material';
import { useState } from 'react';
import { FiPlus } from 'react-icons/fi';

import { useFetchSaldos } from '@/actions/app';
import {
  LineaServicio,
  Saldo,
  useColumnsSaldos,
  useLoaders,
  useTableFilter,
  useTableServerSideFiltering,
} from '@/shared';
import { CustomSingleButton, CustomTable } from '@/shared/components';
import { ClienteFibraCreateSaldoModal } from './custom';

export type ClienteFibraSaldosTabProps = {
  serviceLine?: LineaServicio;
};

const ClienteFibraSaldosTab: React.FC<ClienteFibraSaldosTabProps> = ({
  serviceLine,
}) => {
  ///* local state -------------------------
  const [isOpenModal, setIsOpenModal] = useState<boolean>(false);

  ///* table -------------------------
  // server side filters - colums table
  const { filterObject, columnFilters, setColumnFilters } =
    useTableServerSideFiltering();
  const {
    // globalFilter,
    pagination,
    // onChangeFilter,
    setPagination,
  } = useTableFilter();
  const { pageIndex, pageSize } = pagination;

  ///* fetch data -------------------------
  const {
    data: saldosPagingRes,
    isLoading: isSaldosLoading,
    isRefetching: isSaldosRefetching,
  } = useFetchSaldos({
    enabled: !!serviceLine?.id,
    params: {
      page: pageIndex + 1,
      page_size: pageSize,
      ...filterObject,

      linea_servicio: serviceLine?.id!,
      cliente: serviceLine?.cliente!,
    },
  });

  const isCustomLoading = isSaldosLoading || isSaldosRefetching;
  useLoaders(isCustomLoading);

  ///* columns -----------------------
  const { genericColumns } = useColumnsSaldos();

  return (
    <>
      <Grid item container xs={12} spacing={3}>
        <Grid item xs={12}>
          <CustomSingleButton
            label="SALDO"
            color="primary"
            variant="text"
            startIcon={<FiPlus />}
            onClick={() => {
              setIsOpenModal(true);
            }}
            justifyContent="flex-end"
          />
        </Grid>

        <Grid item xs={12}>
          <CustomTable<Saldo>
            columns={genericColumns}
            data={saldosPagingRes?.data?.items || []}
            isLoading={isSaldosLoading}
            isRefetching={isSaldosRefetching}
            // // filters - server side
            enableManualFiltering={true}
            columnFilters={columnFilters}
            onColumnFiltersChange={setColumnFilters}
            // // search
            enableGlobalFilter={false}
            // // pagination
            pagination={pagination}
            onPaging={setPagination}
            rowCount={saldosPagingRes?.data?.meta?.count}
            // // actions
            enableActionsColumn={false}
            // crud
            canEdit={false}
            canDelete={false}
          />
        </Grid>
      </Grid>

      {/* ================= modal ================= */}
      <ClienteFibraCreateSaldoModal
        open={isOpenModal}
        onClose={() => setIsOpenModal(false)}
        serviceLine={serviceLine!}
      />
    </>
  );
};

export default ClienteFibraSaldosTab;
