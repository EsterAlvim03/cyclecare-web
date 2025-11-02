import tailwindColors from 'tailwindcss/colors';

import ChangePasswordForm from '@/components/pages/main/update/ChangePasswordForm';
import UpdateDataForm from '@/components/pages/main/update/UpdateDataForm';
import { Button, Icon } from '@/components/ui';

const Profile = () => {
  return (
    <div className="mx-auto flex w-full max-w-2xl flex-col gap-6 space-y-6">
      <div className="flex flex-1 flex-col items-start gap-1">
        <div className="flex items-center gap-2">
          <Icon name="UserIcon" size={32} />

          <h1 className="text-3xl font-bold">Meu perfil</h1>
        </div>

        <span className="text-neutral-600">
          Gerencie suas informações pessoais
        </span>
      </div>

      <UpdateDataForm />

      <ChangePasswordForm />

      <div className="flex w-full flex-col gap-6 rounded-lg border border-red-600 bg-white p-6">
        <div className="flex flex-col gap-1">
          <h2 className="text-2xl font-semibold text-red-600">
            Zona de perigo
          </h2>

          <span className="text-sm text-neutral-600">
            Ações irreversíveis relacionadas à sua conta
          </span>
        </div>

        <Button
          color={tailwindColors.red[600]}
          text="Excluir minha conta"
          width={200}
        />
      </div>
    </div>
  );
};

export default Profile;
