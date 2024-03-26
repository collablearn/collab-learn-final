import { getContext, setContext } from "svelte";
import { writable, type Writable } from "svelte/store";

// for static store
interface StaticStateTypes {
    isRegistering: boolean
    isResetting: boolean
    isVerfying: boolean
    isUpdating: boolean
}

// for auth store
interface AuthStateStore {
    activeItem: string

    projects: {
        joinedProject: boolean
    }
    joinedGuild: boolean

}

export const setStaticState = (state: StaticStateTypes) => {
    let stateGenerator = writable(state);
    setContext("staticState", stateGenerator);
};

export const getStaticState = () => {
    return getContext<Writable<StaticStateTypes>>("staticState");
}


// for authenticated nav store
export const setAuthState = (state: AuthStateStore) => {
    let stateGenerator = writable(state);
    setContext("authState", stateGenerator);
};

export const getAuthState = () => {
    return getContext<Writable<AuthStateStore>>("authState");
}


