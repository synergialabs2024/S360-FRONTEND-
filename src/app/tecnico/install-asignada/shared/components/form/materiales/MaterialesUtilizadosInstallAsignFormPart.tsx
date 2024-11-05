import { Grid, TextField } from '@mui/material';
import type { MRT_ColumnDef } from 'material-react-table';
import { useCallback, useEffect, useMemo, useState } from 'react';
import type { UseFormReturn } from 'react-hook-form';
import { FiPlus } from 'react-icons/fi';
import { IoMdTrash } from 'react-icons/io';

import { gridSizeMdLg6, OrdenTrabajo, ToastWrapper } from '@/shared';
import {
  CustomMinimalTable,
  CustomNumberTextField,
  CustomSingleButton,
  CustomTypoLabel,
  CustomTypoLabelEnum,
  SingleIconButton,
} from '@/shared/components';
import { InstalacionesStoreKey, useInstalacionesStore } from '@/store/app';
import { useColumnsEquiposMaterialesInstallOT } from '../../../hooks';
import type { InstallAsignOTSaveFormData } from '../../SaveOrdenTrabajo/SaveOrdenTrabajo';
import { EquiposUtilizadosOTTableType } from '../equipos/EquiposUtilizadosInstallAsignFormPart';
import MaterialesDisponiblesOTTecModal from './MaterialesDisponiblesOTTecModal';

export type MaterialesUtilizadosInstallAsignFormPartProps = {
  ordenTrabajo: OrdenTrabajo;
  form: UseFormReturn<InstallAsignOTSaveFormData>;
};

export type MaterialesUtilizadosOTTableType = EquiposUtilizadosOTTableType & {
  // firbra
  isFibra?: boolean;
  puntaInicio?: number;
  puntaFin?: number;
};

const MaterialesUtilizadosInstallAsignFormPart: React.FC<
  MaterialesUtilizadosInstallAsignFormPartProps
