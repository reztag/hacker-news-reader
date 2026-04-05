import { actionTypes } from './actions';

const getInitialState = () => ({
  storyIds: [],
  stories: [],
  page: 0,
  isFetching: false,
  error: '',
  pageError: '',
});

const story = (state = getInitialState(), { type, payload }) => {
  switch (type) {
    case `${actionTypes.FETCH_STORY_IDS}_REQUEST`:
      return {
        ...state,
        isFetching: true,
        error: '',
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
        ...payload,
        error: '',
      };
    case `${actionTypes.FETCH_STORIES}_SUCCESS`:
      return {
        ...state,
        stories: [...state.stories, ...payload.stories],
        page: state.page + 1,
        isFetching: false,
        error: '',
        pageError: '',
      };
    case `${actionTypes.FETCH_STORY_IDS}_FAILURE`:
      return {
        ...state,
        isFetching: false,
        error: payload.message,
      };
    case `${actionTypes.FETCH_STORIES}_FAILURE`:
      return {
        ...state,
        isFetching: false,
        ...(state.stories.length === 0
          ? { error: payload.message, pageError: '' }
          : { pageError: payload.message }),
      };
    default:
      return state;
  }
};

export default story;
