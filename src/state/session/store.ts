import { Action, ThunkAction, configureStore } from "@reduxjs/toolkit";
import { sessionSlice } from "./sesionSlice";
import { createWrapper } from "next-redux-wrapper";

const makeStore = () =>
    configureStore({
        reducer: {
            [sessionSlice.name]: sessionSlice.reducer,
        },
        devTools: true,
    });

export type AppStore = ReturnType<typeof makeStore>;
export type AppState = ReturnType<AppStore["getState"]>;
export type AppThunk<ReturnType = void> = ThunkAction<
    ReturnType,
    AppState,
    unknown,
    Action
>;

export const wrapper = createWrapper<AppStore>(makeStore);
