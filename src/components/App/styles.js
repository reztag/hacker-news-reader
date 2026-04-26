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
  align-items: center;
  text-align: center;
  gap: 16px;
`;

export const StateMessage = styled.p`
  margin: 0;
  color: ${({ theme }) => theme.textSecondary};
  font-size: 18px;
  line-height: 1.5;
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
  padding: 28px 0 40px;
  color: ${({ theme }) => theme.textSecondary};
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 14px;
  text-align: center;
  width: 100%;
`;

export const LoaderMessage = styled.p`
  margin: 0;
  color: ${({ theme }) => theme.textSecondary};
  font-size: 22px;
  font-weight: 600;
  letter-spacing: 0.01em;
  line-height: 1.5;
`;
