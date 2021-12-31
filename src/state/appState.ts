import { JsonRpcProvider, StaticJsonRpcProvider, Web3Provider } from "@ethersproject/providers";
import { createSlice, createSelector, createAsyncThunk } from "@reduxjs/toolkit";
import { SupportedChainId } from "../constants/chains";
import { RootState } from "./store";


export interface IAsyncThunk {
    readonly chainId: SupportedChainId;
    readonly provider: Web3Provider;
  }

export interface IAppData {
    readonly loading: boolean;
    readonly farms?: string[];
}



export const loadApp = createAsyncThunk(
  "app/loadApp",
  async ({ chainId, provider }: IAsyncThunk) => {
    console.log(chainId, provider, "Loading App Data");
    return { farms: [] };
  },
);

  
const initialState: IAppData = {
  loading: false,
};

const appSlice = createSlice({
  name: "app",
  initialState,
  reducers: {
    fetchAppSuccess(state, action) {
      console.log("SUCCESS!, what do i do here? ");
    },
  },
  extraReducers: builder => {
    builder
      .addCase(loadApp.pending, state => {
        state.loading = true;
      })
      .addCase(loadApp.fulfilled, (state, action) => {
        state.farms = action.payload.farms;
        state.loading = false;
      })
      .addCase(loadApp.rejected, (state, { error }) => {
        state.loading = false;
        console.error(error.name, error.message, error.stack);
      });
  },
});



  
const baseInfo = (state: RootState) => state.app;
export const getAppState = createSelector(baseInfo, app => app);
  
export const { reducer } = appSlice;
export const { fetchAppSuccess } = appSlice.actions;
  
  