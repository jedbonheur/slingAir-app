import React from "react";
import ReactDOM from "react-dom";
import { BrowserRouter} from "react-router-dom";
import { AppContextProvider } from './AppContext'
import App from "./components/App";


ReactDOM.render(
  <React.StrictMode>
    <BrowserRouter >
    <AppContextProvider>
      <App />
    </AppContextProvider>
    </BrowserRouter> 
  </React.StrictMode>,
  document.getElementById("root")
);
