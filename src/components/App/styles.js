import styled from 'styled-components';
import { mobile, tablet } from 'styles/mediaQueries';

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

export const Title = styled.h1`
  color: ${({ theme }) => theme.textSecondary};
  font-size: 20px;
  font-weight: 300;
`;

export const TitleWrapper = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-top: 24px;
  margin-bottom: 26px;

  ${mobile} {
    flex-direction: column;
    align-items: flex-start;
  }
`;

export const LinkWrapper = styled.div`
  display: flex;
`;

export const SocialLink = styled.a`
  margin-left: 16px;

  i {
    color: ${({ theme }) => theme.text};
  }

  ${mobile} {
    margin-left: 0;
    margin-right: 16px;
  }
`;

export const GithubLink = styled.a`
  color: ${({ theme }) => theme.textSecondary};
  font-size: 14px;
  text-decoration: underline;

  &:visited {
    color: ${({ theme }) => theme.textSecondary};
  }
`;

export const StateCard = styled.div`
  background-color: ${({ theme }) => theme.backgroundSecondary};
  color: ${({ theme }) => theme.text};
  border-radius: 4px;
  padding: 24px;
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
