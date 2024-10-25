import { Grid, TextField } from '@mui/material';
import type { MRT_ColumnDef } from 'material-react-table';
import { useCallback, useMemo, useState } from 'react';
import { FiPlus } from 'react-icons/fi';
import { IoQrCodeSharp } from 'react-icons/io5';

import { OrdenTrabajo, ToastWrapper, UbicacionProducto } from '@/shared';
import {
  CustomMinimalTable,
  CustomSingleButton,
  CustomTypoLabel,
  ProductoUbicacionSeriesModal,
  SingleIconButton,
} from '@/shared/components';
import { InstalacionesStoreKey, useInstalacionesStore } from '@/store/app';
import { IoMdTrash } from 'react-icons/io';
import { useColumnsEquiposMaterialesInstallOT } from '../../../hooks';
import EquiposDisponiblesOTTecModal from './EquiposDisponiblesOTTecModal';

export type EquiposUtilizadosInstallAsignFormPartProps = {
  ordenTrabajo: OrdenTrabajo;
};

export type EquiposUtilizadosOTTableType = UbicacionProducto & {
  usedQuantity: number;

  // series: string[]; // @Override

  containsSeries: boolean;
  selectedSeries: string[];
  savedSeries: string[];
};

const EquiposUtilizadosInstallAsignFormPart: React.FC<
  EquiposUtilizadosInstallAsignFormPartProps
> = ({ ordenTrabajo }) => {
  ///* local state --------------------
  const [openEquiposDisponiblesModal, setOpenEquiposDisponiblesModal] =
    useState<boolean>(false);
  const [openSeriesModal, setOpenSeriesModal] = useState<boolean>(false);

  ///* global state --------------------
  const equiposUtilizados = useInstalacionesStore(s => s.equiposUtilizados);
  const removeSelectedItem = useInstalacionesStore(s => s.removeSelectedItem);
  const updateSelectedItemValue = useInstalacionesStore(
    s => s.updateSelectedItemValue,
  );
  const setSelectedRow = useInstalacionesStore(s => s.setSelectedRow);

  ///* handlers --------------------
  const onChangeQuantity = useCallback(
    (value: string, item: EquiposUtilizadosOTTableType) => {
      const currentStock = item?.stock_actual || 0;
      if (+value > +currentStock) {
        ToastWrapper.error(`La cantidad máxima permitida es ${currentStock}`);
        return;
      }

      updateSelectedItemValue({
        keyStore: InstalacionesStoreKey.equiposUtilizados,
        updatedItem: {
          ...item,
          usedQuantity: +value,

          // reset series when quantity is changed
          selectedSeries: [],
          savedSeries: [],
        },
      });
    },
    [updateSelectedItemValue],
  );

  ///* columns --------------------
  const { baseColumnsEquiposMaterialesInstallOT01 } =
    useColumnsEquiposMaterialesInstallOT();

  const equiposUtilizadosColumns = useMemo<
    MRT_ColumnDef<EquiposUtilizadosOTTableType>[]
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
        accessorKey: 'selectedSeries',
        header: 'Series Seleccionadas',
        Cell: ({ row }) => {
          return !row.original?.containsSeries
            ? 'SIN SERIES'
            : row.original?.savedSeries?.length;
        },
      },
      {
        accessorKey: 'series',
        header: 'Series Disponibles',
        size: 60,
        Cell: ({ row }) => {
          const hasSeries = !!row.original?.series?.length;
          const alreadySelected = !!row.original?.savedSeries?.length;

          return hasSeries ? (
            <SingleIconButton
              label={`${alreadySelected ? 'Ver' : 'Seleccionar'} Series`}
              startIcon={<IoQrCodeSharp />}
              color="info"
              onClick={() => {
                setSelectedRow({
                  ...row.original,
                  selectedSeries: row.original?.savedSeries || [],
                });
                setOpenSeriesModal(true);
              }}
              justifyContent="center"
            />
          ) : (
            'SIN SERIES'
          );
        },
      },

      {
        accessorKey: 'remove',
        header: 'Acciones',
        Cell: ({ row }) => (
          <SingleIconButton
            label="Remover"
            startIcon={<IoMdTrash />}
            color="error"
            tooltipPlacement="right-end"
            onClick={() => {
              removeSelectedItem({
                item: row.original,
                keyStore: InstalacionesStoreKey.equiposUtilizados,
              });
            }}
            justifyContent="center"
          />
        ),
      },
    ],
    [],
  );

  return (
    <>
      <CustomTypoLabel text="Equipos Utilizados" />

      <Grid item container xs={12} spacing={1}>
        <Grid item xs={12} container alignSelf="flex-end">
          <span className="spacer" />

          <CustomSingleButton
            label="AGREGAR EQUIPO"
            color="primary"
            variant="text"
            startIcon={<FiPlus />}
            onClick={() => {
              setOpenEquiposDisponiblesModal(true);
            }}
            justifyContent="flex-end"
          />
        </Grid>

        <Grid item xs={12}>
          <CustomMinimalTable<EquiposUtilizadosOTTableType>
            columns={equiposUtilizadosColumns}
            data={equiposUtilizados || []}
            enablePagination
            density="comfortable"
          />
        </Grid>
      </Grid>

      {/* ==================== modals ==================== */}
      <EquiposDisponiblesOTTecModal
        open={openEquiposDisponiblesModal}
        onClose={() => setOpenEquiposDisponiblesModal(false)}
        ordenTrabajo={ordenTrabajo}
      />

      <ProductoUbicacionSeriesModal
        open={openSeriesModal}
        onClose={() => {
          setOpenSeriesModal(false);
          setSelectedRow(null);
        }}
        onChangeKeyArrayStore={InstalacionesStoreKey.equiposUtilizados}
      />
    </>
  );
};

export default EquiposUtilizadosInstallAsignFormPart;
