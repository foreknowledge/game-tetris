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
    color: var(--accent-color);
    border-color: var(--accent-color);
  }
`;

export default Button;
