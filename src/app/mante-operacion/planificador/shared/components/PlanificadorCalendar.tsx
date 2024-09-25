import { useTheme } from '@mui/material';
import dayjs from 'dayjs';

import { Calendar, Views } from 'react-big-calendar';
import 'react-big-calendar/lib/css/react-big-calendar.css';

import { useIsMediaQuery } from '@/shared';
import {
  djLocalizerCalendar,
  eventStyleGetterCalendar,
  getMessagesEs,
} from '../utils';

export type PlanificadorCalendarProps = {};

const PlanificadorCalendar: React.FC<PlanificadorCalendarProps> = () => {
  ///* hooks ---------------------
  const theme = useTheme();
  const isMobile = useIsMediaQuery('sm');

  ///* handlers ---------------------
  const onSelectSlot = (slotInfo: any) => {
    console.log('slotInfo', slotInfo);
  };
  const onSelectEvent = (event: any) => {
    console.log('event', event);
  };

  return (
    <>
      <Calendar
        culture="es"
        startAccessor="start"
        endAccessor="end"
        localizer={djLocalizerCalendar}
        messages={getMessagesEs()}
        eventPropGetter={(event /* start, end, isSelected */) =>
          eventStyleGetterCalendar(event, theme)
        }
        // // // time slot ------
        timeslots={1}
        step={60}
        onSelectSlot={onSelectSlot}
        // // // Events ------
        events={[]}
        onSelectEvent={onSelectEvent}
        // // // Others ------
        defaultDate={dayjs().toDate()}
        defaultView={isMobile ? Views.DAY : Views.WEEK}
        style={{ height: 'calc(100vh - 80px)', width: '100%' }}
        selectable
        // scrollToTime={scrollToTime}
      />
    </>
  );
};

export default PlanificadorCalendar;
