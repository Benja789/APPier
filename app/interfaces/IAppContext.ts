import { createContext, Dispatch, SetStateAction } from "react"

export interface IUser {
    id: string
    name: string
    email: string
    role: string
    token: string
    uid: string
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
    taxes: number
    tipCash: number
    total: number
    status: string
    id: any
    number: any
    typePayment: string
    typeDocument: "COF" | "CRF" | "TKT" | "IVAEXE"
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
    drawer: any

    loader: boolean
    setLoader: Dispatch<SetStateAction<boolean>>

    order: IOrder | null
    setOrder: Dispatch<SetStateAction<IOrder | null>>

    openModalChangeDocument: boolean
    setOpenModalChangeDocument: Dispatch<SetStateAction<boolean>>

    settings: ISettings
    setSettings: Dispatch<SetStateAction<ISettings>>
    addDish: (dish: any) => void
    deleteDish: (dish: any) => void
    setDish: (dish: any) => void
    changeQuantity: (dish: any, type: '-' | '+') => void

    modalNotification: IModalNotification
    setModalNotification: Dispatch<SetStateAction<IModalNotification>>

    formatedPrice: ( number: number ) => string
    snackNotification: ISnackNotification
    setSnackNotification: Dispatch<SetStateAction<ISnackNotification>>

    calculateTotals: () => void
}

export const AppContextProvider = createContext<IContext>({
    user: null,
    setUser: () => {},

    loader: false,
    setLoader: () => {},

    order: null,
    setOrder: () => {},

    openModalChangeDocument: false,
    setOpenModalChangeDocument: () => {},

    drawer: null,
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

    formatedPrice: () => '',
    addDish: () => {},
    deleteDish: () => {},
    setDish: () => {},
    changeQuantity: () => {},
    calculateTotals: () => {}
})