export const getMessagesEs = () => ({
  allDay: 'Todo el día',
  previous: '<',
  next: '>',
  today: 'Hoy',
  month: 'Mes',
  week: 'Semana',
  day: 'Día',
  agenda: 'Agenda',
  date: 'Fecha',
  time: 'Hora',
  event: 'Evento',
  noEventsInRange: 'No hay eventos en este rango',
  // showMore: total => `+ Ver más (${total})`,
});

// =============================================
import { Theme } from '@mui/material';
import dayjs from 'dayjs';
import { dayjsLocalizer } from 'react-big-calendar';

export const djLocalizerCalendar = dayjsLocalizer(dayjs);

export const eventStyleGetterCalendar = (event: any, theme: Theme) => {
  const isFree = !event.estado; // default: false

  const style = {
    backgroundColor: isFree ? 'transparent' : theme.palette.primary.main,
    color: isFree ? 'black' : 'white',
    border: isFree ? 'none' : `1px solid ${theme.palette.primary.main}`,
    borderRadius: '0px',
    opacity: 'white',
  };

  return { style };
};
