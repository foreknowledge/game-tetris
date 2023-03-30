import styled from 'styled-components';

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
    flex-direction: column;
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
  GameStates: styled.div`
    min-width: 200px;
    margin-top: 2em;
  `,
  State: styled.div`
    width: 100%;
    display: flex;
    justify-content: space-between;
    font-size: var(--font-small);
  `,
  Label: styled.span`
    margin-right: 0.5em;
  `,
  Number: styled.span`
    flex: 1;
    direction: rtl;
  `,
};

export default SC;
