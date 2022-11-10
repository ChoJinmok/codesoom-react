// 아래와 같이 작성해주면 계속 해서 코드가 길어짐 => 추상화 필요!

// const element = document.getElementById('app');

// const paragraph = document.createElement('p');

// const text = document.createTextNode('Hello, world!!!');

// paragraph.appendChild(text);

// element.appendChild(paragraph);

function createElement(tagName, props, ...children) {
  const element = document.createElement(tagName);

  Object.entries(props || {}).forEach(([key, value]) => {
    // if (key.startsWith('on')) { element[key.toLowerCase()] = value; }

    element[key] = value;
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

//

// const paragraph1 = createElement(
//   'p',
//   document.createTextNode('Hello, world!!!'),
//   document.createTextNode('Hello, world'),
// );

// const paragraph2 = createElement(
//   'p',
//   document.createTextNode('Hi!'),
// );

// const root = createElement(
//   'div',
//   createElement(
//     'p',
//     document.createTextNode('Hello, world!!!'),
//     document.createTextNode('Hello, world'),
//   ),
//   createElement(
//     'p',
//     document.createTextNode('Hi!'),
//   ),
// );

//

// const container = document.getElementById('app');

// document.getElementById('app').appendChild(
//   createElement(
//     'div',
//     createElement(
//       'p',
//       document.createTextNode('Hello, world!!!'),
//       document.createTextNode('Hello, world'),
//     ),
//     createElement(
//       'p',
//       document.createTextNode('Hi!'),
//     ),
//   ),
// );

// document.getElementById('app').appendChild(
//   createElement(
//     'div',
//     { id: 'root' },
//     createElement(
//       'p',
//       null,
//       ...[1, 2, 3].map((number) => (
//         document.createTextNode(`Hello, world!!! ${number} | `)
//       )),
//     ),
//     createElement(
//       'p',
//       null,
//       document.createTextNode('Hi!'),
//     ),
//   ),
// );

const data = [
  {
    name: 'jinmok',
    age: 32,
  }, {
    name: 'jinmok',
    age: 32,
  },
];

document.getElementById('app').appendChild(
  createElement(
    'ul',
    { className: 'lalala' },
    data.map(({ name, age }) => (createElement(
      'li',
      null,
      `Hello, ${name}. You are ${age} years old`,
    ))),
  ),
);
