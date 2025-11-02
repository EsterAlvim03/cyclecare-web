import Icon from '../../Icon';

type Props = {
  title: string;
  onClose?: () => void;
};

const DefaultModalHeader = ({ title, onClose }: Props) => {
  return (
    <div className="flex items-center justify-between border-b border-neutral-200 bg-neutral-100 p-3">
      <h5 className="text-xl">{title}</h5>

      {onClose && (
        <button
          className="flex cursor-pointer items-center justify-center rounded-full hover:bg-black/5"
          style={{ width: 28, height: 28 }}
          onClick={onClose}
        >
          <Icon name="CheckIcon" size={16} />
        </button>
      )}
    </div>
  );
};

export default DefaultModalHeader;
