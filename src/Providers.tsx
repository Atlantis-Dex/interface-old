import React from "react";
import { Web3ReactProvider } from "@web3-react/core";
import { Provider } from "react-redux";
import { Web3Provider } from "@ethersproject/providers";
import { POLLING_INTERVAL } from "./constants/connectors";
import store from "./state/store";

// eslint-disable-next-line @typescript-eslint/no-explicit-any
function getLibrary(provider: any): Web3Provider {
  const library = new Web3Provider(provider);
  library.pollingInterval = POLLING_INTERVAL;
  return library;
}

interface Props {
	children?: JSX.Element
}

export default function Providers(props: Props): JSX.Element {
  return (
    <>
      <Web3ReactProvider getLibrary={getLibrary}>
        <Provider store={store}>
          {props?.children}
        </Provider>
      </Web3ReactProvider>
    </>
  );
}
