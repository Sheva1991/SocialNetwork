export type photosType = {
    small: string | null,
    large: string | null
}

export type ContactsType = {
    github: string
    vk: string
    facebook: string
    instagram: string
    twitter: string
    website: string
    youtube: string
    mainLink: string
}

export type profileType = {
    userId: number
    lookingForAJob: boolean
    lookingForAJobDescription: string
    fullName: string
    contacts: ContactsType
    photos: photosType
    aboutMe: string
}
export type usersType = {
    id: number,
    name: string,
    status: string,
    photos: photosType
    followed: boolean
}

export type PostType = {
    id: number
    message: string
    count: number
}