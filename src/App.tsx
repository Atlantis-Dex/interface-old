import React, { useEffect } from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route
} from "react-router-dom";
import { useWeb3React } from "@web3-react/core";
import { StaticJsonRpcProvider, Web3Provider } from "@ethersproject/providers";

import { library } from "@fortawesome/fontawesome-svg-core";
import { fas } from "@fortawesome/free-solid-svg-icons";
import { ToastContainer } from "react-toastify";
import { loadApp } from "./state/appState";
import { loadAccount } from "./state/accountState";
import "./assets/scss/styles.scss";
import "react-toastify/dist/ReactToastify.css";

import Navbar from "./components/Navbar";
import Home from "./pages/Home";
import Swap from "./pages/Swap";
import Farm from "./pages/Farm";
import useEagerConnect from "./hooks/useEagerConnect";
import Bootstrap from "./pages/Bootstrap/Bootstrap";
import { useDispatch } from "react-redux";

// add fontawesome icons
library.add(fas);

export default function App(): JSX.Element {
  useEagerConnect();
  const dispatch = useDispatch();
  const { chainId, account, active, library } = useWeb3React();

  useEffect( () => {
    if (!chainId) return;
    if (!library) return; 
    const castedLibrary = library as Web3Provider;;

    dispatch(loadApp({ chainId , provider: castedLibrary }));
  }, []);


  useEffect( () => {
    if (!chainId) return;
    if (!account) return;  
    if (!active) return; 
    const castedLibrary = library as Web3Provider;;

    dispatch(loadAccount({ chainId, provider: castedLibrary, account }));
  }, [active]);

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
