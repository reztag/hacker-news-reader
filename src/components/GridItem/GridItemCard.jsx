import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import getSiteHostname from 'utils/getSiteHostname';
import getArticleLink, { HN_ITEM } from 'utils/getArticleLink';
import linkPreviewApi from 'services/linkPreviewApi';

import {
  Item,
  Card,
  Image,
  Content,
  Title,
  Source,
  Footer,
  CommentLink,
  CommentCount,
  CommentIcon,
} from './styles';

const FALLBACK_THUMBNAIL = 'https://miro.medium.com/max/1176/1*F9RzuXseG1VrTjFJd403gw.png';

const GridItemCard = ({ url, title, id, kids = [], descendants }) => {
  const site = getSiteHostname(url) || 'news.ycombinator.com';
  const link = getArticleLink({ url, id });
  const commentUrl = `${HN_ITEM}${id}`;
  const commentCount = typeof descendants === 'number' ? descendants : kids.length;
  const [imageSrc, setImageSrc] = useState(FALLBACK_THUMBNAIL);

  useEffect(() => {
    let isMounted = true;

    linkPreviewApi.getPreviewImage(link).then(previewImageUrl => {
      if (isMounted && previewImageUrl) {
        setImageSrc(previewImageUrl);
      }
    });

    return () => {
      isMounted = false;
    };
  }, [link]);

  return (
    <a href={link} target="_blank" rel="nofollow noreferrer nofollow">
      <Item>
        <Card>
          <Image
            src={imageSrc}
            alt={`${site} thumbnail`}
            loading="lazy"
            onError={() => {
              if (imageSrc !== FALLBACK_THUMBNAIL) {
                setImageSrc(FALLBACK_THUMBNAIL);
              }
            }}
          />
          <Content>
            <Title>{title}</Title>
            <Footer>
              <Source>{`// ${site}`}</Source>
              <CommentLink
                href={commentUrl}
                rel="nofollow noreferrer noopener"
                target="_blank"
                title="Open Hacker News comments"
                onClick={event => event.stopPropagation()}
              >
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
                <CommentCount>{commentCount}</CommentCount>
              </CommentLink>
            </Footer>
          </Content>
        </Card>
      </Item>
    </a>
  );
};

GridItemCard.propTypes = {
  url: PropTypes.string,
  title: PropTypes.string.isRequired,
  id: PropTypes.number.isRequired,
  kids: PropTypes.array,
  descendants: PropTypes.number,
};

export default GridItemCard;
