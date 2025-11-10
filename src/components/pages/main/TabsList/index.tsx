import Tab from './Tab';

const TabsList = () => {
  return (
    <div className="flex gap-2 border-b border-neutral-200 bg-white px-4">
      <Tab href="/home" icon="HomeIcon" label="Início" />

      <Tab href="/cycles" icon="CalendarIcon" label="Ciclo" />

      <Tab href="/events" icon="CalendarFilledIcon" label="Eventos" />

      <Tab href="/profile" icon="UserIcon" label="Perfil" />
    </div>
  );
};

export default TabsList;
