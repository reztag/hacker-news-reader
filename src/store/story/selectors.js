import { createSelector } from 'reselect';

const storyIdsSelector = state => state.story.storyIds;
const storiesSelector = state => state.story.stories;
const errorSelector = state => state.story.error;
const pageErrorSelector = state => state.story.pageError;
const isFetchingSelector = state => state.story.isFetching;

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
  (stories, isFetching, error, pageError) => ({
    hasStories: stories.length > 0,
    isFetching,
    error,
    pageError,
  }),
);
