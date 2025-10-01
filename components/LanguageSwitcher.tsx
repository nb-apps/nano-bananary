import React from 'react';
import { useTranslation } from '../i18n/context';

const LanguageSwitcher: React.FC = () => {
  const { language, changeLanguage } = useTranslation();

  const toggleLanguage = () => {
    const newLang = language === 'en' ? 'zh' : 'en';
    changeLanguage(newLang);
  };

  return (
    <button
      onClick={toggleLanguage}
      className="w-10 h-10 flex items-center justify-center text-sm font-semibold text-[var(--text-primary)] bg-[rgba(107,114,128,0.2)] rounded-full hover:bg-[rgba(107,114,128,0.4)] transition-colors duration-200"
      aria-label="Switch language"
    >
      {language === 'en' ? '中文' : 'EN'}
    </button>
  );
};

export default LanguageSwitcher;