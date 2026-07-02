import { useEffect } from 'react';
import { SITE_NAME, SITE_URL } from '../config/site';

const DEFAULT_DESCRIPTION =
  'Let Me Smile is an NGO in Arusha, Tanzania offering inclusive education through Beamlight School and community outreach for children.';

const DEFAULT_KEYWORDS =
  'Let Me Smile, Let me Smile, letmesmile, Beamlight School, NGO Tanzania, Arusha, inclusive education, charity Tanzania';

function upsertMeta(name, content, attribute = 'name') {
  if (!content) return;

  let element = document.querySelector(`meta[${attribute}="${name}"]`);

  if (!element) {
    element = document.createElement('meta');
    element.setAttribute(attribute, name);
    document.head.appendChild(element);
  }

  element.setAttribute('content', content);
}

function upsertCanonical(href) {
  let element = document.querySelector('link[rel="canonical"]');

  if (!element) {
    element = document.createElement('link');
    element.setAttribute('rel', 'canonical');
    document.head.appendChild(element);
  }

  element.setAttribute('href', href);
}

function SiteSeo({ title, description, path = '/', keywords = DEFAULT_KEYWORDS }) {
  const pageTitle = title ? `${title} | ${SITE_NAME}` : `${SITE_NAME} — NGO | Arusha, Tanzania`;
  const pageDescription = description || DEFAULT_DESCRIPTION;
  const pageUrl = `${SITE_URL}${path === '/' ? '/' : path}`;

  useEffect(() => {
    document.title = pageTitle;
    upsertMeta('description', pageDescription);
    upsertMeta('keywords', keywords);
    upsertMeta('og:title', pageTitle, 'property');
    upsertMeta('og:description', pageDescription, 'property');
    upsertMeta('og:url', pageUrl, 'property');
    upsertMeta('twitter:title', pageTitle);
    upsertMeta('twitter:description', pageDescription);
    upsertCanonical(pageUrl);
  }, [pageTitle, pageDescription, pageUrl, keywords]);

  return null;
}

export default SiteSeo;
