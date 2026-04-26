import styled from 'styled-components';
import { tablet } from 'styles/mediaQueries';

const HEIGHT = 64;

export const Header = styled.header`
  background-color: ${({ theme }) => theme.backgroundSecondary};
  height: ${HEIGHT}px;
  color: ${({ theme }) => theme.text};
  width: 100%;
  box-shadow: 0 1px 0 0 black;
  position: fixed;
  top: 0;
  z-index: 2;
`;

export const Content = styled.div`
  height: 100%;
  width: 100%;
  max-width: 85%;
  margin-left: auto;
  margin-right: auto;
  display: grid;
  grid-template-columns: minmax(0, 1fr) auto minmax(0, 1fr);
  align-items: center;
  gap: 16px;

  ${tablet} {
    max-width: 96%;
    grid-template-columns: minmax(0, 1fr);
    justify-items: stretch;
    padding-top: 10px;
    padding-bottom: 10px;
    height: auto;
  }
`;

export const NavSection = styled.div`
  display: flex;
  align-items: center;
  gap: 12px;
  flex-wrap: wrap;
`;

export const CenterSection = styled.div`
  display: flex;
  justify-content: center;
  min-width: 0;
`;

export const RightSection = styled(NavSection)`
  justify-self: end;

  ${tablet} {
    justify-self: stretch;
    justify-content: flex-end;
  }
`;

export const Brand = styled.h1`
  margin: 0;
  color: ${({ theme }) => theme.textSecondary};
  font-size: 27px;
  font-weight: 300;
  letter-spacing: 0.01em;
`;

export const Spacer = styled.div`
  height: ${HEIGHT}px;

  ${tablet} {
    height: 96px;
  }
`;

export const ControlButton = styled.button`
  display: inline-flex;
  align-items: center;
  gap: 9px;
  min-height: 38px;
  padding: 0 12px;
  border-radius: 999px;
  border: 1px solid ${({ theme }) => theme.border};
  background: ${({ theme }) => theme.background};
  color: ${({ theme }) => theme.text};
  cursor: pointer;
  font: inherit;
  transition:
    background-color 120ms ease,
    border-color 120ms ease,
    transform 120ms ease;

  &:hover {
    background: ${({ theme }) => theme.backgroundSecondary};
    border-color: ${({ theme }) => theme.textSecondary};
    transform: translateY(-1px);
  }
`;

export const ControlIcon = styled.span`
  display: inline-flex;
  width: 16px;
  height: 16px;

  svg {
    width: 16px;
    height: 16px;
  }
`;

export const ControlLabel = styled.span`
  font-size: 13px;
  font-weight: 500;
`;

export const StatusPill = styled.div`
  min-height: 38px;
  max-width: 100%;
  padding: 0 14px;
  border-radius: 999px;
  border: 1px solid ${({ theme }) => theme.border};
  color: ${({ theme }) => theme.textSecondary};
  background: ${({ theme }) => theme.background};
  display: inline-flex;
  align-items: center;
  gap: 10px;
  white-space: nowrap;

  ${tablet} {
    justify-content: center;
    white-space: normal;
    border-radius: 20px;
    padding-top: 8px;
    padding-bottom: 8px;
  }
`;

export const StatusText = styled.span`
  overflow: hidden;
  text-overflow: ellipsis;
  font-size: 13px;
`;

export const RefreshButton = styled.button`
  border: 0;
  border-radius: 999px;
  min-width: 32px;
  height: 32px;
  padding: 0 10px;
  cursor: pointer;
  background: ${({ theme }) => theme.backgroundSecondary};
  color: ${({ theme }) => theme.text};
  font: inherit;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  flex-shrink: 0;

  &:disabled {
    cursor: wait;
    opacity: 0.7;
  }
`;
