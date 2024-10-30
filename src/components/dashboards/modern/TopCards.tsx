import { Box, CardContent, Grid, Typography } from '@mui/material';

import icon1 from '../../../assets/images/svgs/icon-connect.svg';
import icon2 from '../../../assets/images/svgs/icon-user-male.svg';
import icon3 from '../../../assets/images/svgs/icon-briefcase.svg';
import icon4 from '../../../assets/images/svgs/icon-favorites.svg';
import icon5 from '../../../assets/images/svgs/icon-pie.svg';
import icon6 from '../../../assets/images/svgs/icon-dd-application.svg';

interface cardType {
  icon: string;
  title: string;
  digits: string;
  bgcolor: string;
}

const topcards: cardType[] = [
  {
    icon: icon2,
    title: 'Solicitud Servicio',
    digits: '15',
    bgcolor: 'primary',
  },
  {
    icon: icon3,
    title: 'Preventa',
    digits: '20',
    bgcolor: 'warning',
  },
  {
    icon: icon5,
    title: 'Venta Corporativa',
    digits: '100',
    bgcolor: 'secondary',
  },
  {
    icon: icon4,
    title: 'Inventariables',
    digits: '4',
    bgcolor: 'error',
  },
  {
    icon: icon6,
    title: 'Agendamientos',
    digits: '5',
    bgcolor: 'success',
  },
  {
    icon: icon1,
    title: 'CODIGO OTP',
    digits: '3',
    bgcolor: 'info',
  },
];

const TopCards = () => {
  return (
    <Grid container spacing={3} mt={3}>
      {topcards.map((topcard, i) => (
        <Grid item xs={12} sm={4} lg={2} key={i}>
          <Box bgcolor={topcard.bgcolor + '.light'} textAlign="center">
            <CardContent>
              <img src={topcard.icon} alt={topcard.icon} width="50" />
              <Typography
                color={topcard.bgcolor + '.main'}
                mt={1}
                variant="subtitle1"
                fontWeight={600}
              >
                {topcard.title}
              </Typography>
              <Typography
                color={topcard.bgcolor + '.main'}
                variant="h4"
                fontWeight={600}
              >
                {topcard.digits}
              </Typography>
            </CardContent>
          </Box>
        </Grid>
      ))}
    </Grid>
  );
};

export default TopCards;
