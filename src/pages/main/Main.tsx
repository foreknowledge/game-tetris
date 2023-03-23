import { useEffect } from 'react';
import Button from '../../components/Button';
import Title from '../../components/Title';
import MainBgCanvas from './canvas/MainBgCanvas';
import SC from './main.styles';

const Main = () => {
  useEffect(() => {
    new MainBgCanvas();
  }, []);

  return (
    <SC.Container id="main-page">
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
          <Button style={{ marginBottom: '0.5em' }}>START</Button>
          <Button>HELP</Button>
        </SC.ButtonsArea>
      </SC.Contents>
    </SC.Container>
  );
};

export default Main;
