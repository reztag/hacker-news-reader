import hackerNewsApi from 'services/hackerNewsApi';
import { buildRequestCreator } from 'store/utils';

const NS = '@hackerNewsReader/story';

export const actionTypes = {
  FETCH_STORY_IDS: `${NS}/FETCH_STORY_IDS`,
  FETCH_STORIES: `${NS}/FETCH_STORIES`,
};

const actions = {
  fetchStoryIds: buildRequestCreator(actionTypes.FETCH_STORY_IDS, async ({ request, payload, dispatch }) => {
    dispatch(request.request(payload));

    try {
      const storyIds = await hackerNewsApi.getTopStoryIds();
      dispatch(request.success({ storyIds }));
      await dispatch(actions.fetchStories({ storyIds, page: 0 }));
      return storyIds;
    } catch (error) {
      return dispatch(request.failure({ message: error.message || 'Failed to load top stories.' }));
    }
  }),
  fetchStories: buildRequestCreator(actionTypes.FETCH_STORIES, async ({ request, payload, dispatch }) => {
    const { storyIds, page } = payload;
    dispatch(request.request(payload));

    try {
      const stories = await hackerNewsApi.getStoriesByPage(storyIds, page);

      if (!stories.length) {
        throw new Error('No stories were returned for this page.');
      }

      return dispatch(request.success({ stories, page }));
    } catch (error) {
      return dispatch(
        request.failure({
          message: error.message || 'Failed to load stories.',
          page,
        }),
      );
    }
  }),
};

export default actions;
