import { Icon } from '@/components/ui';
import { homeDocuments } from '@public/data/homeDocuments';

const DocsCardsList = () => {
  return (
    <>
      <div className="flex items-center gap-2">
        <Icon name="BookOpenIcon" />

        <h3 className="text-2xl font-bold">Dicas de saúde</h3>
      </div>

      <div className="flex flex-col gap-6 md:flex-row">
        {homeDocuments.map(document => (
          <a
            key={document.title}
            className="flex w-full flex-col justify-between gap-2 rounded-lg bg-white p-4 shadow-sm hover:shadow-md"
            href={document.link}
            rel="noopener noreferrer"
            target="_blank"
          >
            <h3 className="text-lg font-semibold">{document.title}</h3>

            <span className="text-primary text-sm underline">
              Acessar documento
            </span>
          </a>
        ))}
      </div>
    </>
  );
};

export default DocsCardsList;
