const React = {
  createElement: (tag, props, ...children) => {
    if (typeof tag === "function") {
      return tag(props);
    }
    const element = { tag, props: { ...props, children } };
    console.log(element);
    return element;
  }
};

const useState = (initialState) => {
  let state = initialState;
  const setState = (newState) => state = newState;

  return [state, setState];
}

const App = () => {
  const [name, setName] = useState("Ameet");
  return (
    <div className="hello">
      <h1>Hello {name}</h1>
      <input
        type="text"
        placeholder="Person"
        onchange={e => setName(e.target.value)}
      />
      <p>Peepli live</p>
    </div>
  )
};

const render = (reactElementOrStringOrNumber, container) => {
  if (["string", "number"].includes(typeof reactElementOrStringOrNumber)) {
    container.appendChild(
      document.createTextNode(String(reactElementOrStringOrNumber))
    );
    return;
  }
  const actualDomElement = document.createElement(
    reactElementOrStringOrNumber.tag
  );
  if (reactElementOrStringOrNumber.props) {
    Object.keys(reactElementOrStringOrNumber.props)
      .filter(p => p !== "children")
      .forEach(p => (actualDomElement[p] = reactElementOrStringOrNumber.props[p]));
  }

  if (reactElementOrStringOrNumber.props.children) {
    reactElementOrStringOrNumber.props.children.forEach(child =>
      render(child, actualDomElement)
    );
  }

  container.appendChild(actualDomElement);
};

render(<App />, document.querySelector("#app"));
