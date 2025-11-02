import ChangePasswordForm from '@/components/pages/main/update/ChangePasswordForm';
import DangerZone from '@/components/pages/main/update/DangerZone';
import UpdateDataForm from '@/components/pages/main/update/UpdateDataForm';
import { Icon } from '@/components/ui';

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

      <DangerZone />
    </div>
  );
};

export default Profile;
