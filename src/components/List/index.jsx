import React from 'react';
import PropTypes from 'prop-types';
import ListItem from 'components/ListItem/index.jsx';

import { ListWrapper } from './styles';

const List = ({ stories }) => (
  <ListWrapper>
    {stories.map(story => (
      <ListItem key={story.id} {...story} />
    ))}
  </ListWrapper>
);

List.propTypes = {
  stories: PropTypes.array.isRequired,
};

export default List;
