import "./App.css";
import Page from "./Page";
import { Theme } from "@radix-ui/themes";
import { DndProvider } from "react-dnd";
import { Provider } from "react-redux";
import store from "./store";
import { HTML5Backend } from "react-dnd-html5-backend";

function App() {
  return (
    <Provider store={store}>
      <DndProvider backend={HTML5Backend}>
        <div className="App">
          <header className="App-header">
            <Theme>
              <Page />
            </Theme>
          </header>
        </div>
      </DndProvider>
    </Provider>
  );
}

export default App;
