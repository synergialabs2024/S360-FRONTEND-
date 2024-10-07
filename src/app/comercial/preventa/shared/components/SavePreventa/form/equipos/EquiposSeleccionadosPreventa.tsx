import { Grid } from '@mui/material';
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
import { MRT_ColumnDef } from 'material-react-table';
import {
  UbicacionProductoTableType,
  useColumnsEquiposPreventa,
} from '../../../../hooks';
import { EquiposPreventaModal } from './';

export type EquiposSeleccionadosPreventaProps = {};

export type EquiposSeleccionadosTableType = UbicacionProducto & {};

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
    // updateSelectedItemValue,
  } = useTypedGenericInventoryStore<EquiposSeleccionadosTableType>(
    GenericInventoryStoreKey.equiposVentaPreventa,
  );

  ///* columns ---------------------
  const { baseColumns01 } = useColumnsEquiposPreventa({
    onActionRowNode(item) {
      return (
        <SingleIconButton
          startIcon={<MdDelete />}
          label="Remover"
          color="error"
          onClick={() => {
            removeSelectedItem({ item, idKey: 'id' });
          }}
        />
      );
    },
  });

  const selectedItemsColumns = useMemo<
    MRT_ColumnDef<UbicacionProductoTableType>[]
  >(
    () => [
      ...baseColumns01,
      {
        accessorKey: 'quantity',
        header: 'CANTIDAD',
        enableColumnFilter: false,
        Cell: ({ row }) => {
          const temp = row.original;
          console.log('temp', temp);

          return <>CANTIDAD</>;
        },
      },
      {
        accessorKey: 'cuotas',
        header: 'CUOTAS',
        enableColumnFilter: false,
        Cell: ({ row }) => {
          const temp = row.original;
          console.log('temp', temp);

          return <>CUOTAS</>;
        },
      },
    ],
    [baseColumns01],
  );

  return (
    <Grid item container xs={12} spacing={1}>
      <Grid item xs={12} justifySelf="end" alignSelf="flex-end">
        <CustomSingleButton
          label="AGREGAR EQUIPO"
          color="primary"
          variant="text"
          startIcon={<MdOutlineAddShoppingCart />}
          onClick={() => {
            setOpenAvailableEquipmentsModal(true);
          }}
          justifyContent="flex-end"
        />
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
