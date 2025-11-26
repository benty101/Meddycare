/**
 * Structured Data (Schema.org) generators for SEO
 * Helps search engines understand and display rich snippets
 */

import { Article } from '@prisma/client';

export interface OrganizationSchema {
  '@context': 'https://schema.org';
  '@type': 'Organization';
  name: string;
  description: string;
  url: string;
  logo: string;
  sameAs: string[];
  contactPoint: {
    '@type': 'ContactPoint';
    telephone: string;
    contactType: string;
    email: string;
    areaServed: string;
    availableLanguage: string;
  };
}

export interface WebsiteSchema {
  '@context': 'https://schema.org';
  '@type': 'WebSite';
  name: string;
  url: string;
  potentialAction: {
    '@type': 'SearchAction';
    target: string;
    'query-input': string;
  };
}

export interface ServiceSchema {
  '@context': 'https://schema.org';
  '@type': 'Service';
  name: string;
  description: string;
  provider: {
    '@type': 'Organization';
    name: string;
  };
  areaServed: {
    '@type': 'Country';
    name: string;
  };
  serviceType: string;
}

export interface ArticleSchema {
  '@context': 'https://schema.org';
  '@type': 'Article';
  headline: string;
  description: string;
  image: string;
  datePublished: string;
  dateModified: string;
  author: {
    '@type': 'Organization' | 'Person';
    name: string;
  };
  publisher: {
    '@type': 'Organization';
    name: string;
    logo: {
      '@type': 'ImageObject';
      url: string;
    };
  };
}

export interface BreadcrumbSchema {
  '@context': 'https://schema.org';
  '@type': 'BreadcrumbList';
  itemListElement: Array<{
    '@type': 'ListItem';
    position: number;
    name: string;
    item: string;
  }>;
}

/**
 * Generate Organization structured data
 */
export function generateOrganizationSchema(
  baseUrl: string
): OrganizationSchema {
  return {
    '@context': 'https://schema.org',
    '@type': 'Organization',
    name: 'MeddyCare',
    description:
      'MeddyCare connects families with qualified self-employed carers across the UK. Quality live-in care, dementia support, and specialized care services.',
    url: baseUrl,
    logo: `${baseUrl}/logo.png`,
    sameAs: [
      'https://www.facebook.com/meddycare',
      'https://www.twitter.com/meddycare',
      'https://www.linkedin.com/company/meddycare',
      'https://www.instagram.com/meddycare',
    ],
    contactPoint: {
      '@type': 'ContactPoint',
      telephone: '+44-118-989-9970',
      contactType: 'Customer Service',
      email: 'hello@meddycare.com',
      areaServed: 'GB',
      availableLanguage: 'English',
    },
  };
}

/**
 * Generate Website structured data
 */
export function generateWebsiteSchema(baseUrl: string): WebsiteSchema {
  return {
    '@context': 'https://schema.org',
    '@type': 'WebSite',
    name: 'MeddyCare',
    url: baseUrl,
    potentialAction: {
      '@type': 'SearchAction',
      target: `${baseUrl}/search?q={search_term_string}`,
      'query-input': 'required name=search_term_string',
    },
  };
}

/**
 * Generate Service structured data
 */
export function generateServiceSchema(
  baseUrl: string,
  serviceName: string,
  description: string
): ServiceSchema {
  return {
    '@context': 'https://schema.org',
    '@type': 'Service',
    name: serviceName,
    description: description,
    provider: {
      '@type': 'Organization',
      name: 'MeddyCare',
    },
    areaServed: {
      '@type': 'Country',
      name: 'United Kingdom',
    },
    serviceType: 'Care Services',
  };
}

/**
 * Generate Article structured data
 */
export function generateArticleSchema(
  article: Pick<
    Article,
    'title' | 'excerpt' | 'featuredImage' | 'publishedAt' | 'updatedAt' | 'author'
  >,
  baseUrl: string,
  slug: string
): ArticleSchema {
  return {
    '@context': 'https://schema.org',
    '@type': 'Article',
    headline: article.title,
    description: article.excerpt || '',
    image: article.featuredImage || `${baseUrl}/og-image.png`,
    datePublished: article.publishedAt?.toISOString() || new Date().toISOString(),
    dateModified: article.updatedAt?.toISOString() || new Date().toISOString(),
    author: {
      '@type': article.author ? 'Person' : 'Organization',
      name: article.author || 'MeddyCare Team',
    },
    publisher: {
      '@type': 'Organization',
      name: 'MeddyCare',
      logo: {
        '@type': 'ImageObject',
        url: `${baseUrl}/logo.png`,
      },
    },
  };
}

/**
 * Generate Breadcrumb structured data
 */
export function generateBreadcrumbSchema(
  items: Array<{ name: string; url: string }>
): BreadcrumbSchema {
  return {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: items.map((item, index) => ({
      '@type': 'ListItem',
      position: index + 1,
      name: item.name,
      item: item.url,
    })),
  };
}

/**
 * Helper to inject structured data into page
 */
export function renderStructuredData(
  data: Record<string, any> | Array<Record<string, any>>
): string {
  const schemaArray = Array.isArray(data) ? data : [data];
  return JSON.stringify(schemaArray.length === 1 ? schemaArray[0] : schemaArray);
}
