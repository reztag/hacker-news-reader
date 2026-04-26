import { actionTypes } from './actions';

const getInitialState = () => ({
  storyIds: [],
  stories: [],
  page: 0,
  isFetching: false,
  error: '',
  pageError: '',
  lastFetchedAt: 0,
  hasFreshCache: false,
});

const dedupeStories = stories => {
  const seenStoryIds = new Set();

  return stories.filter(story => {
    if (!story || typeof story.id !== 'number' || seenStoryIds.has(story.id)) {
      return false;
    }

    seenStoryIds.add(story.id);
    return true;
  });
};

const story = (state = getInitialState(), { type, payload }) => {
  switch (type) {
    case `${actionTypes.FETCH_STORY_IDS}_REQUEST`:
      return {
        ...state,
        isFetching: true,
        error: '',
        pageError: '',
      };
    case `${actionTypes.FETCH_STORIES}_REQUEST`:
      return {
        ...state,
        isFetching: true,
        pageError: '',
      };
    case `${actionTypes.FETCH_STORY_IDS}_SUCCESS`:
      return {
        ...state,
        storyIds: payload.storyIds,
        error: '',
      };
    case `${actionTypes.FETCH_STORIES}_SUCCESS`:
      const stories = payload.page === 0 ? payload.stories : [...state.stories, ...payload.stories];

      return {
        ...state,
        stories: dedupeStories(stories),
        page: payload.page + 1,
        isFetching: false,
        error: '',
        pageError: '',
        lastFetchedAt: payload.fetchedAt,
        hasFreshCache: true,
      };
    case `${actionTypes.FETCH_STORY_IDS}_FAILURE`:
      return {
        ...state,
        isFetching: false,
        ...(state.stories.length === 0
          ? { error: payload.message, pageError: '' }
          : { error: '', pageError: payload.message }),
      };
    case `${actionTypes.FETCH_STORIES}_FAILURE`:
      return {
        ...state,
        isFetching: false,
        hasFreshCache: false,
        ...(state.stories.length === 0
          ? { error: payload.message, pageError: '' }
          : { pageError: payload.message }),
      };
    default:
      return state;
  }
};

export default story;
