import { getContext, setContext } from "svelte";
import { writable, type Writable } from "svelte/store";
import type { CreatedGuildReference, CreatedModuleReference, CreatedProjectReference, GuildChatReference, GuildWallReference, JoinedGuildReference, JoinedProjectReference, ModuleCommentsReference, SearchStoreModel, UserReference } from "./types";


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
export interface AuthStateStoreTypes {
    activeItem: string

    projects: {
        joinedProject: boolean
        showEditTools: boolean
        showSettings: boolean
        createdProjects: CreatedProjectReference[] | null
        projectObj: CreatedProjectReference | null
        joinedProjectArray: JoinedProjectReference[] | null
    }

    guilds: {
        createdGuilds: CreatedGuildReference[] | null
        joinedGuild: boolean
        guildObj: CreatedGuildReference | null
        guildNotes: GuildWallReference[] | null
        guildNoteObj: GuildWallReference | null
        guildChats: GuildChatReference[] | null
        joinedGuildArray: JoinedGuildReference[] | null
    }

    modules: {
        createdModules: CreatedModuleReference[] | null
        moduleObj: CreatedModuleReference | null
        showModule: boolean
        moduleComments: ModuleCommentsReference[] | null
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


export const mockDatas = writable({
    projects: [
        {
            imageUrl: '',
            projectName: 'Registration Hub',
            projectDescription:
                'A comprehensive system for managing student enrollment processes efficiently.',
            isPrivate: true,
            onlineCount: 10,
            maxUsers: 50,
            hostName: 'Rodrigo'
        },

        {
            imageUrl: '',
            projectName: 'Student Management System',
            projectDescription:
                'An integrated platform to oversee various aspects of student administration and enrollment.',
            isPrivate: false,
            onlineCount: 3,
            maxUsers: 30,
            hostName: 'Tigrel'
        },

        {
            imageUrl: '',
            projectName: 'Enrollment Nexus',
            projectDescription:
                'A centralized hub connecting students, faculty, and administrative staff for streamlined enrollment procedures.',
            isPrivate: false,
            onlineCount: 2,
            maxUsers: 50,
            hostName: 'Granger'
        },

        {
            imageUrl: '',
            projectName: 'Academic Records Keeper',
            projectDescription:
                'A digital repository for maintaining accurate and up-to-date academic records, including enrollment data.',
            isPrivate: false,
            onlineCount: 0,
            maxUsers: 50,
            hostName: 'Kimmy'
        },

        {
            imageUrl: '',
            projectName: 'Registration Central',
            projectDescription:
                'The go-to platform for all enrollment-related activities, ensuring ease of access and smooth operations.',
            isPrivate: true,
            onlineCount: 10,
            maxUsers: 50,
            hostName: 'Vexana'
        },

        {
            imageUrl: '',
            projectName: 'Enrollment Gateway',
            projectDescription:
                ' An intuitive portal facilitating seamless enrollment procedures for students and administrators alike.',
            isPrivate: true,
            onlineCount: 3,
            maxUsers: 30,
            hostName: 'Lesley'
        },

        {
            imageUrl: '',
            projectName: 'Enrollment System',
            projectDescription: 'To make enrollment online ',
            isPrivate: false,
            onlineCount: 2,
            maxUsers: 50,
            hostName: ''
        },

        {
            imageUrl: '',
            projectName: 'Student Enrollment Porta',
            projectDescription:
                'A user-friendly interface empowering students to navigate enrollment processes efficiently.',
            isPrivate: false,
            onlineCount: 0,
            maxUsers: 50,
            hostName: 'Balmond'
        },

        {
            imageUrl: '',
            projectName: 'Academic Hub Manager',
            projectDescription:
                'A versatile tool for managing diverse academic functions, including enrollment management and record-keeping.',
            isPrivate: false,
            onlineCount: 1,
            maxUsers: 50,
            hostName: 'Hayabusa'
        }
    ],

    guilds: [
        {
            imageUrl: '',
            guildName: 'Hellenic Scholar Society',
            guildDescription:
                "A society dedicated to scholarly pursuits focused on ancient Greek civilization and culture.",
            isPrivate: true,
            joinedCount: 10,
            maxUsers: 50,
            hostName: 'Rodrigo'
        },

        {
            imageUrl: '',
            guildName: 'Philhellenic Research Institute',
            guildDescription:
                'An institute committed to conducting research and studies aimed at promoting appreciation and understanding of Greek history and traditions.',
            isPrivate: false,
            joinedCount: 3,
            maxUsers: 30,
            hostName: 'Tigrel'
        },

        {
            imageUrl: '',
            guildName: 'Athenas Archive Circle',
            guildDescription:
                'A circle of individuals gathering to preserve and explore knowledge related to Athena, the Greek goddess of wisdom and warfare.',
            isPrivate: false,
            joinedCount: 2,
            maxUsers: 50,
            hostName: 'Granger'
        },

        {
            imageUrl: '',
            guildName: 'Olympian Historiography Guild',
            guildDescription:
                'A guild specializing in the study and documentation of historical events and narratives pertaining to the Olympian gods and goddesses.',
            isPrivate: false,
            joinedCount: 0,
            maxUsers: 50,
            hostName: 'Kimmy'
        },

        {
            imageUrl: '',
            guildName: 'Parthenon Research Consortium',
            guildDescription:
                'A consortium engaged in research endeavors concerning the Parthenon, an iconic ancient Greek temple located in Athens.',
            isPrivate: true,
            joinedCount: 10,
            maxUsers: 50,
            hostName: 'Vexana'
        },

        {
            imageUrl: '',
            guildName: 'Delphic Historians Association',
            guildDescription:
                'An association dedicated to the exploration and interpretation of historical records and artifacts associated with the Oracle of Delphi.',
            isPrivate: true,
            joinedCount: 3,
            maxUsers: 30,
            hostName: 'Lesley'
        },

        {
            imageUrl: '',
            guildName: 'Spartan Scholar Society',
            guildDescription: 'A society emphasizing rigorous academic pursuits and intellectual endeavors inspired by the ethos of ancient Sparta.',
            isPrivate: false,
            joinedCount: 2,
            maxUsers: 50,
            hostName: ''
        },

        {
            imageUrl: '',
            guildName: 'Muses of Mythos Research Group',
            guildDescription:
                'A research group focusing on the myths and legends of ancient Greece, guided by the inspiration of the Muses.',
            isPrivate: false,
            joinedCount: 0,
            maxUsers: 50,
            hostName: 'Balmond'
        },

        {
            imageUrl: '',
            guildName: 'Helios Historiographers Union',
            guildDescription:
                'A union of historians and scholars dedicated to shedding light on various aspects of Greek history, culture, and civilization, inspired by Helios, the sun god.',
            isPrivate: false,
            joinedCount: 1,
            maxUsers: 50,
            hostName: 'Hayabusa'
        }
    ]
});


//search stores
export const createSearchStore = <T extends Record<PropertyKey, any>>(data: T[]) => {
    const { subscribe, set, update } = writable<SearchStoreModel<T>>({
        data,
        filtered: data,
        search: "",
    });

    return {
        subscribe, set, update
    };
};

export const searchHandler = <T extends Record<PropertyKey, any>>(store: SearchStoreModel<T>) => {
    const searchTerm = store.search.toLowerCase() || "";
    store.filtered = store.data.filter((item) => {
        return item.searchTerms.toLowerCase().includes(searchTerm);
    })

}