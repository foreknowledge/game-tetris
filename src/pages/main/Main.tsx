import { useContext, useEffect, useRef, useState } from 'react';
import Title from '../../components/atoms/Title';
import HelpDialog from '../../components/organisms/HelpDialog';
import GameStatusContext from '../../context/GameStatusContext';
import MainBgCanvas from './canvas/MainBgCanvas';
import SC from './main.styles';

const Main = () => {
  const { setGameStatus } = useContext(GameStatusContext);
  const [showHelp, setShowHelp] = useState(false);

  let { current: bgCanvas } = useRef<MainBgCanvas>();

  useEffect(() => {
    bgCanvas = new MainBgCanvas();
    return () => {
      bgCanvas?.stopAnimation();
      bgCanvas = undefined;
    };
  }, []);

  return (
    <>
      <SC.Container>
        <SC.BgCanvas id="main-bg-canvas" />
        <SC.Contents>
          <SC.TitleArea>
            <Title style={{ position: 'relative', top: '50%' }}>
              PLAY
              <span> </span>
              <span style={{ color: 'red' }}>T</span>
              <span style={{ color: 'orange' }}>E</span>
              <span style={{ color: 'yellow' }}>T</span>
              <span style={{ color: 'green' }}>R</span>
              <span style={{ color: 'skyblue' }}>I</span>
              <span style={{ color: 'purple' }}>S</span>!
            </Title>
          </SC.TitleArea>
          <SC.ButtonsArea>
            <SC.Button onClick={() => setGameStatus('playing')}>
              START
            </SC.Button>
            <SC.Button onClick={() => setShowHelp(true)}>HELP</SC.Button>
          </SC.ButtonsArea>
        </SC.Contents>
      </SC.Container>
      {showHelp && <HelpDialog onClose={() => setShowHelp(false)} />}
    </>
  );
};

export default Main;
