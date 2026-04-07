import { THEME_KEY, LAYOUT_KEY } from './storageDefinitions';
import loadState from './loadState';
import { loadFeedCache } from './feedCache';
import { createCachedStoryState } from 'store/story/cacheState';

const loadInitialState = () => {
  const initialState = {};
  const layout = loadState({ storageKey: LAYOUT_KEY });
  const theme = loadState({ storageKey: THEME_KEY });
  const feedCache = loadFeedCache();

  if (layout || theme) {
    initialState.app = {};
    initialState.app.layout = layout;
    initialState.app.theme = theme;
  }

  if (feedCache) {
    initialState.story = createCachedStoryState(feedCache);
  }

  return initialState;
};

export default loadInitialState;
