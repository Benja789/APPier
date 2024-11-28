import { createContext, Dispatch, SetStateAction } from "react"

export interface IUser {
    id: string
    name: string
    email: string
    role: string
    token: string
}

export interface IOrder {
    tablenumber: number
    products: any[]
    clientName: string
    subTotal: number
    subTotalWithDiscount: number
    discount: number
    discountCash: number
    tip: number
    tipCash: number
    total: number
    status: string
    typePayment: string
}

export interface ISettings {
    appVersion: string
    numberVersion: number
}

export interface IModalNotification {
    title: string
    message: string
    open: boolean
    type: 'success' | 'error' | 'warning' | 'info'
    callBack?: () => void
    errorCallBack?: () => void
    showAgree: boolean
    showDisagree: boolean
}

export interface ISnackNotification {
    message: string
    open: boolean
    type: 'success' | 'error' | 'warning' | 'info'
    callBack?: () => void
    errorCallBack?: () => void
}

export interface IContext {
    user: IUser | null
    setUser: Dispatch<SetStateAction<IUser | null>>

    order: IOrder | null
    setOrder: Dispatch<SetStateAction<IOrder | null>>

    settings: ISettings
    setSettings: Dispatch<SetStateAction<ISettings>>

    modalNotification: IModalNotification
    setModalNotification: Dispatch<SetStateAction<IModalNotification>>

    formatedPrice: ( number: number ) => string
    snackNotification: ISnackNotification
    setSnackNotification: Dispatch<SetStateAction<ISnackNotification>>
}

export const AppContextProvider = createContext<IContext>({
    user: null,
    setUser: () => {},

    order: null,
    setOrder: () => {},

    settings: {
        appVersion: '',
        numberVersion: 0
    },
    setSettings: () => {},

    modalNotification: {
        title: '',
        message: '',
        open: false,
        type: 'info',
        showAgree: false,
        showDisagree: false
    },
    setModalNotification: () => {},

    snackNotification: {
        message: '',
        open: false,
        type: 'info'
    },
    setSnackNotification: () => {},

    formatedPrice: () => ''
})