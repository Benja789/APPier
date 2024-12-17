import { useRef, useState } from "react";
import { AppContextProvider, IModalNotification, IOrder, ISettings, ISnackNotification, IUser } from "../interfaces/IAppContext";

interface Props {
    children: React.ReactNode;
}
const AppContext = ( { children }: Props ) => {
    const [ user, setUser ] = useState<IUser | null>(null)
    const [ order, setOrder ] = useState<IOrder | null>(null)
    const [ loader, setLoader ] = useState<boolean>(false)
    const [ openModalChangeDocument, setOpenModalChangeDocument ] = useState(false)
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

    // Metodo para recalcular los totales
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

                if ( order.typeDocument === "IVAEXE" ) {
                    order.products = order.products.map((product) => {
                        product.priceWithTaxes = product.price
                        product.price = Math.round((product.price - ( product.price * 0.13)) * 100) / 100
                        product.totalLine = Math.round((product.price * product.quantity) * 100) / 100
                        product.totalLine = Math.round((product.totalLine) * 100) / 100
                        return product
                    })
                } else {                
                    order.products = order.products.map((product) => {
                        if ( product.priceWithTaxes ) product.price = product.priceWithTaxes
                        else product.priceWithTaxes = product.price
                        product.totalLine = Math.round((product.price * product.quantity) * 100) / 100
                        product.totalLine = Math.round((product.totalLine) * 100) / 100
                        return product
                    })
                }

                order.subTotal = order.products.reduce((acc, product) => acc + (product.price * product.quantity), 0)
                order.tipCash = Math.round((order.subTotal * (order.tip / 100))*100)/100
                order.discountCash = Math.round((order.subTotal * (order.discount / 100))*100)/100
                order.subTotalWithDiscount = order.subTotal - order.discountCash
                
                order.total = order.subTotalWithDiscount + order.tipCash  
                return order
            })
            
        }
    }

    // Metodo para agregar un platillo
    const addDish = (dish: any) => {
        if ( order ) {
            setOrder((prevState: any) => {
                let order: IOrder = {
                    ...prevState,
                    products: [...prevState.products]
                }

                let flag =  order.products.findIndex((product) => product.uid === dish.uid && product.canEdit)
                if (flag !== -1) {
                    if ( dish.status === "delivered" ) order.products.push(dish) 
                    else {
                        order.products[flag].quantity = order.products[flag].quantity + dish.quantity
                        order.products[flag].totalLine = Math.round((order.products[flag].price * order.products[flag].quantity) * 100) / 100
                    }
                } else {
                    order.products.push(dish)
                }
                return order
            })
            calculateTotals()
        }
    }

    // Metodo para eliminar los platillos
    const deleteDish = (dish: any) => {
        if ( order ) {
            setOrder((prevState: any) => {
                let order: IOrder = {
                    ...prevState,
                    products: [...prevState.products]
                }
                let flag =  order.products.findIndex((product) => product.uid === dish.uid && product.canEdit)
                if (flag !== -1) {
                    order.products.splice(flag, 1)
                }
                return order
            })
            calculateTotals()
        }
    }

    // Metodo para agregar un platillo 
    const setDish = (dish: any) => {
        if ( order ) {
            setOrder((prevState: any) => {
                let order: IOrder = {
                    ...prevState,
                    products: [...prevState.products]
                }
                let flag =  order.products.findIndex((product) => product.uid === dish.uid)
                if (flag !== -1) {
                    if ( order.products[flag].status === "delivered" ) order.products.push({
                        ...dish,
                        canEdit: true,
                        status: "edition",
                    })
                    else order.products[flag] = dish
                }
                return order
            })
            calculateTotals()
        }
    }

    // Metodo para cambiar la cantidad de un platillo
    const changeQuantity = (dish: any, type: '-' | '+') => {
        if ( order ) {
            setOrder((prevState: any) => {
                let order: IOrder = {
                    ...prevState,
                    products: [...prevState.products]
                }
                let flag =  order.products.findIndex((product) => product.uid === dish.uid && product.canEdit)
                if (flag !== -1) {
                    let quantity = order.products[flag].quantity
                    if (type === '+') quantity++
                    else quantity--

                    if ( quantity == 0 ) order.products.splice(flag, 1)
                    else {
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
        openModalChangeDocument,
        setOpenModalChangeDocument,
        drawer,
        settings,
        addDish,
        deleteDish,
        setDish,
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