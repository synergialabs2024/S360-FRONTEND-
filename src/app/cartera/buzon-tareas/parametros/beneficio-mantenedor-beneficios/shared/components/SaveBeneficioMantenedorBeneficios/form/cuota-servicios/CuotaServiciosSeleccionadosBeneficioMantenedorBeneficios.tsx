import { Grid, TextField } from '@mui/material';
import type { MRT_ColumnDef } from 'material-react-table';
import { useCallback, useEffect, useMemo, useState } from 'react';
import { MdDelete, MdOutlineAddShoppingCart } from 'react-icons/md';

import { ToastWrapper, UbicacionProducto } from '@/shared';
import {
  CustomMinimalTable,
  CustomSingleButton,
  SingleIconButton,
} from '@/shared/components';
import {
  GenericInventoryStoreKey,
  useTypedGenericInventoryStore,
} from '@/store/app/inventario';
import { useColumnsCuotaServiciosBeneficioMantenedorBeneficios } from '../../../../hooks';
import CuotaServiciosBeneficioMantenedorBeneficiosModal from './CuotaServiciosBeneficioMantenedorBeneficiosModal';
import { CuotasServicioInternet } from '@/shared/interfaces/app/cartera/buzon-tareas';

export type CuotaServiciosSeleccionadosBeneficioMantenedorBeneficiosProps = {
  planesInternet: any[];
};

export type CuotaServiciosSeleccionadosTableType = UbicacionProducto & {
  usedQuantity: number;
};
export type CuotaServiciosSeleccionadosProductoType = CuotasServicioInternet & {
  usedQuantity: number;
};

const CuotaServiciosSeleccionadosBeneficioMantenedorBeneficios: React.FC<
  CuotaServiciosSeleccionadosBeneficioMantenedorBeneficiosProps
> = ({ planesInternet }) => {
  ///* local state ---------------------
  const [openAvailableEquipmentsModal, setOpenAvailableEquipmentsModal] =
    useState<boolean>(false);

  ///* global state ---------------------
  const {
    items: equiposUtilizados,
    removeSelectedItem,
    updateSelectedItemValue,
  } = useTypedGenericInventoryStore<CuotaServiciosSeleccionadosProductoType>(
    GenericInventoryStoreKey.servicioInternet,
  );

  ///* handlers ---------------------
  const onChangeQuantity = useCallback(
    (value: string, item: CuotaServiciosSeleccionadosProductoType) => {
      if (+value > 100) {
        ToastWrapper.warning(
          'La cantidad máxima permitida de descuento es 100',
        );
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

  ///* columns ---------------------
  const { cuotasBaseColumns } =
    useColumnsCuotaServiciosBeneficioMantenedorBeneficios({
      showActionColumn: false,
    });

  const selectedItemsColumns = useMemo<
    MRT_ColumnDef<CuotaServiciosSeleccionadosProductoType>[]
  >(
    () => [
      ...cuotasBaseColumns,
      {
        accessorKey: 'quantity',
        header: 'PORCENTAJE DESCUENTO',
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
    [cuotasBaseColumns, onChangeQuantity, removeSelectedItem],
  );

  useEffect(() => {
    console.log('planesInternet screen', planesInternet);
  });

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
        <Grid item>
          <CustomSingleButton
            label="AGREGAR CUOTA"
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
        <CustomMinimalTable
          columns={selectedItemsColumns}
          data={equiposUtilizados || []}
          enablePagination
        />
      </Grid>

      {/* ==================== modals ==================== */}
      <CuotaServiciosBeneficioMantenedorBeneficiosModal
        open={openAvailableEquipmentsModal}
        onClose={() => setOpenAvailableEquipmentsModal(false)}
        planesInternet={planesInternet}
      />
    </Grid>
  );
};

export default CuotaServiciosSeleccionadosBeneficioMantenedorBeneficios;
