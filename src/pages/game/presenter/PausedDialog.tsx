import Dialog from '../../../components/dialog/Dialog';

type Props = {
  onResume: () => void;
  onRestart: () => void;
  onHelp: () => void;
  onQuit: () => void;
};

const PausedDialog = ({ onResume, onRestart, onHelp, onQuit }: Props) => {
  return (
    <Dialog>
      <Dialog.Title>PAUSED</Dialog.Title>
      <Dialog.Button onClick={onResume}>RESUME</Dialog.Button>
      <Dialog.Button onClick={onRestart}>RESTART</Dialog.Button>
      <Dialog.Button onClick={onHelp}>HELP</Dialog.Button>
      <Dialog.Button onClick={onQuit}>QUIT</Dialog.Button>
    </Dialog>
  );
};

export default PausedDialog;
