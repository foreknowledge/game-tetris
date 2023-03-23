import styled from 'styled-components';
import Button from '../../components/Button';

const SC = {
  Container: styled.div`
    min-width: 600px;
    width: 100%;
    height: 100%;

    display: flex;
    justify-content: center;
    align-items: center;
  `,
  GameCanvas: styled.canvas`
    z-index: 1;
    width: 320px;
    height: 640px;
    border: solid 4px white;
  `,
  BackButton: styled(Button)`
    padding-left: 0.5em;
    position: absolute;
    left: 10px;
  `,
};

export default SC;
