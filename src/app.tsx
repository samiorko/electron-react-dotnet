import { ipcRenderer } from "electron";
import * as React from "react"
import * as ReactDOM from "react-dom"


const App: React.FC = () => {
  const [name, setName] = React.useState("");
  const [data, setData] = React.useState("");

  const handleClick = async () => {
    setName("");
    ipcRenderer.send("say-hello", name);
  }

  
  React.useEffect(() => {
    const listener = (event: Electron.IpcRendererEvent, response: string) => {
      setData(x => x + response);
    }

    ipcRenderer.on("data-from-backend", listener);

    return () => { ipcRenderer.removeListener("data-from-backend", listener) };
  }, [])

  return <div>
    <input 
      type="text" 
      value={name}
      onChange={e => setName(e.target.value)}
    />
    <button
      onClick={handleClick}
      disabled={!name}
    >
      Send
    </button>

    <h2>data:</h2>
    <div>
      <pre>
        { data }
      </pre>
    </div>
  </div>
}

ReactDOM.render(<App />, document.getElementById("app"))


