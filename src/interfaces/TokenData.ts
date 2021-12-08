import { Token } from "@uniswap/sdk";
import { BigNumber } from "ethers";

export interface TokenData {
	token?: Token,
	balance?: BigNumber,
	allowance?: BigNumber,
	amount?: BigNumber
}
