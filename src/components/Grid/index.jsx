import React from 'react';
import PropTypes from 'prop-types';
import GridItem from 'components/GridItem/GridItemCard.jsx';

import { GridWrapper } from './styles';

const Grid = ({ stories }) => (
  <GridWrapper>
    {stories.map(story => (
      <GridItem key={story.id} {...story} />
    ))}
  </GridWrapper>
);

Grid.propTypes = {
  stories: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.number.isRequired,
    }),
  ).isRequired,
};

export default Grid;
