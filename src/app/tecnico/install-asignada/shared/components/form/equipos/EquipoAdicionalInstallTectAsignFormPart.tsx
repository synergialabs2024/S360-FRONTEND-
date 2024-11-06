import { Grid, Typography } from '@mui/material';
import { useState } from 'react';

import type { EquiposSeleccionadosTableType } from '@/app/comercial/preventa/shared/components/SavePreventa/form/equipos/EquiposSeleccionadosPreventa';
import { useColumnsEquiposPreventa } from '@/app/comercial/preventa/shared/hooks';
import { gridSize, type OrdenTrabajo } from '@/shared';
import {
  CustomCardAlert,
  CustomMinimalTable,
  CustomSingleButton,
  ScrollableDialogProps,
} from '@/shared/components';

export type EquipoAdicionalInstallTectAsignFormPartProps = {
  ordenTrabajo: OrdenTrabajo;
};

const EquipoAdicionalInstallTectAsignFormPart: React.FC<
  EquipoAdicionalInstallTectAsignFormPartProps
> = ({ ordenTrabajo }) => {
  ///* local state --------------------
  const [openModal, setOpenModal] = useState<boolean>(false);

  ///* columns ---------------------
  const { savedEquiposPreventaColumns } = useColumnsEquiposPreventa({
    showActionColumn: false,
  });

  const equiposVentaDetail =
    ordenTrabajo?.preventa_data?.equipos_venta_detalle || [];
  if (!equiposVentaDetail.length) return null;

  return (
    <Grid item container mb={4}>
      <CustomCardAlert
        sizeType="small"
        alertSeverity="info"
        alertTitle="Equipo adicional"
        alertContentNode={
          <Grid item container {...gridSize} alignItems="center">
            <Typography variant="body1" fontWeight="bold">
              La instalación requiere de equipo adicional{' '}
            </Typography>

            <CustomSingleButton
              label="Ver detalle"
              noGrid
              variant="text"
              color="primary"
              onClick={() => {
                setOpenModal(true);
              }}
              sxBtn={{ ml: 2 }}
            />
          </Grid>
        }
      />

      {/* ============== modals ============== */}
      <ScrollableDialogProps
        open={openModal}
        onClose={() => setOpenModal(false)}
        title="Equipo adicional requerido"
        cancelTextBtn="Cerrar"
        contentNode={
          <Grid item container {...gridSize} spacing={2}>
            <Grid item xs={12}>
              <CustomMinimalTable<EquiposSeleccionadosTableType>
                columns={savedEquiposPreventaColumns}
                data={(equiposVentaDetail as any) || []}
                enablePagination
                density="comfortable"
              />
            </Grid>
          </Grid>
        }
      />
    </Grid>
  );
};

export default EquipoAdicionalInstallTectAsignFormPart;
