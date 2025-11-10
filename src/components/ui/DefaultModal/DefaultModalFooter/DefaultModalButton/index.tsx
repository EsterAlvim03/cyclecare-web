import { Loader } from '@/components/ui';
import { useDisableDelay } from '@/hooks/common';
import colors from '@/theme/colors';

type Props = {
  text: string;
  onClick?: () => void | Promise<void>;
};

const DefaultModalButton = ({ text, onClick }: Props) => {
  const { executeWithDelay, isLoading } = useDisableDelay();

  const handleOnClick = () => {
    if (onClick) {
      executeWithDelay(onClick);
    }
  };

  return (
    <button
      className={`min-w-1/2 relative flex grow items-center justify-center border-r border-neutral-200 p-3 ${!isLoading && 'hover:bg-black/5'}`}
      disabled={isLoading}
      style={{ cursor: isLoading ? 'default' : 'pointer' }}
      type="button"
      onClick={handleOnClick}
    >
      <p className="text-primary text-lg">{text}</p>

      {isLoading && (
        <div className="absolute inset-0 flex items-center justify-center bg-black/20">
          <Loader color={colors.primary[100]} />
        </div>
      )}
    </button>
  );
};

export default DefaultModalButton;
