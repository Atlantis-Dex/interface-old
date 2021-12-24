import { EtherscanProvider, JsonRpcProvider, StaticJsonRpcProvider, Web3Provider } from "@ethersproject/providers";
import { createSlice, createSelector, createAsyncThunk } from "@reduxjs/toolkit";
import { BigNumber, ethers } from "ethers";
import { SupportedChainId } from "../constants/chains";
import { RootState } from "./store";
import { tokens } from "../contracts/contracts";
import { GOHM } from "../typechain";



interface IAsyncThunk {
    readonly chainId: SupportedChainId;
    readonly provider: Web3Provider;
    readonly account: string;
}

// TODO (zx): Fix discrepency between This, interfaces/TokenData, contracts/contracts, data/tokens
interface ITokenData {
    [key: string]: BigNumber
}

export interface IAccountData {
    readonly loading: boolean;
    readonly tokens?: ITokenData;
}

const initialState: IAccountData = {
  loading: false
};


export const loadAccount = createAsyncThunk(
  "account/loadAccount",
  async ({ chainId, provider, account }: IAsyncThunk) => {
    console.log("getting account data");

    const gOhmContract = new ethers.Contract(tokens.gOHM[chainId], tokens.gOHM.abi, provider) as GOHM;
    const gOHMBalance = await gOhmContract.balanceOf(account);
    
    return { tokens: { "gohm": gOHMBalance } };
  },
);

  
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
        state.tokens = action.payload.tokens;
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
  
  