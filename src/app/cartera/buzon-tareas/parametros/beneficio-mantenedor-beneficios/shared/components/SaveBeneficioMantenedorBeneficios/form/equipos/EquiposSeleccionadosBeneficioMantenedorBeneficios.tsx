import { Grid, TextField } from '@mui/material';
import type { MRT_ColumnDef } from 'material-react-table';
import { useCallback, useMemo, useState } from 'react';
import { MdDelete, MdOutlineAddShoppingCart } from 'react-icons/md';

import { Producto, ToastWrapper, UbicacionProducto } from '@/shared';
import {
  CustomMinimalTable,
  CustomSingleButton,
  SingleIconButton,
} from '@/shared/components';
import {
  GenericInventoryStoreKey,
  useTypedGenericInventoryStore,
} from '@/store/app/inventario';
import { useColumnsEquiposBeneficioMantenedorBeneficios } from '../../../../hooks';
import EquiposBeneficioMantenedorBeneficiosModal from './EquiposBeneficioMantenedorBeneficiosModal';

export type EquiposSeleccionadosBeneficioMantenedorBeneficiosProps = {};

export type EquiposSeleccionadosTableType = UbicacionProducto & {
  usedQuantity: number;
};
export type EquiposSeleccionadosProductoType = Producto & {
  usedQuantity: number;
};

const EquiposSeleccionadosBeneficioMantenedorBeneficios: React.FC<
  EquiposSeleccionadosBeneficioMantenedorBeneficiosProps
> = () => {
  ///* local state ---------------------
  const [openAvailableEquipmentsModal, setOpenAvailableEquipmentsModal] =
    useState<boolean>(false);

  ///* global state ---------------------
  const {
    items: equiposUtilizados,
    removeSelectedItem,
    updateSelectedItemValue,
  } = useTypedGenericInventoryStore<EquiposSeleccionadosProductoType>(
    GenericInventoryStoreKey.equiposVentaPreventa,
  );

  ///* handlers ---------------------
  const onChangeQuantity = useCallback(
    (value: string, item: EquiposSeleccionadosProductoType) => {
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
  const { productsBaseColumns } =
    useColumnsEquiposBeneficioMantenedorBeneficios({
      showActionColumn: false,
    });

  const selectedItemsColumns = useMemo<
    MRT_ColumnDef<EquiposSeleccionadosProductoType>[]
  >(
    () => [
      ...productsBaseColumns,
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
    [productsBaseColumns, onChangeQuantity, removeSelectedItem],
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
      <EquiposBeneficioMantenedorBeneficiosModal
        open={openAvailableEquipmentsModal}
        onClose={() => setOpenAvailableEquipmentsModal(false)}
      />
    </Grid>
  );
};

export default EquiposSeleccionadosBeneficioMantenedorBeneficios;
