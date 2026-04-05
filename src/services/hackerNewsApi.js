const JSON_QUERY = '.json';
const BASE_URL = 'https://hacker-news.firebaseio.com/v0';
const PAGE_LIMIT = 20;
const getPageSlice = (limit, page = 0) => ({ begin: page * limit, end: (page + 1) * limit });
const getPageValues = ({ begin, end, items }) => items.slice(begin, end);

const getJson = async path => {
  const response = await fetch(`${BASE_URL}${path}`);

  if (!response.ok) {
    throw new Error(`Request failed with status ${response.status}`);
  }

  return response.json();
};

const normalizeStory = story => {
  if (!story || typeof story.id !== 'number' || !story.title) {
    return null;
  }

  return story;
};

const hackerNewsApi = {
  getTopStoryIds: () => getJson(`/topstories${JSON_QUERY}`),
  getStory: id => getJson(`/item/${id}${JSON_QUERY}`),
};

hackerNewsApi.getStoriesByPage = async (ids, page) => {
  const { begin, end } = getPageSlice(PAGE_LIMIT, page);
  const activeIds = getPageValues({ begin, end, items: ids });
  const storyResults = await Promise.allSettled(activeIds.map(id => hackerNewsApi.getStory(id)));

  return storyResults
    .filter(result => result.status === 'fulfilled')
    .map(result => normalizeStory(result.value))
    .filter(Boolean);
};

export default hackerNewsApi;
