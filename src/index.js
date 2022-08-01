function createElement(tagName, ...children) {
  const paragraph = document.createElement(tagName);

  children.forEach((child) => {
    paragraph.appendChild(child);
  });

  return paragraph;
}

//

document
  .getElementById("app")
  .appendChild(
    createElement(
      "div",
      createElement(
        "p",
        ...[1, 2, 3].map((i) => document.createTextNode(`Hello, world! ${i} `))
      ),
      createElement("p", document.createTextNode("Hi, world!"))
    )
  );
