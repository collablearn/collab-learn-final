import { getContext, setContext } from "svelte";
import { writable, type Writable } from "svelte/store";

interface StaticSate {
    isRegistering: boolean
    isResetting: boolean
    isVerifying: boolean
    isUpdating: boolean
}

export const setStaticState = (state: StaticSate) => {
    let stateGenerator = writable<StaticSate>(state);
    setContext("staticState", stateGenerator);
}

export const getStaticState = () => {
    return getContext<Writable<StaticSate>>("staticState");
}

