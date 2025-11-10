'use client';

import { useCycles } from '@/hooks/api/useCyclesApi';

import CyclesListItem from './CyclesListItem';

const CyclesList = () => {
  const { data } = useCycles();

  if (data.length === 0) {
    return (
      <div className="flex justify-center rounded-lg bg-white p-6 shadow-sm">
        <span className="text-neutral-500">Nenhum ciclo registrado ainda</span>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
      {data.map(cycle => (
        <CyclesListItem key={cycle.id} cycle={cycle} />
      ))}
    </div>
  );
};

export default CyclesList;
