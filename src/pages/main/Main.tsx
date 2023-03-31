import Title from '../../components/Title';
import GameStatus from '../../types/GameStatus';
import SC from './main.styles';

interface MainProps {
  setGameStatus: (status: GameStatus) => void;
}

const Main = ({ setGameStatus }: MainProps) => {
  // let { current: bgCanvas } = useRef<MainBgCanvas>();

  // useEffect(() => {
  //   if (!bgCanvas) {
  //     // React.StrictMode에서도 인스턴스 한 번만 생성
  //     bgCanvas = new MainBgCanvas();
  //   }
  // }, []);

  return (
    <SC.Container>
      {/* <SC.BgCanvas id="main-bg-canvas" /> */}
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
          <SC.Button onClick={() => setGameStatus('playing')}>START</SC.Button>
          {/* <SC.Button>HELP</SC.Button> */}
        </SC.ButtonsArea>
      </SC.Contents>
    </SC.Container>
  );
};

export default Main;
