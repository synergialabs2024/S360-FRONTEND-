import { IconUpload } from '@tabler/icons-react';
import { useNavigate } from 'react-router';
import { useForm } from 'react-hook-form';
import { Grid } from '@mui/material';
import { useState } from 'react';

import {
  CustomTable,
  CustomSearch,
  CustomScanLoad,
  UploadFileDropZone,
  SingleTableBoxScene,
  ScrollableDialogProps,
  CustomAutocompleteNoForm,
  GridTableTabsContainerOnly,
  CustomSingleButton,
} from '@/shared/components';
import {
  ToastWrapper,
  gridSizeMdLg4,
  gridSizeMdLg6,
  useTableFilter,
  CuentaContable,
  PermissionsEnum,
  TABLE_CONSTANTS,
  BucketTypeEnumChoice,
  useUploadFileGeneric,
  useColumnsCuentaContable,
  useTableServerSideFiltering,
  fileCuentaContableEnumChoiceType,
  FILE_CUENTA_CONTABLE_ARRAY_OBJ_ONT,
} from '@/shared';
import {
  useFetchCuentaContables,
  useCreateCuentaContableCargaMasiva,
} from '@/actions/app';
import { ROUTER_PATHS } from '@/router/constants';
import { useUiConfirmModalStore } from '@/store/ui';
import { hasAllPermissions } from '@/shared/utils/auth';
import { useCheckPermission } from '@/shared/hooks/auth';
import { uploadFileToBucket } from '@/actions/statics-api';

export const returnUrlCuentaContablePage =
  ROUTER_PATHS.inventario.cuentaContablesNav;

export type CuentaContablePageProps = {};
type SaveFormData = {};

const CuentaContablePages: React.FC<CuentaContablePageProps> = () => {
  //* State local
  const [open, setOpen] = useState(false);
  const [valueCC, setValueCC] = useState<string | null>(null);
  const [isCheckingFile, setIsCheckingFile] = useState<boolean>(false);

  //* State Global
  const { file1: File_url, setFile1: setFile_url } = useUploadFileGeneric();

  useCheckPermission(PermissionsEnum.contabilidad_view_cuentacontable);

  const navigate = useNavigate();

  // server side filters - colums table
  const { filterObject, columnFilters, setColumnFilters } =
    useTableServerSideFiltering();

  ///* global state
  const setConfirmDialog = useUiConfirmModalStore(s => s.setConfirmDialog);
  const setConfirmDialogIsOpen = useUiConfirmModalStore(
    s => s.setConfirmDialogIsOpen,
  );

  ///* table
  const {
    globalFilter,
    pagination,
    searchTerm,
    onChangeFilter,
    setPagination,
  } = useTableFilter();
  const { pageIndex, pageSize } = pagination;

  // Form setup
  const form = useForm<SaveFormData>({
    defaultValues: {},
  });

  const { handleSubmit } = form;

  ///* fetch data
  const {
    data: CuentaContablePagingRes,
    isLoading,
    isRefetching,
  } = useFetchCuentaContables({
    params: {
      page: pageIndex + 1,
      page_size: pageSize,
      nombre: searchTerm,
      ...filterObject,

      filterByState: false,
    },
  });

  ///* mutations
  const createCuentaContableCMMutation = useCreateCuentaContableCargaMasiva({
    enableNavigate: true,
    enableErrorNavigate: true,
  });

  ///* handlers
  const onEdit = (brass: CuentaContable) => {
    setConfirmDialog({
      isOpen: true,
      title: 'Editar Brass',
      subtitle: '¿Está seguro que desea editar este registro?',
      onConfirm: () => {
        setConfirmDialogIsOpen(false);
        navigate(`${returnUrlCuentaContablePage}/editar/${brass.uuid}`);
      },
    });
  };
  const onFile = async () => {
    // validate file -----------
    if (!File_url) return ToastWrapper.error('La archivo es requerida');

    // upload images ----
    setOpen(false);
    setIsCheckingFile(true);

    const [ImgUrl] = await Promise.all([
      uploadFileToBucket({
        file: File_url,
        file_name: 'file_cuenta_contable',
        bucketDir: BucketTypeEnumChoice.FILES_CUENTA_CONTABLE,
      }),
    ]);

    const data = {
      url: ImgUrl.streamUlr,
      tipo: valueCC,
    };

    createCuentaContableCMMutation.mutate(data);
    setIsCheckingFile(false);
  };

  ///* columns
  const { cuentaContableColumns } = useColumnsCuentaContable();

  return (
    <>
      <CustomScanLoad isOpen={isCheckingFile} name="archivo" />
      {open && (
        <ScrollableDialogProps
          open={open}
          onClose={() => setOpen(false)}
          confirmTextBtn="Enviar"
          onConfirm={handleSubmit(onFile, () => {})}
          title="SUBIR ARCHIVO"
          contentNode={
            <>
              <CustomAutocompleteNoForm<fileCuentaContableEnumChoiceType>
                label=""
                value={valueCC}
                actualValueKey="value"
                onChange={v => {
                  setValueCC(v as string);
                }}
                options={FILE_CUENTA_CONTABLE_ARRAY_OBJ_ONT}
                getOptionLabel={o => o.label}
                loading={false}
                error={false}
                disableClearable
                size={gridSizeMdLg6}
              />
              <UploadFileDropZone
                buttonLabel="Excel"
                type="excel"
                selectedFile={File_url}
                setSelectedFile={setFile_url}
                sizeContainer={gridSizeMdLg4}
              />
            </>
          }
        />
      )}
      <SingleTableBoxScene
        title="Cuenta Contable"
        createPageUrl={`${returnUrlCuentaContablePage}/crear`}
        isMainTableStates
      >
        <GridTableTabsContainerOnly>
          <CustomSearch
            onChange={onChangeFilter}
            value={globalFilter}
            text="por nombre"
            sxContainer={{
              mb: 5,
            }}
            customSpaceNode={
              <Grid sx={{ m: '5px' }}>
                <CustomSingleButton
                  label="Subir Archivo"
                  color="primary"
                  variant="text"
                  startIcon={<IconUpload />}
                  onClick={() => setOpen(!open)}
                  justifyContent="flex-end"
                />
              </Grid>
            }
          />

          <CustomTable<CuentaContable>
            columns={cuentaContableColumns}
            data={CuentaContablePagingRes?.data?.items || []}
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
            rowCount={CuentaContablePagingRes?.data?.meta?.count}
            // // actions
            actionsColumnSize={TABLE_CONSTANTS.ACTIONCOLUMN_WIDTH}
            enableActionsColumn={hasAllPermissions([
              PermissionsEnum.contabilidad_view_cuentacontable,
            ])}
            // crud
            canEdit={hasAllPermissions([
              PermissionsEnum.contabilidad_view_cuentacontable,
            ])}
            onEdit={onEdit}
          />
        </GridTableTabsContainerOnly>
      </SingleTableBoxScene>
    </>
  );
};

export default CuentaContablePages;
