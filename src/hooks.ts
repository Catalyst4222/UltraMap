import { createContext, useContext, useState } from "react";
import { state } from "./data";
import { State } from "./types";

export const StateContext = createContext(state);
export const RefreshContext = createContext<(() => void) | undefined>(
    undefined
);

export function useGameState(): [State, () => void] {
    const state = useContext(StateContext);
    const refresh = useRefresh();

    return [state, refresh];
}

export function useRefresh(): () => void {
    const refresh = useContext(RefreshContext);

    if (!refresh) {
        const [, setState] = useState(0);
        return () => setState((x) => x + 1);
        // throw new Error(
        //     "No refresh function found, check that a parent uses `RefreshContext.Provider`"
        // );
    }

    return refresh;
}
