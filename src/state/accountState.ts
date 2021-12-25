import { Web3Provider } from "@ethersproject/providers";
import { createSlice, createSelector, createAsyncThunk } from "@reduxjs/toolkit";
import { BigNumber, ethers } from "ethers";
import { RootState } from "./store";
import { allTokens, getTokensForChainId, protocols } from "../contracts";
import { ITokenMap } from "../interfaces/TokenData";
import { ERC20 } from "../typechain";
import { ChainId } from "@uniswap/sdk";
import { ERC20__factory } from "../typechain/factories/ERC20__factory";

interface IAsyncThunk {
  readonly chainId: ChainId;
  readonly provider: Web3Provider;
  readonly account: string;
}

// TODO (zx): Fix discrepency between This, interfaces/TokenData, contracts/contracts, data/tokens
export interface IAccountData {
  readonly loading: boolean;
  readonly tokens?: ITokenMap;
}

const initialState: IAccountData = {
  loading: false,
};

export const loadAccount = createAsyncThunk(
  "account/loadAccount",
  async ({ chainId, provider, account }: IAsyncThunk) => {
    const tokens = getTokensForChainId(chainId, allTokens);
    if (tokens.length == 0) return { tokens: {} };

    const tokenPromises = tokens.map(async token => {
      const tokenContract = new ethers.Contract(token.address, ERC20__factory.abi, provider) as ERC20;
      const balance = await tokenContract.balanceOf(account);
      // Uncomment after wiring up protocol
      // const allowance = tokenContract.allowance(account, protocols.atlantisSwap[chainId]);
      const allowance = BigNumber.from(420);
      return { token, balance, allowance };
    });
    const tokenData = await Promise.all(tokenPromises);

    let tokenState: ITokenMap = {};
    tokenData.forEach(token => {
      if (!token.token.symbol) return;
      tokenState[token.token.symbol] = token;
    });

    return { tokens: tokenState };
  },
);

// Load app
// Load mainnet addresses
// load balances

const accountSlice = createSlice({
  name: "account",
  initialState,
  reducers: {
    fetchAccountSuccess(state, action) {
      console.log("Account SUCCESS!, what do i do here? ");
    },
  },
  extraReducers: builder => {
    builder
      .addCase(loadAccount.pending, state => {
        state.loading = true;
      })
      .addCase(loadAccount.fulfilled, (state, action) => {
        state.tokens = action?.payload.tokens;
        state.loading = false;
      })
      .addCase(loadAccount.rejected, (state, { error }) => {
        state.loading = false;
        console.error(error.name, error.message, error.stack);
      });
  },
});

const baseInfo = (state: RootState) => state.account;
export const getAccountState = createSelector(baseInfo, account => account);
export const { reducer } = accountSlice;
export const { fetchAccountSuccess } = accountSlice.actions;
