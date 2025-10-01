import React from 'react';
import { useTranslation } from '../i18n/context';

interface ErrorMessageProps {
  message: string;
}

const ErrorMessage: React.FC<ErrorMessageProps> = ({ message }) => {
  const { t } = useTranslation();
  return (
    <div className="w-full max-w-lg p-4 bg-[var(--bg-error)] border border-[var(--border-error)] text-[var(--text-error)] rounded-lg text-center" role="alert">
      <p className="font-bold">{t('error.title')}</p>
      <p className="text-sm">{message}</p>
    </div>
  );
};

export default ErrorMessage;