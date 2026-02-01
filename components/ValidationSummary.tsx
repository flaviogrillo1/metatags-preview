"use client";

import { ValidationResult } from "@/types/meta";
import { CheckCircle, AlertTriangle, XCircle } from "lucide-react";
import { useTranslations } from 'next-intl';

interface ValidationSummaryProps {
  validation: ValidationResult;
}

export function ValidationSummary({ validation }: ValidationSummaryProps) {
  const t = useTranslations('validation');
  const { isValid, warnings, errors } = validation;

  return (
    <div className="bg-white dark:bg-slate-800 rounded-xl shadow-lg p-6">
      <h3 className="text-lg font-semibold text-slate-800 dark:text-slate-100 mb-4">
        {t('title')}
      </h3>

      {isValid && warnings.length === 0 && errors.length === 0 ? (
        <div className="flex items-center gap-3 text-green-600 dark:text-green-400">
          <CheckCircle size={20} />
          <span className="font-medium">{t('valid')}</span>
        </div>
      ) : null}

      {errors.length > 0 && (
        <div className="space-y-2 mb-4">
          <h4 className="font-medium text-red-600 dark:text-red-400 flex items-center gap-2">
            <XCircle size={18} />
            {t('errors')} ({errors.length})
          </h4>
          <ul className="space-y-1">
            {errors.map((error, index) => (
              <li key={index} className="text-sm text-red-600 dark:text-red-400 pl-6">
                • {error}
              </li>
            ))}
          </ul>
        </div>
      )}

      {warnings.length > 0 && (
        <div className="space-y-2">
          <h4 className="font-medium text-yellow-600 dark:text-yellow-400 flex items-center gap-2">
            <AlertTriangle size={18} />
            {t('warnings')} ({warnings.length})
          </h4>
          <ul className="space-y-1">
            {warnings.map((warning, index) => (
              <li key={index} className="text-sm text-yellow-600 dark:text-yellow-400 pl-6">
                • {warning}
              </li>
            ))}
          </ul>
        </div>
      )}

      <div className="mt-4 p-4 bg-slate-50 dark:bg-slate-700 rounded-lg">
        <h4 className="font-medium text-slate-700 dark:text-slate-300 mb-2">
          Best Practices
        </h4>
        <ul className="text-sm text-slate-600 dark:text-slate-400 space-y-1">
          <li>• Title: 50-60 characters optimal</li>
          <li>• Description: 150-160 characters optimal</li>
          <li>• Image: 1200x630px recommended</li>
          <li>• Image: Use high-quality, relevant images</li>
        </ul>
      </div>
    </div>
  );
}
