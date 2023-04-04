import SC from './dialog.styles';

const PauseDialog = () => {
  return (
    <SC.Container>
      <SC.Content>
        <SC.Title>PAUSE</SC.Title>
        <SC.Button>RESUME</SC.Button>
        <SC.Button>RESTART</SC.Button>
        <SC.Button>HELP</SC.Button>
        <SC.Button>QUIT</SC.Button>
      </SC.Content>
    </SC.Container>
  );
};

export default PauseDialog;
