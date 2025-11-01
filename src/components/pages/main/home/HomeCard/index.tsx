type Props = {
  title: string;
  description: string;
};

const HomeCard = ({ title, description }: Props) => {
  return (
    <div className="flex w-full flex-col gap-6 rounded-lg bg-white p-6 shadow-sm">
      <h4 className="text-lg font-semibold">{title}</h4>

      <span className="text-sm text-neutral-600">{description}</span>
    </div>
  );
};

export default HomeCard;
