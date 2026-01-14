export interface UserType {
    id: string,
    username: string,
    password: string,
    balance: number
}

export interface AppSlicepType {
    currentUser: UserType | null,
    loading: boolean
}

export interface CheckUserType {
    result: boolean,
    currentUser: UserType | null
}