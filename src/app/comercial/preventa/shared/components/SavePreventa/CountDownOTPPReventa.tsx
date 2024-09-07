import { formatCountDownTimer } from '@/shared';
import { CustomCardAlert } from '@/shared/components';
import { useGenericCountdownStore } from '@/store/ui';
import { Grid, Typography } from '@mui/material';

export type CountDownOTPPReventaProps = {
  celular: string;
  countdownOtpId: string;
};

const otpColorText = 'rgb(74, 76, 81)';

const CountDownOTPPReventa: React.FC<CountDownOTPPReventaProps> = ({
  celular,
  countdownOtpId,
}) => {
  const count = useGenericCountdownStore(
    s => s.counters[countdownOtpId]?.count,
  );

  return (
    <Grid item container xs={12} spacing={3}>
      <Grid item xs={12}>
        <CustomCardAlert
          alertTitle="Código OTP generado"
          alertMessage={`Se ha enviado un SMS al número ${celular} con el código OTP generado.`}
          alertSeverity="success"
        />
      </Grid>

      <Grid item xs={12} container spacing={3} alignItems="center">
        <Grid item xs={12} md={6}>
          <Typography variant="body1" color={otpColorText}>
            Ingresa el código
          </Typography>
        </Grid>

        <Grid item xs={12} md={6}>
          <Typography variant="body1" textAlign="end">
            Tiempo restante: <b>{formatCountDownTimer(count ?? 0)}</b>
          </Typography>
        </Grid>
      </Grid>
    </Grid>
  );
};

export default CountDownOTPPReventa;
