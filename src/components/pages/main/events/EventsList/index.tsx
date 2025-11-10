'use client';

import { useEvents } from '@/hooks/api/useEventsApi';

import EventsListItem from './EventsListItem';

const EventsList = () => {
  const { data } = useEvents();

  if (data.length === 0) {
    return (
      <div className="flex justify-center rounded-lg bg-white p-6 shadow-sm">
        <span className="text-neutral-500">Nenhum evento registrado ainda</span>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
      {data.map(event => (
        <EventsListItem key={event.id} event={event} />
      ))}
    </div>
  );
};

export default EventsList;
