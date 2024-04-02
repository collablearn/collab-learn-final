import { getContext, setContext } from "svelte";
import { writable, type Writable } from "svelte/store";
import type { CreatedGuildReference, UserReference } from "./types";


// for static store
interface StaticStateTypes {
    isRegistering: boolean
    isResetting: boolean
    isVerfying: boolean
    isUpdating: boolean
    email: string
}


export const setStaticState = (state: StaticStateTypes) => {
    let stateGenerator = writable(state);
    setContext("staticState", stateGenerator);
};

export const getStaticState = () => getContext<Writable<StaticStateTypes>>("staticState");



// for auth store
interface AuthStateStoreTypes {
    activeItem: string

    projects: {
        joinedProject: boolean
        showEditTools: boolean
    }

    guilds: {
        createdGuilds: CreatedGuildReference[] | null
        joinedGuild: boolean
        guildObj: GuildTypes | null

    }
}

// for authenticated nav store
export const setAuthState = (state: AuthStateStoreTypes) => {
    let stateGenerator = writable(state);
    setContext("authState", stateGenerator);
};

export const getAuthState = () => getContext<Writable<AuthStateStoreTypes>>("authState");


export const setUserState = (state: UserReference | null) => {
    let stateGenerator = writable(state);
    setContext("userState", stateGenerator);
};

// for client session
export const getUserState = () => getContext<Writable<UserReference | null>>("userState");



//for password guide only
export const samplePasswords = [
    "9Yp@5Qm#7Lx!3Wn$1F",
    "@4Wm*8Hn!2Bp#6Qs$3L",
    "7Zl$3Gn#5Hs@1Qm*8P",
    "*2Kl#6Pm$9Xn@4Fb!7R",
    "3Wb$8Mn@5Xl#2Qs*6P",
    "#1Dm!4Vn$7Ws*9Rb@5G",
    "6Sb$9Cn@3Vl#7Zm*2W",
    "5Lm#8Hn$2Bp@6Ws!4G",
    "3Qp@7Mw#4Tn*9Bm$5L",
    "@2Nl$6Xn#9Dm*3Wp!8F",
    "1Gs!4Lb@7Tn$5Mw#8Q",
    "$5Fn*2Hs@8Dm#3Lp!7R",
    "7Pm#4Bs$6Nw@9Ls!2T",
    "*9Ln!3Gp$7Wb@5Vm#1R",
    "2Rb$6Nl@8Gs#4Wm*9Q",
    "4Wn@9Lp$3Zm#7Xb*1G",
    "#8Mn!5Bp$2Ws@6Rm*4H",
    "6Zm$9Pn@4Bs#7Wl*3V",
    "3Ls#7Rn$1Km@4Vb!9P",
    "$6Jm@3Np#9Ts*5Lb!2W"
]
