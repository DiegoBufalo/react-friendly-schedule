import styled from 'styled-components';

export const Container = styled.button`
  height: 53px;
  padding: 0 20px;
  border-radius: 25px;
  background-color: var(--button-link);
  color: var(--white);
  border: 0;
  font-weight: 500;
  font-size: 18px;
  transition: filter 0.4s;
  &:hover {
    filter: brightness(0.9);
  }
`;