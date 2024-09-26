import { useTheme } from '@mui/material';
import dayjs from 'dayjs';
import { useEffect, useState } from 'react';

import { Calendar, Views } from 'react-big-calendar';
import 'react-big-calendar/lib/css/react-big-calendar.css';

import { TimeMapPlanificador, useIsMediaQuery } from '@/shared';
import { usePlanificadoresStore } from '@/store/app';
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

  ///* local state ---------------------
  const [isMounted, setIsMounted] = useState<boolean>(false);
  useEffect(() => {
    setIsMounted(true);
    return () => setIsMounted(false);
  }, []);

  const [events, setEvents] = useState<any[]>([]);

  ///* global state ---------------------
  const planificadoresArray = usePlanificadoresStore(
    s => s.planificadoresArray,
  );
  // const setGlobalTimeMap = usePlanificadoresStore(s => s.setGlobalTimeMap);

  ///* handlers ---------------------
  const onSelectSlot = (slotInfo: any) => {
    console.log('slotInfo', slotInfo);
  };
  const onSelectEvent = (event: any) => {
    console.log('event', event);
  };

  ///* effects ---------------------
  useEffect(() => {
    if (!isMounted) return;

    const now = dayjs().format();

    // create events from planificadoresArray
    const events = planificadoresArray.reduce((acc, planificador) => {
      const { fecha, time_map } = planificador;

      if (!time_map) return acc;

      const newEvents = time_map.map((timeMap: TimeMapPlanificador) => {
        const { hora, estado, motivo, block_until } = timeMap;

        return {
          start: dayjs(`${fecha} ${hora}`).toDate(),
          end: dayjs(`${fecha} ${hora}`).add(30, 'minute').toDate(),
          title:
            estado ||
            motivo ||
            (dayjs(now).isBefore(dayjs(block_until))
              ? 'Bloqueado temporalmente'
              : 'Bloque temporal expirado'),
          estado,
          motivo,
        };
      });

      return [...acc, ...newEvents];
    }, [] as any[]);
    console.log({ events, planificadoresArray });
    setEvents(events);
  }, [isMounted, planificadoresArray]);

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
        step={30}
        onSelectSlot={onSelectSlot}
        // // // Events ------
        events={events}
        onSelectEvent={onSelectEvent}
        // // // Others ------
        defaultDate={dayjs().toDate()}
        defaultView={isMobile ? Views.DAY : Views.WEEK}
        style={{ height: 'calc(100vh - 80px)', width: '100%' }}
        selectable
        // scrollToTime={scrollToTime}
        // // limit visible hours ------
        min={dayjs().hour(7).minute(0).second(0).toDate()}
        max={dayjs().hour(20).minute(30).second(0).toDate()}
      />
    </>
  );
};

export default PlanificadorCalendar;
