import React from 'react';
import PropTypes from 'prop-types';
import { layouts, themes } from 'store/app/utils';
import formatElapsedTime from 'utils/formatElapsedTime';

import {
  Header,
  Spacer,
  NavSection,
  CenterSection,
  RightSection,
  Content,
  Brand,
  ControlButton,
  ControlIcon,
  ControlLabel,
  StatusPill,
  StatusText,
  RefreshButton,
} from './styles';

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

const RefreshIcon = ({ className }) => (
  <svg viewBox="0 0 24 24" aria-hidden="true" className={className}>
    <path
      d="M4 4v5h.582m15.356 2A8.001 8.001 0 0 0 4.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 0 1-15.357-2m15.357 2H15"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.8"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </svg>
);

const Nav = ({
  layout,
  theme,
  setLayout,
  setTheme,
  lastFetchedAt = 0,
  showStaleStatus = false,
  onRefresh,
  isRefreshing = false,
}) => {
  const elapsed = formatElapsedTime(lastFetchedAt);
  const [isSpinning, setIsSpinning] = React.useState(false);

  const handleRefresh = React.useCallback(() => {
    if (!isSpinning) {
      setIsSpinning(true);
      setTimeout(() => setIsSpinning(false), 1000);
    }
    onRefresh();
  }, [isSpinning, onRefresh]);

  const spinningClass = isSpinning || isRefreshing ? 'spinning' : '';

  return (
    <div>
      <Header>
        <Content>
          <NavSection>
            <Brand>{'// Hacker News Reader'}</Brand>
          </NavSection>
          <CenterSection>
            {showStaleStatus ? (
              <StatusPill role="status" aria-live="polite">
                <span aria-hidden="true" style={{ fontSize: '15px', display: 'flex', alignItems: 'center' }}>{'\u26A0\uFE0F'}</span>
                  <StatusText>{`Offline. Cached feed from ${elapsed} ago`}</StatusText>
              </StatusPill>
            ) : null}
          </CenterSection>
          <RightSection>
          <ControlButton type="button" aria-label="Refresh stories" onClick={handleRefresh}>
            <ControlIcon>
              <RefreshIcon className={spinningClass} />
            </ControlIcon>
            <ControlLabel>Refresh</ControlLabel>
          </ControlButton>
          <ControlButton type="button" aria-label={`Switch to ${layout === layouts.list ? 'grid' : 'list'} view`} onClick={() => setLayout(layout === layouts.list ? layouts.grid : layouts.list)}>
            <ControlIcon>
              {layout === layouts.list ? <ListIcon /> : <GridIcon />}
            </ControlIcon>
            <ControlLabel>{layout === layouts.list ? 'List' : 'Grid'}</ControlLabel>
          </ControlButton>
          <ControlButton type="button" aria-label={`Switch to ${theme === themes.light ? 'dark' : 'light'} mode`} onClick={() => setTheme(theme === themes.light ? themes.dark : themes.light)}>
            <ControlIcon>
              {theme === themes.light ? <SunIcon /> : <MoonIcon />}
            </ControlIcon>
            <ControlLabel>{theme === themes.light ? 'Light' : 'Dark'}</ControlLabel>
          </ControlButton>
          <ControlButton type="button" aria-label="Open about dialog">
            <ControlIcon>
              <InfoIcon />
            </ControlIcon>
            <ControlLabel>About</ControlLabel>
          </ControlButton>
          </RightSection>
        </Content>
      </Header>
      <Spacer />
    </div>
  );
};

Nav.propTypes = {
  layout: PropTypes.string.isRequired,
  theme: PropTypes.string.isRequired,
  setLayout: PropTypes.func.isRequired,
  setTheme: PropTypes.func.isRequired,
  lastFetchedAt: PropTypes.number,
  showStaleStatus: PropTypes.bool,
  onRefresh: PropTypes.func.isRequired,
  isRefreshing: PropTypes.bool,
};

export default Nav;
