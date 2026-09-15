import React from 'react';
import { Menu } from 'lucide-react';
import { LanguageTypographyConfig, ScaleStepKey } from '../../types/typography';
import {
  getAllScaleSteps,
  calculatePxSize,
  calculateStepWeight,
  calculateStepLineHeight,
  calculateStepTracking
} from '../../utils/cssGenerator';
import { buildFontVariationSettings } from '../../utils/fontLoader';

interface SimulationLandingProps {
  config: LanguageTypographyConfig;
  base: number;
  ratio: number;
  isRtl?: boolean;
}

export const SimulationLanding: React.FC<SimulationLandingProps> = ({
  config,
  base,
  ratio,
  isRtl = false
}) => {
  const variationSettings = buildFontVariationSettings(config.variableAxesValues);

  // Helper to compute inline style for any step
const getStepStyle = (stepKey: ScaleStepKey | string, isHeading = false): React.CSSProperties => {
    const steps = getAllScaleSteps(config);
    // Find exact match by name, then tag, then fallback
    let step = steps.find(s => s.name === stepKey);
    if (!step) {
      if (isHeading) {
        // Fallback to lowest heading if H5/H4 not found
        step = steps.filter(s => s.power > 0).pop();
      } else {
        // Fallback to small/xsmall or base
        step = steps.find(s => s.power < 0) || steps.find(s => s.power === 0);
      }
    }
    // Ultimate fallback
    if (!step) {
      step = steps.find(s => s.power === 0) || steps[0];
    }
    
    if (!step) return {}; // Should never happen
    
    const px = calculatePxSize(base, ratio, step.power);
    const weight = calculateStepWeight(step.name, step.power, config);
    const lh = calculateStepLineHeight(step.name, step.power, config);
    const tracking = calculateStepTracking(step.name, step.power, config);
    const decor = config.decorActive ? (config.decorations as any)[step.name] : null;

    return {
      fontFamily: isHeading ? `"${config.fontHeading}", sans-serif` : `"${config.fontBody}", sans-serif`,
      fontSize: `${px}px`,
      lineHeight: lh,
      letterSpacing: `${tracking}em`,
      fontWeight: weight,
      textTransform: decor?.transform ?? 'none',
      textDecoration: decor?.decoration ?? 'none',
      fontVariationSettings: variationSettings !== 'normal' ? variationSettings : undefined
    };
  };

  const copy = isRtl
    ? {
        brand: 'سیستم‌ساز تایپوگرافی',
        nav1: 'مستندات',
        nav2: 'توکن‌ها',
        nav3: 'ورود',
        badge: 'نسخه ۲.۰ — مدولار و واکنش‌گرا',
        h1: 'هماهنگی و نظم ساختاری در تایپوگرافی وب مدرن',
        h2Section: 'اصول و مقیاس‌های سیستم تایپ',
        subtitle: 'محاسبه دقیق نسبت‌های ریاضی، ریتم عمودی و تراز دوجهته برای سیستم‌های طراحی مقیاس‌پذیر.',
        ctaPrimary: 'شروع کار با مقیاس',
        ctaSecondary: 'مشاهده راهنما',
        feature1Title: 'مقیاس‌های پویا و مدولار',
        feature1Sub: 'پایه ریاضیاتی',
        feature1Body: 'تنظیم دقیق گام‌های فونت با استفاده از توابع کلمپ سی‌اس‌اس و نسبت‌های فاصله‌ای برای تمامی نمایشگرها.',
        feature1Meta: 'پشتیبانی از ۱۲ مقیاس استاندارد',
        feature2Title: 'سازگاری کامل با زبان‌ها',
        feature2Sub: 'تراز دوجهته',
        feature2Body: 'تراز ساختاری متوازن و هماهنگ برای خطوط راست‌به‌چپ (فارسی و عربی) در کنار خطوط لاتین.',
        feature2Meta: 'پشتیبانی یکپارچه از LTR و RTL',
        articleOverline: 'راهنمای معماری سیستم',
        articleTitle: 'طراحی مقیاس تایپوگرافی پایدار در رابط‌های کاربری',
        articleBody: 'یک سیستم تایپوگرافی کارآمد با تعریف روابط پایدار میان اندازه قلم، ارتفاع خط و فواصل ساختاری، درک سلسله‌مراتب محتوا را برای کاربران تسهیل می‌کند.',
        articleMeta: 'مقاله تحلیلی • ۴ دقیقه مطالعه',
        statsH2: 'آمار ساختار تایپ',
        stat1Num: '۸ سطح',
        stat1Label: 'سلسله‌مراتب ساختاریافته از H1 تا Small',
        stat2Num: '۱۰۰٪ تک‌رنگ',
        stat2Label: 'طراحی خنثی جهت تمرکز کامل بر فرم حروف'
      }
    : {
        brand: 'Type System Generator',
        nav1: 'Documentation',
        nav2: 'Tokens',
        nav3: 'Sign In',
        badge: 'v2.0 — Fluid & Responsive',
        h1: 'Harmonic Hierarchy for Modern Interface Systems',
        h2Section: 'Core Typographic Principles',
        subtitle: 'Engineered for design systems, fluid responsive viewports, and multi-language structural alignment.',
        ctaPrimary: 'Get Started with Scale',
        ctaSecondary: 'Explore Guidelines',
        feature1Title: 'Fluid Modular Scale',
        feature1Sub: 'Mathematical Foundation',
        feature1Body: 'Calculate type intervals using responsive viewport clamps from mobile 375px to desktop 1440px.',
        feature1Meta: '12 Predefined Musical Intervals',
        feature2Title: 'Bi-Directional Support',
        feature2Sub: 'Global Localization',
        feature2Body: 'Seamless visual balance and line-height calibration across both LTR and RTL scripts.',
        feature2Meta: 'Full LTR & RTL Cohesion',
        articleOverline: 'Design System Architecture',
        articleTitle: 'Establishing Predictable Typographic Rhythm',
        articleBody: 'A deliberate typographic scale establishes consistent spatial relationships, eliminating arbitrary font sizes and reinforcing clear visual scannability.',
        articleMeta: 'Architecture Guide • 4 min read',
        statsH2: 'System Specifications',
        stat1Num: '8 Levels',
        stat1Label: 'Strictly budgeted steps from H1 through Small',
        stat2Num: '100% Monochrome',
        stat2Label: 'High-contrast neutral palette for optical purity'
      };

  return (
    <div
      dir={isRtl ? 'rtl' : 'ltr'}
      className="w-full max-w-3xl mx-auto flex flex-col gap-8 text-neutral-900 pb-12"
    >
      {/* 1. Header / Navigation - Responsive on mobile */}
      <nav className="w-full pb-4 border-b border-neutral-200 flex items-center justify-between gap-3">
        <div className="flex items-center gap-2.5">
          {/* Monochrome Brand Mark */}
          <div className="w-7 h-7 sm:w-6 sm:h-6 rounded bg-neutral-900 flex items-center justify-center text-white text-sm sm:text-xs font-bold shrink-0">
            T
          </div>
          <span
            style={getStepStyle('h4', true)}
            className="text-neutral-900 tracking-tight"
          >
            {copy.brand}
          </span>
        </div>

        {/* Mobile Hamburger Menu Placeholder */}
        <button className="flex sm:hidden p-2 -mr-2 text-neutral-900 rounded-md hover:bg-neutral-100 transition-colors">
          <Menu className="w-5 h-5" />
        </button>

        {/* Links & CTA (Desktop Only) */}
        <div className="hidden sm:flex items-center gap-4 flex-wrap text-neutral-600">
          <span style={getStepStyle('small')} className="hover:text-neutral-900 cursor-pointer">
            {copy.nav1}
          </span>
          <span style={getStepStyle('small')} className="hover:text-neutral-900 cursor-pointer">
            {copy.nav2}
          </span>
          <button
            style={getStepStyle('small')}
            className="px-3.5 py-1.5 rounded-lg bg-neutral-900 text-white font-medium hover:bg-neutral-800 transition-colors shrink-0"
          >
            {copy.nav3}
          </button>
        </div>
      </nav>

      {/* 2. Hero Section */}
      <section className="flex flex-col gap-4">
        {/* Eyebrow / Badge - Strictly Monochrome */}
        <div className="flex">
          <span
            style={getStepStyle('h5', true)}
            className="px-3 py-1 rounded-full bg-neutral-100 border border-neutral-200 text-neutral-800 text-xs font-medium"
          >
            {copy.badge}
          </span>
        </div>

        {/* H1 - Main Page Title */}
        <h1 style={getStepStyle('h1', true)} className="text-neutral-950">
          {copy.h1}
        </h1>

        {/* Subtitle / Paragraph */}
        <p style={getStepStyle('base')} className="text-neutral-600 max-w-2xl">
          {copy.subtitle}
        </p>

        {/* Monochrome Hero Actions */}
        <div className="flex flex-wrap items-center gap-3 pt-2">
          <button
            style={getStepStyle('base')}
            className="px-5 py-2.5 rounded-xl bg-neutral-950 text-white font-medium hover:bg-neutral-800 transition-colors shadow-sm"
          >
            {copy.ctaPrimary}
          </button>
          <button
            style={getStepStyle('base')}
            className="px-5 py-2.5 rounded-xl bg-neutral-100 border border-neutral-200 text-neutral-800 font-medium hover:bg-neutral-200 transition-colors"
          >
            {copy.ctaSecondary}
          </button>
        </div>

        {/* Monochrome Hero Wireframe Image (16:9) */}
        <div className="w-full aspect-video rounded-xl bg-neutral-50 border border-dashed border-neutral-300 flex flex-col items-center justify-center p-6 text-neutral-400 mt-2">
          <div className="w-10 h-10 rounded-lg bg-neutral-200 flex items-center justify-center mb-2 text-neutral-500">
            <span className="text-sm font-mono">16:9</span>
          </div>
          <span style={getStepStyle('small')}>Wireframe Asset Placeholder</span>
        </div>
      </section>

      {/* 3. Section: Core Features - Responsive Grid (Single column on mobile, 2 columns on desktop) */}
      <section className="flex flex-col gap-4 pt-4 border-t border-neutral-200">
        <h2 style={getStepStyle('h2', true)} className="text-neutral-900">
          {copy.h2Section}
        </h2>

        {/* Container is flex column */}
        <div className="flex flex-col gap-4">
          {/* Card 1 */}
          <div className="p-5 rounded-xl bg-neutral-50 border border-neutral-200 flex flex-col gap-2">
            <span
              style={getStepStyle('h5', true)}
              className="text-neutral-500 uppercase tracking-wider"
            >
              {copy.feature1Sub}
            </span>
            <h3 style={getStepStyle('h3', true)} className="text-neutral-900">
              {copy.feature1Title}
            </h3>
            <p style={getStepStyle('base')} className="text-neutral-600">
              {copy.feature1Body}
            </p>
            <span
              style={getStepStyle('small')}
              className="text-neutral-400 mt-auto pt-2 border-t border-neutral-200/60"
            >
              {copy.feature1Meta}
            </span>
          </div>

          {/* Card 2 */}
          <div className="p-5 rounded-xl bg-neutral-50 border border-neutral-200 flex flex-col gap-2">
            <span
              style={getStepStyle('h5', true)}
              className="text-neutral-500 uppercase tracking-wider"
            >
              {copy.feature2Sub}
            </span>
            <h3 style={getStepStyle('h3', true)} className="text-neutral-900">
              {copy.feature2Title}
            </h3>
            <p style={getStepStyle('base')} className="text-neutral-600">
              {copy.feature2Body}
            </p>
            <span
              style={getStepStyle('small')}
              className="text-neutral-400 mt-auto pt-2 border-t border-neutral-200/60"
            >
              {copy.feature2Meta}
            </span>
          </div>
        </div>
      </section>

      {/* 4. Section: Article Callout Card */}
      <section className="p-6 rounded-xl bg-neutral-50 border border-neutral-200 flex flex-col gap-2">
        <span
          style={getStepStyle('h5', true)}
          className="text-neutral-500 uppercase tracking-wider"
        >
          {copy.articleOverline}
        </span>
        <h3 style={getStepStyle('h3', true)} className="text-neutral-900">
          {copy.articleTitle}
        </h3>
        <p style={getStepStyle('base')} className="text-neutral-600">
          {copy.articleBody}
        </p>
        <span style={getStepStyle('small')} className="text-neutral-400 mt-1">
          {copy.articleMeta}
        </span>
      </section>

      {/* 5. Section: System Statistics */}
      <section className="flex flex-col gap-4 pt-4 border-t border-neutral-200">
        <h2 style={getStepStyle('h2', true)} className="text-neutral-900">
          {copy.statsH2}
        </h2>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div className="p-4 rounded-xl border border-neutral-200 bg-white flex flex-col gap-1">
            <h4 style={getStepStyle('h2', true)} className="text-neutral-950 font-mono">
              {copy.stat1Num}
            </h4>
            <p style={getStepStyle('small')} className="text-neutral-500">
              {copy.stat1Label}
            </p>
          </div>

          <div className="p-4 rounded-xl border border-neutral-200 bg-white flex flex-col gap-1">
            <h4 style={getStepStyle('h2', true)} className="text-neutral-950 font-mono">
              {copy.stat2Num}
            </h4>
            <p style={getStepStyle('small')} className="text-neutral-500">
              {copy.stat2Label}
            </p>
          </div>
        </div>
      </section>
    </div>
  );
};
