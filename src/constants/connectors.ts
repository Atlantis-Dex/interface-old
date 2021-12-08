import { InjectedConnector } from "@web3-react/injected-connector";

import { SupportedChainId } from "./chains";
import { ConnectorNames } from "./connectorNames";

// MAYBE DONT NEED THIS
export const POLLING_INTERVAL = 12000;

const RPC_URLS: { [chainId: number]: string } = {
  [SupportedChainId.MAINNET]: process.env.RPC_URL_1 as string,
  [SupportedChainId.RINKEBY]: process.env.RPC_URL_4 as string,
};

export const injected = new InjectedConnector({ supportedChainIds: [1, 3, 4, 5, 42] });

export const ConnectorsByName = {
  [ConnectorNames.Injected]: injected,
};
