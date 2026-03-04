import { useTranslation } from 'react-i18next';
import { SearchX } from 'lucide-react';

export const EmptyState = () => {
  const { t } = useTranslation();
  return (
    <div className="col-span-12 flex flex-col items-center justify-center rounded-lg border border-[#1E1E2E] bg-[#12122A] p-12 text-center">
      <SearchX size={48} className="mb-4 text-[#94A3B8]" />
      <h3 className="mb-2 text-xl font-bold text-[#F1F5F9]">{t('empty.no_anime')}</h3>
      <p className="text-[#94A3B8]">{t('empty.suggestion')}</p>
    </div>
  );
};