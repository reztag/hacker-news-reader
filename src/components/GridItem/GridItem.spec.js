import React from 'react';
import { fireEvent, render, screen, waitFor } from '@testing-library/react';
import GridItem from './index';
import linkPreviewApi from 'services/linkPreviewApi';

vi.mock('services/linkPreviewApi', () => ({
  default: {
    getPreviewImage: vi.fn(),
  },
}));

const FALLBACK_THUMBNAIL = `${import.meta.env.BASE_URL}fallback-thumbnail.png`;
const X_THUMBNAIL = `${import.meta.env.BASE_URL}x-thumbnail.png`;

describe('GridItem', () => {
  beforeEach(() => {
    linkPreviewApi.getPreviewImage.mockReset();
    linkPreviewApi.getPreviewImage.mockResolvedValue('');
  });

  it('uses the default fallback for non-X links', () => {
    render(
      React.createElement(GridItem, {
        url: 'https://example.com/story',
        title: 'Example story',
        id: 18276862,
      }),
    );

    expect(screen.getByAltText('example.com thumbnail')).toHaveAttribute(
      'src',
      expect.stringContaining(FALLBACK_THUMBNAIL),
    );
    expect(linkPreviewApi.getPreviewImage).toHaveBeenCalledWith('https://example.com/story');
  });

  it.each([
    'https://x.com/openai/status/123',
    'https://twitter.com/openai/status/123',
  ])('uses the X thumbnail for %s links', url => {
    render(React.createElement(GridItem, { url, title: 'Example story', id: 18276862 }));

    expect(screen.getByRole('img')).toHaveAttribute(
      'src',
      expect.stringContaining(X_THUMBNAIL),
    );
    expect(linkPreviewApi.getPreviewImage).not.toHaveBeenCalled();
  });

  it('keeps the X thumbnail even if a load error fires', async () => {
    render(
      React.createElement(GridItem, {
        url: 'https://x.com/openai/status/123',
        title: 'Example story',
        id: 18276862,
      }),
    );

    const image = screen.getByAltText('x.com thumbnail');

    fireEvent.error(image);

    await waitFor(() => {
      expect(image).toHaveAttribute('src', expect.stringContaining(X_THUMBNAIL));
    });
    expect(linkPreviewApi.getPreviewImage).not.toHaveBeenCalled();
  });
});
