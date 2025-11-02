'use client';

import { useRouter } from 'next/navigation';

import HomeCard from '@/components/pages/main/home/HomeCard';
import RedirectCard from '@/components/pages/main/home/RedirectCard';
import { Button, Icon } from '@/components/ui';
import colors from '@/theme/colors';

const Home = () => {
  const router = useRouter();

  return (
    <>
      <div className="flex flex-col gap-2">
        <h1 className="text-3xl font-bold">Olá, Ester!</h1>

        <span className="text-neutral-600">
          Bem-vinda ao seu painel de saúde
        </span>
      </div>

      <div className="flex flex-col gap-6 md:flex-row">
        <RedirectCard
          description="Acompanhe seu ciclo menstrual"
          href="/period"
          icon="CalendarIcon"
          title="Registrar ciclo"
        />

        <RedirectCard
          description="Gerenciar consultas médicas"
          href="/appointments"
          icon="CalendarFilledIcon"
          title="Agendar consulta"
        />
      </div>

      <div className="bg-linear-to-r from-primary to-secondary flex w-full flex-col gap-4 rounded-lg p-6 shadow-sm">
        <div className="flex items-center gap-2">
          <Icon color={colors.white} name="HeartIcon" />

          <h2 className="text-2xl font-semibold text-white">Status do ciclo</h2>
        </div>

        <h4 className="text-lgl text-white">
          Registre seu primeiro ciclo para começar a acompanhar suas previsões
        </h4>

        <Button
          color={colors.secondary}
          text="Começar agora"
          onClick={() => router.push('/period')}
        />
      </div>

      <div className="flex items-center gap-2">
        <Icon name="BookOpenIcon" />

        <h3 className="text-2xl font-bold">Dicas de saúde</h3>
      </div>

      <div className="flex flex-col gap-6 md:flex-row">
        <HomeCard
          description="Beber água regularmente ajuda a reduzir cólicas e inchaço durante o ciclo menstrual."
          title="Hidratação"
        />

        <HomeCard
          description="Atividades físicas leves como caminhada e yoga podem aliviar sintomas da TPM."
          title="Exercícios"
        />

        <HomeCard
          description="Uma dieta rica em ferro e vitaminas é essencial durante o período menstrual."
          title="Alimentação"
        />
      </div>
    </>
  );
};

export default Home;
