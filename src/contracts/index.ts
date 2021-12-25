import { SupportedChainId } from "../constants/chains";
import { ChainId, Token } from "@uniswap/sdk";

export const protocols = {
  atlantisSwap: {
    [SupportedChainId.MAINNET]: "0x0",
    [SupportedChainId.RINKEBY]: "0x0",
  },
};

export const allTokens: Token[] = [
  new Token(ChainId.MAINNET, "0x0ab87046fBb341D058F17CBC4c1133F25a20a52f", 18, "gOHM", "Governance OHM"),
  new Token(ChainId.RINKEBY, "0x70699eae51C0068917dE7Ce689C2dC3b2B074C1F", 18, "gOHM", "Governance OHM"),
];

export const getTokensForChainId = (chainId: ChainId, tokens: Token[]) => {
  return tokens.filter(token => token.chainId == chainId);
};
