import colors from '@/theme/colors';

type Props = {
  label: string;
  isActive: boolean;
  onClick: () => void;
};

const LoginTab = ({ label, isActive, onClick }: Props) => {
  return (
    <button
      className="flex flex-1 items-center justify-center rounded-md bg-white px-3 py-1.5 font-medium"
      style={{
        color: isActive ? colors.black : colors.neutral[500],
        backgroundColor: isActive ? colors.white : colors.transparent,
      }}
      onClick={onClick}
    >
      {label}
    </button>
  );
};

export default LoginTab;
