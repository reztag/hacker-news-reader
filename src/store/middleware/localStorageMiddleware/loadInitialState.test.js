import loadInitialState from './loadInitialState';
import { FEED_CACHE_KEY, FEED_CACHE_TTL_MS } from './feedCache';

describe('loadInitialState', () => {
  beforeEach(() => {
    localStorage.clear();
  });

  it('hydrates a fresh feed cache into the initial story state', () => {
    const cachedFeed = {
      storyIds: [1, 2],
      stories: [{ id: 1, title: 'Cached story' }],
      page: 1,
      fetchedAt: Date.now(),
    };

    localStorage.setItem(FEED_CACHE_KEY, JSON.stringify(cachedFeed));

    expect(loadInitialState()).toEqual({
      story: {
        storyIds: [1, 2],
        stories: [{ id: 1, title: 'Cached story' }],
        page: 1,
        isFetching: false,
        error: '',
        pageError: '',
        lastFetchedAt: cachedFeed.fetchedAt,
        hasFreshCache: true,
      },
    });
  });

  it('hydrates an expired feed cache so stale content remains available offline', () => {
    const fetchedAt = Date.now() - FEED_CACHE_TTL_MS - 1;

    localStorage.setItem(
      FEED_CACHE_KEY,
      JSON.stringify({
        storyIds: [1],
        stories: [{ id: 1, title: 'Expired story' }],
        page: 1,
        fetchedAt,
      }),
    );

    expect(loadInitialState()).toEqual({
      story: {
        storyIds: [1],
        stories: [{ id: 1, title: 'Expired story' }],
        page: 1,
        isFetching: false,
        error: '',
        pageError: '',
        lastFetchedAt: fetchedAt,
        hasFreshCache: false,
      },
    });
  });
});
