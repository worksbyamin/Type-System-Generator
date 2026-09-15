import React from 'react';
import { LanguageTypographyConfig, ScaleStepKey } from '../../types/typography';
import {
  getAllScaleSteps,
  calculatePxSize,
  calculateStepWeight,
  calculateStepLineHeight,
  calculateStepTracking
} from '../../utils/cssGenerator';
import { buildFontVariationSettings } from '../../utils/fontLoader';

interface SimulationBlogProps {
  config: LanguageTypographyConfig;
  base: number;
  ratio: number;
  isRtl?: boolean;
}

export const SimulationBlog: React.FC<SimulationBlogProps> = ({
  config,
  base,
  ratio,
  isRtl = false
}) => {
  const variationSettings = buildFontVariationSettings(config.variableAxesValues);

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
        badge: 'مقاله آموزشی • ۵ دقیقه مطالعه',
        title: 'معماری مقیاس‌های پویای مدولار در سیستم‌های طراحی وب',
        subtitle: 'چگونگی برقراری نظم بصری، خوانایی پایدار و ریتم عمودی با استفاده از نسبت‌های ریاضیاتی و فاصله‌ای.',
        author: 'کارگروه طراحی تایپوگرافی',
        authorMeta: '۲۴ شهریور ۱۴۰۵ • نسخه ۲.۰',
        p1: 'تایپوگرافی شالوده ادراک و تعامل کاربران در وب است. مقیاس‌های مدولار با فرمول‌بندی هندسی اندازه‌ها، فضایی یکپارچه و پیش‌بینی‌پذیر میان عناوین و پاراگراف‌ها پدید می‌آورند.',
        h2Section1: 'چرا نسبت‌های ریاضی در تایپوگرافی حائز اهمیت هستند؟',
        p2: 'فاصله‌های هارمونیک برگرفته از نسبت‌های فاصله‌ای مانند فاصله سوم بزرگ (۱.۲۵۰) یا فاصله چهارم درست (۱.۳۳۳)، تمایز اندازه میان عناصر را طبیعی و دلپذیر می‌سازند.',
        quote: '« تایپوگرافی اصیل تنها انتخاب قلم نیست؛ بلکه مدیریت ساختارمند نسبت اندازه، ارتفاع خط و فواصل سفید پیرامون کلمات است. »',
        h2Section2: 'بهینه‌سازی ارتفاع خط برای متون طولانی',
        p3: 'تنظیم متغیر ارتفاع خط (Line Height) بسته به اندازه قلم مانع از تداخل خطوط در تیترهای بزرگ شده و راحتی خواندن پاراگراف‌های بدنه را تضمین می‌کند.',
        img1Caption: 'تصویر تحلیلی ۱: انطباق گام‌های مقیاس بر خطوط پایه',
        img2Caption: 'تصویر تحلیلی ۲: بررسی توازن بصری خطوط',
        calloutTitle: 'نکته کلیدی پیاده‌سازی',
        calloutBody: 'در خطوط راست‌به‌چپ نظیر فارسی، کشیدگی عمودی حروف (Ascender و Descender) نیازمند ۱۰ تا ۲۰ درصد ارتفاع خط بزرگ‌تر نسبت به متون لاتین است.'
      }
    : {
        brand: 'Type System Generator',
        badge: 'Typography Guide • 5 Min Read',
        title: 'Architecting Fluid Modular Scales in Digital Interface Design',
        subtitle: 'How mathematical ratios and proportional vertical rhythm establish effortless legibility across responsive viewports.',
        author: 'Design Systems & Typography Team',
        authorMeta: 'Sep 14, 2026 • Specimen v2.0',
        p1: 'Typography is the foundation of user interaction on the modern web. Modular scales provide a mathematical anchor that guarantees proportional hierarchy between headings, body text, and footnotes.',
        h2Section1: 'Why Mathematical and Musical Intervals Matter',
        p2: 'Interval ratios such as the Major Third (1.250) or Perfect Fourth (1.333) create harmonious, intentional relationships between typographic steps, avoiding arbitrary size choices.',
        quote: '"Great typography is not merely font selection; it is the calculated relationship between scale, line height, and spatial cadence."',
        h2Section2: 'Optimizing Vertical Rhythm & Leading',
        p3: 'Controlling vertical rhythm through tight leading on display headings and generous leading on body text ensures readability across various reading distances.',
        img1Caption: 'Diagram 1: Viewport clamp curve from 375px to 1440px',
        img2Caption: 'Diagram 2: Comparative line-height balance test',
        calloutTitle: 'Implementation Principle',
        calloutBody: 'Always tune your scale ratios and line heights to the optical x-height and distinctive stroke mechanics of your selected font families.'
      };

  return (
    <article
      dir={isRtl ? 'rtl' : 'ltr'}
      className="w-full max-w-2xl mx-auto flex flex-col gap-6 text-neutral-900 pb-16"
    >
      {/* 1. Article Navigation Bar - Strictly Monochrome */}
      <nav className="w-full pb-4 border-b border-neutral-200 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <div className="w-6 h-6 rounded bg-neutral-900 flex items-center justify-center text-white text-xs font-bold shrink-0">
            T
          </div>
          <span
            style={getStepStyle('h4', true)}
            className="text-neutral-900 tracking-tight"
          >
            {copy.brand}
          </span>
        </div>
        <span
          style={getStepStyle('small')}
          className="text-neutral-500 font-medium"
        >
          Editorial
        </span>
      </nav>

      {/* 2. Article Header */}
      <header className="flex flex-col gap-3">
        <div className="flex">
          <span
            style={getStepStyle('h5', true)}
            className="px-2.5 py-0.5 rounded-full bg-neutral-100 border border-neutral-200 text-neutral-700 text-xs font-medium uppercase tracking-wider"
          >
            {copy.badge}
          </span>
        </div>

        <h1 style={getStepStyle('h1', true)} className="text-neutral-950">
          {copy.title}
        </h1>

        <p style={getStepStyle('h3', true)} className="text-neutral-600 font-normal">
          {copy.subtitle}
        </p>

        {/* Author Metadata - Strictly Monochrome */}
        <div className="flex items-center gap-3 pt-3 border-t border-neutral-200">
          <div className="w-9 h-9 rounded-full bg-neutral-200 flex items-center justify-center text-neutral-600 font-semibold text-xs shrink-0">
            TS
          </div>
          <div className="flex flex-col">
            <span style={getStepStyle('base')} className="font-semibold text-neutral-900">
              {copy.author}
            </span>
            <span style={getStepStyle('small')} className="text-neutral-500">
              {copy.authorMeta}
            </span>
          </div>
        </div>
      </header>

      {/* 3. Hero Feature Wireframe Image */}
      <div className="w-full aspect-video rounded-xl bg-neutral-50 border border-dashed border-neutral-300 flex flex-col items-center justify-center p-6 text-neutral-400">
        <div className="w-10 h-10 rounded bg-neutral-200 flex items-center justify-center mb-1 text-neutral-500">
          <span className="text-xs font-mono">16:9</span>
        </div>
        <span style={getStepStyle('small')}>Hero Cover Wireframe</span>
      </div>

      {/* 4. Article Body Prose */}
      <p style={getStepStyle('base')} className="text-neutral-800">
        {copy.p1}
      </p>

      {/* H2 Section 1 */}
      <h2 style={getStepStyle('h2', true)} className="text-neutral-950 pt-2">
        {copy.h2Section1}
      </h2>

      <p style={getStepStyle('base')} className="text-neutral-800">
        {copy.p2}
      </p>

      {/* Monochrome Blockquote */}
      <blockquote className="my-2 p-5 bg-neutral-50 border-l-4 border-neutral-950 rounded-r-lg text-neutral-900">
        <p style={getStepStyle('base')} className="italic font-medium">
          {copy.quote}
        </p>
      </blockquote>

      {/* H2 Section 2 */}
      <h2 style={getStepStyle('h2', true)} className="text-neutral-950 pt-2">
        {copy.h2Section2}
      </h2>

      <p style={getStepStyle('base')} className="text-neutral-800">
        {copy.p3}
      </p>

      {/* Wireframe Diagram Grid (strictly monochrome) */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 my-2">
        <div className="p-4 rounded-xl bg-neutral-50 border border-neutral-200 flex flex-col items-center justify-center min-h-[140px] text-center">
          <div className="w-8 h-8 rounded bg-neutral-200 mb-2" />
          <span style={getStepStyle('small')} className="text-neutral-600">
            {copy.img1Caption}
          </span>
        </div>

        <div className="p-4 rounded-xl bg-neutral-50 border border-neutral-200 flex flex-col items-center justify-center min-h-[140px] text-center">
          <div className="w-8 h-8 rounded bg-neutral-200 mb-2" />
          <span style={getStepStyle('small')} className="text-neutral-600">
            {copy.img2Caption}
          </span>
        </div>
      </div>

      {/* Monochrome Callout Box */}
      <div className="p-5 rounded-xl bg-neutral-100 border border-neutral-200 flex flex-col gap-1.5 mt-2">
        <h3 style={getStepStyle('h4', true)} className="text-neutral-950">
          {copy.calloutTitle}
        </h3>
        <p style={getStepStyle('base')} className="text-neutral-700">
          {copy.calloutBody}
        </p>
      </div>
    </article>
  );
};
