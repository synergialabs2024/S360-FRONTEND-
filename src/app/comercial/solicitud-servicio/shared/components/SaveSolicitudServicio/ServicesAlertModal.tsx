import { Box, Chip, Divider, Grid, Typography } from '@mui/material';
import { useState } from 'react';

import { gridSize } from '@/shared';
import {
  CustomCardAlert,
  CustomSingleButton,
  ScrollableDialogProps,
} from '@/shared/components';
import { ClienteExist } from '@/shared/interfaces/app/comercial/solicitud-servicio/client-mikrowisp.interface';

export type ServicesAlertModalProps = {
  clientData?: ClienteExist | null;
  watchedIsCliente: boolean;
};

const ServicesAlertModal: React.FC<ServicesAlertModalProps> = ({
  watchedIsCliente,
  clientData,
}) => {
  ///* local state -----------------
  const [isOpenServicesModal, setIsOpenServicesModal] =
    useState<boolean>(false);

  return (
    <Grid item xs={12}>
      {watchedIsCliente && (
        <CustomCardAlert
          sizeType="small"
          alertSeverity="info"
          alertTitle="Cliente existente"
          alertContentNode={
            <Grid item container {...gridSize} alignItems="center">
              <Typography variant="body1" fontWeight="bold">
                {`${clientData?.name} es cliente de Yiga5.`}
              </Typography>

              <CustomSingleButton
                label="Ver detalle"
                noGrid
                variant="text"
                color="primary"
                onClick={() => {
                  setIsOpenServicesModal(true);
                }}
              />
            </Grid>
          }
        />
      )}

      {/* ============== modals ============== */}
      <ScrollableDialogProps
        open={isOpenServicesModal}
        onClose={() => setIsOpenServicesModal(false)}
        title="Detalle de servicios"
        cancelTextBtn="Cerrar"
        contentNode={
          <Grid item container {...gridSize} spacing={2}>
            {/* Nombre del cliente */}
            <Grid item xs={12}>
              <Typography variant="body1" fontWeight="bold">
                {`${clientData?.name} es cliente de Yiga5`}
              </Typography>
            </Grid>

            {/* Servicios */}
            <Grid item xs={12}>
              <Typography variant="subtitle1" fontWeight="bold">
                Servicios:
              </Typography>

              {clientData?.services
                ?.at(-1)
                ?.servicios?.map((servicio, index) => (
                  <Box key={servicio?.id} my={1}>
                    <Typography variant="body2">
                      {`${servicio?.perfil}`}{' '}
                      <Chip
                        label={servicio?.status_user}
                        color={
                          servicio?.status_user === 'ONLINE'
                            ? 'success'
                            : 'error'
                        }
                        variant="outlined"
                      />
                    </Typography>

                    {index <
                      (clientData?.services?.at(-1)?.servicios?.length ?? 0) -
                        1 && <Divider sx={{ my: 1 }} />}
                  </Box>
                ))}
            </Grid>

            {/* Línea a activar */}
            <Grid item xs={12}>
              <Typography variant="body2" fontWeight="bold">
                {`Línea a activar: #${clientData?.nexgt_line}`}
              </Typography>
            </Grid>
          </Grid>
        }
      />
    </Grid>
  );
};

export default ServicesAlertModal;
