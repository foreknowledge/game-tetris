import styled from 'styled-components';

const Button = styled.button`
  display: block;
  margin: auto;
  width: 250px;

  border: 5px solid var(--text-color);
  border-radius: 20px;

  font-size: var(--font-medium);
  color: var(--text-color);
  background: var(--primary-color);

  cursor: pointer;

  &:hover {
    color: var(--sub-color);
    border-color: var(--sub-color);
  }
`;

export default Button;
