import Button from '../../components/Button';
import Title from '../../components/Title';
import SC from './main.styles';

const Main = () => {
  return (
    <SC.Container>
      <SC.Contents>
        <SC.TitleArea>
          <Title style={{ position: 'relative', top: '50%' }}>
            PLAY
            <span> </span>
            <span style={{ color: 'var(--block-color0)' }}>T</span>
            <span style={{ color: 'var(--block-color1)' }}>E</span>
            <span style={{ color: 'var(--block-color2)' }}>T</span>
            <span style={{ color: 'var(--block-color3)' }}>R</span>
            <span style={{ color: 'var(--block-color4)' }}>I</span>
            <span style={{ color: 'var(--block-color5)' }}>S</span>
            <span style={{ color: 'var(--block-color6)' }}>!</span>
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
