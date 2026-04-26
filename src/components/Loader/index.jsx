import React from 'react';
import PropTypes from 'prop-types';

import { Animation } from './styles';

const Loader = ({ size = 64 }) => (
  <Animation $size={size}>
    <span>.</span>
    <span>.</span>
    <span>.</span>
  </Animation>
);

Loader.propTypes = {
  size: PropTypes.number,
};

export default Loader;
