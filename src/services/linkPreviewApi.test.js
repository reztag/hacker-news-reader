import linkPreviewApi, { __resetPreviewCacheForTests } from './linkPreviewApi';

describe('linkPreviewApi', () => {
  afterEach(() => {
    vi.restoreAllMocks();
    __resetPreviewCacheForTests();
  });

  it('returns a metadata image url when the preview API resolves', async () => {
    vi.spyOn(global, 'fetch').mockResolvedValue({
      ok: true,
      text: async () =>
        '<html><head><meta property="og:image" content="/preview.png"></head><body></body></html>',
    });

    await expect(linkPreviewApi.getPreviewImage('https://example.com/article')).resolves.toBe(
      'https://example.com/preview.png',
    );
  });

  it('returns an empty string when no metadata image is available', async () => {
    vi.spyOn(global, 'fetch').mockResolvedValue({
      ok: true,
      text: async () => '<html><head></head><body></body></html>',
    });

    await expect(linkPreviewApi.getPreviewImage('https://example.com/article-2')).resolves.toBe('');
  });

  it('returns an empty string when the page fetch fails', async () => {
    vi.spyOn(global, 'fetch').mockResolvedValue({
      ok: false,
      status: 403,
      text: async () => '',
    });

    await expect(linkPreviewApi.getPreviewImage('https://example.com/article-3')).resolves.toBe('');
  });

  it('upgrades insecure preview image urls to https', async () => {
    vi.spyOn(global, 'fetch').mockResolvedValue({
      ok: true,
      text: async () =>
        '<html><head><meta property="og:image" content="http://osintradar.com/img/osr-full.png"></head><body></body></html>',
    });

    await expect(linkPreviewApi.getPreviewImage('https://example.com/article-7')).resolves.toBe(
      'https://osintradar.com/img/osr-full.png',
    );
  });

  it('uses a fresh persisted preview cache without refetching', async () => {
    localStorage.setItem(
      '@@hackerNewsReader/storage/previewCache',
      JSON.stringify({
        'https://example.com/article-4': {
          imageUrl: 'https://example.com/cached.png',
          fetchedAt: Date.now(),
        },
      }),
    );

    const fetchSpy = vi.spyOn(global, 'fetch');

    await expect(linkPreviewApi.getPreviewImage('https://example.com/article-4')).resolves.toBe(
      'https://example.com/cached.png',
    );
    expect(fetchSpy).not.toHaveBeenCalled();
  });

  it('uses a persisted miss cache without refetching', async () => {
    localStorage.setItem(
      '@@hackerNewsReader/storage/previewCache',
      JSON.stringify({
        'https://example.com/article-5': {
          imageUrl: '',
          fetchedAt: Date.now(),
        },
      }),
    );

    const fetchSpy = vi.spyOn(global, 'fetch');

    await expect(linkPreviewApi.getPreviewImage('https://example.com/article-5')).resolves.toBe('');
    expect(fetchSpy).not.toHaveBeenCalled();
  });

  it('normalizes insecure cached preview image urls to https without refetching', async () => {
    localStorage.setItem(
      '@@hackerNewsReader/storage/previewCache',
      JSON.stringify({
        'https://example.com/article-6': {
          imageUrl: 'http://osintradar.com/img/osr-full.png',
          fetchedAt: Date.now(),
        },
      }),
    );

    const fetchSpy = vi.spyOn(global, 'fetch');

    await expect(linkPreviewApi.getPreviewImage('https://example.com/article-6')).resolves.toBe(
      'https://osintradar.com/img/osr-full.png',
    );
    expect(fetchSpy).not.toHaveBeenCalled();
  });

  it('returns a stale cached preview immediately and refreshes it in the background', async () => {
    localStorage.setItem(
      '@@hackerNewsReader/storage/previewCache',
      JSON.stringify({
        'https://example.com/article-8': {
          imageUrl: 'https://example.com/expired.png',
          fetchedAt: Date.now() - 60 * 60 * 1000 - 1,
        },
      }),
    );

    const fetchSpy = vi.spyOn(global, 'fetch').mockResolvedValue({
      ok: true,
      text: async () =>
        '<html><head><meta property="og:image" content="/fresh.png"></head><body></body></html>',
    });

    await expect(linkPreviewApi.getPreviewImage('https://example.com/article-8')).resolves.toBe(
      'https://example.com/expired.png',
    );

    await Promise.resolve();
    await Promise.resolve();

    expect(fetchSpy).toHaveBeenCalledTimes(1);
    expect(
      JSON.parse(localStorage.getItem('@@hackerNewsReader/storage/previewCache'))['https://example.com/article-8']
        .imageUrl,
    ).toBe('https://example.com/fresh.png');
  });
});
