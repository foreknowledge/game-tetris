import styled from 'styled-components';

type FontSize = 'small' | 'medium' | 'large';
type Props = {
  label: string;
  score: number;
  fontSize?: FontSize;
};

const GameStates = ({ label, score, fontSize = 'medium' }: Props) => {
  return (
    <SC.State fontSize={fontSize}>
      <SC.Label>{label}</SC.Label>
      <SC.Number>{score}</SC.Number>
    </SC.State>
  );
};

GameStates.Group = styled.div`
  min-width: 200px;
  margin: 1em 0;
`;

export default GameStates;

const SC = {
  State: styled.div<{ fontSize: FontSize }>`
    width: 100%;
    display: flex;
    justify-content: space-between;
    font-size: ${(props) => {
      switch (props.fontSize) {
        case 'small':
          return 'var(--font-small)';
        case 'medium':
          return 'var(--font-medium)';
        default:
          return 'var(--font-large)';
      }
    }};
  `,
  Label: styled.span`
    margin-right: 0.5em;
  `,
  Number: styled.span`
    flex: 1;
    direction: rtl;
  `,
};
