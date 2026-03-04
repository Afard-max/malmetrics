import { useLocation } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { ThemeSwitch } from '../ui/ThemeSwitch';
import { ApiStatus } from '../ui/ApiStatus';
import { LanguageSelector } from '../ui/LanguageSelector';

export const TopBar = () => {
  const location = useLocation();
  const { t } = useTranslation();

  const getTitle = () => {
    switch (location.pathname) {
      case '/': return t('nav.overview');
      case '/seasons': return t('nav.seasons');
      case '/scores': return t('nav.scores');
      case '/community': return t('nav.community');
      case '/franchises': return t('nav.franchises');
      default: return '';
    }
  };

  return (
    // Se añade 'relative' para contener el título centrado, y 'sm:justify-end' para apilar botones a la derecha en PC
    <header className="relative flex h-16 shrink-0 items-center justify-between border-b border-slate-200 bg-white px-4 transition-colors duration-300 dark:border-[#1E1E2E] dark:bg-[#0D0D1A] sm:justify-end md:px-6">
      
      {/* Título con centrado absoluto geométrico (50% en X e Y) activo solo en pantallas de tablet/PC */}
      <h1 className="bg-gradient-to-r from-[#7C3AED] to-[#06B6D4] bg-clip-text text-xl font-bold text-transparent sm:pointer-events-none sm:absolute sm:left-1/2 sm:top-1/2 sm:-translate-x-1/2 sm:-translate-y-1/2">
        {getTitle()}
      </h1>
      
      {/* Contenedor de la derecha */}
      <div className="flex items-center gap-3 sm:gap-5">
        <ApiStatus />
        <ThemeSwitch />
        <LanguageSelector />
      </div>
      
    </header>
  );
};