import configureStore from 'store';
import actions from './actions';

const buildStory = id => ({
  id,
  by: `user-${id}`,
  score: id * 10,
  time: 1710000000 + id,
  title: `Story ${id}`,
  type: 'story',
  url: `https://example.com/story-${id}`,
});

const createFetchResponse = value => ({
  ok: true,
  json: async () => value,
});

describe('story actions', () => {
  afterEach(() => {
    vi.restoreAllMocks();
  });

  it('bypasses cache when a refresh is dispatched manually', async () => {
    const store = configureStore({
      story: {
        storyIds: [1],
        stories: [buildStory(1)],
        page: 1,
        isFetching: false,
        error: '',
        pageError: '',
      },
    });

    vi.spyOn(global, 'fetch').mockImplementation(url => {
      if (url.endsWith('/topstories.json')) {
        return Promise.resolve(createFetchResponse([2]));
      }

      return Promise.resolve(createFetchResponse(buildStory(2)));
    });

    await store.dispatch(actions.fetchStoryIds());

    expect(global.fetch).toHaveBeenCalledWith('https://hacker-news.firebaseio.com/v0/topstories.json');
    expect(store.getState().story.stories).toEqual([buildStory(2)]);
    expect(store.getState().story.page).toBe(1);
  });
});
