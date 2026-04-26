import { createSelector } from 'reselect';

const storyIdsSelector = state => state.story.storyIds;
const storiesSelector = state => state.story.stories;
const errorSelector = state => state.story.error;
const pageErrorSelector = state => state.story.pageError;
const isFetchingSelector = state => state.story.isFetching;
const lastFetchedAtSelector = state => state.story.lastFetchedAt;
const hasFreshCacheSelector = state => state.story.hasFreshCache;

export const hasMoreStoriesSelector = createSelector(
  storyIdsSelector,
  storiesSelector,
  (storyIds, stories) => storyIds.length > stories.length,
);

export const storyStatusSelector = createSelector(
  storiesSelector,
  isFetchingSelector,
  errorSelector,
  pageErrorSelector,
  lastFetchedAtSelector,
  hasFreshCacheSelector,
  (stories, isFetching, error, pageError, lastFetchedAt, hasFreshCache) => ({
    hasStories: stories.length > 0,
    isFetching,
    error,
    pageError,
    lastFetchedAt,
    hasFreshCache,
  }),
);
