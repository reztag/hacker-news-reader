import linkPreviewApi from './linkPreviewApi';

describe('linkPreviewApi', () => {
  afterEach(() => {
    vi.restoreAllMocks();
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
});
