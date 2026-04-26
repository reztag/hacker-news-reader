import React, { useEffect, useRef } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { ThemeProvider } from 'styled-components';
import InfiniteScroll from 'react-infinite-scroll-component';
import Nav from 'components/Nav/index.jsx';
import List from 'components/List/index.jsx';
import Grid from 'components/Grid/index.jsx';
import Loader from 'components/Loader/index.jsx';
import storyActions from 'store/story/actions';
import { layouts, themes } from 'store/app/utils';
import { colorsDark, colorsLight } from 'styles/palette';
import { hasMoreStoriesSelector, storyStatusSelector } from 'store/story/selectors';
import { FEED_CACHE_TTL_MS } from 'store/middleware/localStorageMiddleware/feedCache';

import {
  Wrapper,
  StateCard,
  StateMessage,
  StateSubMessage,
  RetryButton,
  InlineMessage,
  LoaderMessage,
} from './styles';

const App = () => {
  const dispatch = useDispatch();
  const hasAttemptedInitialLoad = useRef(false);
  const staleRefreshAttemptedFor = useRef(null);
  const layout = useSelector(state => state.app.layout);
  const theme = useSelector(state => state.app.theme);
  const stories = useSelector(state => state.story.stories);
  const page = useSelector(state => state.story.page);
  const storyIds = useSelector(state => state.story.storyIds);
  const hasMoreStories = useSelector(hasMoreStoriesSelector);
  const { hasStories, isFetching, error, pageError, lastFetchedAt } = useSelector(storyStatusSelector);

  const requestStoryRefresh = payload => {
    if (!isFetching) {
      dispatch(storyActions.fetchStoryIds(payload));
    }
  };

  useEffect(() => {
    if (isFetching) {
      return undefined;
    }

    if (!hasStories && !hasAttemptedInitialLoad.current) {
      hasAttemptedInitialLoad.current = true;
      requestStoryRefresh();
      return undefined;
    }

    const now = Date.now();
    const age = lastFetchedAt > 0 ? now - lastFetchedAt : FEED_CACHE_TTL_MS;
    const isStale = age >= FEED_CACHE_TTL_MS;

    if (isStale && staleRefreshAttemptedFor.current !== lastFetchedAt) {
      staleRefreshAttemptedFor.current = lastFetchedAt;
      requestStoryRefresh();
    }

    const delay = isStale ? FEED_CACHE_TTL_MS : FEED_CACHE_TTL_MS - age;
    const timerId = window.setTimeout(() => {
      requestStoryRefresh();
    }, Math.max(1000, delay));

    return () => {
      window.clearTimeout(timerId);
    };
  }, [hasStories, isFetching, lastFetchedAt, error]);

  useEffect(() => {
    document.body.style.backgroundColor =
      theme === themes.light ? colorsLight.background : colorsDark.background;
  }, [theme]);

  const fetchStories = () => {
    if (!isFetching) {
      dispatch(storyActions.fetchStories({ storyIds, page }));
    }
  };

  const refreshStories = () => {
    staleRefreshAttemptedFor.current = null;
    requestStoryRefresh({ force: true });
  };

  return (
    <ThemeProvider theme={theme === themes.light ? colorsLight : colorsDark}>
      <div>
        <Nav />
        <Wrapper>
          {!hasStories && isFetching ? (
            <StateCard data-testid="initial-loader">
              <Loader size={88} />
              <LoaderMessage>Fetching top stories...</LoaderMessage>
            </StateCard>
          ) : null}

          {!hasStories && error ? (
            <StateCard role="alert">
              <StateMessage>
                <span aria-hidden="true" style={{ fontSize: '24px' }}>{'\u2757\u2757\u2757'}</span>
                {error}
              </StateMessage>
              <StateSubMessage>
                Please connect to the internet and click the button below to refresh.
              </StateSubMessage>
              <RetryButton type="button" onClick={refreshStories}>
                Retry loading stories
              </RetryButton>
            </StateCard>
          ) : null}

          {hasStories ? (
            <>
              <InfiniteScroll
                dataLength={stories.length}
                next={fetchStories}
                hasMore={hasMoreStories && !pageError}
                loader={
                  <InlineMessage>
                    <Loader size={88} />
                    <LoaderMessage>Loading stories...</LoaderMessage>
                  </InlineMessage>
                }
                style={{
                  height: '100%',
                  overflow: 'visible',
                }}
              >
                {layout === layouts.list ? <List stories={stories} /> : <Grid stories={stories} />}
              </InfiniteScroll>
              {pageError ? (
                <InlineMessage role="status">
                  <StateMessage style={{ fontSize: '18px' }}>
                    <span aria-hidden="true">{'\u2757'}</span>
                    {pageError}
                  </StateMessage>
                  <RetryButton type="button" onClick={fetchStories} style={{ fontSize: '14px', padding: '8px 16px' }}>
                    Retry this page
                  </RetryButton>
                </InlineMessage>
              ) : null}
            </>
          ) : null}
        </Wrapper>
      </div>
    </ThemeProvider>
  );
};

export default App;
