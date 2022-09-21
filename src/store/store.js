import { configureStore } from "@reduxjs/toolkit";
import appReducer from "./slices/app-slice";
import accountReducer from "./slices/account-slice";

const store = configureStore({
  reducer: {
    app: appReducer,
    account: accountReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({ serializableCheck: false }),
});
export default store;
