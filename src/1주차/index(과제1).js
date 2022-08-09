/* eslint-disable react/react-in-jsx-scope, react/jsx-filename-extension */
/* @jsx createElement */

function createElement(tagName, props, ...children) {
  const element = document.createElement(tagName);

  Object.entries(props || {}).forEach(([key, value]) => {
    element[key.toLowerCase()] = value;
  });

  children.flat().forEach((child) => {
    if (child instanceof Node) {
      element.appendChild(child);
      return;
    }
    element.appendChild(document.createTextNode(child));
  });

  return element;
}

// DSL (Domain-Specific Languages, 도메인 특화 언어)
// DSL로 작성 후 JS로 변환(Balbel)

// 상태는 한가지 경우보다 여러가지인 경우가 많으므로 object로
function render({ count = 0 } = {}) {
  // 변수 변경과 렌더를 따로 분리하는 것이 아닌 상태변경은 화면을 새롭게 그린다는 것!으로 단순화
  function handleClick(number) {
    render({ count: number });
  }

  const element = (
    <div id="hello" className="greeting">
      <p>Hello, world!</p>
      <p>
        <button type="button" onClick={() => handleClick(count + 1)}>
          Click me! (
          {count}
          )
        </button>
      </p>
      <p>
        {[1, 2, 3].map((number) => (
          <button type="button" onClick={() => handleClick(number)}>
            {number}
          </button>
        ))}
      </p>
    </div>
  );

  document.getElementById('app').textContent = '';
  document.getElementById('app').appendChild(element);
}

render();
