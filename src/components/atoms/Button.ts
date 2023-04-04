import styled from 'styled-components';

const Button = styled.button`
  display: block;
  margin: 0.1em auto;
  padding: 0.1em 1em;

  border: 5px solid var(--text-color);
  border-radius: 20px;

  font-size: var(--font-medium);
  color: var(--text-color);
  background: none;

  cursor: pointer;

  &:hover {
    color: var(--accent-color);
    border-color: var(--accent-color);
  }
`;

export default Button;
