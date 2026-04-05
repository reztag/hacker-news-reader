import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import actions from 'store/app/actions';
import Nav from './Nav.jsx';

const ConnectedNav = () => {
  const dispatch = useDispatch();
  const layout = useSelector(state => state.app.layout);
  const theme = useSelector(state => state.app.theme);

  return (
    <Nav
      layout={layout}
      theme={theme}
      setTheme={nextTheme => dispatch(actions.setTheme({ theme: nextTheme }))}
      setLayout={nextLayout => dispatch(actions.setLayout({ layout: nextLayout }))}
    />
  );
};

export default ConnectedNav;
