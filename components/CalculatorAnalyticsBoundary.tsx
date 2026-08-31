'use client';

import type { ReactNode, SyntheticEvent } from 'react';
import { useEffect, useRef, useState } from 'react';
import { trackAnalyticsEvent } from '@/lib/analytics';

const SHARE_PARAM_PREFIX = 'rk_';

type ShareableField = HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement;

function getShareKey(field: ShareableField): string | null {
  const explicit = field.getAttribute('data-calculator-key');
  if (explicit) return explicit;
  if (field.name) return field.name;
  if (field.id?.startsWith('calculator-input-')) return field.id.slice('calculator-input-'.length);
  if (field.id) return field.id;
  return null;
}

function setNativeValue(field: ShareableField, value: string) {
  const prototype =
    field instanceof HTMLInputElement
      ? HTMLInputElement.prototype
      : field instanceof HTMLSelectElement
        ? HTMLSelectElement.prototype
        : HTMLTextAreaElement.prototype;
  const setter = Object.getOwnPropertyDescriptor(prototype, 'value')?.set;
  if (setter) setter.call(field, value);
  else field.value = value;
  field.dispatchEvent(new Event('input', { bubbles: true }));
  field.dispatchEvent(new Event('change', { bubbles: true }));
}

export default function CalculatorAnalyticsBoundary({
  toolSlug,
  toolCategory,
  children,
}: {
  toolSlug: string;
  toolCategory: string;
  children: ReactNode;
}) {
  const [hasInteracted, setHasInteracted] = useState(false);
  const [shareStatus, setShareStatus] = useState('');
  const hasTrackedResult = useRef(false);
  const rootRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!hasInteracted || hasTrackedResult.current) return;
    hasTrackedResult.current = true;
    const parameters = { tool_slug: toolSlug, tool_category: toolCategory };
    trackAnalyticsEvent('calculator_used', parameters);
    trackAnalyticsEvent('result_viewed', parameters);
  }, [hasInteracted, toolCategory, toolSlug]);

  useEffect(() => {
    const root = rootRef.current;
    if (!root || typeof window === 'undefined') return;
    const params = new URLSearchParams(window.location.search);
    if (![...params.keys()].some((key) => key.startsWith(SHARE_PARAM_PREFIX))) return;

    const fields = root.querySelectorAll<ShareableField>('input, select, textarea');
    fields.forEach((field) => {
      const key = getShareKey(field);
      if (!key) return;
      const raw = params.get(`${SHARE_PARAM_PREFIX}${key}`);
      if (raw === null) return;

      if (field instanceof HTMLInputElement && ['number', 'range'].includes(field.type)) {
        const parsed = Number(raw);
        if (!Number.isFinite(parsed)) return;
        const min = field.min === '' ? undefined : Number(field.min);
        const max = field.max === '' ? undefined : Number(field.max);
        let safe = parsed;
        if (Number.isFinite(min)) safe = Math.max(min as number, safe);
        if (Number.isFinite(max)) safe = Math.min(max as number, safe);
        setNativeValue(field, String(safe));
        return;
      }

      setNativeValue(field, raw);
    });
  }, []);

  const markUsed = () => setHasInteracted(true);
  const markButtonUse = (event: SyntheticEvent<HTMLElement>) => {
    const target = event.target;
    if (target instanceof Element && target.closest('button')) markUsed();
  };

  const buildPermalink = () => {
    const root = rootRef.current;
    if (!root || typeof window === 'undefined') return null;
    const url = new URL(window.location.href);
    url.search = '';
    url.hash = '';

    const fields = root.querySelectorAll<ShareableField>('input, select, textarea');
    fields.forEach((field) => {
      const key = getShareKey(field);
      if (!key || field.value === '') return;
      url.searchParams.set(`${SHARE_PARAM_PREFIX}${key}`, field.value);
    });
    return url.toString();
  };

  const shareResult = async () => {
    const permalink = buildPermalink();
    if (!permalink) return;
    const analyticsBase = { tool_slug: toolSlug, tool_category: toolCategory };
    const shareData = {
      title: 'RupeeKit calculator result',
      text: 'Open this RupeeKit calculator with the same input values.',
      url: permalink,
    };

    if (typeof navigator !== 'undefined' && navigator.share) {
      try {
        await navigator.share(shareData);
        trackAnalyticsEvent('result_shared', { ...analyticsBase, share_method: 'native_share' });
        setShareStatus('Share link ready.');
        return;
      } catch {
        // User cancellation or unsupported share target falls back to copying the link.
      }
    }

    try {
      await navigator.clipboard.writeText(permalink);
      trackAnalyticsEvent('result_shared', { ...analyticsBase, share_method: 'copy_link' });
      setShareStatus('Permalink copied. It restores these calculator inputs.');
    } catch {
      setShareStatus('Could not copy automatically. Use your browser address bar to copy this scenario URL.');
      window.history.replaceState({}, '', permalink);
    }
  };

  return (
    <div ref={rootRef} onChangeCapture={markUsed} onInputCapture={markUsed} onClickCapture={markButtonUse}>
      {children}
      <div className="mt-6 rounded-2xl border border-slate-200 bg-slate-50 p-4">
        <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <p className="text-sm font-semibold text-slate-900">Share this calculator scenario</p>
            <p className="mt-1 text-xs leading-5 text-slate-600">
              Copy a permalink that restores the current inputs. Shared parameter URLs are kept out of search indexing and canonicalize to the base calculator.
            </p>
          </div>
          <button
            type="button"
            onClick={shareResult}
            className="rounded-xl border border-brandNavy bg-white px-4 py-2 text-sm font-semibold text-brandNavy transition hover:bg-slate-100 focus:outline-none focus:ring-4 focus:ring-brandNavy/20"
          >
            Share result link
          </button>
        </div>
        {shareStatus ? <p className="mt-3 text-xs font-medium text-slate-700" role="status">{shareStatus}</p> : null}
        <p className="mt-2 text-[11px] leading-4 text-slate-500">
          The link contains only the values you explicitly entered. RupeeKit does not send those values as analytics event parameters.
        </p>
      </div>
    </div>
  );
}
