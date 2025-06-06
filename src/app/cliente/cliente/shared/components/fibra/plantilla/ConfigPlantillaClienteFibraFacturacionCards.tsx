import { UseFormReturn } from 'react-hook-form';
import { SaveFormDataConfigPlantilla } from '@/app/administration/config-plantilla/shared/components/form/SaveConfiguracionPlantilla';
import { Box, Grid } from '@mui/material';
import {
  IconCalendarDollar,
  IconCalendarEvent,
  IconCalendarPause,
  IconCalendarPlus,
  IconTimelineEventText,
} from '@tabler/icons-react';

export type ConfigPlantillaClienteFibraFacturacionCardsProps = {
  form: UseFormReturn<SaveFormDataConfigPlantilla>;
};

const ConfigPlantillaClienteFibraFacturacionCards: React.FC<
  ConfigPlantillaClienteFibraFacturacionCardsProps
> = ({ form }) => {
  const fecha = new Date();

  const monthNow = fecha.getMonth() + 1;
  const yearNow = fecha.getFullYear();

  const cardData = [
    {
      label: 'Día de pago',
      value: form.watch('dia_pago'),
      color: 'warning.main',
      Icon: IconCalendarDollar,
    },
    {
      label: 'Día de factura',
      value: form.watch('dia_facturacion'),
      color: 'info.main',
      Icon: IconTimelineEventText,
    },
    {
      label: 'Día del límite de pago',
      value: form.watch('dia_pago_limite'),
      color: 'secondary.main',
      Icon: IconCalendarEvent,
    },
    {
      label: 'Día de suspensión',
      value: form.watch('dia_suspension'),
      color: 'error.main',
      Icon: IconCalendarPause,
    },
  ];

  return (
    <Grid container spacing={3} sx={{ mt: 1, ml: 0 }}>
      {cardData.map(({ label, value, color, Icon }, index) => (
        <Grid item xs={4} key={index}>
          <Box
            sx={{
              backgroundColor: color,
              display: 'flex',
              justifyContent: 'center',
              alignItems: 'center',
            }}
          >
            <Icon />
            <Grid sx={{ margin: '10px' }}>
              {label} {value}/{monthNow}/{yearNow}
            </Grid>
          </Box>
        </Grid>
      ))}

      <Grid item xs={4}>
        <Box
          sx={{
            backgroundColor: 'success.main',
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
          }}
        >
          <IconCalendarPlus />
          <Grid sx={{ margin: '10px' }}>Día de gracia: 5</Grid>
        </Box>
      </Grid>
    </Grid>
  );
};

export default ConfigPlantillaClienteFibraFacturacionCards;
