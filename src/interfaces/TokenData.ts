import { Token } from "@uniswap/sdk";
import { BigNumber } from "ethers";
export interface ITokenData extends Token {
  balance?: BigNumber;
  allowance?: BigNumber;
}

export interface ITokenMap extends Map<String, ITokenData> {}
