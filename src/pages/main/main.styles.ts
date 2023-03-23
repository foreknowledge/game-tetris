import styled from 'styled-components';

const SC = {
  Container: styled.div`
    position: relative;
    width: 100%;
    height: 100%;
  `,
  BgCanvas: styled.canvas`
    position: absolute;
    z-index: -1;
    width: 100%;
    height: 100%;
  `,
  Contents: styled.section`
    min-width: 600;
    height: 100%;
    background-color: rgba(0, 0, 0, 0.5);
  `,
  TitleArea: styled.div`
    height: 40%;
    text-align: center;
  `,
  ButtonsArea: styled.div`
    margin-top: 2em;
  `,
};

export default SC;
