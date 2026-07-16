import { describe, expect, it } from 'vitest';
import { blogPosts } from '../../data/blog-posts';
import { calculatorGuides } from '../../data/calculator-guides';
import { financialUpdates } from '../../data/financial-updates';
import { getLiveTools } from '../tools';
import { buildLlmsFullCatalog, SITE_URL } from './llms-full';

describe('llms-full content catalog', () => {
  const catalog = buildLlmsFullCatalog();

  it('includes every live calculator exactly once as a calculator heading', () => {
    for (const tool of getLiveTools()) {
      const heading = `#### [${tool.name}](${SITE_URL}/tools/${tool.slug})`;
      expect(catalog.split(heading)).toHaveLength(2);
    }
  });

  it('includes every supporting guide, article, and reviewed financial explainer', () => {
    for (const guide of calculatorGuides) {
      expect(catalog).toContain(`${SITE_URL}/guides/${guide.slug}`);
    }

    for (const post of blogPosts) {
      expect(catalog).toContain(`${SITE_URL}/blog/${post.slug}`);
    }

    for (const update of financialUpdates) {
      expect(catalog).toContain(`${SITE_URL}/financial-updates/${update.slug}`);
    }
  });

  it('states the educational boundary and links canonical discovery files', () => {
    expect(catalog).toContain('does not provide personalized financial');
    expect(catalog).toContain(`${SITE_URL}/sitemap.xml`);
    expect(catalog).toContain(`${SITE_URL}/disclaimer`);
  });

  it('normalizes legacy text encoding in source formulas and labels', () => {
    expect(catalog).not.toMatch(/Ã|âˆ|â‚|�/);
  });
});
