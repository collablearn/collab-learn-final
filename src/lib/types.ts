export interface ResultModel<T> {
    status: number
    type: string
    data: T
}

export type ProjectTypes = {
    imageUrl: string
    hostName: string
    maxUsers: number
    projectName: string
    projectDescription: string
    isPrivate: boolean
    onlineCount: number
};

export type GuildTypes = {
    imageUrl: string
    hostName: string
    maxUsers: number
    guildName: string
    guildDescription: string
    isPrivate: boolean
    joinedCount: number
}