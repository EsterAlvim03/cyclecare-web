import RedirectCard from '@/components/pages/main/home/RedirectCard';

const Home = () => {
  return (
    <div className="flex flex-col gap-6 px-4 py-8">
      <div className="flex flex-col gap-2">
        <h1 className="text-3xl font-bold">Olá, Ester!</h1>

        <span className="text-base text-neutral-600">
          Bem-vinda ao seu painel de saúde
        </span>
      </div>

      <div className="flex flex-col gap-6 md:flex-row">
        <RedirectCard
          description="Acompanhe seu ciclo menstrual"
          href="/login"
          icon="CalendarIcon"
          title="Registrar ciclo"
        />

        <RedirectCard
          description="Gerenciar consultas médicas"
          href="/login"
          icon="CalendarFilledIcon"
          title="Agendar consulta"
        />
      </div>
    </div>
  );
};

export default Home;
