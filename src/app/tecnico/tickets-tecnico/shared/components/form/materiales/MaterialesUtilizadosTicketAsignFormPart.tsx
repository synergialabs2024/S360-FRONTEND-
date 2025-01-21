import { Grid, TextField } from '@mui/material';
import type { MRT_ColumnDef } from 'material-react-table';
import { useCallback, useEffect, useMemo, useState } from 'react';
import type { UseFormReturn } from 'react-hook-form';
import { FiPlus } from 'react-icons/fi';
import { IoMdTrash } from 'react-icons/io';

import {
  CODIGO_MODELO_PRODUCTO_ARRAY_OBJ_FIBRA,
  CodigoModeloProductoEnumChoice,
  CodigoModeloProductoEnumChoiceType,
  gridSizeMdLg6,
  ToastWrapper,
} from '@/shared';
import {
  CustomAutocompleteNoForm,
  CustomMinimalTable,
  CustomSingleButton,
  CustomTypoLabel,
  CustomTypoLabelEnum,
  SingleIconButton,
} from '@/shared/components';
import { InstalacionesStoreKey, useInstalacionesStore } from '@/store/app';

import MaterialesDisponiblesOTTecModal from './MaterialesDisponiblesTicketModal';
import { Ticket } from '@/shared/interfaces/app/ticket/ticket.interface';
import { useColumnsEquiposMaterialesInstallOT } from '@/app/tecnico/install-asignada/shared/hooks';

import { EquiposUtilizadosOTTableType } from '@/app/tecnico/install-asignada/shared/components/form';
import { InstallAsignTicketTecnicoSaveFormData } from '../../SaveVisita/SaveVisita';

export type MaterialesUtilizadosTicketAsignFormPartProps = {
  ticket: Ticket;
  form: UseFormReturn<InstallAsignTicketTecnicoSaveFormData>;
};

export type MaterialesUtilizadosOTTableType = EquiposUtilizadosOTTableType & {
  // firbra
  isFibra?: boolean; // granel that requeries puntas
  puntaInicio?: number;
  puntaFin?: number;

  isFibraPreconect?: boolean;
};

const MaterialesUtilizadosTicketAsignFormPart: React.FC<
  MaterialesUtilizadosTicketAsignFormPartProps
