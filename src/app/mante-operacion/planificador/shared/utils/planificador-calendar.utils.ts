import dayjs from 'dayjs';
import isoWeek from 'dayjs/plugin/isoWeek'; // import plugin
// =============================================
import { SlotAgendamientoEstadosEnumChoice } from '@/shared';
import { Theme } from '@mui/material';
import { dayjsLocalizer } from 'react-big-calendar';
dayjs.extend(isoWeek);

// Extiende dayjs con isoWeek para configurar la semana
dayjs.extend(isoWeek);

// El localizador de dayjs configurado para que empiece la semana en lunes
export const djLocalizerCalendar = dayjsLocalizer(dayjs);

// Obtener los mensajes en español
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

// Personalizar los estilos de los eventos en el calendario -------------
export const eventStyleGetterCalendar = (event: any, theme: Theme) => {
  const calcColorEvent = (estado: SlotAgendamientoEstadosEnumChoice | null) => {
    switch (estado) {
      case SlotAgendamientoEstadosEnumChoice.AGENDADO:
        return theme.palette.primary.main;
      case SlotAgendamientoEstadosEnumChoice.EN_RUTA:
        return theme.palette.warning.main;
      case SlotAgendamientoEstadosEnumChoice.INSTALADO:
        return theme.palette.success.main;
      case SlotAgendamientoEstadosEnumChoice.MANTENIMIENTO:
        return theme.palette.error.main;
      case SlotAgendamientoEstadosEnumChoice.NO_OPERATIVO:
        return theme.palette.error.light;
      case SlotAgendamientoEstadosEnumChoice.DESBLOQUEADO:
        return 'transparent';
    }
  };

  const calcColorTextEvent = (
    estado: SlotAgendamientoEstadosEnumChoice | null,
  ) => {
    switch (estado) {
      case SlotAgendamientoEstadosEnumChoice.AGENDADO:
        return 'white';
      default:
        return 'black';
    }
  };

  const style = {
    backgroundColor: calcColorEvent(event.estado),
    color: calcColorTextEvent(event.estado),
    border: 'none',
    borderRadius: '0px',
  };

  return { style };
};
