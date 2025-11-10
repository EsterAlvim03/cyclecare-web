'use client';

import { zodResolver } from '@hookform/resolvers/zod';
import { useEffect } from 'react';
import { useForm } from 'react-hook-form';

import { Input } from '@/components/ui';
import DefaultModalBackdrop from '@/components/ui/DefaultModal/DefaultModalBackdrop';
import DefaultModalFooter from '@/components/ui/DefaultModal/DefaultModalFooter';
import DefaultModalHeader from '@/components/ui/DefaultModal/DefaultModalHeader';
import Dropdown from '@/components/ui/Dropdown';
import {
  useCreateCycle,
  useCycle,
  useUpdateCycle,
} from '@/hooks/api/useCyclesApi';
import { useCycleModal } from '@/store/cycleModalStore';
import { useDefaultModal } from '@/store/defaultModalStore';
import { formatDateToDisplay } from '@/utils/format';
import { CycleForm, CycleSchema } from '@/validation/cycle.validation';
import { moodsOptions } from '@public/data/moodsOptions';

const DEFAULT_VALUES = {
  mood: '',
  startDate: '',
  endDate: '',
};

const CycleModal = () => {
  const { openModal } = useDefaultModal();
  const { cycleId, showModal, closeModal } = useCycleModal();
  const { data } = useCycle(cycleId);

  const { mutateAsync: updateCycle } = useUpdateCycle();
  const { mutateAsync: createCycle } = useCreateCycle();

  const { control, handleSubmit, reset } = useForm<CycleForm>({
    resolver: zodResolver(CycleSchema),
    defaultValues: DEFAULT_VALUES,
  });

  useEffect(() => {
    if (!cycleId) {
      reset(DEFAULT_VALUES);
      return;
    }

    if (data) {
      reset({
        mood: data.mood,
        startDate: formatDateToDisplay(data.startDate),
        endDate: formatDateToDisplay(data.endDate),
      });
    }
  }, [showModal, data, cycleId]);

  const handleClose = () => {
    closeModal();
    reset();
  };

  const handleUpdate = async (cycle: CycleForm) => {
    await updateCycle({
      cycleId: cycleId!,
      cycle,
    });
    openModal({
      title: 'Sucesso',
      message: 'Ciclo atualizado com sucesso! ',
      confirmText: 'Ok',
      onConfirm: handleClose,
    });
  };

  const handleCreate = async (cycle: CycleForm) => {
    await createCycle(cycle);
    openModal({
      title: 'Sucesso',
      message: 'Ciclo criado com sucesso! ',
      confirmText: 'Ok',
      onConfirm: handleClose,
    });
  };

  const onSubmit = async (cycle: CycleForm) => {
    try {
      if (cycleId) {
        await handleUpdate(cycle);
        return;
      }
      await handleCreate(cycle);
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
        <DefaultModalHeader title={cycleId ? 'Editar ciclo' : 'Criar ciclo'} />

        <div className="flex flex-col gap-3 p-3">
          <Dropdown
            control={control}
            label="Humor"
            name="mood"
            options={moodsOptions}
          />

          <Input
            control={control}
            label="Data de início"
            mask="00/00/0000"
            name="startDate"
            placeholder="DD/MM/AAAA"
          />

          <Input
            control={control}
            label="Data de término"
            mask="00/00/0000"
            name="endDate"
            placeholder="DD/MM/AAAA"
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

export default CycleModal;
