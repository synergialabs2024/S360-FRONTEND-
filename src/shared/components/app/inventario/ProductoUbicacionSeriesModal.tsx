import { Grid } from '@mui/material';
import { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { MdAutoFixHigh, MdEdit, MdFilterAltOff } from 'react-icons/md';

import { EquiposUtilizadosOTTableType } from '@/app/tecnico/install-asignada/shared/components/form';
import { useColumnsEquiposMaterialesInstallOT } from '@/app/tecnico/install-asignada/shared/hooks';
import { UbicacionProductoSeriesTypeStr } from '@/shared';
import {
  CustomAutocompleteMultipleArrString,
  CustomBasicTable,
  CustomSingleButton,
  CustomTypoLabel,
  ScrollableDialogProps,
  SingleIconButton,
} from '@/shared/components';
import { ToastWrapper } from '@/shared/wrappers';
import { InstalacionesStoreKey, useInstalacionesStore } from '@/store/app';

export type ProductoUbicacionSeriesModalProps = {
  open: boolean;
  onClose: () => void;
  onChangeKeyArrayStore: InstalacionesStoreKey;
  enableAutoSelect?: boolean;
  showSelectedSeriesTextInViewMode?: boolean;
  enableEditSeries?: boolean;
};

// just to handle onChange series multiple
type SeriesFormData = UbicacionProductoSeriesTypeStr & {
  seriesArrString: string[];
};

const ProductoUbicacionSeriesModal: React.FC<
  ProductoUbicacionSeriesModalProps
> = ({
  onChangeKeyArrayStore,
  onClose,
  open,
  enableAutoSelect = true,
  showSelectedSeriesTextInViewMode = true,
  enableEditSeries = true,
}) => {
  ///* local state ==========================
  const [isEdittingSeries, setIsEdittingSeries] = useState<boolean>(false);
  const [isAutoSelectingSeries, setIsAutoSelectingSeries] =
    useState<boolean>(false);
  const [closeTimeoutId, setCloseTimeoutId] = useState<NodeJS.Timeout | null>(
    null,
  );

  ///* global state ==========================
  const selectedRow = useInstalacionesStore(s => s.selectedRow);
  const setSelectedRow = useInstalacionesStore(s => s.setSelectedRow);
  const updateSelectedItemValue = useInstalacionesStore(
    s => s.updateSelectedItemValue,
  );

  ///* form ==========================
  const form = useForm<SeriesFormData>();
  const {
    formState: { errors },
  } = form;

  ///* handlers ==========================
  const handleClose = () => {
    onClose();
    setIsAutoSelectingSeries(false);
    form.reset();
    setIsEdittingSeries(false);

    // reset selected row after close timer modal
    const timeoutId = setTimeout(() => {
      setSelectedRow(null);
      setCloseTimeoutId(null);
    }, 300);
    setCloseTimeoutId(timeoutId);
  };

  ///* columns ==========================
  const { columnsSelectedSeries } = useColumnsEquiposMaterialesInstallOT();

  ///* effects ==========================
  useEffect(() => {
    return () => {
      // Clean up the timeout if the component unmounts
      if (closeTimeoutId) {
        clearTimeout(closeTimeoutId);
      }
    };
  }, [closeTimeoutId]);

  return (
    <ScrollableDialogProps
      open={open}
      title={`Series del item: ${selectedRow?.producto_data?.codigo}`}
      width="69%"
      contentNode={
        <>
          {selectedRow?.savedSeries?.length && !isEdittingSeries ? (
            <Grid
              item
              xs={12}
              container
              spacing={4}
              mb={3}
              alignItems="center"
              p={3}
            >
              <Grid
                item
                container
                xs={12}
                alignItems="center"
                justifyContent="space-between"
              >
                <Grid item md={6} xs={12}>
                  {showSelectedSeriesTextInViewMode && (
                    <CustomTypoLabel
                      text={`Series Seleccionadas: ${selectedRow?.selectedSeries?.length}`}
                      variant="body1"
                      sx={{
                        m: '0',
                        p: '0',
                      }}
                    />
                  )}
                </Grid>

                <Grid item container md={6} xs={12}>
                  {enableEditSeries && (
                    <CustomSingleButton
                      label="EDITAR SERIES"
                      variant="text"
                      color="primary"
                      startIcon={<MdEdit />}
                      onClick={() => {
                        setIsEdittingSeries(true);
                        setIsAutoSelectingSeries(false);
                      }}
                      justifyContent="flex-end"
                    />
                  )}
                </Grid>
              </Grid>

              <Grid item xs={12}>
                <CustomBasicTable
                  density="compact"
                  columns={columnsSelectedSeries as any}
                  data={(selectedRow?.savedSeries as any) || ([] as any)}
                  enablePagination
                />
              </Grid>
            </Grid>
          ) : (
            <>
              <Grid item xs={12} container spacing={3} p={3}>
                <Grid item md={6} xs={12}>
                  <CustomTypoLabel
                    text={`Series Disponibles: ${selectedRow?.series?.length}`}
                    variant="body1"
                    sx={{
                      m: '0',
                      p: '0',
                    }}
                  />
                </Grid>
                <Grid item md={6} xs={12}>
                  <CustomTypoLabel
                    text={`Series Seleccionadas: ${selectedRow?.selectedSeries?.length}`}
                    variant="body1"
                    sx={{
                      m: '0',
                      p: '0',
                    }}
                  />
                </Grid>

                <Grid item md={6} xs={12}>
                  <CustomTypoLabel
                    text={`Series Requeridas: ${selectedRow?.usedQuantity}`}
                    variant="body1"
                    sx={{
                      m: '0',
                      p: '0',
                    }}
                  />
                </Grid>
                <Grid
                  item
                  md={6}
                  xs={12}
                  container
                  alignItems="center"
                  spacing={3}
                >
                  {enableAutoSelect && (
                    <>
                      <Grid item>
                        <CustomSingleButton
                          label="SELECCIÓN AUTOMÁTICA"
                          variant="text"
                          color="primary"
                          startIcon={<MdAutoFixHigh />}
                          onClick={() => {
                            setIsAutoSelectingSeries(true);

                            const selectedRow =
                              useInstalacionesStore.getState().selectedRow;

                            const requiredQuantity =
                              selectedRow?.usedQuantity || 0;

                            // auto select series based on required quantity
                            const selectedSeries =
                              selectedRow?.series?.slice(0, requiredQuantity) ||
                              [];

                            // update store
                            setSelectedRow({
                              ...selectedRow,
                              selectedSeries,
                            } as unknown as EquiposUtilizadosOTTableType);
                          }}
                        />
                      </Grid>

                      <Grid item>
                        {isAutoSelectingSeries && (
                          <SingleIconButton
                            label="LIMPIAR"
                            color="warning"
                            startIcon={<MdFilterAltOff />}
                            onClick={() => {
                              setIsAutoSelectingSeries(false);

                              // clear auto selected series
                              const selectedRow =
                                useInstalacionesStore.getState().selectedRow;

                              // update store
                              setSelectedRow({
                                ...selectedRow,
                                selectedSeries: [],
                              } as EquiposUtilizadosOTTableType);
                            }}
                            justifyContent="flex-start"
                          />
                        )}
                      </Grid>
                    </>
                  )}
                </Grid>

                <CustomAutocompleteMultipleArrString
                  label="Series Disponibles"
                  name="seriesArrString"
                  textFieldKey="seriesArrString"
                  control={form.control as any}
                  // options
                  defaultValue={selectedRow?.savedSeries || []}
                  options={selectedRow?.series || []}
                  isLoadingData={false}
                  // errors
                  error={!!errors.seriesArrString?.length}
                  helperText={errors.seriesArrString?.message}
                  // disabled
                  disabled={isAutoSelectingSeries}
                  // raw string[] ---
                  enableStringify={false}
                  onChangeValue={value => {
                    const actualValue = value as string[];
                    const selectedRow =
                      useInstalacionesStore.getState().selectedRow;
                    const requiredQuantity = +(selectedRow?.usedQuantity || 0);
                    const selectedSeriesLength = +(actualValue?.length || 0);

                    if (
                      selectedSeriesLength > requiredQuantity &&
                      requiredQuantity > 0
                    ) {
                      ToastWrapper.error(
                        'La cantidad de series seleccionadas supera la cantidad requerida.',
                      );
                    }

                    // // update store ------------
                    // to render changes in modal
                    setSelectedRow({
                      ...selectedRow,
                      selectedSeries: actualValue,
                    } as EquiposUtilizadosOTTableType);

                    // to render changes in table
                    updateSelectedItemValue({
                      keyStore: onChangeKeyArrayStore,
                      updatedItem: {
                        ...selectedRow,
                        selectedSeries: actualValue,
                      } as EquiposUtilizadosOTTableType,
                    });
                  }}
                />
              </Grid>
            </>
          )}
        </>
      }
      cancelTextBtn="Cerrar"
      onClose={handleClose}
      confirmVariantBtn="outlined"
      confirmTextBtn="Guardar"
      showConfirmBtn={isEdittingSeries || !selectedRow?.savedSeries?.length}
      onConfirm={() => {
        const selectedRow = useInstalacionesStore.getState().selectedRow;
        const requiredQuantity = +(selectedRow?.usedQuantity || 0);
        const selectedSeriesLength = +(
          selectedRow?.selectedSeries?.length || 0
        );

        if (selectedSeriesLength !== requiredQuantity) {
          ToastWrapper.error(
            'La cantidad de series seleccionadas no coincide con la cantidad requerida.',
          );

          return;
        }

        // // update store ------------
        // set saved series
        updateSelectedItemValue({
          keyStore: onChangeKeyArrayStore,

          updatedItem: {
            ...selectedRow,
            savedSeries: selectedRow?.selectedSeries || [],
            selectedSeries: [], // reset selected series
          } as unknown as EquiposUtilizadosOTTableType,
        });

        handleClose();
      }}
    />
  );
};

export default ProductoUbicacionSeriesModal;
