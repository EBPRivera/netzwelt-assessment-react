import { BrowserRouter } from "react-router-dom";

import "./App.css";
import StoreProvider from "./config/StoreProvider";
import Routing from "./config/Routing";

function App() {
  return (
    <div className="App">
      <StoreProvider>
        <BrowserRouter>
          <Routing />
        </BrowserRouter>
      </StoreProvider>
    </div>
  );
}

export default App;
