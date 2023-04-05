import styled from 'styled-components';

const SC = {
  Container: styled.div`
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background-color: rgba(1, 9, 46, 0.8);
    z-index: 5;

    display: flex;
    justify-content: center;
    align-items: center;
  `,
  Content: styled.main<{ width?: string }>`
    min-width: 500px;
    width: ${(props) => props.width ?? '30%'};
    padding: 2em;
    border: 4px solid white;
    background: var(--primary-color);

    display: flex;
    align-items: center;
    flex-direction: column;
  `,
};

export default SC;
