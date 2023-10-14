import { createAction, createSlice } from "@reduxjs/toolkit";
import { HYDRATE } from 'next-redux-wrapper';
import { AppState } from "./store";

interface SessionState {
    cart: string[]
}

const initialState: SessionState = {
    cart: [],
}

const hydrateAction = createAction<AppState>(HYDRATE);

export const sessionSlice = createSlice({
    name: 'session',
    initialState,
    reducers: {
        addProducts(state, action) {
            state.cart.push(...action.payload);
        },
        removeProducts(state, { payload }) {
            state.cart = state.cart.reduce<string[]>((acc, item) => {
                if (!payload.includes(item)) {
                    acc.push(item);
                }

                return acc;
            }, []);
        }
    },
    extraReducers: (builder) => {
        builder.addCase(
            hydrateAction, (state, action) => {
                return {
                    ...state,
                    ...action?.payload?.session,
                }
            }
        );
    }
})


export const { addProducts, removeProducts } = sessionSlice.actions;

export const selectSessionState = (state: AppState) => state.session;

export default sessionSlice.reducer;