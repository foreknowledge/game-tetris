import { faCircleXmark } from '@fortawesome/free-regular-svg-icons';
import { faArrowUp } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import styled from 'styled-components';
import Keyboard from '../atoms/Keyboard';
import Dialog from '../molecules/dialog/Dialog';
import KeyDescription from '../molecules/key-description/KeyDescription';

type Props = {
  onClose: () => void;
};

const HelpDialog = ({ onClose }: Props) => {
  return (
    <Dialog style={{ width: '70%', position: 'relative' }}>
      <CloseXmark onClick={onClose} icon={faCircleXmark} />
      <Dialog.Title>Help</Dialog.Title>
      <KeyDescription description="Move left/right">
        <Keyboard style={{ marginRight: '10px' }}>
          <FontAwesomeIcon
            icon={faArrowUp}
            style={{ transform: 'rotate(-90deg)' }}
          />
        </Keyboard>
        <Keyboard>
          <FontAwesomeIcon
            icon={faArrowUp}
            style={{ transform: 'rotate(90deg)' }}
          />
        </Keyboard>
      </KeyDescription>
      <KeyDescription description="Rotate left/right">
        <Keyboard style={{ marginRight: '10px' }}>Z</Keyboard>
        <Keyboard>
          <FontAwesomeIcon icon={faArrowUp} />
        </Keyboard>
      </KeyDescription>
      <KeyDescription description="Soft drop">
        <Keyboard>
          <FontAwesomeIcon
            icon={faArrowUp}
            style={{ transform: 'rotate(180deg)' }}
          />
        </Keyboard>
      </KeyDescription>
      <KeyDescription description="Hard drop">
        <Keyboard style={{ padding: '0 0.7em' }}>SPACE</Keyboard>
      </KeyDescription>
      <KeyDescription description="Pause/Resume">
        <Keyboard style={{ padding: '0 0.7em' }}>ESC</Keyboard>
      </KeyDescription>
    </Dialog>
  );
};

export default HelpDialog;

const CloseXmark = styled(FontAwesomeIcon)`
  position: absolute;
  top: 0.7em;
  right: 0.7em;
  font-size: xxx-large;
  cursor: pointer;

  &:hover {
    color: var(--accent-color);
  }
`;
