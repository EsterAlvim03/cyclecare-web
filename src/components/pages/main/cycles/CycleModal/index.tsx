import { zodResolver } from '@hookform/resolvers/zod';
import { Dispatch, SetStateAction, useEffect } from 'react';
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
import { useDefaultModal } from '@/store/defaultModalStore';
import { formatDateToDisplay } from '@/utils/format';
import { CycleForm, CycleSchema } from '@/validation/cycle.validation';
import { moodsOptions } from '@public/data/moodsOptions';

type Props = {
  cycleId?: string;
  show: boolean;
  setShow: Dispatch<SetStateAction<boolean>>;
};

const CycleModal = ({ show, setShow, cycleId }: Props) => {
  const { openModal } = useDefaultModal();
  const { data } = useCycle(cycleId);
  const { mutateAsync: updateCycle } = useUpdateCycle();
  const { mutateAsync: createCycle } = useCreateCycle();

  const { control, handleSubmit, reset } = useForm<CycleForm>({
    resolver: zodResolver(CycleSchema),
    defaultValues: {
      mood: '',
      startDate: '',
      endDate: '',
    },
  });

  useEffect(() => {
    if (data) {
      reset({
        mood: data.mood,
        startDate: formatDateToDisplay(data.startDate),
        endDate: formatDateToDisplay(data.endDate),
      });
    }
  }, [data]);

  const handleClose = () => {
    setShow(false);
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

  if (!show) {
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
            mask="00/00/0000 00:00"
            name="startDate"
            placeholder="DD/MM/AAAA"
          />

          <Input
            control={control}
            label="Data de término"
            mask="00/00/0000 00:00"
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
