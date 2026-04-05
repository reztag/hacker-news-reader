import linkPreviewApi from './linkPreviewApi';

describe('linkPreviewApi', () => {
  afterEach(() => {
    vi.restoreAllMocks();
  });

  it('returns a metadata image url when the preview API resolves', async () => {
    vi.spyOn(global, 'fetch').mockResolvedValue({
      ok: true,
      json: async () => ({
        data: {
          image: {
            url: 'https://cdn.example.com/preview.png',
          },
        },
      }),
    });

    await expect(linkPreviewApi.getPreviewImage('https://example.com/article')).resolves.toBe(
      'https://cdn.example.com/preview.png',
    );
  });

  it('returns an empty string when no metadata image is available', async () => {
    vi.spyOn(global, 'fetch').mockResolvedValue({
      ok: true,
      json: async () => ({
        data: {},
      }),
    });

    await expect(linkPreviewApi.getPreviewImage('https://example.com/article-2')).resolves.toBe('');
  });
});
