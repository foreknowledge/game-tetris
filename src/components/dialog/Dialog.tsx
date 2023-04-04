import SC from './dialog.styles';

type Props = {
  children: React.ReactNode;
};

const Dialog = ({ children }: Props) => {
  return (
    <SC.Container>
      <SC.Content>{children}</SC.Content>
    </SC.Container>
  );
};

Dialog.Title = SC.Title;
Dialog.Button = SC.Button;

export default Dialog;
