import { Grid } from '@mui/material';
import type { MRT_ColumnDef } from 'material-react-table';
import { useMemo, useState } from 'react';
import { MdDelete, MdOutlineAddShoppingCart } from 'react-icons/md';

import { UbicacionProducto } from '@/shared';
import {
  CustomMinimalTable,
  CustomSingleButton,
  SingleIconButton,
} from '@/shared/components';
import {
  GenericInventoryStoreKey,
  useTypedGenericInventoryStore,
} from '@/store/app/inventario';
import CuotaServiciosBeneficioMantenedorBeneficiosModal from './ActivacionesMantenedorActivacionesBaseModal';
import { CuotasServicioInternet } from '@/shared/interfaces/app/cartera/buzon-tareas';
import { useColumnsActivacionesMantenedorActivacionesBase } from '../../../../hooks';

export type ActivacionesSeleccionadosMantenedorActivacionesBaseProps = {};

export type ActivacionesSeleccionadosTableType = UbicacionProducto & {
  usedQuantity: number;
};
export type ActivacionesSeleccionadosProductoType = CuotasServicioInternet & {
  usedQuantity: number;
};

const ActivacionesSeleccionadosMantenedorActivacionesBase: React.FC<
  ActivacionesSeleccionadosMantenedorActivacionesBaseProps
> = () => {
  ///* local state ---------------------
  const [openAvailableEquipmentsModal, setOpenAvailableEquipmentsModal] =
    useState<boolean>(false);

  ///* global state ---------------------
  const { items: equiposUtilizados, removeSelectedItem } =
    useTypedGenericInventoryStore<ActivacionesSeleccionadosProductoType>(
      GenericInventoryStoreKey.mantenedorActivaciones,
    );

  ///* columns ---------------------
  const { activacionesBaseColumns } =
    useColumnsActivacionesMantenedorActivacionesBase({
      showActionColumn: false,
    });

  const selectedItemsColumns = useMemo<
    MRT_ColumnDef<ActivacionesSeleccionadosProductoType>[]
  >(
    () => [
      ...activacionesBaseColumns,
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
    [activacionesBaseColumns, removeSelectedItem],
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
            label="SELECCIONAR"
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
      />
    </Grid>
  );
};

export default ActivacionesSeleccionadosMantenedorActivacionesBase;
