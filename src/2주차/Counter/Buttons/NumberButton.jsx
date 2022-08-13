export default function NumberButton({ children, onClickButton }) {
  const style = {
    background: '#F00',
  };

  return (
    <button type="button" onClick={() => onClickButton(children)} style={style}>
      {children}
    </button>
  );
}
