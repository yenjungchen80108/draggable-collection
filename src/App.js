import "./App.css";
import Page from "./Page";
import { Theme } from "@radix-ui/themes";
import { DndProvider } from "react-dnd";

import { HTML5Backend } from "react-dnd-html5-backend";

function App() {
  return (
    <DndProvider backend={HTML5Backend}>
      <div className="App">
        <header className="App-header">
          <Theme>
            <Page />
          </Theme>
        </header>
      </div>
    </DndProvider>
  );
}

export default App;
