import { getContext, setContext } from "svelte";
import { writable, type Writable } from "svelte/store";

// for static store
interface StaticStateTypes {
    isRegistering: boolean
    isResetting: boolean
    isVerfying: boolean
    isUpdating: boolean
}

export const setStaticState = (state: StaticStateTypes) => {
    let stateGenerator = writable(state);
    setContext("staticState", stateGenerator);
};

export const getStaticState = () => {
    return getContext<Writable<StaticStateTypes>>("staticState");
}


// for authenticated nav store
export const setActiveItem = (state: string) => {
    let stateGenerator = writable(state);
    setContext("activeItem", stateGenerator);
};

export const getActiveItem = () => {
    return getContext<Writable<string>>("activeItem");
}
