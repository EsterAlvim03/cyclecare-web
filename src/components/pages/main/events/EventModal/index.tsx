import { zodResolver } from '@hookform/resolvers/zod';
import { parse } from 'date-fns';
import { subMilliseconds } from 'date-fns/fp';
import { useEffect } from 'react';
import { useForm } from 'react-hook-form';

import { Input } from '@/components/ui';
import DefaultModalBackdrop from '@/components/ui/DefaultModal/DefaultModalBackdrop';
import DefaultModalFooter from '@/components/ui/DefaultModal/DefaultModalFooter';
import DefaultModalHeader from '@/components/ui/DefaultModal/DefaultModalHeader';
import {
  useCreateEvent,
  useEvent,
  useUpdateEvent,
} from '@/hooks/api/useEventsApi';
import { useDefaultModal } from '@/store/defaultModalStore';
import { useEventModal } from '@/store/eventModalStore';
import { formatDateToInput } from '@/utils/format';
import { EventForm, EventSchema } from '@/validation/event.validation';

const DEFAULT_VALUES = {
  summary: '',
  description: '',
  startDateTime: '',
  endDateTime: '',
};

const EventModal = () => {
  const { openModal } = useDefaultModal();
  const { eventId, showModal, closeModal } = useEventModal();
  const { data } = useEvent(eventId);

  const { mutateAsync: updateEvent } = useUpdateEvent();
  const { mutateAsync: createEvent } = useCreateEvent();

  const { control, handleSubmit, reset } = useForm<EventForm>({
    resolver: zodResolver(EventSchema),
    defaultValues: DEFAULT_VALUES,
  });

  useEffect(() => {
    if (!eventId) {
      reset(DEFAULT_VALUES);
      return;
    }

    if (data) {
      reset({
        summary: data.summary.substring(12),
        description: data.description,
        startDateTime: formatDateToInput(data.start.dateTime),
        endDateTime: formatDateToInput(data.end.dateTime),
      });
    }
  }, [data, eventId]);

  const handleClose = () => {
    closeModal();
    reset();
  };

  const handleUpdate = async (event: EventForm) => {
    const parsedStartDate = parse(
      event.startDateTime,
      'dd/MM/yyyy HH:mm',
      new Date(),
    );

    const parsedEndDate = parse(
      event.endDateTime,
      'dd/MM/yyyy HH:mm',
      new Date(),
    );

    const startDateTime = subMilliseconds(10800000, parsedStartDate);
    const endDateTime = subMilliseconds(10800000, parsedEndDate);

    await updateEvent({
      eventId: eventId!,
      event: {
        ...event,
        startDateTime,
        endDateTime,
      },
    });
    openModal({
      title: 'Sucesso',
      message: 'Evento atualizado com sucesso! ',
      confirmText: 'Ok',
      onConfirm: handleClose,
    });
  };

  const handleCreate = async (event: EventForm) => {
    const parsedStartDate = parse(
      event.startDateTime,
      'dd/MM/yyyy HH:mm',
      new Date(),
    );

    const parsedEndDate = parse(
      event.endDateTime,
      'dd/MM/yyyy HH:mm',
      new Date(),
    );

    const startDateTime = subMilliseconds(10800000, parsedStartDate);
    const endDateTime = subMilliseconds(10800000, parsedEndDate);

    await createEvent({
      ...event,
      startDateTime,
      endDateTime,
    });
    openModal({
      title: 'Sucesso',
      message: 'Evento criado com sucesso! ',
      confirmText: 'Ok',
      onConfirm: handleClose,
    });
  };

  const onSubmit = async (event: EventForm) => {
    try {
      if (eventId) {
        await handleUpdate(event);
        return;
      }
      await handleCreate(event);
    } catch {
      // globally handled
    }
  };

  if (!showModal) {
    return null;
  }

  return (
    <DefaultModalBackdrop>
      <dialog className="relative flex w-[400px] flex-col overflow-hidden rounded-lg bg-white">
        <DefaultModalHeader
          title={eventId ? 'Editar evento' : 'Criar evento'}
        />

        <div className="flex flex-col gap-3 p-3">
          <Input
            control={control}
            label="Nome"
            name="summary"
            placeholder="Nome do evento"
          />

          <Input
            control={control}
            label="Descrição (opcional)"
            name="description"
            placeholder="Descrição do evento"
          />

          <Input
            control={control}
            label="Data e hora de início"
            mask="00/00/0000 00:00"
            name="startDateTime"
            placeholder="DD/MM/AAAA HH:MM"
          />

          <Input
            control={control}
            label="Data e hora de término"
            mask="00/00/0000 00:00"
            name="endDateTime"
            placeholder="DD/MM/AAAA HH:MM"
          />
        </div>

        <DefaultModalFooter
          cancelText="Cancelar"
          confirmText="Enviar"
          handleCancel={handleClose}
          handleConfirm={handleSubmit(onSubmit)}
        />
      </dialog>
    </DefaultModalBackdrop>
  );
};

export default EventModal;
