import React from 'react';
import PropTypes from 'prop-types';
import { layouts, themes } from 'store/app/utils';

import { Header, Spacer, NavSection, Content, Brand, ControlButton, ControlIcon, ControlLabel } from './styles';

const GridIcon = () => (
  <svg viewBox="0 0 24 24" aria-hidden="true">
    <path d="M4 4h6v6H4Zm10 0h6v6h-6ZM4 14h6v6H4Zm10 0h6v6h-6Z" fill="currentColor" />
  </svg>
);

const ListIcon = () => (
  <svg viewBox="0 0 24 24" aria-hidden="true">
    <path d="M5 6h2v2H5Zm4 0h10v2H9Zm-4 5h2v2H5Zm4 0h10v2H9Zm-4 5h2v2H5Zm4 0h10v2H9Z" fill="currentColor" />
  </svg>
);

const SunIcon = () => (
  <svg viewBox="0 0 24 24" aria-hidden="true">
    <path
      d="M12 5V2m0 20v-3m7-7h3M2 12h3m11.95 4.95 2.12 2.12M4.93 4.93l2.12 2.12m9.9-2.12-2.12 2.12M7.05 16.95l-2.12 2.12M12 8a4 4 0 1 0 0 8a4 4 0 0 0 0-8Z"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.8"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </svg>
);

const MoonIcon = () => (
  <svg viewBox="0 0 24 24" aria-hidden="true">
    <path
      d="M20 14.5A8.5 8.5 0 0 1 9.5 4A8.5 8.5 0 1 0 20 14.5Z"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.8"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </svg>
);

const InfoIcon = () => (
  <svg viewBox="0 0 24 24" aria-hidden="true">
    <path
      d="M12 17v-5m0-4h.01M12 22a10 10 0 1 1 0-20a10 10 0 0 1 0 20Z"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.8"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </svg>
);

const Nav = ({ layout, theme, setLayout, setTheme }) => (
  <div>
    <Header>
      <Content>
        <NavSection>
          <Brand>{'// Hacker News Reader'}</Brand>
        </NavSection>
        <NavSection>
          {layout === layouts.list ? (
            <ControlButton type="button" aria-label="Switch to grid view" onClick={() => setLayout(layouts.grid)}>
              <ControlIcon>
                <GridIcon />
              </ControlIcon>
              <ControlLabel>Grid</ControlLabel>
            </ControlButton>
          ) : (
            <ControlButton type="button" aria-label="Switch to list view" onClick={() => setLayout(layouts.list)}>
              <ControlIcon>
                <ListIcon />
              </ControlIcon>
              <ControlLabel>List</ControlLabel>
            </ControlButton>
          )}
          {theme === themes.light ? (
            <ControlButton type="button" aria-label="Switch to dark mode" onClick={() => setTheme(themes.dark)}>
              <ControlIcon>
                <MoonIcon />
              </ControlIcon>
              <ControlLabel>Dark</ControlLabel>
            </ControlButton>
          ) : (
            <ControlButton type="button" aria-label="Switch to light mode" onClick={() => setTheme(themes.light)}>
              <ControlIcon>
                <SunIcon />
              </ControlIcon>
              <ControlLabel>Light</ControlLabel>
            </ControlButton>
          )}
          <ControlButton type="button" aria-label="Open about dialog">
            <ControlIcon>
              <InfoIcon />
            </ControlIcon>
            <ControlLabel>About</ControlLabel>
          </ControlButton>
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
