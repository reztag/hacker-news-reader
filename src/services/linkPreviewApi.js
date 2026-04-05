const PREVIEW_API_ROOT = 'https://api.microlink.io';

const previewCache = new Map();

const getPreviewImage = async url => {
  if (!url) {
    return '';
  }

  if (!previewCache.has(url)) {
    const previewRequest = fetch(
      `${PREVIEW_API_ROOT}?url=${encodeURIComponent(url)}&filter=image.url`,
    )
      .then(response => {
        if (!response.ok) {
          throw new Error(`Preview request failed with status ${response.status}`);
        }

        return response.json();
      })
      .then(payload => payload?.data?.image?.url || '')
      .catch(() => '');

    previewCache.set(url, previewRequest);
  }

  return previewCache.get(url);
};

export default {
  getPreviewImage,
};
