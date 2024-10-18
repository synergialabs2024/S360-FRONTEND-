import { Grid, MenuItem, TextField } from '@mui/material';
import type { MRT_ColumnDef } from 'material-react-table';
import { useCallback, useMemo, useState } from 'react';
import { MdDelete, MdOutlineAddShoppingCart } from 'react-icons/md';

import {
  SystemParamsSlugsEnum,
  ToastWrapper,
  UbicacionProducto,
} from '@/shared';
import {
  CustomMinimalTable,
  CustomSingleButton,
  SingleIconButton,
} from '@/shared/components';
import { useParametrosSistemaStore, usePreventaStore } from '@/store/app';
import {
  GenericInventoryStoreKey,
  useTypedGenericInventoryStore,
} from '@/store/app/inventario';
import { useColumnsEquiposPreventa } from '../../../../hooks';
import { EquiposPreventaModal } from './';

export type EquiposSeleccionadosPreventaProps = {};

export type EquiposSeleccionadosTableType = UbicacionProducto & {
  usedQuantity: number;
};

const EquiposSeleccionadosPreventa: React.FC<
  EquiposSeleccionadosPreventaProps
> = () => {
  ///* local state ---------------------
  const [openAvailableEquipmentsModal, setOpenAvailableEquipmentsModal] =
    useState<boolean>(false);

  ///* global state ---------------------
  const {
    items: equiposUtilizados,
    removeSelectedItem,
    updateSelectedItemValue,
  } = useTypedGenericInventoryStore<EquiposSeleccionadosTableType>(
    GenericInventoryStoreKey.equiposVentaPreventa,
  );
  const scoreServicio = usePreventaStore(s => s.scoreServicio);
  const selectedCuotas = usePreventaStore(s => s.selectedCuotas);
  const setSelectedCuotas = usePreventaStore(s => s.setSelectedCuotas);

  ///* handlers ---------------------
  const onChangeQuantity = useCallback(
    (value: string, item: EquiposSeleccionadosTableType) => {
      if (+value > 2) {
        ToastWrapper.warning('La cantidad máxima permitida es de 2');
        return;
      }

      updateSelectedItemValue({
        idKey: 'id',
        updatedItem: {
          ...item,
          usedQuantity: +value,
        },
      });
    },
    [updateSelectedItemValue],
  );

  const getAvailableCoutasRange = () => {
    const scoresFreeCoutas = JSON.parse(
      useParametrosSistemaStore
        .getState()
        .systemParametersArray.find(
          sp =>
            sp?.slug ===
            SystemParamsSlugsEnum.SCORE_BURO_LIBRE_CUOTAS_EQUIPO_VENTA,
        )?.value || '[]',
    );

    const availableCoutasRange = scoresFreeCoutas?.includes(scoreServicio)
      ? 12
      : 1;

    return availableCoutasRange;
  };

  ///* columns ---------------------
  const { baseColumnsPreventa01 } = useColumnsEquiposPreventa({
    showActionColumn: false,
  });

  const selectedItemsColumns = useMemo<
    MRT_ColumnDef<EquiposSeleccionadosTableType>[]
  >(
    () => [
      ...baseColumnsPreventa01,
      {
        accessorKey: 'quantity',
        header: 'CANTIDAD',
        enableColumnFilter: false,
        Cell: ({ row }) => {
          const usedQuantity = row.original?.usedQuantity || 0;

          return (
            <>
              <TextField
                variant="outlined"
                value={usedQuantity?.toString() || ''}
                onChange={e => {
                  const value = e.target.value;
                  const intValue = parseInt(value, 10);

                  onChangeQuantity(intValue.toString(), row.original);
                }}
                type="number"
                inputProps={{
                  min: 1,
                  step: 1,
                }}
              />
            </>
          );
        },
      },

      {
        accessorKey: 'action',
        enableColumnFilter: false,
        header: 'ACCIÓN',
        Cell: ({ row }) => (
          <SingleIconButton
            startIcon={<MdDelete />}
            label="Remover"
            color="error"
            onClick={() => {
              removeSelectedItem({ item: row?.original, idKey: 'id' });
            }}
          />
        ),
      },
    ],
    [
      baseColumnsPreventa01,
      onChangeQuantity,
      removeSelectedItem,
      scoreServicio,
    ],
  );

  return (
    <Grid item container xs={12} spacing={1}>
      <Grid
        item
        container
        xs={12}
        spacing={1}
        alignItems="center"
        justifyContent="space-between"
      >
        <Grid item xs={3}>
          <TextField
            select
            label="Cuotas"
            variant="outlined"
            size="medium"
            fullWidth
            value={selectedCuotas?.toString() || ''}
            onChange={e => {
              const value = e.target.value;
              const intValue = parseInt(value, 10);

              setSelectedCuotas(intValue);
            }}
            type="number"
            inputProps={{
              min: 1,
              step: 1,
              max: 12,
            }}
          >
            {Array.from(
              { length: getAvailableCoutasRange() },
              (_, i) => i + 1,
            ).map((item, index) => (
              <MenuItem key={index} value={item}>
                {item}
              </MenuItem>
            ))}
          </TextField>
        </Grid>

        <Grid item>
          <CustomSingleButton
            label="AGREGAR EQUIPO"
            color="primary"
            variant="text"
            startIcon={<MdOutlineAddShoppingCart />}
            onClick={() => {
              setOpenAvailableEquipmentsModal(true);
            }}
          />
        </Grid>
      </Grid>

      <Grid item xs={12}>
        <CustomMinimalTable<EquiposSeleccionadosTableType>
          columns={selectedItemsColumns}
          data={equiposUtilizados || []}
          enablePagination
        />
      </Grid>

      {/* ==================== modals ==================== */}
      <EquiposPreventaModal
        open={openAvailableEquipmentsModal}
        onClose={() => setOpenAvailableEquipmentsModal(false)}
      />
    </Grid>
  );
};

export default EquiposSeleccionadosPreventa;
