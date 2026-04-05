import React from 'react';
import { Provider } from 'react-redux';
import { fireEvent, render, screen, waitFor } from '@testing-library/react';
import configureStore from 'store';
import App from './App.jsx';

vi.mock('react-infinite-scroll-component', () => ({
  default: ({ children, next, hasMore }) => (
    React.createElement(
      'div',
      null,
      children,
      hasMore
        ? React.createElement(
            'button',
            { type: 'button', onClick: next },
            'Load more',
          )
        : null,
    )
  ),
}));

vi.mock('react-timeago', () => ({
  default: ({ date }) => React.createElement('time', null, String(date)),
}));

const renderApp = () => {
  const store = configureStore({});
  return render(
    React.createElement(
      Provider,
      { store },
      React.createElement(App, null),
    ),
  );
};

const buildStory = id => ({
  id,
  by: `user-${id}`,
  score: id * 10,
  time: 1710000000 + id,
  title: `Story ${id}`,
  type: 'story',
  kids: [id + 100],
  url: `https://example.com/story-${id}`,
});

const createFetchResponse = value => ({
  ok: true,
  json: async () => value,
});

describe('App', () => {
  afterEach(() => {
    vi.restoreAllMocks();
  });

  it('loads and renders the first page of stories', async () => {
    vi.spyOn(global, 'fetch').mockImplementation(url => {
      if (url.endsWith('/topstories.json')) {
        return Promise.resolve(createFetchResponse([1, 2]));
      }

      const id = Number(url.match(/item\/(\d+)\.json/)?.[1]);
      return Promise.resolve(createFetchResponse(buildStory(id)));
    });

    renderApp();

    expect(screen.getByTestId('initial-loader')).toBeInTheDocument();
    expect(await screen.findByText('Story 1')).toBeInTheDocument();
    expect(screen.getByText('Story 2')).toBeInTheDocument();
  });

  it('shows an initial error and retries successfully', async () => {
    let requestCount = 0;

    vi.spyOn(global, 'fetch').mockImplementation(url => {
      if (url.endsWith('/topstories.json')) {
        requestCount += 1;

        if (requestCount === 1) {
          return Promise.resolve({ ok: false, status: 500 });
        }

        return Promise.resolve(createFetchResponse([1]));
      }

      return Promise.resolve(createFetchResponse(buildStory(1)));
    });

    renderApp();

    expect(await screen.findByRole('alert')).toHaveTextContent('Request failed with status 500');

    fireEvent.click(screen.getByRole('button', { name: 'Retry loading stories' }));

    expect(await screen.findByText('Story 1')).toBeInTheDocument();
  });

  it('keeps loaded stories visible when loading the next page fails', async () => {
    const storyIds = Array.from({ length: 21 }, (_, index) => index + 1);

    vi.spyOn(global, 'fetch').mockImplementation(url => {
      if (url.endsWith('/topstories.json')) {
        return Promise.resolve(createFetchResponse(storyIds));
      }

      const id = Number(url.match(/item\/(\d+)\.json/)?.[1]);

      if (id === 21) {
        return Promise.resolve({ ok: false, status: 503 });
      }

      return Promise.resolve(createFetchResponse(buildStory(id)));
    });

    renderApp();

    expect(await screen.findByText('Story 1')).toBeInTheDocument();

    fireEvent.click(screen.getByRole('button', { name: 'Load more' }));

    expect(await screen.findByRole('status')).toHaveTextContent(
      'No stories were returned for this page.',
    );
    expect(screen.getByText('Story 1')).toBeInTheDocument();

    fireEvent.click(screen.getByRole('button', { name: 'Retry this page' }));

    await waitFor(() => {
      expect(global.fetch).toHaveBeenCalledWith(
        'https://hacker-news.firebaseio.com/v0/item/21.json',
      );
    });
  });
});