> = ({ ordenTrabajo, form }) => {
  ///* local state --------------------
  const [openMaterialesDisponiblesModal, setOpenMaterialesDisponiblesModal] =
    useState<boolean>(false);

  ///* global state --------------------
  const materialesUtilizados = useInstalacionesStore(
    s => s.materialesUtilizados,
  );
  const removeSelectedItem = useInstalacionesStore(s => s.removeSelectedItem);
  const updateSelectedItemValue = useInstalacionesStore(
    s => s.updateSelectedItemValue,
  );

  ///* handlers --------------------
  const onChangeQuantity = useCallback(
    (value: string, item: MaterialesUtilizadosOTTableType) => {
      const currentStock = item?.stock_actual || 0;
      if (+value > +currentStock) {
        ToastWrapper.error(`La cantidad máxima permitida es ${currentStock}`);
        return;
      }

      updateSelectedItemValue({
        keyStore: InstalacionesStoreKey.materialesUtilizados,
        updatedItem: {
          ...item,
          usedQuantity: +value,
        },
      });
    },
    [updateSelectedItemValue],
  );

  const onChangePuntaInit = useCallback(
    (value: string, item: MaterialesUtilizadosOTTableType) => {
      const usedQuantity = (item.puntaFin || 0) - +value;

      updateSelectedItemValue({
        keyStore: InstalacionesStoreKey.materialesUtilizados,
        updatedItem: {
          ...item,
          puntaInicio: +value,
          usedQuantity: usedQuantity > 0 ? usedQuantity : 0,
        } as any,
      });
    },
    [updateSelectedItemValue],
  );
  const onChangePuntaFin = useCallback(
    (value: string, item: MaterialesUtilizadosOTTableType) => {
      const currentStock = item?.stock_actual || 0;
      const usedQuantity = +value - (item.puntaInicio || 0);
      if (usedQuantity > currentStock) {
        ToastWrapper.error(`La cantidad máxima permitida es ${currentStock}`);
        return;
      }

      updateSelectedItemValue({
        keyStore: InstalacionesStoreKey.materialesUtilizados,
        updatedItem: {
          ...item,
          puntaFin: +value,
          usedQuantity: usedQuantity > 0 ? usedQuantity : 0,
        } as any,
      });
    },
    [updateSelectedItemValue],
  );

  ///* effects --------------------
  useEffect(() => {
    if (!ordenTrabajo) return;

    const metrajeAutorizado = +(
      ordenTrabajo?.ciudad_data?.metraje_autorizado || 0
    );
    const fibraItem = useInstalacionesStore
      .getState()
      .materialesUtilizados.find(item => item.isFibra);

    const metrajeUtilizadoFibra = fibraItem?.usedQuantity || 0;
    const metrajeExedenteFibra = metrajeUtilizadoFibra - metrajeAutorizado;

    form.setValue(
      'punta_inicial_fibra',
      fibraItem?.puntaInicio?.toString() || '0.00',
    );
    form.setValue(
      'punta_final_fibra',
      fibraItem?.puntaFin?.toString() || '0.00',
    );
    form.setValue('metraje_utilizado_fibra', metrajeUtilizadoFibra.toString());
    form.setValue(
      'metraje_exedente_fibra',
      metrajeExedenteFibra < 0 ? '0' : metrajeExedenteFibra?.toString(),
    );
  }, [form, materialesUtilizados, ordenTrabajo]);

  ///* columns --------------------
  const { baseColumnsEquiposMaterialesInstallOT01 } =
    useColumnsEquiposMaterialesInstallOT();

  const materialesUtilizadosColumns = useMemo<
    MRT_ColumnDef<MaterialesUtilizadosOTTableType>[]
  >(
    () => [
      ...baseColumnsEquiposMaterialesInstallOT01,

      {
        accessorKey: 'usedQuantity',
        header: 'CANTIDAD ',
        Cell: ({ row }) => {
          const isFibra = row.original?.isFibra;

          return (
            <TextField
              variant="outlined"
              value={row.original?.usedQuantity?.toString() || ''}
              onChange={e => {
                if (isFibra) return;

                const value = e.target.value;
                const intValue = parseInt(value, 10);

                onChangeQuantity(intValue.toString(), row.original);
              }}
              type="number"
              inputProps={{
                min: 1,
                max: row.original?.stock_actual || 0,
                step: 1,
              }}
              disabled={isFibra}
            />
          );
        },
      },
      {
        accessorKey: 'punta_inicio',
        header: 'PUNTA INICIAL',
        Cell: ({ row }) => {
          const isFibra = row.original?.isFibra;

          return (
            <TextField
              variant="outlined"
              value={row.original.puntaInicio || ''}
              onChange={e => onChangePuntaInit(e.target.value, row.original)}
              type="number"
              inputProps={{
                min: 0,
                step: 1,
              }}
              disabled={!isFibra}
            />
          );
        },
      },
      {
        accessorKey: 'punta_fin',
        header: 'PUNTA FINAL',
        Cell: ({ row }) => {
          const isFibra = row.original?.isFibra;

          return (
            <TextField
              variant="outlined"
              value={row.original.puntaFin || ''}
              onChange={e => onChangePuntaFin(e.target.value, row.original)}
              type="number"
              inputProps={{
                min: 0,
                step: 1,
              }}
              disabled={!isFibra}
            />
          );
        },
      },

      {
        accessorKey: 'remove',
        header: 'ACCIONES',
        Cell: ({ row }) => (
          <SingleIconButton
            label="Remover"
            startIcon={<IoMdTrash />}
            color="error"
            tooltipPlacement="right-end"
            onClick={() => {
              removeSelectedItem({
                item: row.original,
                keyStore: InstalacionesStoreKey.materialesUtilizados,
              });
            }}
            justifyContent="center"
          />
        ),
      },
    ],
    [
      baseColumnsEquiposMaterialesInstallOT01,
      onChangePuntaFin,
      onChangePuntaInit,
      onChangeQuantity,
      removeSelectedItem,
    ],
  );

  return (
    <>
      <CustomTypoLabel
        text="Materiales Utilizados"
        pt={CustomTypoLabelEnum.ptMiddlePosition}
      />

      {/* ==================== TABLE ==================== */}
      <Grid item container xs={12} spacing={1}>
        <Grid item xs={12} container alignSelf="flex-end">
          <span className="spacer" />

          <CustomSingleButton
            label="AGREGAR MATERIAL"
            color="primary"
            variant="text"
            startIcon={<FiPlus />}
            onClick={() => {
              setOpenMaterialesDisponiblesModal(true);
            }}
            justifyContent="flex-end"
          />
        </Grid>

        <Grid item xs={12}>
          <CustomMinimalTable<MaterialesUtilizadosOTTableType>
            columns={materialesUtilizadosColumns}
            data={materialesUtilizados || []}
            enablePagination
            density="comfortable"
          />
        </Grid>
      </Grid>

      {/* ==================== FORM ==================== */}
      <Grid
        item
        xs={12}
        container
        justifyContent="center"
        alignItems="center"
        spacing={3}
        mt={3}
      >
        <CustomNumberTextField
          label="Metraje Autorizado Fibra"
          name="metraje_autorizado_fibra"
          control={form.control}
          error={form.formState.errors.metraje_autorizado_fibra}
          helperText={form.formState.errors.metraje_autorizado_fibra?.message}
          shrink
          size={gridSizeMdLg6}
          disabled
          endAdornment={'m'}
        />
        <CustomNumberTextField
          label="Metraje Exedente Fibra"
          name="metraje_exedente_fibra"
          control={form.control}
          defaultValue={form.getValues().metraje_exedente_fibra || ''}
          error={form.formState.errors.metraje_exedente_fibra}
          helperText={
            form.formState.errors.metraje_exedente_fibra?.message || ''
          }
          shrink={true}
          disabled
          endAdornment={'m'}
          size={gridSizeMdLg6}
        />

        <CustomNumberTextField
          label="Punta Inicial Fibra"
          name="punta_inicial_fibra"
          control={form.control}
          defaultValue={form.getValues().punta_inicial_fibra || ''}
          error={form.formState.errors.punta_inicial_fibra}
          helperText={form.formState.errors.punta_inicial_fibra?.message}
          shrink
          size={gridSizeMdLg6}
          disabled
          endAdornment={'m'}
        />
        <CustomNumberTextField
          label="Punta Final Fibra"
          name="punta_final_fibra"
          control={form.control}
          defaultValue={form.getValues().punta_final_fibra || ''}
          error={form.formState.errors.punta_final_fibra}
          helperText={form.formState.errors.punta_final_fibra?.message}
          shrink
          size={gridSizeMdLg6}
          disabled
          endAdornment={'m'}
        />

        <CustomNumberTextField
          label="Metraje Utilizado Fibra"
          name="metraje_utilizado_fibra"
          control={form.control}
          defaultValue={form.getValues().metraje_utilizado_fibra || ''}
          error={form.formState.errors.metraje_utilizado_fibra}
          helperText={form.formState.errors.metraje_utilizado_fibra?.message}
          shrink
          disabled
          endAdornment={'m'}
        />
      </Grid>

      {/* ==================== modals ==================== */}
      <MaterialesDisponiblesOTTecModal
        open={openMaterialesDisponiblesModal}
        onClose={() => setOpenMaterialesDisponiblesModal(false)}
        ordenTrabajo={ordenTrabajo}
      />
    </>
  );
};

export default MaterialesUtilizadosInstallAsignFormPart;
