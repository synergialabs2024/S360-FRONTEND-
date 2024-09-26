import { useTheme } from '@mui/material';
import dayjs from 'dayjs';
import { useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';

import { Calendar, Event, SlotInfo, Views } from 'react-big-calendar';
import 'react-big-calendar/lib/css/react-big-calendar.css';

import { TimeMapPlanificador, useIsMediaQuery } from '@/shared';
import { usePlanificadoresStore } from '@/store/app';
import {
  djLocalizerCalendar,
  eventStyleGetterCalendar,
  getMessagesEs,
} from '../utils';
import MultipleSlotsModal from './MultipleSlotsModal';

export type PlanificadorCalendarProps = {};

export interface PlanificadorEvent extends Event, TimeMapPlanificador {}

const PlanificadorCalendar: React.FC<PlanificadorCalendarProps> = () => {
  ///* hooks ---------------------
  const theme = useTheme();
  const isMobile = useIsMediaQuery('sm');

  const location = useLocation();
  const navigate = useNavigate();
  const queryParams = new URLSearchParams(location.search);
  const mondayParam = queryParams.get('initial_date');
  const startDate = mondayParam
    ? dayjs(mondayParam).toDate()
    : dayjs().toDate();

  ///* local state ---------------------
  const [isMounted, setIsMounted] = useState<boolean>(false);
  useEffect(() => {
    setIsMounted(true);
    return () => setIsMounted(false);
  }, []);
  const [isOpenMultiSelectModal, setIsOpenMultiSelectModal] =
    useState<boolean>(false);

  ///* global state ---------------------
  const planificadoresArray = usePlanificadoresStore(
    s => s.planificadoresArray,
  );
  const events = usePlanificadoresStore(s => s.events);
  const setEvents = usePlanificadoresStore(s => s.setEvents);
  const setSelectedEvents = usePlanificadoresStore(s => s.setSelectedEvents);
  const setSelectedSlots = usePlanificadoresStore(s => s.setSelectedSlots);

  ///* handlers ---------------------
  const onSelectSlot = (slotInfo: SlotInfo) => {
    const slots: Date[] = slotInfo.slots.slice(0, -1);
    setSelectedSlots(slots);

    const events = usePlanificadoresStore.getState().events;

    // only one slot selected -------------------------
    if (slots.length === 1) {
      const selectedEvent = events.find(event =>
        dayjs(event.start).isSame(slots[0], 'minute'),
      );
      setSelectedEvents(selectedEvent ? [selectedEvent] : []);
      setIsOpenMultiSelectModal(true);

      return;
    }

    // multiple slots selected -------------------------
    // find events that are included in the slots if exist
    const selectedEvents = events.filter(event => {
      const isEventIncluded = slots.some(slot =>
        dayjs(event.start).isSame(slot, 'minute'),
      );
      return isEventIncluded;
    });
    setSelectedEvents(selectedEvents);

    setIsOpenMultiSelectModal(true);
  };
  const onSelectEvent = (event: PlanificadorEvent) => {
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
        return {
          start: dayjs(`${fecha} ${timeMap?.hora}`).toDate(),
          end: dayjs(`${fecha} ${timeMap?.hora}`).add(30, 'minute').toDate(),
          title:
            timeMap?.estado ||
            timeMap?.motivo ||
            (dayjs(now).isBefore(dayjs(timeMap?.block_until))
              ? 'Bloqueado temporalmente'
              : 'Bloque temporal expirado'),
          estado: timeMap?.estado,
          motivo: timeMap?.motivo,

          preventa: timeMap?.preventa,
          user: timeMap?.user,
          block_until: timeMap?.block_until,
          uuid: timeMap?.uuid,
        };
      });

      return [...acc, ...newEvents];
    }, [] as any[]);
    // console.log({ events, planificadoresArray });
    setEvents(events);
  }, [isMounted, planificadoresArray, setEvents]);

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
        // // // Navigation ------
        onNavigate={(date, view) => {
          // only listen today,>,<
          if (view === 'week') {
            const monday = dayjs(date).startOf('isoWeek').format('YYYY-MM-DD');

            console.log('onNavigate', { monday });

            console.log('onNavigate', { date, view });
            navigate(`${location.pathname}?initial_date=${monday}`);
          }
        }}
        // onRangeChange={range => {
        // listen month,week,day change
        //   console.log('onRangeChange', { range });
        // }}
        // // // time slot ------
        timeslots={1}
        step={30}
        onSelectSlot={onSelectSlot}
        // // // Events ------
        events={events}
        onSelectEvent={onSelectEvent}
        // // // Others ------
        defaultDate={startDate} // default date
        defaultView={isMobile ? Views.DAY : Views.WEEK}
        style={{ height: 'calc(100vh - 80px)', width: '100%' }}
        selectable
        // scrollToTime={scrollToTime}
        // // limit visible hours ------
        min={dayjs().hour(7).minute(0).second(0).toDate()}
        max={dayjs().hour(20).minute(30).second(0).toDate()}
      />

      {/* ================= Modals ================= */}
      <MultipleSlotsModal
        isOpen={isOpenMultiSelectModal}
        onClose={() => {
          setIsOpenMultiSelectModal(false);
        }}
      />
    </>
  );
};

export default PlanificadorCalendar;
