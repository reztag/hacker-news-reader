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
  background-color: transparent;
  color: ${({ theme }) => theme.text};
  padding: 48px 24px;
  min-height: 50vh;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  text-align: center;
  gap: 24px;
`;

export const StateSubMessage = styled.p`
  margin: 0;
  color: ${({ theme }) => theme.textSecondary};
  font-size: 18px;
  line-height: 1.5;
  max-width: 500px;
`;

export const StateMessage = styled.h2`
  margin: 0;
  color: ${({ theme }) => theme.textSecondary};
  font-size: 27px;
  font-weight: 300;
  letter-spacing: 0.01em;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 12px;
`;

export const RetryButton = styled.button`
  border: 0;
  border-radius: 999px;
  padding: 12px 24px;
  cursor: pointer;
  background-color: ${({ theme }) => theme.textSecondary};
  color: ${({ theme }) => theme.background};
  font: inherit;
  font-size: 15px;
  font-weight: 500;
  transition: opacity 120ms ease;

  &:hover {
    opacity: 0.9;
  }
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
