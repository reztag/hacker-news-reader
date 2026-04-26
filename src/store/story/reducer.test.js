import reducer from './reducer';
import { actionTypes } from './actions';

const buildStory = id => ({
  id,
  title: `Story ${id}`,
});

describe('story reducer', () => {
  it('stores the first page on the initial fetch', () => {
    const fetchedAt = Date.now();
    const state = reducer(undefined, {
      type: `${actionTypes.FETCH_STORIES}_SUCCESS`,
      payload: {
        page: 0,
        stories: [buildStory(1), buildStory(2)],
        fetchedAt,
      },
    });

    expect(state.stories).toEqual([buildStory(1), buildStory(2)]);
    expect(state.page).toBe(1);
    expect(state.lastFetchedAt).toBe(fetchedAt);
  });

  it('replaces existing stories when the feed is refreshed', () => {
    const populatedState = {
      storyIds: [1, 2, 3],
      stories: [buildStory(1), buildStory(2)],
      page: 2,
      isFetching: false,
      error: '',
      pageError: 'Old page error',
    };

    const requestState = reducer(populatedState, {
      type: `${actionTypes.FETCH_STORY_IDS}_REQUEST`,
      payload: {},
    });

    const refreshedState = reducer(requestState, {
      type: `${actionTypes.FETCH_STORY_IDS}_SUCCESS`,
      payload: {
        storyIds: [4, 5],
      },
    });

    const loadedState = reducer(refreshedState, {
      type: `${actionTypes.FETCH_STORIES}_SUCCESS`,
      payload: {
        page: 0,
        stories: [buildStory(4), buildStory(5)],
        fetchedAt: 20,
      },
    });

    expect(loadedState.stories).toEqual([buildStory(4), buildStory(5)]);
    expect(loadedState.page).toBe(1);
    expect(loadedState.pageError).toBe('');
  });

  it('appends later pages to the current feed', () => {
    const state = reducer(
      {
        storyIds: [1, 2, 3],
        stories: [buildStory(1)],
        page: 1,
        isFetching: false,
        error: '',
        pageError: '',
      },
      {
        type: `${actionTypes.FETCH_STORIES}_SUCCESS`,
        payload: {
          page: 1,
          stories: [buildStory(2), buildStory(3)],
          fetchedAt: 20,
        },
      },
    );

    expect(state.stories).toEqual([buildStory(1), buildStory(2), buildStory(3)]);
    expect(state.page).toBe(2);
  });

  it('deduplicates stories by id when pages overlap', () => {
    const state = reducer(
      {
        storyIds: [1, 2, 3],
        stories: [buildStory(1), buildStory(2)],
        page: 1,
        isFetching: false,
        error: '',
        pageError: '',
      },
      {
        type: `${actionTypes.FETCH_STORIES}_SUCCESS`,
        payload: {
          page: 1,
          stories: [buildStory(2), buildStory(3)],
          fetchedAt: 20,
        },
      },
    );

    expect(state.stories).toEqual([buildStory(1), buildStory(2), buildStory(3)]);
  });

  it('keeps cached stories visible during a feed refresh request', () => {
    const populatedState = {
      storyIds: [1, 2, 3],
      stories: [buildStory(1), buildStory(2)],
      page: 2,
      isFetching: false,
      error: '',
      pageError: 'Old page error',
      lastFetchedAt: 10,
      hasFreshCache: false,
    };

    const requestState = reducer(populatedState, {
      type: `${actionTypes.FETCH_STORY_IDS}_REQUEST`,
      payload: {},
    });

    expect(requestState.stories).toEqual(populatedState.stories);
    expect(requestState.isFetching).toBe(true);
    expect(requestState.pageError).toBe('');
  });

  it('treats a refresh failure as non-blocking when stories are already cached', () => {
    const state = reducer(
      {
        storyIds: [1],
        stories: [buildStory(1)],
        page: 1,
        isFetching: true,
        error: '',
        pageError: '',
        lastFetchedAt: 10,
        hasFreshCache: true,
      },
      {
        type: `${actionTypes.FETCH_STORY_IDS}_FAILURE`,
        payload: {
          message: 'Network unavailable',
        },
      },
    );

    expect(state.error).toBe('');
    expect(state.pageError).toBe('Network unavailable');
    expect(state.stories).toEqual([buildStory(1)]);
  });
});
