import styled from 'styled-components';
import Button from '../../atoms/Button';
import Title from '../../atoms/Title';

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
  Content: styled.main`
    min-width: 500px;
    width: 30%;
    padding: 2em;
    border: 4px solid white;
    background: var(--primary-color);

    display: flex;
    align-items: center;
    flex-direction: column;
  `,
  Title: styled(Title)`
    margin-bottom: 0.4em;
  `,
  Button: styled(Button)`
    width: 250px;
    margin: 0.3em 0em;
  `,
};

export default SC;
