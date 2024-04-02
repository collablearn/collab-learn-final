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

//user_list_tb
export type UserReference = {
    id: number
    created_at: string
    user_id: string
    user_email: string
    user_fullname: string
    user_photo_link: string
    user_bio: string
    user_address: string
    user_barangay: string
    user_city: string
    user_religion: string
    user_contact: string
}

//created_guild_tb
export type CreatedGuildReference = {
    id: number
    created_at: string
    user_id: string
    host_name: string
    is_private: boolean
    guild_name: string
    max_users: number
    joined_count: number
    description: string
    passcode: string
    image_url: string
}