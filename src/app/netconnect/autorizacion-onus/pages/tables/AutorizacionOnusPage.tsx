import { useForm } from 'react-hook-form';
import { Button } from '@mui/material';
import { useQueryClient } from '@tanstack/react-query';

import {
  AutorizacionONUTSQEnum,
  CreateAuthOnuParamsBase,
  useCreateAuthONUs,
  useFetchAuthOnu,
  useFetchOLTs,
} from '@/actions/app';
import {
  CustomSearch,
  CustomTable,
  SelectArrayChip,
  SingleTableBoxScene,
} from '@/shared/components';
import { gridSizeMdLg8 } from '@/shared/constants/ui';
import {
  useColumnsAutorizacionOnus,
  useTableFilter,
  useTableServerSideFiltering,
} from '@/shared/hooks';
import { useCheckPermission } from '@/shared/hooks/auth';
import { AutorizacionOnu, OLT, PermissionsEnum } from '@/shared/interfaces';

type SaveFormData = CreateAuthOnuParamsBase & {};

export type AutorizacionOnusPageProps = {};

const AutorizacionOnusPage: React.FC<AutorizacionOnusPageProps> = () => {
  ///* Pendiente a cambio
  useCheckPermission(PermissionsEnum.administration_view_pais);

  // Select OLT
  const {
    data: OltsTPagingRes,
    isLoading: isLoadingOlts,
    isRefetching: isRefetchingOlts,
  } = useFetchOLTs({
    enabled: true,
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

    await queryClient.invalidateQueries({
      queryKey: [AutorizacionONUTSQEnum.AUTORIZACIONONUS],
    });

    ///* create
    createAutorizacionONUMutation.mutate({
      olt_ids: watchIdOLT,
    });
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
      name: searchTerm,
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
        text="por nombre"
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
            />

            <Button sx={{ mt: 3 }} onClick={handleSubmit(onSave, () => {})}>
              Buscar ONTs
            </Button>
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
