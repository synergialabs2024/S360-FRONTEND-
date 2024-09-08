import { Grid, Typography } from '@mui/material';
import { MdRefresh } from 'react-icons/md';

import { formatCountDownTimer } from '@/shared';
import { CustomCardAlert, SingleIconButton } from '@/shared/components';
import { useGenericCountdownStore } from '@/store/ui';

export type CountDownOTPPReventaProps = {
  celular: string;
  countdownOtpId: string;
  showRefresh?: boolean;
  onRefresh?: () => void;
};

const otpColorText = 'rgb(74, 76, 81)';

const CountDownOTPPReventa: React.FC<CountDownOTPPReventaProps> = ({
  celular,
  countdownOtpId,
  showRefresh = false,
  onRefresh,
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

        <Grid item xs={12} md={6} container alignItems="center">
          <Grid item xs={11}>
            <Typography variant="body1" textAlign="end">
              Tiempo restante: <b>{formatCountDownTimer(count ?? 0)}</b>
            </Typography>
          </Grid>

          {showRefresh && (
            <Grid item xs={1}>
              <SingleIconButton
                label="Refrescar"
                startIcon={<MdRefresh />}
                onClick={() => {
                  onRefresh && onRefresh();
                }}
                color="info"
              />
            </Grid>
          )}
        </Grid>
      </Grid>
    </Grid>
  );
};

export default CountDownOTPPReventa;
