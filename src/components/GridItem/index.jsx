import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import getSiteHostname from 'utils/getSiteHostname';
import getArticleLink, { HN_ITEM } from 'utils/getArticleLink';
import linkPreviewApi from 'services/linkPreviewApi';

import {
  Item,
  Card,
  ExternalLink,
  ImageLink,
  TitleLink,
  Image,
  Content,
  Title,
  Source,
  Footer,
  CommentButton,
  CommentCount,
  CommentIcon,
} from './styles';

// Use a locally bundled copy of the original Miro fallback image so the thumbnail does not depend on remote hosts.
const FALLBACK_THUMBNAIL = `${import.meta.env.BASE_URL}fallback-thumbnail.png`;
const X_THUMBNAIL = `${import.meta.env.BASE_URL}x-thumbnail.png`;

const isXPreviewHostname = hostname =>
  hostname === 'x.com' ||
  hostname === 'twitter.com' ||
  hostname.endsWith('.x.com') ||
  hostname.endsWith('.twitter.com');

const GridItem = ({ url, title, id, kids = [], descendants, useEmojiIcon = false }) => {
  const site = getSiteHostname(url) || 'news.ycombinator.com';
  const link = getArticleLink({ url, id });
  const commentUrl = `${HN_ITEM}${id}`;
  const commentCount = typeof descendants === 'number' ? descendants : kids.length;
  const isXLink = isXPreviewHostname(site);
  const fallbackImageSrc = isXLink
    ? X_THUMBNAIL
    : FALLBACK_THUMBNAIL;
  const openArticle = () => {
    window.open(link, '_blank', 'noopener,noreferrer');
  };
  const [imageSrc, setImageSrc] = useState(fallbackImageSrc);

  useEffect(() => {
    let isMounted = true;
    setImageSrc(fallbackImageSrc);

    if (isXLink) {
      return () => {
        isMounted = false;
      };
    }

    linkPreviewApi.getPreviewImage(link).then(previewImageUrl => {
      if (isMounted && previewImageUrl) {
        setImageSrc(previewImageUrl);
      }
    });

    return () => {
      isMounted = false;
    };
  }, [fallbackImageSrc, isXLink, link]);

  return (
    <Item>
      <ExternalLink
        role="link"
        tabIndex={0}
        aria-label={`Open ${title}`}
        onClick={openArticle}
        onKeyDown={event => {
          if (event.key === 'Enter' || event.key === ' ') {
            event.preventDefault();
            openArticle();
          }
        }}
      >
        <Card>
          <ImageLink 
            href={link} 
            tabIndex={-1} 
            onClick={e => e.stopPropagation()} 
            target="_blank" 
            rel="noopener noreferrer"
          >
            <Image
              src={imageSrc}
              alt={`${site} thumbnail`}
              loading="lazy"
              onError={() => {
                if (imageSrc !== fallbackImageSrc) {
                  setImageSrc(fallbackImageSrc);
                }
              }}
            />
          </ImageLink>
          <Content>
            <Title>
              <TitleLink 
                href={link} 
                tabIndex={-1} 
                onClick={e => e.stopPropagation()} 
                target="_blank" 
                rel="noopener noreferrer"
              >
                {title}
              </TitleLink>
            </Title>
            <Footer>
              <Source>{`// ${site}`}</Source>
              <CommentButton
                as="a"
                href={commentUrl}
                target="_blank"
                rel="noopener noreferrer"
                title="Open Hacker News comments"
                aria-label="Open Hacker News comments"
                onClick={event => {
                  event.stopPropagation();
                }}
              >
                {useEmojiIcon ? (
                  <span aria-hidden="true">{'\u{1F4AC}'}</span>
                ) : (
                  <CommentIcon viewBox="0 0 24 24" aria-hidden="true">
                    <path
                      d="M6 7.5h12M6 12h9m-9 4.5h6M5.5 4.5h13a2 2 0 0 1 2 2v8a2 2 0 0 1-2 2h-7l-4 3v-3h-2a2 2 0 0 1-2-2v-8a2 2 0 0 1 2-2Z"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="1.8"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </CommentIcon>
                )}
                <CommentCount>{commentCount}</CommentCount>
              </CommentButton>
            </Footer>
          </Content>
        </Card>
      </ExternalLink>
    </Item>
  );
};

GridItem.propTypes = {
  url: PropTypes.string,
  title: PropTypes.string.isRequired,
  id: PropTypes.number.isRequired,
  kids: PropTypes.array,
  descendants: PropTypes.number,
  useEmojiIcon: PropTypes.bool,
};

export default GridItem;
