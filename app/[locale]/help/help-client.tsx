"use client";

import { useTranslations } from 'next-intl';
import Link from "next/link";

export function HelpPageClient() {
  const t = useTranslations('help');

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100 dark:from-slate-900 dark:to-slate-800">
      <div className="container mx-auto px-4 py-8 max-w-4xl">
        <div className="mb-8">
          <Link
            href="/"
            className="inline-flex items-center gap-2 text-blue-600 hover:text-blue-700 dark:text-blue-400 dark:hover:text-blue-300"
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
            </svg>
            {t('backToTool')}
          </Link>
        </div>

        <h1 className="text-4xl font-bold mb-8 bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
          {t('title')}
        </h1>

        <div className="space-y-8">
          {/* Section 1: Getting Started */}
          <section className="bg-white dark:bg-slate-800 rounded-xl shadow-lg p-6">
            <h2 className="text-2xl font-bold text-slate-800 dark:text-slate-100 mb-4">
              🚀 {t('gettingStarted')}
            </h2>
            <div className="prose dark:prose-invert max-w-none">
              <p className="text-slate-600 dark:text-slate-300 mb-4">
                {t('intro')}
              </p>

              <h3 className="text-lg font-semibold text-slate-800 dark:text-slate-100 mb-2">{t('howToUse')}</h3>
              <ol className="list-decimal list-inside space-y-2 text-slate-600 dark:text-slate-300">
                <li>{t('step1')}</li>
                <li>{t('step2')}</li>
                <li>{t('step3')}</li>
                <li>{t('step4')}</li>
                <li>{t('step5')}</li>
              </ol>
            </div>
          </section>

          {/* Section 2: URL Requirements */}
          <section className="bg-white dark:bg-slate-800 rounded-xl shadow-lg p-6">
            <h2 className="text-2xl font-bold text-slate-800 dark:text-slate-100 mb-4">
              🔗 {t('urlRequirements')}
            </h2>
            <div className="space-y-3 text-slate-600 dark:text-slate-300">
              <p><strong>{t('supportedProtocols')}</strong></p>
              <ul className="list-disc list-inside space-y-1 ml-4">
                <li><code>https://</code> - {t('https')}</li>
                <li><code>http://</code> - {t('http')}</li>
              </ul>

              <p className="mt-4"><strong>{t('tips')}</strong></p>
              <ul className="list-disc list-inside space-y-1 ml-4">
                <li>{t('tip1')}</li>
                <li>{t('tip2')}</li>
                <li>{t('tip3')}</li>
              </ul>
            </div>
          </section>

          {/* Section 3: Images Not Showing */}
          <section className="bg-white dark:bg-slate-800 rounded-xl shadow-lg p-6">
            <h2 className="text-2xl font-bold text-slate-800 dark:text-slate-100 mb-4">
              🖼️ {t('imagesNotShowing')}
            </h2>
            <div className="space-y-3 text-slate-600 dark:text-slate-300">
              <p>{t('imagesExplanation')}</p>

              <div className="bg-yellow-50 dark:bg-yellow-900/20 border-l-4 border-yellow-400 p-4 rounded">
                <p className="font-semibold mb-2">{t('corsRestrictions')}</p>
                <p className="text-sm">
                  {t('corsExplanation')}
                </p>
              </div>

              <div className="bg-blue-50 dark:bg-blue-900/20 border-l-4 border-blue-400 p-4 rounded">
                <p className="font-semibold mb-2">{t('solutions')}</p>
                <ul className="list-disc list-inside space-y-1 text-sm">
                  <li>{t('solution1')}</li>
                  <li>{t('solution2')}</li>
                  <li>{t('solution3')}</li>
                  <li>{t('solution4')}</li>
                </ul>
              </div>

              <div className="bg-green-50 dark:bg-green-900/20 border-l-4 border-green-400 p-4 rounded">
                <p className="font-semibold mb-2">{t('bestPractices')}</p>
                <ul className="list-disc list-inside space-y-1 text-sm">
                  <li>{t('practice1')}</li>
                  <li>{t('practice2')}</li>
                  <li>{t('practice3')}</li>
                  <li>{t('practice4')}</li>
                </ul>
              </div>
            </div>
          </section>

          {/* Section 4: Meta Tags Best Practices */}
          <section className="bg-white dark:bg-slate-800 rounded-xl shadow-lg p-6">
            <h2 className="text-2xl font-bold text-slate-800 dark:text-slate-100 mb-4">
              ✅ {t('metaTagsBestPractices')}
            </h2>
            <div className="space-y-4 text-slate-600 dark:text-slate-300">
              <div>
                <h3 className="font-semibold text-slate-800 dark:text-slate-100 mb-2">{t('titleTag')}</h3>
                <ul className="list-disc list-inside space-y-1 text-sm">
                  <li>{t('titleTip1')}</li>
                  <li>{t('titleTip2')}</li>
                  <li>{t('titleTip3')}</li>
                </ul>
              </div>

              <div>
                <h3 className="font-semibold text-slate-800 dark:text-slate-100 mb-2">{t('descriptionTag')}</h3>
                <ul className="list-disc list-inside space-y-1 text-sm">
                  <li>{t('descTip1')}</li>
                  <li>{t('descTip2')}</li>
                  <li>{t('descTip3')}</li>
                </ul>
              </div>

              <div>
                <h3 className="font-semibold text-slate-800 dark:text-slate-100 mb-2">{t('ogImage')}</h3>
                <ul className="list-disc list-inside space-y-1 text-sm">
                  <li>{t('ogTip1')}</li>
                  <li>{t('ogTip2')}</li>
                  <li>{t('ogTip3')}</li>
                  <li>{t('ogTip4')}</li>
                </ul>
              </div>
            </div>
          </section>

          {/* Section 5: Export PNG */}
          <section className="bg-white dark:bg-slate-800 rounded-xl shadow-lg p-6">
            <h2 className="text-2xl font-bold text-slate-800 dark:text-slate-100 mb-4">
              📥 {t('exportingPng')}
            </h2>
            <div className="space-y-3 text-slate-600 dark:text-slate-300">
              <p>
                {t('exportIntro')}
              </p>
              <ul className="list-disc list-inside space-y-1 ml-4">
                <li>{t('exportUse1')}</li>
                <li>{t('exportUse2')}</li>
                <li>{t('exportUse3')}</li>
              </ul>

              <div className="bg-orange-50 dark:bg-orange-900/20 border-l-4 border-orange-400 p-4 rounded mt-4">
                <p className="font-semibold mb-2">{t('knownLimitations')}</p>
                <ul className="list-disc list-inside space-y-1 text-sm">
                  <li>{t('limitation1')}</li>
                  <li>{t('limitation2')}</li>
                  <li>{t('limitation3')}</li>
                </ul>
              </div>
            </div>
          </section>

          {/* Section 6: Pricing */}
          <section className="bg-white dark:bg-slate-800 rounded-xl shadow-lg p-6">
            <h2 className="text-2xl font-bold text-slate-800 dark:text-slate-100 mb-4">
              💰 {t('pricing')}
            </h2>
            <div className="space-y-4">
              <div className="border-l-4 border-blue-500 pl-4">
                <h3 className="font-semibold text-slate-800 dark:text-slate-100">{t('freePlan')}</h3>
                <ul className="list-disc list-inside space-y-1 text-sm text-slate-600 dark:text-slate-300">
                  <li>{t('free1')}</li>
                  <li>{t('free2')}</li>
                  <li>{t('free3')}</li>
                  <li>{t('free4')}</li>
                  <li>{t('free5')}</li>
                </ul>
              </div>

              <div className="border-l-4 border-purple-500 pl-4">
                <h3 className="font-semibold text-slate-800 dark:text-slate-100">{t('proPlan')}</h3>
                <ul className="list-disc list-inside space-y-1 text-sm text-slate-600 dark:text-slate-300">
                  <li>{t('pro1')}</li>
                  <li>{t('pro2')}</li>
                  <li>{t('pro3')}</li>
                  <li>{t('pro4')}</li>
                </ul>
              </div>
            </div>
          </section>

          {/* Section 7: FAQ */}
          <section className="bg-white dark:bg-slate-800 rounded-xl shadow-lg p-6">
            <h2 className="text-2xl font-bold text-slate-800 dark:text-slate-100 mb-4">
              ❓ {t('faq')}
            </h2>
            <div className="space-y-4 text-slate-600 dark:text-slate-300">
              <div>
                <h3 className="font-semibold text-slate-800 dark:text-slate-100 mb-1">
                  {t('faq1q')}
                </h3>
                <p className="text-sm">
                  {t('faq1a')}
                </p>
              </div>

              <div>
                <h3 className="font-semibold text-slate-800 dark:text-slate-100 mb-1">
                  {t('faq2q')}
                </h3>
                <p className="text-sm">
                  {t('faq2a')}
                </p>
              </div>

              <div>
                <h3 className="font-semibold text-slate-800 dark:text-slate-100 mb-1">
                  {t('faq3q')}
                </h3>
                <p className="text-sm">
                  {t('faq3a')}
                </p>
              </div>

              <div>
                <h3 className="font-semibold text-slate-800 dark:text-slate-100 mb-1">
                  {t('faq4q')}
                </h3>
                <p className="text-sm">
                  {t('faq4a')}
                </p>
              </div>
            </div>
          </section>

          {/* Contact */}
          <section className="bg-gradient-to-r from-blue-600 to-purple-600 rounded-xl shadow-lg p-6 text-white">
            <h2 className="text-2xl font-bold mb-4">
              💬 {t('needMoreHelp')}
            </h2>
            <p className="mb-4">
              {t('needMoreHelpDesc')}
            </p>
            <div className="flex flex-wrap gap-4">
              <a
                href="https://github.com/flaviogrillo1/metatags-preview/issues"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-4 py-2 bg-white/20 hover:bg-white/30 rounded-lg transition-colors"
              >
                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/>
                </svg>
                {t('githubIssues')}
              </a>
              <Link
                href="/"
                className="inline-flex items-center gap-2 px-4 py-2 bg-white/20 hover:bg-white/30 rounded-lg transition-colors"
              >
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
                </svg>
                {t('backToTool')}
              </Link>
            </div>
          </section>
        </div>
      </div>
    </div>
  );
}
