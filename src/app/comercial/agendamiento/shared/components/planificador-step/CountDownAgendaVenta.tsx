import { Grid, Typography } from '@mui/material';

import { formatCountDownTimer } from '@/shared';
import { useAgendamientoVentasStore } from '@/store/app';
import { useGenericCountdownStore } from '@/store/ui';

export type CountDownAgendaVentaProps = {
  countDownId: string;
};

const CountDownAgendaVenta: React.FC<CountDownAgendaVentaProps> = ({
  countDownId,
}) => {
  const count = useGenericCountdownStore(s => s.counters[countDownId]?.count);
  const isComponentBlocked = useAgendamientoVentasStore(
    s => s.isComponentBlocked,
  );

  return (
    <>
      {isComponentBlocked && (
        <Grid item container xs={12} spacing={3} justifyContent="flex-end">
          <Typography variant="body1" textAlign="end">
            Tiempo restante: <b>{formatCountDownTimer(count ?? 0)}</b>
          </Typography>
        </Grid>
      )}
    </>
  );
};

export default CountDownAgendaVenta;
