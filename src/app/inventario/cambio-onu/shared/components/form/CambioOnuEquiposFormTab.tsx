import { Grid } from '@mui/material';
import type { MRT_ColumnDef } from 'material-react-table';
import { useMemo, useState } from 'react';
import { FiPlus } from 'react-icons/fi';
import { IoQrCodeSharp } from 'react-icons/io5';

import { EquiposUtilizadosOTTableType } from '@/app/tecnico/install-asignada/shared/components/form';
import { useColumnsEquiposMaterialesInstallOT } from '@/app/tecnico/install-asignada/shared/hooks';
import {
  CODIGO_MODELO_PRODUCTO_ARRAY_OBJ_ONT,
  CodigoModeloProductoEnumChoiceType,
  gridSizeMdLg6,
  LineaServicio,
  ToastWrapper,
} from '@/shared';
import {
  CustomAutocompleteNoForm,
  CustomMinimalTable,
  CustomSingleButton,
  ProductoUbicacionSeriesModal,
  SingleIconButton,
} from '@/shared/components';
import { InstalacionesStoreKey, useInstalacionesStore } from '@/store/app';
import { IoMdTrash } from 'react-icons/io';
import CambioOnuEquiposModal from './CambioOnuEquiposModal';

export type CambioOnuEquiposFormTabProps = {
  serviceLine: LineaServicio;
};

const CambioOnuEquiposFormTab: React.FC<CambioOnuEquiposFormTabProps> = ({
  serviceLine,
}) => {
  ///* local state --------------------
  const [openSeriesModal, setOpenSeriesModal] = useState<boolean>(false);
  const [openEquiposDisponiblesModal, setOpenEquiposDisponiblesModal] =
    useState<boolean>(false);

  ///* global state --------------------
  const equiposUtilizados = useInstalacionesStore(s => s.equiposUtilizados);
  const setSelectedRow = useInstalacionesStore(s => s.setSelectedRow);
  const removeSelectedItem = useInstalacionesStore(s => s.removeSelectedItem);
  const selectedProductModel = useInstalacionesStore(
    s => s.selectedProductModel,
  );
  const setSelectedProductModel = useInstalacionesStore(
    s => s.setSelectedProductModel,
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
          return row.original?.usedQuantity?.toString() || '';
        },
      },

      {
        accessorKey: 'selectedSeries',
        header: 'SERIES SELECCIONADAS',
        Cell: ({ row }) => {
          return !row.original?.containsSeries
            ? 'SIN SERIES'
            : row.original?.savedSeries?.length;
        },
      },
      {
        accessorKey: 'series',
        header: 'SERIES DISPONIBLES',
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
                keyStore: InstalacionesStoreKey.equiposUtilizados,
              });
            }}
            justifyContent="center"
          />
        ),
      },
    ],
    [
      baseColumnsEquiposMaterialesInstallOT01,
      removeSelectedItem,
      setSelectedRow,
    ],
  );

  return (
    <>
      {/* ==================== btn ==================== */}
      <Grid item xs={12} container alignItems="center">
        <Grid item xs={6}>
          <CustomAutocompleteNoForm<CodigoModeloProductoEnumChoiceType>
            label="Modelo de equipo ONT"
            value={selectedProductModel}
            actualValueKey="value"
            onChange={v => {
              setSelectedProductModel(v as string);
            }}
            options={CODIGO_MODELO_PRODUCTO_ARRAY_OBJ_ONT}
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
            label="AGREGAR EQUIPO"
            color="primary"
            variant="text"
            startIcon={<FiPlus />}
            onClick={() => {
              if (!selectedProductModel)
                return ToastWrapper.warning(
                  'Seleccione un modelo de equipo ONT',
                );
              setOpenEquiposDisponiblesModal(true);
            }}
            justifyContent="flex-end"
          />
        </Grid>
      </Grid>

      {/* ==================== table ==================== */}
      <CustomMinimalTable<EquiposUtilizadosOTTableType>
        columns={equiposUtilizadosColumns}
        data={equiposUtilizados || []}
        enablePagination
        density="comfortable"
      />

      {/* ==================== modals ==================== */}
      <CambioOnuEquiposModal
        open={openEquiposDisponiblesModal}
        onClose={() => setOpenEquiposDisponiblesModal(false)}
        serviceLine={serviceLine}
        // helpers to reutilize the modal
        filterByProductModel={!!selectedProductModel}
        productModel={selectedProductModel!}
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

export default CambioOnuEquiposFormTab;
