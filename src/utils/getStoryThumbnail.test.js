import getStoryThumbnail, { FALLBACK_THUMBNAIL } from './getStoryThumbnail';

it('builds a site thumbnail url when a story url exists', () => {
  expect(getStoryThumbnail({ url: 'https://example.com/article' })).toEqual(
    'https://www.google.com/s2/favicons?sz=256&domain_url=https%3A%2F%2Fexample.com%2Farticle',
  );
});

it('falls back to the default thumbnail when no url is available', () => {
  expect(getStoryThumbnail({})).toEqual(FALLBACK_THUMBNAIL);
});
