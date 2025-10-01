import React from 'react';
import { useTranslation } from '../i18n/context';

interface Settings {
  apiKey: string;
  baseUrl: string;
  watermark: string;
}

interface SettingsModalProps {
  isOpen: boolean;
  onClose: () => void;
  settings: Settings;
  onSettingsChange: (newSettings: Partial<Settings>) => void;
}

const SettingsModal: React.FC<SettingsModalProps> = ({ isOpen, onClose, settings, onSettingsChange }) => {
  const { t } = useTranslation();

  if (!isOpen) return null;

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    onSettingsChange({ [e.target.name]: e.target.value });
  };

  return (
    <div 
      className="fixed inset-0 z-50 bg-black/80 backdrop-blur-sm flex items-center justify-center p-4 animate-fade-in-fast"
      onClick={onClose}
    >
      <div 
        className="relative w-full max-w-md bg-[var(--bg-card)] rounded-xl border border-[var(--border-primary)] shadow-2xl p-6"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-xl font-semibold text-[var(--accent-primary)]">{t('settings.title')}</h2>
          <button onClick={onClose} className="p-1 rounded-full text-[var(--text-secondary)] hover:bg-[rgba(107,114,128,0.2)] hover:text-[var(--text-primary)] transition-colors">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor"><path fillRule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clipRule="evenodd" /></svg>
          </button>
        </div>
        
        <div className="space-y-6">
          <div>
            <label htmlFor="apiKey" className="block text-sm font-medium text-[var(--text-primary)] mb-1">{t('settings.apiKey.label')}</label>
            <input
              type="password"
              id="apiKey"
              name="apiKey"
              value={settings.apiKey}
              onChange={handleInputChange}
              placeholder={t('settings.apiKey.placeholder')}
              className="w-full p-2 bg-[var(--bg-secondary)] border border-[var(--border-primary)] rounded-lg focus:ring-2 focus:ring-[var(--accent-primary)] focus:border-[var(--accent-primary)] transition-colors placeholder-[var(--text-tertiary)]"
            />
             <p className="text-xs text-[var(--text-tertiary)] mt-1">{t('settings.apiKey.description')}</p>
          </div>
          <div>
            <label htmlFor="baseUrl" className="block text-sm font-medium text-[var(--text-primary)] mb-1">{t('settings.baseUrl.label')}</label>
            <input
              type="text"
              id="baseUrl"
              name="baseUrl"
              value={settings.baseUrl}
              onChange={handleInputChange}
              placeholder={t('settings.baseUrl.placeholder')}
              className="w-full p-2 bg-[var(--bg-secondary)] border border-[var(--border-primary)] rounded-lg focus:ring-2 focus:ring-[var(--accent-primary)] focus:border-[var(--accent-primary)] transition-colors placeholder-[var(--text-tertiary)]"
            />
             <p className="text-xs text-[var(--text-tertiary)] mt-1">{t('settings.baseUrl.description')}</p>
          </div>
          <div>
            <label htmlFor="watermark" className="block text-sm font-medium text-[var(--text-primary)] mb-1">{t('settings.watermark.label')}</label>
            <input
              type="text"
              id="watermark"
              name="watermark"
              value={settings.watermark}
              onChange={handleInputChange}
              placeholder={t('settings.watermark.placeholder')}
              className="w-full p-2 bg-[var(--bg-secondary)] border border-[var(--border-primary)] rounded-lg focus:ring-2 focus:ring-[var(--accent-primary)] focus:border-[var(--accent-primary)] transition-colors placeholder-[var(--text-tertiary)]"
            />
            <p className="text-xs text-[var(--text-tertiary)] mt-1">{t('settings.watermark.description')}</p>
          </div>
        </div>
        
        <div className="mt-8 text-center">
            <button
                onClick={onClose}
                className="py-2 px-6 bg-gradient-to-r from-[var(--accent-primary)] to-[var(--accent-secondary)] text-[var(--text-on-accent)] font-semibold rounded-lg shadow-lg shadow-[var(--accent-shadow)] hover:from-[var(--accent-primary-hover)] hover:to-[var(--accent-secondary-hover)] transition-all duration-200"
            >
                {t('settings.close')}
            </button>
        </div>

      </div>
    </div>
  );
};

export default SettingsModal;