'use client';

import { Button } from '@/components/ui';
import { useAuth } from '@/contexts/authContext';
import { useDeleteUser } from '@/hooks/api/useUser';
import { useDefaultModal } from '@/store/defaultModalStore';
import colors from '@/theme/colors';

const DangerZone = () => {
  const { logout } = useAuth();
  const { openModal } = useDefaultModal();
  const { mutateAsync } = useDeleteUser();

  const handleDeleteAccount = () => {
    openModal({
      title: 'Excluir conta?',
      message: 'Tem certeza que deseja excluir sua conta?',
      notice: 'Essa ação é irreversível e todos os seus dados serão perdidos.',
      confirmText: 'Excluir',
      onConfirm: async () => {
        await mutateAsync();
        logout();
      },
      cancelText: 'Cancelar',
    });
  };

  return (
    <div className="flex w-full flex-col gap-6 rounded-lg border border-red-600 bg-white p-6">
      <div className="flex flex-col gap-1">
        <h2 className="text-2xl font-semibold text-red-600">Zona de perigo</h2>

        <span className="text-sm text-neutral-600">
          Ações irreversíveis relacionadas à sua conta
        </span>
      </div>

      <Button
        color={colors.red[600]}
        text="Excluir minha conta"
        width={200}
        onClick={handleDeleteAccount}
      />
    </div>
  );
};

export default DangerZone;
