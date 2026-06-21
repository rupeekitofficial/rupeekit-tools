export interface DiscoverCalculatorLink {
  label: string;
  href: string;
}

export interface DiscoverCalculatorCta extends DiscoverCalculatorLink {
  description: string;
}

export interface DiscoverReadyArticleTemplate {
  summary: string;
  whyItMatters: string;
  whoItAffects: string;
  calculatorCta: DiscoverCalculatorCta;
  sourceMethodology: string[];
  safeDisclaimer: string;
  relatedCalculatorLinks: DiscoverCalculatorLink[];
}

export function hasDiscoverReadyTemplate(
  value?: Partial<DiscoverReadyArticleTemplate> | null
): value is DiscoverReadyArticleTemplate {
  return Boolean(
    value?.summary
      && value?.whyItMatters
      && value?.whoItAffects
      && value?.calculatorCta?.label
      && value?.calculatorCta?.href
      && value?.calculatorCta?.description
      && value?.safeDisclaimer
      && Array.isArray(value?.sourceMethodology)
      && value.sourceMethodology.length > 0
      && Array.isArray(value?.relatedCalculatorLinks)
      && value.relatedCalculatorLinks.length > 0
  );
}
