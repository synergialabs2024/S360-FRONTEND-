import { Box, Chip, Grid, Typography } from '@mui/material';
import { IoMdUnlock as LockOpenIcon } from 'react-icons/io';
import { MdLockPerson as LockPersonIcon } from 'react-icons/md';
import { Popup } from 'react-leaflet';

import { Nap, NapPortType } from '@/shared/interfaces';

export type NapMapDetailPopupProps = {
  nap: Nap;
  availablePorts: NapPortType[];
  occupiedPorts: NapPortType[];
  lat: number;
  lng: number;
};

const NapMapDetailPopup: React.FC<NapMapDetailPopupProps> = ({
  nap,
  availablePorts,
  occupiedPorts,
  lat,
  lng,
}) => {
  return (
    <>
      <Popup key={nap?.uuid}>
        <Box>
          <Typography variant="h6" gutterBottom>
            {nap?.name}
          </Typography>
          <Typography variant="body2" gutterBottom>
            Coordenadas: {lat}, {lng}
          </Typography>

          <Box mt={2}>
            <Typography variant="subtitle1" gutterBottom>
              Puertos disponibles:
            </Typography>
            {availablePorts?.length ? (
              <Grid container spacing={1}>
                {availablePorts.map(port => (
                  <Grid item key={port?.puerto}>
                    <Chip
                      icon={<LockOpenIcon />}
                      label={`P${port?.puerto}`}
                      color="success"
                      variant="outlined"
                    />
                  </Grid>
                ))}
              </Grid>
            ) : (
              <Typography variant="body2">
                No hay puertos disponibles.
              </Typography>
            )}
          </Box>

          <Box mt={2}>
            <Typography variant="subtitle1" gutterBottom>
              Puertos ocupados:
            </Typography>
            {occupiedPorts?.length ? (
              <Grid container spacing={1}>
                {occupiedPorts.map(port => (
                  <Grid item key={port?.puerto}>
                    <Chip
                      icon={<LockPersonIcon />}
                      label={`P${port?.puerto}`}
                      color="warning"
                      variant="outlined"
                    />
                  </Grid>
                ))}
              </Grid>
            ) : (
              <Typography variant="body2">No hay puertos ocupados.</Typography>
            )}
          </Box>
        </Box>
      </Popup>
    </>
  );
};

export default NapMapDetailPopup;
