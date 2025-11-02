import Tab from './Tab';

const TabsList = () => {
  return (
    <div className="flex gap-2 border-b border-neutral-200 bg-white px-4">
      <Tab href="/home" icon="HomeIcon" label="Início" />

      <Tab href="/" icon="CalendarIcon" label="Ciclo" />

      <Tab href="/" icon="CalendarFilledIcon" label="Consultas" />

      <Tab href="/" icon="UserIcon" label="Perfil" />
    </div>
  );
};

export default TabsList;
