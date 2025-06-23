import { resumeItems } from '@/utils/lists';
import { Link } from '@tanstack/react-router';
import { useTranslation } from 'react-i18next';

export const ResumeSidebar = () => {
  const { t } = useTranslation();

  return (
    <aside className="space-y-6 lg:max-w-[25rem] w-full">
      <h1 className="text-left">{t('resume.title')}</h1>
      <p>{t('resume.subtitle')}</p>
      <nav className="grid grid-cols-2 lg:flex flex-col gap-4">
        {resumeItems.map(({ href, id }) => (
          <Link
            key={href}
            to={href}
            className="text-center p-2 rounded-md hover:bg-secondary hover:text-background bg-gray"
            activeProps={{
              className: 'bg-secondary text-background',
            }}
          >
            {t(`resume.menu.${id}`)}
          </Link>
        ))}
      </nav>
    </aside>
  );
};
