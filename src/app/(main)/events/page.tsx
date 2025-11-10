'use client';

import EventModal from '@/components/pages/main/events/EventModal';
import EventsList from '@/components/pages/main/events/EventsList';
import { Button, Icon } from '@/components/ui';
import { useEventModal } from '@/store/eventModalStore';

const Events = () => {
  const { openModal } = useEventModal();

  return (
    <>
      <div className="flex flex-col justify-between gap-6 md:flex-row md:items-center">
        <div className="flex flex-1 flex-col items-start gap-1">
          <div className="flex items-center gap-2">
            <Icon name="CalendarFilledIcon" size={32} />

            <h1 className="text-3xl font-bold">Eventos Médicos</h1>
          </div>

          <span className="text-neutral-600">
            Gerencie seus eventos e acompanhamentos
          </span>
        </div>

        <Button
          leftIcon={{ name: 'PlusIcon', size: 16 }}
          style={{ alignSelf: 'flex-end' }}
          text="Novo evento"
          width={200}
          onClick={() => openModal()}
        />
      </div>

      <EventsList />

      <EventModal />
    </>
  );
};

export default Events;
