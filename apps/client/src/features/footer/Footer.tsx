import PopUpInfo from '@/components/pop-up-info';
import { Button } from '@/lib/ui/button';
import { useStore } from '@/stores';
import { currentYear } from '@/utils/constants';
import { actions } from '@/utils/lists';
import { Link } from '@tanstack/react-router';
import { useTranslation } from 'react-i18next';
import { useShallow } from 'zustand/shallow';

export const Footer = () => {
  const { t } = useTranslation();
  const { lang, toggleLang } = useStore(
    useShallow((state) => ({
      lang: state.lang,
      toggleLang: state.toggleLang,
    }))
  );

  return (
    <footer className="w-full container mx-auto px-4 py-2 md:py-8 flex flex-col md:flex-row items-center justify-between gap-2 md:gap-4 z-11">
      <div className="flex flex-wrap items-center gap-3 sm:gap-4 justify-center md:justify-start">
        <PopUpInfo
          hoverText={`${t('lang')} ${lang === 'en' ? 'ITA' : 'ENG'}`}
          align="right"
        >
          <Button
            variant="outline"
            size="icon"
            onClick={() => toggleLang(lang === 'en' ? 'it' : 'en')}
            aria-label="Toggle language"
          >
            <span
              role="img"
              className="text-xl"
              aria-label={lang === 'en' ? 'UK flag' : 'Italian flag'}
            >
              {lang === 'en' ? '🇬🇧' : '🇮🇹'}
            </span>
          </Button>
        </PopUpInfo>
        {actions.map(
          ({ align, label, className, onClick, href, isLink, icon, id }) => (
            <PopUpInfo key={label} hoverText={t(id)} align={align}>
              <Button
                variant="outline"
                size="icon"
                asChild={!onClick && !isLink}
                onClick={onClick}
                className={className}
                aria-label={label}
              >
                {isLink ? (
                  <Link to={href} aria-label={label}>
                    {icon}
                  </Link>
                ) : href ? (
                  <a
                    href={href}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label={label}
                  >
                    {icon}
                  </a>
                ) : (
                  icon
                )}
              </Button>
            </PopUpInfo>
          )
        )}
      </div>

      <p className="text-xs text-center md:text-sm md:text-right">
        © {currentYear} Matteo Soresini. {t('footer.text')}
      </p>
    </footer>
  );
};
