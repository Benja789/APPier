import { useState } from "react";
import { AppContextProvider, IModalNotification, IOrder, ISettings, ISnackNotification, IUser } from "../interfaces/IAppContext";

interface Props {
    children: React.ReactNode;
}
const AppContext = ( { children }: Props ) => {
    const [ user, setUser ] = useState<IUser | null>(null)
    const [ order, setOrder ] = useState<IOrder | null>(null)
    const [ settings, setSettings ] = useState<ISettings>({
        appVersion: '0.0.1',
        numberVersion: 1
    })
    const [ modalNotification, setModalNotification ] = useState<IModalNotification>({
        title: '',
        message: '',
        open: false,
        type: 'info',
        showAgree: false,
        showDisagree: false
    })
    const [ snackNotification, setSnackNotification ] = useState<ISnackNotification>({
        message: '',
        open: false,
        type: 'info'
    })

    const formatedPrice = ( number: number ) => (Math.round(number * 100) /100 ).toFixed(2)

    const values = {
        user,
        setUser,
        order,
        setOrder,
        settings,
        setSettings,
        formatedPrice,
        modalNotification,
        setModalNotification,
        snackNotification,
        setSnackNotification
    }
    return( 
        <AppContextProvider.Provider value={values}>
            { children }
        </AppContextProvider.Provider>
    )
}

export default AppContext