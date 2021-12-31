import { configureStore } from "@reduxjs/toolkit";
import { reducer as accountReducer } from "./accountState";
import { reducer as appReducer } from "./appState";
import { reducer as pendingTxnReducer } from "./pendingTxnState";


const store = configureStore({
  reducer: {
    account: accountReducer,
    app: appReducer,
    pendingTransactions: pendingTxnReducer,
  },
  middleware: getDefaultMiddleware => getDefaultMiddleware({ serializableCheck: false }), // Need this to store BigNumber

});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
export default store;
