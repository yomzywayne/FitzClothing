import { createSlice } from "@reduxjs/toolkit";

const appConfigSlice = createSlice({
  name: "appConfig",
  initialState: {
    appConfig: null,
  },
  reducers: {
    setAppConfig: (state, action) => {
      state.appConfig = action.payload;
    },
  },
});

export const { setAppConfig } = appConfigSlice.actions;
export default appConfigSlice.reducer;