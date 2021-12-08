import React from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route
} from "react-router-dom";

import { library } from "@fortawesome/fontawesome-svg-core";
import { fas } from "@fortawesome/free-solid-svg-icons";
import "./assets/scss/styles.scss";
import "react-toastify/dist/ReactToastify.css";

import Navbar from "./components/Navbar";
import Home from "./pages/Home";
import Swap from "./pages/Swap";
import Farm from "./pages/Farm";
import useEagerConnect from "./hooks/useEagerConnect";
import Bootstrap from "./pages/Bootstrap/Bootstrap";
import { ToastContainer } from "react-toastify";

// add fontawesome icons
library.add(fas);

export default function App(): JSX.Element {
  useEagerConnect();

  return (
    <>
      <Router>
        <>
          <Navbar />
          <main className="app">
            <div className="container">
              <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/bootstrap" element={<Bootstrap />} />
                <Route path="/swap" element={<Swap />} />
                <Route path="/farm" element={<Farm />} />
              </Routes>
            </div>
          </main>
        </>
      </Router>
      <ToastContainer />
    </>
  );
}
