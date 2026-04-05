import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import getSiteHostname from 'utils/getSiteHostname';
import getArticleLink from 'utils/getArticleLink';
import linkPreviewApi from 'services/linkPreviewApi';

import { Item, Card, Image, Content, Title, Source } from './styles';

const FALLBACK_THUMBNAIL = 'https://miro.medium.com/max/1176/1*F9RzuXseG1VrTjFJd403gw.png';

const GridItem = ({ url, title, id }) => {
  const site = getSiteHostname(url) || 'news.ycombinator.com';
  const link = getArticleLink({ url, id });
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
            <Source>
              <div>{`// ${site}`}</div>
            </Source>
          </Content>
        </Card>
      </Item>
    </a>
  );
};

GridItem.propTypes = {
  url: PropTypes.string,
  title: PropTypes.string.isRequired,
  id: PropTypes.number.isRequired,
};

export default GridItem;
