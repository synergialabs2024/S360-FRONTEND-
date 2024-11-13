import { Grid } from '@mui/material';
import type { MRT_ColumnDef } from 'material-react-table';
import { useEffect, useMemo, useState } from 'react';
import { IoQrCodeSharp } from 'react-icons/io5';

import { EquiposUtilizadosOTTableType } from '@/app/tecnico/install-asignada/shared/components/form';
import { useColumnsEquiposMaterialesInstallOT } from '@/app/tecnico/install-asignada/shared/hooks';
import { gridSize, OrdenTrabajo } from '@/shared';
import {
  CustomMinimalTable,
  CustomTextFieldNoForm,
  CustomTypoLabel,
  ProductoUbicacionSeriesModal,
  SingleIconButton,
} from '@/shared/components';
import { InstalacionesStoreKey, useInstalacionesStore } from '@/store/app';

export type ClienteFibraOTEquiposUtilizadosProps = {
  ordenTrabajo: OrdenTrabajo;
};

const ClienteFibraOTEquiposUtilizados: React.FC<
  ClienteFibraOTEquiposUtilizadosProps
> = ({ ordenTrabajo }) => {
  ///* local state --------------------
  const [openSeriesModal, setOpenSeriesModal] = useState<boolean>(false);

  const equiposUtilizados = ordenTrabajo?.equipos_utilizados;

  ///* global state --------------------
  const setSelectedRow = useInstalacionesStore(s => s.setSelectedRow);
  const clearAllStore = useInstalacionesStore(s => s.clearAll);

  ///* columns --------------------
  const { baseColumnsEquiposMaterialesInstallOT01 } =
    useColumnsEquiposMaterialesInstallOT({
      showCurrentStockColumn: false,
    });

  const equiposUtilizadosColumns = useMemo<
    MRT_ColumnDef<EquiposUtilizadosOTTableType>[]
  >(
    () => [
      ...baseColumnsEquiposMaterialesInstallOT01,

      {
        accessorKey: 'cantidad',
        header: 'CANTIDAD',
        Cell: ({ row }) => {
          return (row.original as any)?.cantidad || 0;
        },
      },

      {
        accessorKey: 'selectedSeries',
        header: 'SERIES SELECCIONADAS',
        Cell: ({ row }) => {
          return !row.original?.series?.length
            ? 'SIN SERIES'
            : row.original?.series?.length;
        },
      },
      {
        accessorKey: 'series',
        header: 'SERIES DISPONIBLES',
        size: 60,
        Cell: ({ row }) => {
          const savedSeries = row.original?.series || [];

          const hasSeries = !!savedSeries?.length;
          const alreadySelected = !!savedSeries?.length;

          return hasSeries ? (
            <SingleIconButton
              label={`${alreadySelected ? 'Ver' : 'Seleccionar'} Series`}
              startIcon={<IoQrCodeSharp />}
              color="info"
              onClick={() => {
                setSelectedRow({
                  ...row.original,

                  // to be used in ProductoUbicacionSeriesModal
                  savedSeries,
                  selectedSeries: savedSeries,
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
    ],
    [baseColumnsEquiposMaterialesInstallOT01, setSelectedRow],
  );

  ///* effects --------------------
  // clear store
  useEffect(() => {
    return () => {
      clearAllStore();
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <>
      <CustomTypoLabel text="Equipos Utilizados" />

      <>
        <Grid item container xs={12} spacing={1}>
          <Grid item xs={12} container alignItems="center">
            <Grid item xs={6}>
              <CustomTextFieldNoForm
                label="Serial ONT"
                value={ordenTrabajo?.serie_ont || 'N/A'}
                disabled
                size={gridSize}
              />
            </Grid>
          </Grid>

          <Grid item xs={12}>
            <CustomMinimalTable<EquiposUtilizadosOTTableType>
              columns={equiposUtilizadosColumns}
              data={(equiposUtilizados as any) || []}
              enablePagination
              density="comfortable"
            />
          </Grid>
        </Grid>
      </>

      {/* ==================== modals ==================== */}
      <ProductoUbicacionSeriesModal
        open={openSeriesModal}
        onClose={() => {
          setOpenSeriesModal(false);
          setSelectedRow(null);
        }}
        onChangeKeyArrayStore={InstalacionesStoreKey.equiposUtilizados}
        enableEditSeries={false}
      />
    </>
  );
};

export default ClienteFibraOTEquiposUtilizados;