> = ({ ticket, form }) => {
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
  const selectedFibraModel = useInstalacionesStore(s => s.selectedFibraModel);
  const setSelectedFibraModel = useInstalacionesStore(
    s => s.setSelectedFibraModel,
  );

  ///* handlers --------------------
  const onChangeQuantity = useCallback(
    (value: string, item: MaterialesUtilizadosOTTableType) => {
      const currentStock = item?.stock_actual || 0;
      if (+value > +currentStock) {
        ToastWrapper.error(`La cantidad máxima permitida es ${currentStock}`);
        return;
      }

      const isFibraGranel = item.isFibra;
      const puntaFin = +(item.puntaInicio || 0) - +value;

      updateSelectedItemValue({
        keyStore: InstalacionesStoreKey.materialesUtilizados,
        updatedItem: {
          ...item,
          usedQuantity: +value,

          ...(isFibraGranel && {
            puntaFin: puntaFin > 0 ? puntaFin : 0,
          }),
        },
      });
    },
    [updateSelectedItemValue],
  );

  // // ya NO -------
  // const onChangePuntaInit = useCallback(
  //   (value: string, item: MaterialesUtilizadosOTTableType) => {
  //     const usedQuantity = (item.puntaFin || 0) - +value;

  //     updateSelectedItemValue({
  //       keyStore: InstalacionesStoreKey.materialesUtilizados,
  //       updatedItem: {
  //         ...item,
  //         puntaInicio: +value,
  //         usedQuantity: usedQuantity > 0 ? usedQuantity : 0,
  //       } as any,
  //     });
  //   },
  //   [updateSelectedItemValue],
  // );

  ///* effects --------------------
  useEffect(() => {
    if (!ticket) return;
    if (!selectedFibraModel) return;

    if (selectedFibraModel === CodigoModeloProductoEnumChoice.FIBRA_GRANEL) {
      const metrajeAutorizado = +(ticket?.ciudad_data?.metraje_autorizado || 0);
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
      form.setValue(
        'metraje_utilizado_fibra',
        metrajeUtilizadoFibra.toString() || '0.00',
      );
      form.setValue(
        'metraje_exedente_fibra',
        metrajeExedenteFibra < 0
          ? '0.00'
          : metrajeExedenteFibra?.toString() || '0.00',
      );
    }

    if (
      selectedFibraModel ===
      CodigoModeloProductoEnumChoice.FIBRA_PRECONECTORIZADA
    ) {
      const fibraItem = useInstalacionesStore
        .getState()
        .materialesUtilizados.find(item => item.isFibraPreconect);

      form.setValue(
        'metraje_utilizado_fibra',
        fibraItem?.producto_data?.metraje_relativo || '0.00',
      );
    }
  }, [form, materialesUtilizados, ticket, selectedFibraModel]);

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
          return (
            <TextField
              variant="outlined"
              value={row.original?.usedQuantity?.toString() || ''}
              onChange={e => {
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
            />
          );
        },
      },
      {
        accessorKey: 'punta_inicio',
        header: 'PUNTA INICIAL',
        Cell: ({ row }) => {
          // fibra granel requires puntas - ya NO
          const item = row.original;

          return (
            <TextField
              variant="outlined"
              value={item.puntaInicio || ''}
              // onChange={e => onChangePuntaInit(e.target.value, row.original)}
              type="number"
              InputProps={{
                readOnly: true,
              }}
            />
          );
        },
      },
      {
        accessorKey: 'punta_fin',
        header: 'PUNTA FINAL',
        Cell: ({ row }) => {
          return (
            <TextField
              variant="outlined"
              value={row.original.puntaFin || ''}
              type="number"
              InputProps={{
                readOnly: true,
              }}
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
        {/* ==================== btn ==================== */}
        <Grid item xs={12} container alignItems="center" justifyContent="end">
          <Grid item xs={6}>
            <CustomAutocompleteNoForm<CodigoModeloProductoEnumChoiceType>
              label="Modelo de fibra"
              value={selectedFibraModel}
              actualValueKey="value"
              onChange={v => {
                setSelectedFibraModel(v as string);
                form.setValue('modelo_fibra_utilizada', v as any);

                form.setValue('punta_inicial_fibra', '0.00');
                form.setValue('punta_final_fibra', '0.00');
                form.setValue('metraje_utilizado_fibra', '0.00');
                form.setValue('metraje_exedente_fibra', '0.00');
              }}
              options={CODIGO_MODELO_PRODUCTO_ARRAY_OBJ_FIBRA}
              getOptionLabel={o => o.label}
              loading={false}
              required
              error={false}
              disableClearable
              size={gridSizeMdLg6}
            />
          </Grid>

          <Grid item xs={6} container justifyContent="flex-end">
            <CustomSingleButton
              label="AGREGAR MATERIAL"
              color="primary"
              variant="text"
              startIcon={<FiPlus />}
              onClick={() => {
                if (!selectedFibraModel)
                  return ToastWrapper.warning('Seleccione un modelo de fibra');

                setOpenMaterialesDisponiblesModal(true);
              }}
              justifyContent="flex-end"
            />
          </Grid>
        </Grid>

        {/* ==================== table ==================== */}
        <Grid item xs={12}>
          <CustomMinimalTable<MaterialesUtilizadosOTTableType>
            columns={materialesUtilizadosColumns}
            data={materialesUtilizados || []}
            enablePagination
            density="comfortable"
          />
        </Grid>
      </Grid>

      {/* ==================== modals ==================== */}
      <MaterialesDisponiblesOTTecModal
        open={openMaterialesDisponiblesModal}
        onClose={() => setOpenMaterialesDisponiblesModal(false)}
        ticket={ticket}
      />
    </>
  );
};

export default MaterialesUtilizadosTicketAsignFormPart;
