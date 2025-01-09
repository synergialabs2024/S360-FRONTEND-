import { Alert, Box, Chip, Divider, Grid, Typography } from '@mui/material';
import { useState } from 'react';

import { gridSize } from '@/shared';
import {
  CustomCardAlert,
  CustomSingleButton,
  ScrollableDialogProps,
} from '@/shared/components';
import { ClienteExist } from '@/shared/interfaces/app/comercial/solicitud-servicio/client-mikrowisp.interface';
import { formatDataClienteMikro } from '../utils/sol-service.utils';

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

              {formatDataClienteMikro(clientData as any)
                //?.services?.at(-1)
                ?.services?.map((servicio, index) => (
                  <Box key={servicio?.id} my={1}>
                    <Alert variant="outlined" severity="info">
                      <Typography fontWeight="bold">
                        {`${servicio?.contrato_data?.numero_contrato} `}
                        <Chip
                          label={servicio?.estado_linea}
                          color={
                            servicio?.estado_linea === 'ACTIVO'
                              ? 'success'
                              : servicio?.estado_linea === 'SUSPENDIDO'
                                ? 'warning'
                                : 'error'
                          }
                          variant="outlined"
                        />
                        {` $${servicio?.deuda?.toFixed(2)}`}{' '}
                      </Typography>
                    </Alert>

                    {index <
                      (clientData?.services?.at(-1)?.services?.length ?? 0) -
                        1 && <Divider sx={{ my: 1 }} />}
                  </Box>
                ))}
            </Grid>

            {/* Línea a activar */}
            <Grid item xs={12}>
              <Typography variant="body2" fontWeight="bold">
                {`Línea a contratar: #${clientData?.next_linea}`}
              </Typography>
            </Grid>
          </Grid>
        }
      />
    </Grid>
  );
};

export default ServicesAlertModal;
