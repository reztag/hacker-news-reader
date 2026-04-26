export const createCachedStoryState = cache => ({
  storyIds: cache.storyIds,
  stories: cache.stories,
  page: cache.page,
  isFetching: false,
  error: '',
  pageError: '',
  lastFetchedAt: cache.fetchedAt,
  hasFreshCache: !!cache.isFresh,
});
