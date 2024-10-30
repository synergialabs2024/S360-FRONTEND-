import type { MRT_ColumnDef } from 'material-react-table';
import { useMemo, useState } from 'react';
import { IoQrCodeSharp } from 'react-icons/io5';

import { EquiposUtilizadosOTTableType } from '@/app/tecnico/install-asignada/shared/components/form';
import { useColumnsEquiposMaterialesInstallOT } from '@/app/tecnico/install-asignada/shared/hooks';
import { OrdenTrabajo } from '@/shared';
import {
  CustomMinimalTable,
  ProductoUbicacionSeriesModal,
  SingleIconButton,
} from '@/shared/components';
import { InstalacionesStoreKey, useInstalacionesStore } from '@/store/app';

export type ActivacionInstallOTEquiposFormTabProps = {
  ordenTrabajo: OrdenTrabajo;
};

const ActivacionInstallOTEquiposFormTab: React.FC<
  ActivacionInstallOTEquiposFormTabProps
> = () => {
  ///* local state --------------------
  const [openSeriesModal, setOpenSeriesModal] = useState<boolean>(false);

  ///* global state --------------------
  const equiposUtilizados = useInstalacionesStore(s => s.equiposUtilizados);
  const setSelectedRow = useInstalacionesStore(s => s.setSelectedRow);

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
    ],
    [baseColumnsEquiposMaterialesInstallOT01, setSelectedRow],
  );

  return (
    <>
      <CustomMinimalTable<EquiposUtilizadosOTTableType>
        columns={equiposUtilizadosColumns}
        data={equiposUtilizados || []}
        enablePagination
        density="comfortable"
      />

      {/* ==================== modals ==================== */}
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

export default ActivacionInstallOTEquiposFormTab;
