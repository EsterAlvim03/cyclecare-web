import { format } from 'date-fns';

import { Icon } from '@/components/ui';
import { useDeleteEvent } from '@/hooks/api/useEventsApi';
import { useDefaultModal } from '@/store/defaultModalStore';
import { useEventModal } from '@/store/eventModalStore';
import colors from '@/theme/colors';
import { TEvent } from '@/types/event';

type Props = {
  event: TEvent;
};

const EventsListItem = ({ event }: Props) => {
  const { openModal } = useDefaultModal();
  const { openModal: openEventModal } = useEventModal();
  const { mutateAsync: deleteEvent } = useDeleteEvent();

  const handleDelete = () => {
    openModal({
      title: 'Excluir evento',
      message: 'Tem certeza que deseja excluir este evento?',
      confirmText: 'Excluir',
      cancelText: 'Cancelar',
      onConfirm: async () => {
        await deleteEvent(event.id);
      },
    });
  };

  return (
    <div
      key={event.id}
      className="relative flex flex-col gap-3 rounded-lg bg-white p-4 shadow-sm"
    >
      <div className="absolute right-2 top-2 flex gap-2">
        <button type="button" onClick={() => openEventModal(event.id)}>
          <Icon color={colors.neutral[400]} name="EditIcon" />
        </button>

        <button type="button" onClick={handleDelete}>
          <Icon color={colors.red[400]} name="BinIcon" />
        </button>
      </div>

      <span className="wrap-break-word text-primary w-full whitespace-pre-wrap pr-16 text-2xl font-semibold">
        {event.summary}
      </span>

      {event.description && (
        <span className="text-xl text-neutral-600">{event.description}</span>
      )}

      <span className="text-neutral-500">
        {`${format(event.start.dateTime, 'Pp')} - ${format(event.end.dateTime, 'Pp')}`}
      </span>
    </div>
  );
};

export default EventsListItem;
