import { gridSizeMdLg8 } from '@/shared/constants/ui';
import { useQueryClient } from '@tanstack/react-query';
import { useForm } from 'react-hook-form';
import { Grid } from '@mui/material';

import {
  useFetchOLTs,
  useFetchAuthOnu,
  useCreateAuthONUs,
  AutorizacionONUTSQEnum,
  CreateAuthOnuParamsBase,
} from '@/actions/app';
import {
  CustomTable,
  CustomSearch,
  SelectArrayChip,
  SingleTableBoxScene,
  CustomSingleButton,
} from '@/shared/components';
import {
  useTableFilter,
  useColumnsAutorizacionOnus,
  useTableServerSideFiltering,
} from '@/shared/hooks';
import { ToastWrapper } from '@/shared';
import { ROUTER_PATHS } from '@/router/constants';
import { useCheckPermission } from '@/shared/hooks/auth';
import { AutorizacionOnu, OLT, PermissionsEnum } from '@/shared/interfaces';
import { IconSearch } from '@tabler/icons-react';

type SaveFormData = CreateAuthOnuParamsBase & {};

export type AutorizacionOnusPageProps = {};

export const returnUrlAuthOnu = ROUTER_PATHS.netconnect.autorizacionOnusNav;

const AutorizacionOnusPage: React.FC<AutorizacionOnusPageProps> = () => {
  useCheckPermission(PermissionsEnum.infraestructura_view_olt);

  // Select OLT
  const {
    data: OltsTPagingRes,
    isLoading: isLoadingOlts,
    isRefetching: isRefetchingOlts,
  } = useFetchOLTs({
    enabled: true,
    params: {
      filterByState: false,
      page_size: 1000,
    },
  });

  // Form setup
  const form = useForm<SaveFormData>({
    defaultValues: {
      olt_data: [],
    },
  });

  const {
    handleSubmit,
    formState: { isValid, errors },
  } = form;

  const watchIdOLT = form.watch('olt_data');

  ///* mutations
  const createAutorizacionONUMutation = useCreateAuthONUs({
    enableErrorNavigate: false,
  });

  const queryClient = useQueryClient();

  ///* handlers
  const onSave = async () => {
    if (!isValid) return;

    ///* create
    createAutorizacionONUMutation.mutate(
      {
        olt_ids: watchIdOLT,
      },
      {
        onSuccess: async () => {
          await queryClient.invalidateQueries({
            queryKey: [AutorizacionONUTSQEnum.AUTORIZACIONONUS],
          });
        },
        onError: error => {
          ToastWrapper.error(`Error al procesar la ONT. ${error}`);
        },
      },
    );
  };

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
  } = useFetchAuthOnu({
    enabled: true,
    params: {
      page: pageIndex + 1,
      page_size: pageSize,
      sn: searchTerm,
      ...filterObject,
      filterByState: false,
    },
  });

  ///* columns ------------------------
  const { consumoAutorizacion_Onus } = useColumnsAutorizacionOnus();

  return (
    <SingleTableBoxScene
      title="Autorizacion de ONUs"
      showCreateBtn={false}
      isMainTableStates
    >
      <CustomSearch
        onChange={onChangeFilter}
        value={globalFilter}
        text="por serial"
        sxContainer={{
          mb: 5,
        }}
        customSpaceNode={
          // Asegúrate de pasar 'oltData' como 'data'
          <>
            <SelectArrayChip<OLT>
              label="Seleccione OLT"
              name="olt_data"
              valueKey="name"
              actualValueKey="id"
              options={OltsTPagingRes?.data?.items || []}
              isLoadingData={isLoadingOlts || isRefetchingOlts}
              control={form.control}
              error={errors.olt_data as any}
              required={false}
              size={gridSizeMdLg8}
              titleArray={['name', 'hostname']}
              maxSelectable={3}
            />
            <Grid sx={{ m: '5px', mt: 3 }}>
              <CustomSingleButton
                label="Buscar ONTs"
                color="primary"
                variant="text"
                startIcon={<IconSearch />}
                onClick={handleSubmit(onSave, () => {})}
                justifyContent="flex-end"
              />
            </Grid>
          </>
        }
      />

      <CustomTable<AutorizacionOnu>
        columns={consumoAutorizacion_Onus}
        data={AutorizacionOnusPagingRes?.data?.items || []}
        isLoading={isLoadingOlts || isLoadingOlts || isLoading}
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
