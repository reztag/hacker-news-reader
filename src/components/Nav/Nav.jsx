import React from 'react';
import PropTypes from 'prop-types';
import { layouts, themes } from 'store/app/utils';

import { Header, Spacer, NavSection, Content, Icon, Logo, ExternalLink } from './styles';

const Nav = ({ layout, theme, setLayout, setTheme }) => (
  <div>
    <Header>
      <Content>
        <NavSection>
          <ExternalLink href="https://gitconnected.com" target="_blank">
            <Logo src="https://gitconnected.com/public/meta/favicon/gc-fav.png" /> gitconnected
          </ExternalLink>
        </NavSection>
        <NavSection>
          {layout === layouts.list ? (
            <Icon type="button" aria-label="Switch to grid view" onClick={() => setLayout(layouts.grid)}>
              <span aria-hidden="true">▦</span>
            </Icon>
          ) : (
            <Icon type="button" aria-label="Switch to list view" onClick={() => setLayout(layouts.list)}>
              <span aria-hidden="true">☰</span>
            </Icon>
          )}
          {theme === themes.light ? (
            <Icon type="button" aria-label="Switch to dark mode" onClick={() => setTheme(themes.dark)}>
              <span aria-hidden="true">◐</span>
            </Icon>
          ) : (
            <Icon type="button" aria-label="Switch to light mode" onClick={() => setTheme(themes.light)}>
              <span aria-hidden="true">☼</span>
            </Icon>
          )}
        </NavSection>
      </Content>
    </Header>
    <Spacer />
  </div>
);

Nav.propTypes = {
  layout: PropTypes.string.isRequired,
  theme: PropTypes.string.isRequired,
  setLayout: PropTypes.func.isRequired,
  setTheme: PropTypes.func.isRequired,
};

export default Nav;
