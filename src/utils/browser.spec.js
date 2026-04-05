import getArticleLink from './getArticleLink';
import getSiteHostname from './getSiteHostname';

describe('browser utilities', () => {
  it('falls back to the Hacker News discussion link when a story has no url', () => {
    expect(getArticleLink({ id: 42 })).toBe('https://news.ycombinator.com/item?id=42');
  });

  it('parses hostnames with the platform URL API', () => {
    expect(getSiteHostname('https://www.example.com/article')).toBe('example.com');
  });
});
