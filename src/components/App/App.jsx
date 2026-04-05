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

import {
  Wrapper,
  Title,
  TitleWrapper,
  GithubLink,
  SocialLink,
  StateCard,
  StateMessage,
  RetryButton,
  InlineMessage,
} from './styles';

const App = () => {
  const dispatch = useDispatch();
  const hasRequestedInitialStories = useRef(false);
  const layout = useSelector(state => state.app.layout);
  const theme = useSelector(state => state.app.theme);
  const stories = useSelector(state => state.story.stories);
  const page = useSelector(state => state.story.page);
  const storyIds = useSelector(state => state.story.storyIds);
  const hasMoreStories = useSelector(hasMoreStoriesSelector);
  const { hasStories, isFetching, error, pageError } = useSelector(storyStatusSelector);

  useEffect(() => {
    if (hasRequestedInitialStories.current) {
      return;
    }

    hasRequestedInitialStories.current = true;
    dispatch(storyActions.fetchStoryIds());
  }, [dispatch]);

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
    dispatch(storyActions.fetchStoryIds());
  };

  return (
    <ThemeProvider theme={theme === themes.light ? colorsLight : colorsDark}>
      <div>
        <Nav />
        <Wrapper>
          <TitleWrapper>
            <Title>
              <div>{'// Hacker News Reader'}</div>
              <GithubLink href="https://github.com/gitconnected/hacker-news-reader" target="_blank">
                (build your own)
              </GithubLink>
            </Title>
            <div>
              <SocialLink href="https://twitter.com/gitconnected" target="_blank">
                <i className="fab fa-twitter" />
              </SocialLink>
              <SocialLink href="https://community.gitconnected.com" target="_blank">
                <i className="fab fa-slack-hash" />
              </SocialLink>
              <SocialLink href="https://levelup.gitconnected.com" target="_blank">
                <i className="fab fa-medium-m" />
              </SocialLink>
              <SocialLink href="https://www.facebook.com/gitconnectednetwork" target="_blank">
                <i className="fab fa-facebook" />
              </SocialLink>
              <SocialLink href="https://gitconnected.com" target="_blank">
                <i className="fas fa-link" />
              </SocialLink>
            </div>
          </TitleWrapper>

          {!hasStories && isFetching ? (
            <StateCard data-testid="initial-loader">
              <Loader />
              <StateMessage>Loading top stories...</StateMessage>
            </StateCard>
          ) : null}

          {!hasStories && error ? (
            <StateCard role="alert">
              <StateMessage>{error}</StateMessage>
              <RetryButton type="button" onClick={refreshStories}>
                Retry loading stories
              </RetryButton>
            </StateCard>
          ) : null}

          {hasStories ? (
            <>
              {pageError ? (
                <StateCard role="status">
                  <StateMessage>{pageError}</StateMessage>
                  <RetryButton type="button" onClick={fetchStories}>
                    Retry this page
                  </RetryButton>
                </StateCard>
              ) : null}
              <InfiniteScroll
                dataLength={stories.length}
                next={fetchStories}
                hasMore={hasMoreStories && !pageError}
                loader={<InlineMessage>Loading more stories...</InlineMessage>}
                style={{
                  height: '100%',
                  overflow: 'visible',
                }}
              >
                {layout === layouts.list ? <List stories={stories} /> : <Grid stories={stories} />}
              </InfiniteScroll>
            </>
          ) : null}
        </Wrapper>
      </div>
    </ThemeProvider>
  );
};

export default App;
