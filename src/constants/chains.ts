import { ChainId } from "@uniswap/sdk";

export enum SupportedChainId {
  MAINNET = ChainId.MAINNET,
  RINKEBY = ChainId.RINKEBY,
}

export const connectorConfig = {
  injected: {
    //allows you to connect and switch between mainnet and rinkeby within Metamask.
    chainId: [SupportedChainId.MAINNET, SupportedChainId.RINKEBY],
  },
  fortmatic: {
    chainId: [1],
    apiKey: "",
  },
  portis: {
    dAppId: "test-app",
    chainId: [1],
  },
  walletconnect: {
    rpc: {
      1: "https://mainnet.infura.io/v3/a0d8c94ba9a946daa5ee149e52fa5ff1",
      4: "https://rinkeby.infura.io/v3/a0d8c94ba9a946daa5ee149e52fa5ff1",
    },
    bridge: "https://bridge.walletconnect.org",
    pollingInterval: 12000,
  },
};
