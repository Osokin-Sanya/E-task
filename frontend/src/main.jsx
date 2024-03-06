import React from "react";
import ReactDOM from "react-dom/client";
import { Provider } from "react-redux";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";

import store from "./redux/store";

import "./index.css";
import Ordering from "./pages/ordering";
import Main from "./App";
import { MapContextProvider } from "../src/utils/Context";

ReactDOM.createRoot(document.getElementById("root")).render(
  <MapContextProvider>
    <Router>
      <Provider store={store}>
        <Routes>
          <Route path="/" element={<Main />} />
          <Route path="/ordering" element={<Ordering />} />
        </Routes>
      </Provider>
    </Router>
  </MapContextProvider>
);
