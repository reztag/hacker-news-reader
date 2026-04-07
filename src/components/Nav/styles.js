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
  display: flex;
  justify-content: space-between;
  align-items: center;

  ${tablet} {
    max-width: 96%;
  }
`;

export const NavSection = styled.div`
  display: flex;
  align-items: center;
  gap: 12px;
  flex-wrap: wrap;
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
