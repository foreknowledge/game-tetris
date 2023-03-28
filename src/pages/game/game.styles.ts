import styled from 'styled-components';
import Button from '../../components/Button';

const SC = {
  Container: styled.div`
    min-width: 600px;
    width: 100%;
    height: 100%;

    display: flex;
  `,
  Section: styled.section`
    flex: 1;
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
  PreviewCanvas: styled.canvas`
    width: 180px;
    height: 180px;
    border: solid 4px white;
  `,
};

export default SC;
