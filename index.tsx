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

const states = [];
let stateCursor = 0;

const useState = (initialState) => {
  const FROZEN_CURSOR = stateCursor;
  states[FROZEN_CURSOR] = states[FROZEN_CURSOR] || initialState;

  const setState = (newState) => {
    states[FROZEN_CURSOR] = newState;
    rerender();
  }
  stateCursor++;

  return [states[FROZEN_CURSOR], setState];
}

const App = () => {
  const [name, setName] = useState("Ameet");
  const [count, setCount] = useState(0);
  return (
    <div className="hello">
      <h1>Hello {name}</h1>
      <input
        type="text"
        placeholder="Person"
        value={name}
        onchange={e => setName(e.target.value)}
      />
      <p>The count is {count}</p>
      <button onclick={() => setCount(count + 1)}>+</button>
      <button onclick={() => setCount(count - 1)}>-</button>
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

const rerender = () => {
  stateCursor = 0;
  document.querySelector('#app').firstChild.remove();
  render(<App />, document.querySelector("#app"));
}

render(<App />, document.querySelector("#app"));
