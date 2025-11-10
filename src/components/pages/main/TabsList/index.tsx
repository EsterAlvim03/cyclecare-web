import Tab from './Tab';

const TabsList = () => {
  return (
    <div className="flex border-b border-neutral-200 bg-white">
      <div className="mx-auto flex max-w-[1368px] flex-1 gap-2 px-4">
        <Tab href="/home" icon="HomeIcon" label="Início" />

        <Tab href="/cycles" icon="CalendarIcon" label="Ciclo" />

        <Tab href="/events" icon="CalendarFilledIcon" label="Eventos" />

        <Tab href="/profile" icon="UserIcon" label="Perfil" />
      </div>
    </div>
  );
};

export default TabsList;
