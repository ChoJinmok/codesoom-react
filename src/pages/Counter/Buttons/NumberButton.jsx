import styled from '@emotion/styled';

const Button = styled.button({
  backgroundColor: '#F00',
});

export default function NumberButton({ children, onClickButton }) {
  function handleClick() {
    return () => onClickButton(children);
  }

  return (
    <Button type="button" onClick={handleClick()}>
      {children}
    </Button>
  );
}
