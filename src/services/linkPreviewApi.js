const previewCache = new Map();

const META_SELECTORS = [
  'meta[property="og:image:secure_url"]',
  'meta[property="og:image"]',
  'meta[property="og:image:url"]',
  'meta[name="twitter:image"]',
  'meta[name="twitter:image:src"]',
  'meta[itemprop="image"]',
  'link[rel="image_src"]',
];

const getAbsoluteUrl = ({ value, baseUrl }) => {
  if (!value) {
    return '';
  }

  try {
    return new URL(value, baseUrl).toString();
  } catch {
    return '';
  }
};

const parsePreviewImage = ({ html, url }) => {
  const document = new DOMParser().parseFromString(html, 'text/html');

  for (const selector of META_SELECTORS) {
    const content = document.querySelector(selector)?.getAttribute('content');
    const absoluteUrl = getAbsoluteUrl({ value: content, baseUrl: url });

    if (absoluteUrl) {
      return absoluteUrl;
    }
  }

  const firstImage = document.querySelector('article img, main img, img')?.getAttribute('src');
  return getAbsoluteUrl({ value: firstImage, baseUrl: url });
};

const isExtensionRuntimeAvailable = () =>
  typeof chrome !== 'undefined' &&
  !!chrome.runtime &&
  typeof chrome.runtime.sendMessage === 'function' &&
  chrome.runtime.id;

const fetchPreviewHtml = url => {
  if (isExtensionRuntimeAvailable()) {
    return new Promise((resolve, reject) => {
      chrome.runtime.sendMessage({ type: 'FETCH_PREVIEW_HTML', url }, response => {
        if (chrome.runtime.lastError) {
          reject(new Error(chrome.runtime.lastError.message));
          return;
        }

        if (!response?.ok || !response.html) {
          reject(new Error(response?.error || 'Extension preview fetch failed'));
          return;
        }

        resolve(response.html);
      });
    });
  }

  return fetch(url).then(response => {
    if (!response.ok) {
      throw new Error(`Preview request failed with status ${response.status}`);
    }

    return response.text();
  });
};

const getPreviewImage = async url => {
  if (!url) {
    return '';
  }

  if (!previewCache.has(url)) {
    const previewRequest = fetchPreviewHtml(url)
      .then(html => parsePreviewImage({ html, url }))
      .catch(() => '');

    previewCache.set(url, previewRequest);
  }

  return previewCache.get(url);
};

export default {
  getPreviewImage,
};
