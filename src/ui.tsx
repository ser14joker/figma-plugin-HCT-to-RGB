import * as React from "react";
import * as ReactDOM from "react-dom";
import "./ui.css";
// import { Hct, hexFromArgb } from '@material/material-color-utilities';

declare function require(path: string): any;

function App() {
  const hueInputRef = React.useRef<HTMLInputElement>(null);
  const chromaInputRef = React.useRef<HTMLInputElement>(null);
  const tonaInputRef = React.useRef<HTMLInputElement>(null);

  // React.useEffect(()=>{
  //   console.log(Hct);
  // }, [])

  const onCreate = () => {
    const huevalue = Number(hueInputRef.current?.value || 0);
    const chromavalue = Number(chromaInputRef.current?.value || 0);
    const tonevalue = Number(tonaInputRef.current?.value || 0);
    parent.postMessage(
      {
        pluginMessage: {
          type: "create-color",
          huevalue,
          chromavalue,
          tonevalue,
        },
      },
      "*"
    );
  };

  const onCancel = () => {
    parent.postMessage({ pluginMessage: { type: "cancel" } }, "*");
  };

  return (
    <main>
      <header>
        <img src={require("./logo.svg")} />
        <h2>HCT color picker</h2>
      </header>
      <section>
        <label htmlFor="hue">Hue</label>
        <input id="hue" type="text" ref={hueInputRef} />

        <label htmlFor="chroma">Chroma</label>
        <input id="chroma" type="text" ref={chromaInputRef} />

        <label htmlFor="tone">Tone</label>
        <input id="tone" type="text" ref={tonaInputRef} />
      </section>
      <footer>
        <button className="brand" onClick={onCreate}>
          Fill
        </button>
        <button onClick={onCancel}>Cancel</button>
      </footer>
    </main>
  );
}

ReactDOM.render(<App />, document.getElementById("container"));
