"use client";

import { Provider } from "react-redux";
import store from "./store";
import { useEffect, useState } from "react";
import { loadState, saveState } from "./localStorage";

export default function ReduxProvider({ children }) {
    const [ready, setReady] = useState(false);

    useEffect(() => {
        const saved = loadState();

        // ===== RESTORE SAVED CART & WISHLIST =====
        if (saved?.cart) {
            store.dispatch({
                type: "cart/replaceState",
                payload: saved.cart,
            });
        }

        if (saved?.wishlist) {
            store.dispatch({
                type: "wishlist/replaceState",
                payload: saved.wishlist,
            });
        }
        // ==========================================

        // ===== SAVE BOTH STATES WHENEVER STORE CHANGES =====
        store.subscribe(() => {
            saveState({
                cart: store.getState().cart,
                wishlist: store.getState().wishlist,
            });
        });
        // ====================================================

        setReady(true);
    }, []);

    if (!ready) return null;

    return <Provider store={store}>{children}</Provider>;
}
