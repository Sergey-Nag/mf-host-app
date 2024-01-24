import { createAction, createSlice } from "@reduxjs/toolkit";
import { HYDRATE } from 'next-redux-wrapper';
import { AppState } from "./store";

interface SessionState {
    cart: Record<string, number>;
}

const initialState: SessionState = {
    cart: {},
}

const hydrateAction = createAction<AppState>(HYDRATE);

export const sessionSlice = createSlice({
    name: 'session',
    initialState,
    reducers: {
        addProduct(state, { payload }: { payload: { id: string, amount: number } }) {
            state.cart[payload.id] = state.cart[payload.id]
                ? state.cart[payload.id] + payload.amount
                : payload.amount;
        },
        removeProduct(state, { payload }: { payload: { id: string, amount?: number } }) {
            if (!payload.amount) {
                delete state.cart[payload.id];
                return;
            }

            state.cart[payload.id] -= payload.amount;
        },
        clearCart(state) {
            state.cart = {};
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


export const { addProduct, removeProduct, clearCart } = sessionSlice.actions;

export const selectSessionState = (state: AppState) => state.session;

export default sessionSlice.reducer;