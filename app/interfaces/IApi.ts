import { Dispatch, SetStateAction } from "react"

export interface ApiGetInterface {
    url: string
    headers?: any
    loader?: boolean 
    params?: any
    signal?: any
    setLoader?: Dispatch<SetStateAction<boolean>>
}

export interface ApiPostInterface {
    url: string
    headers?: any
    body?: any
    setLoader?: Dispatch<SetStateAction<boolean>>
}

export interface ReturnApiInterface {
    error: boolean
    data?: [] | any
    message?: string
    messageDetails?: any | string[]
    loader?: boolean 
    errorDescription: any
}