import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import actions from 'store/app/actions';
import storyActions from 'store/story/actions';
import { FEED_CACHE_TTL_MS } from 'store/middleware/localStorageMiddleware/feedCache';
import Nav from './Nav.jsx';

const ConnectedNav = () => {
  const dispatch = useDispatch();
  const layout = useSelector(state => state.app.layout);
  const theme = useSelector(state => state.app.theme);
  const lastFetchedAt = useSelector(state => state.story.lastFetchedAt);
  const hasStories = useSelector(state => state.story.stories.length > 0);
  const isRefreshing = useSelector(state => state.story.isFetching);
  const [clock, setClock] = useState(Date.now());

  useEffect(() => {
    const timerId = window.setInterval(() => {
      setClock(Date.now());
    }, 60 * 1000);

    return () => {
      window.clearInterval(timerId);
    };
  }, []);

  const showStaleStatus = hasStories && lastFetchedAt > 0 && clock - lastFetchedAt >= FEED_CACHE_TTL_MS;

  return (
    <Nav
      layout={layout}
      theme={theme}
      lastFetchedAt={lastFetchedAt}
      showStaleStatus={showStaleStatus}
      isRefreshing={isRefreshing}
      onRefresh={() => dispatch(storyActions.fetchStoryIds({ force: true }))}
      setTheme={nextTheme => dispatch(actions.setTheme({ theme: nextTheme }))}
      setLayout={nextLayout => dispatch(actions.setLayout({ layout: nextLayout }))}
    />
  );
};

export default ConnectedNav;
