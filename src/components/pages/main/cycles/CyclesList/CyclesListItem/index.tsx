import { useState } from 'react';

import { Icon } from '@/components/ui';
import { useDeleteCycle } from '@/hooks/api/useCyclesApi';
import { useDefaultModal } from '@/store/defaultModalStore';
import colors from '@/theme/colors';
import { TCycle } from '@/types/cycle';
import { formatDateToDisplay } from '@/utils/format';
import { moodEmojiMap, moodTextMap } from '@/utils/map';

import CycleModal from '../../CycleModal';

type Props = {
  cycle: TCycle;
};

const CyclesListItem = ({ cycle }: Props) => {
  const { openModal } = useDefaultModal();
  const { mutateAsync: deleteCycle } = useDeleteCycle();

  const [showModal, setShowModal] = useState(false);

  const handleDelete = () => {
    openModal({
      title: 'Excluir ciclo',
      message: 'Tem certeza que deseja excluir este ciclo?',
      confirmText: 'Excluir',
      cancelText: 'Cancelar',
      onConfirm: async () => {
        await deleteCycle(cycle.id);
      },
    });
  };

  return (
    <>
      <div
        key={cycle.id}
        className="relative flex flex-col items-center gap-3 rounded-lg bg-white p-4 shadow-sm"
      >
        <div className="absolute right-2 top-2 flex gap-2">
          <button type="button" onClick={() => setShowModal(true)}>
            <Icon color={colors.neutral[400]} name="EditIcon" />
          </button>

          <button type="button" onClick={handleDelete}>
            <Icon color={colors.red[400]} name="BinIcon" />
          </button>
        </div>

        <span className="text-7xl">{moodEmojiMap[cycle.mood]}</span>

        <span className="text-primary text-2xl font-semibold">
          {moodTextMap[cycle.mood]}
        </span>

        <span className="text-secondary font-bold">{`${formatDateToDisplay(cycle.startDate)} - ${formatDateToDisplay(cycle.endDate)}`}</span>
      </div>

      <CycleModal cycleId={cycle.id} setShow={setShowModal} show={showModal} />
    </>
  );
};

export default CyclesListItem;
