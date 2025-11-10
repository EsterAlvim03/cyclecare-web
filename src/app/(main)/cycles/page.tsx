'use client';

import CycleModal from '@/components/pages/main/cycles/CycleModal';
import CyclesList from '@/components/pages/main/cycles/CyclesList';
import { Button, Icon } from '@/components/ui';
import { useCycleModal } from '@/store/cycleModalStore';

const Cycles = () => {
  const { openModal } = useCycleModal();

  return (
    <>
      <div className="flex flex-col justify-between gap-6 md:flex-row md:items-center">
        <div className="flex flex-1 flex-col items-start gap-1">
          <div className="flex items-center gap-2">
            <Icon name="CalendarIcon" size={32} />

            <h1 className="text-3xl font-bold">Ciclo Menstrual</h1>
          </div>

          <span className="text-neutral-600">
            Acompanhe e registre seu ciclo
          </span>
        </div>

        <Button
          leftIcon={{ name: 'PlusIcon', size: 16 }}
          style={{ alignSelf: 'flex-end' }}
          text="Novo ciclo"
          width={200}
          onClick={() => openModal()}
        />
      </div>

      <CyclesList />

      <CycleModal />
    </>
  );
};

export default Cycles;
