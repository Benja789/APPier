import { useRef, useState } from "react";
import { AppContextProvider, IModalNotification, IOrder, ISettings, ISnackNotification, IUser } from "../interfaces/IAppContext";

interface Props {
    children: React.ReactNode;
}
const AppContext = ( { children }: Props ) => {
    const [ user, setUser ] = useState<IUser | null>(null)
    const [ order, setOrder ] = useState<IOrder | null>(null)
    const [ loader, setLoader ] = useState<boolean>(false)
    const [ settings, setSettings ] = useState<ISettings>({
        appVersion: '0.0.1',
        numberVersion: 1
    })
    const drawer = useRef<any>(null)
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

    // Metodo para formatear el precio
    const formatedPrice = ( number: number ) => (Math.round(number * 100) /100 ).toFixed(2)

    const calculateTotals = () => { 
        if ( order ) {
            setOrder((prevState: any) => {
                let order: IOrder = {
                    ...prevState,
                    tipCash: 0,
                    discountCash: 0,
                    subTotalWithDiscount: 0,
                    total: 0
                }
                order.subTotal = order.products.reduce((acc, product) => acc + (product.price * product.quantity), 0)
                order.tipCash = Math.round((order.subTotal * (order.tip / 100))*100)/100
                order.discountCash = Math.round((order.subTotal * (order.discount / 100))*100)/100
                order.subTotalWithDiscount = order.subTotal - order.discountCash
                order.total = order.subTotal - order.discountCash + order.tipCash  
                return order
            })
            
        }
    }


    const addDish = (dish: any) => {
        if ( order ) {
            setOrder((prevState: any) => {
                let order: IOrder = {
                    ...prevState,
                    products: [...prevState.products]
                }

                let flag =  order.products.findIndex((product) => product.uid === dish.uid)
                if (flag !== -1) {
                    order.products[flag].quantity = order.products[flag].quantity + dish.quantity
                    order.products[flag].totalLine = Math.round((order.products[flag].price * order.products[flag].quantity) * 100) / 100
                } else {
                    order.products.push(dish)
                }
                return order
            })
            calculateTotals()
        }
    }
    const deleteDish = (dish: any) => {
        if ( order ) {
            setOrder((prevState: any) => {
                let order: IOrder = {
                    ...prevState,
                    products: [...prevState.products]
                }
                let flag =  order.products.findIndex((product) => product.uid === dish.uid)
                if (flag !== -1) {
                    order.products.splice(flag, 1)
                }
                return order
            })
            calculateTotals()
        }
    }

    const changeQuantity = (dish: any, type: '-' | '+') => {
        if ( order ) {
            setOrder((prevState: any) => {
                let order: IOrder = {
                    ...prevState,
                    products: [...prevState.products]
                }
                let flag =  order.products.findIndex((product) => product.uid === dish.uid)
                if (flag !== -1) {
                    let quantity = order.products[flag].quantity
                    if (type === '+') {
                        quantity++
                    } else {
                        quantity--
                    }
                    if ( quantity == 0 ) {
                        order.products.splice(flag, 1)
                    } else {
                        order.products[flag].quantity = quantity
                        order.products[flag].totalLine = Math.round((order.products[flag].price * quantity) * 100) / 100
                    }
                }
                return order
            })
            calculateTotals()
        }
    }

    const values = {
        user,
        setUser,
        order,
        setOrder,
        loader,
        setLoader,
        drawer,
        settings,
        addDish,
        deleteDish,
        changeQuantity,
        setSettings,
        formatedPrice,
        modalNotification,
        setModalNotification,
        snackNotification,
        setSnackNotification,
        calculateTotals
    }
    return( 
        <AppContextProvider.Provider value={values}>
            { children }
        </AppContextProvider.Provider>
    )
}

export default AppContext