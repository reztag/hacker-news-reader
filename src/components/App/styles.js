import styled from 'styled-components';
import { tablet } from 'styles/mediaQueries';

export const Wrapper = styled.div`
  width: 85%;
  margin-left: auto;
  margin-right: auto;
  height: 100%;
  overflow: hidden;
  padding-bottom: 200px;

  ${tablet} {
    width: 96%;
  }
`;

export const StateCard = styled.div`
  background-color: ${({ theme }) => theme.backgroundSecondary};
  color: ${({ theme }) => theme.text};
  border-radius: 4px;
  padding: 24px;
  margin-top: 24px;
  margin-bottom: 20px;
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  gap: 16px;
`;

export const StateMessage = styled.p`
  margin: 0;
  color: ${({ theme }) => theme.textSecondary};
`;

export const RetryButton = styled.button`
  border: 0;
  border-radius: 999px;
  padding: 10px 16px;
  cursor: pointer;
  background-color: ${({ theme }) => theme.text};
  color: ${({ theme }) => theme.background};
  font: inherit;
`;

export const InlineMessage = styled.div`
  padding: 16px 0 24px;
  color: ${({ theme }) => theme.textSecondary};
`;
