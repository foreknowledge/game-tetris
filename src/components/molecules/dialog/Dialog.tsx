import styled from 'styled-components';
import SC from './dialog.styles';
import Title from '../../atoms/Title';
import Button from '../../atoms/Button';

type Props = {
  style?: React.CSSProperties;
  children: React.ReactNode;
};

const Dialog = ({ style, children }: Props) => {
  return (
    <SC.Container>
      <SC.Content style={style}>{children}</SC.Content>
    </SC.Container>
  );
};

Dialog.Title = styled(Title)`
  margin-bottom: 0.4em;
`;

Dialog.Button = styled(Button)`
  width: 250px;
  margin: 0.3em 0em;
`;

export default Dialog;
