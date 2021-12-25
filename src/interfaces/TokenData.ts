import { Token } from "@uniswap/sdk";
import { BigNumber } from "ethers";

export interface ITokenData {
  token?: Token;
  balance?: BigNumber;
  allowance?: BigNumber;
  amount?: BigNumber;
}

export interface ITokenMap extends Map<String, ITokenData> {}
