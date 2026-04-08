import styled from 'styled-components';

export const GridWrapper = styled.ul`
  margin-bottom: 20px;
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
  gap: 32px;
`;
