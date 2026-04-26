const PREVIEW_CACHE_KEY = '@@hackerNewsReader/storage/previewCache';
const PREVIEW_CACHE_TTL_MS = 60 * 60 * 1000;
const inFlightPreviewRequests = new Map();

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

    const normalizedPreviewUrl = normalizePreviewImageUrl(absoluteUrl);

    if (normalizedPreviewUrl) {
      return normalizedPreviewUrl;
    }
  }

  const firstImage = document.querySelector('article img, main img, img')?.getAttribute('src');
  return normalizePreviewImageUrl(getAbsoluteUrl({ value: firstImage, baseUrl: url }));
};

const isExtensionRuntimeAvailable = () =>
  typeof chrome !== 'undefined' &&
  !!chrome.runtime &&
  typeof chrome.runtime.sendMessage === 'function' &&
  chrome.runtime.id;

const hasLocalStorage = () => {
  try {
    return typeof window !== 'undefined' && !!window.localStorage;
  } catch {
    return false;
  }
};

const normalizePreviewImageUrl = url => {
  if (!url) {
    return '';
  }

  try {
    const normalizedUrl = new URL(url);

    if (normalizedUrl.protocol === 'http:') {
      normalizedUrl.protocol = 'https:';
    }

    if (normalizedUrl.protocol === 'https:' || normalizedUrl.protocol === 'data:') {
      return normalizedUrl.toString();
    }

    return '';
  } catch {
    return '';
  }
};

const loadPreviewCache = () => {
  if (!hasLocalStorage()) {
    return {};
  }

  try {
    return JSON.parse(localStorage.getItem(PREVIEW_CACHE_KEY) || '{}');
  } catch {
    return {};
  }
};

const savePreviewCache = cache => {
  if (!hasLocalStorage()) {
    return;
  }

  try {
    localStorage.setItem(PREVIEW_CACHE_KEY, JSON.stringify(cache));
  } catch {
    // Ignore write errors.
  }
};

const getCachedPreviewEntry = (url, now = Date.now()) => {
  const previewCache = loadPreviewCache();
  const cachedEntry = previewCache[url];

  if (!cachedEntry) {
    return null;
  }

  if (typeof cachedEntry.fetchedAt !== 'number') {
    delete previewCache[url];
    savePreviewCache(previewCache);
    return null;
  }

  const imageUrl = normalizePreviewImageUrl(cachedEntry.imageUrl);

  if (cachedEntry.imageUrl && !imageUrl) {
    delete previewCache[url];
    savePreviewCache(previewCache);
    return null;
  }

  if (cachedEntry.imageUrl !== imageUrl) {
    previewCache[url] = {
      ...cachedEntry,
      imageUrl,
    };
    savePreviewCache(previewCache);
  }

  return {
    ...cachedEntry,
    imageUrl,
    isFresh: now - cachedEntry.fetchedAt < PREVIEW_CACHE_TTL_MS,
  };
};

const cachePreviewEntry = (url, imageUrl, now = Date.now()) => {
  const previewCache = loadPreviewCache();
  previewCache[url] = {
    imageUrl: normalizePreviewImageUrl(imageUrl),
    fetchedAt: now,
  };
  savePreviewCache(previewCache);
};

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

const refreshPreviewImage = url => {
  if (!inFlightPreviewRequests.has(url)) {
    const previewRequest = fetchPreviewHtml(url)
      .then(html => parsePreviewImage({ html, url }))
      .catch(() => '')
      .then(imageUrl => {
        cachePreviewEntry(url, imageUrl);
        return imageUrl;
      })
      .finally(() => {
        inFlightPreviewRequests.delete(url);
      });

    inFlightPreviewRequests.set(url, previewRequest);
  }

  return inFlightPreviewRequests.get(url);
};

const getPreviewImage = async url => {
  if (!url) {
    return '';
  }

  const cachedEntry = getCachedPreviewEntry(url);

  if (cachedEntry) {
    if (!cachedEntry.isFresh) {
      refreshPreviewImage(url);
    }

    return cachedEntry.imageUrl || '';
  }

  return refreshPreviewImage(url);
};

export const __resetPreviewCacheForTests = () => {
  inFlightPreviewRequests.clear();

  if (hasLocalStorage()) {
    localStorage.removeItem(PREVIEW_CACHE_KEY);
  }
};

export default {
  getPreviewImage,
};
