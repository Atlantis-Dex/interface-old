import { SupportedChainId } from "../constants/chains";
import { abi as gOHMAbi } from "./abis/gOHM.json";

export const tokens = {
  gOHM: {
    [SupportedChainId.MAINNET]: "0x0ab87046fBb341D058F17CBC4c1133F25a20a52f",
    [SupportedChainId.RINKEBY]: "0x70699eae51C0068917dE7Ce689C2dC3b2B074C1F",
    abi: gOHMAbi
  },
};

export const protocols = {
  atlantisSwap: {
    [SupportedChainId.MAINNET]: "0x0",
    [SupportedChainId.RINKEBY]: "0x0",
  },
};
