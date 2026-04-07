import loadState from './loadState';
import saveState from './saveState';

export const FEED_CACHE_KEY = '@@hackerNewsReader/storage/feed';
export const FEED_CACHE_TTL_MS = 60 * 60 * 1000;

const isValidStory = story => story && typeof story.id === 'number' && typeof story.title === 'string';

export const normalizeFeedCache = cache => {
  if (!cache || typeof cache !== 'object') {
    return null;
  }

  const storyIds = Array.isArray(cache.storyIds) ? cache.storyIds.filter(id => typeof id === 'number') : [];
  const stories = Array.isArray(cache.stories) ? cache.stories.filter(isValidStory) : [];
  const page = typeof cache.page === 'number' && cache.page >= 0 ? cache.page : 0;
  const fetchedAt = typeof cache.fetchedAt === 'number' ? cache.fetchedAt : 0;

  if (!storyIds.length || !stories.length || !fetchedAt) {
    return null;
  }

  return {
    storyIds,
    stories,
    page,
    fetchedAt,
  };
};

export const isFeedCacheFresh = (cache, now = Date.now()) => {
  const normalizedCache = normalizeFeedCache(cache);

  if (!normalizedCache) {
    return false;
  }

  return now - normalizedCache.fetchedAt < FEED_CACHE_TTL_MS;
};

export const loadFeedCache = ({ now = Date.now() } = {}) => {
  const cache = normalizeFeedCache(loadState({ storageKey: FEED_CACHE_KEY }));

  if (!cache) {
    return null;
  }

  if (!isFeedCacheFresh(cache, now)) {
    saveState({ storageKey: FEED_CACHE_KEY, state: undefined });
    return null;
  }

  return cache;
};

export const saveFeedCache = ({ storyIds, stories, page, fetchedAt = Date.now() }) =>
  saveState({
    storageKey: FEED_CACHE_KEY,
    state: {
      storyIds,
      stories,
      page,
      fetchedAt,
    },
  });
