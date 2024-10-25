import { Grid } from '@mui/material';
import { useCallback, useState } from 'react';
import { FiPlus } from 'react-icons/fi';

import { OrdenTrabajo, ToastWrapper, UbicacionProducto } from '@/shared';
import { CustomMinimalTable, CustomSingleButton } from '@/shared/components';
import { InstalacionesStoreKey, useInstalacionesStore } from '@/store/app';
import { useColumnsEquiposMaterialesInstallOT } from '../../../hooks';
import EquiposDisponiblesOTTecModal from './EquiposDisponiblesOTTecModal';

export type EquiposUtilizadosInstallAsignFormPartProps = {
  ordenTrabajo: OrdenTrabajo;
};

export type EquiposUtilizadosOTTableType = UbicacionProducto & {
  usedQuantity: number;

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

  return (
    <>
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
            columns={baseColumnsEquiposMaterialesInstallOT01}
            data={equiposUtilizados || []}
            enablePagination
          />
        </Grid>
      </Grid>

      {/* ==================== modals ==================== */}
      <EquiposDisponiblesOTTecModal
        open={openEquiposDisponiblesModal}
        onClose={() => setOpenEquiposDisponiblesModal(false)}
        ordenTrabajo={ordenTrabajo}
      />
    </>
  );
};

export default EquiposUtilizadosInstallAsignFormPart;
