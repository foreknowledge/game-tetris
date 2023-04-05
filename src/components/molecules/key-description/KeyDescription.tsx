import styled from 'styled-components';

type Props = {
  description: string;
  children: React.ReactNode;
};

const KeyDescription = ({ description, children }: Props) => {
  return (
    <SC.Container>
      <SC.Group>{children}</SC.Group>
      <SC.Text>{description}</SC.Text>
    </SC.Container>
  );
};

export default KeyDescription;

const SC = {
  Container: styled.div`
    width: 100%;
    margin-bottom: 20px;
    display: flex;
    align-items: center;
  `,
  Group: styled.div`
    width: 45%;
    display: inherit;
    justify-content: center;
  `,
  Text: styled.span`
    font-size: var(--font-medium);
  `,
};
