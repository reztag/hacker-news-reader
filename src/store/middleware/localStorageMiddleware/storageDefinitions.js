import { actionTypes } from 'store/app/actions';
import { actionTypes as storyActionTypes } from 'store/story/actions';
import { FEED_CACHE_KEY, saveFeedCache } from './feedCache';

const BASE_STORAGE_KEY = '@@hackerNewsReader/storage';
export const THEME_KEY = `${BASE_STORAGE_KEY}/theme`;
export const LAYOUT_KEY = `${BASE_STORAGE_KEY}/layout`;
export { FEED_CACHE_KEY };

const storageDefinitions = {
  [actionTypes.SET_THEME]: [
    ({ action, saveState }) => saveState({ state: action.payload.theme, storageKey: THEME_KEY }),
  ],
  [actionTypes.SET_LAYOUT]: [
    ({ action, saveState }) => saveState({ state: action.payload.layout, storageKey: LAYOUT_KEY }),
  ],
  [`${storyActionTypes.FETCH_STORIES}_SUCCESS`]: [
    ({ nextState }) => {
      saveFeedCache({
        storyIds: nextState.story.storyIds,
        stories: nextState.story.stories,
        page: nextState.story.page,
        fetchedAt: nextState.story.lastFetchedAt,
      });
    },
  ],
};

export default storageDefinitions;
