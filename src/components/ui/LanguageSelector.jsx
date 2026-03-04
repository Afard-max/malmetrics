import { useTranslation } from 'react-i18next';

export const LanguageSelector = () => {
  const { i18n } = useTranslation();

  return (
    <div className="flex items-center">
      <select
        value={i18n.language || 'es'}
        onChange={(e) => i18n.changeLanguage(e.target.value)}
        className="cursor-pointer rounded border border-slate-200 bg-slate-100 px-2 py-[5px] text-sm font-medium text-slate-800 transition-colors duration-300 hover:border-[#06B6D4] focus:border-[#06B6D4] focus:outline-none dark:border-[#1E1E2E] dark:bg-[#12122A] dark:text-[#F1F5F9]"
      >
        <option value="es">ES Español</option>
        <option value="en">EN English</option>
        <option value="pt">PT Português</option>
        <option value="ja">JA 日本語</option>
        <option value="zh">ZH 中文</option>
      </select>
    </div>
  );
};