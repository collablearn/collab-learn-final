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
        showEditTools: boolean
    }

    guilds: {
        joinedGuild: boolean,

    }

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
    ]
})

