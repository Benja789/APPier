import { Text, View } from "react-native"
import { useNavigation } from "@react-navigation/native"

// Estilos
import { BaseStyles } from "../../styles/BaseStyles"
import { SafeAreaView } from "react-native-safe-area-context"
import { ListDishesStyles } from "../../styles/pages/ListDishesStyles"
import OrderDetails from "../../components/home/OrdersDetails"
import { useEffect, useContext } from "react"
import { AppContextProvider, IOrder } from "../../interfaces/IAppContext"

const ListDishes = () => {
    const navigation = useNavigation<any>()
    const appContext = useContext(AppContextProvider)

    useEffect(()=> {
        getData()
    }, [])
    

    const getData = () =>{
        let products = [
            {
                name: "Plato 1",
                description: "Descripcion del plato 1",
                price: 100,
                quantity: 1,
                type: "Plato fuerte"
            },{
                name: "Plato 1",
                description: "Descripcion del plato 1",
                price: 100,
                quantity: 1,
                type: "Plato fuerte"
            },{
                name: "Plato 1",
                price: 100,
                description: "Descripcion del plato 1",
                quantity: 1,
                type: "Plato fuerte"
            },{
                name: "Plato 1",
                price: 100,
                description: "Descripcion del plato 1",
                quantity: 1,
                type: "Plato fuerte"
            },{
                name: "Plato 1",
                price: 100,
                description: "Descripcion del plato 1",
                quantity: 1,
                type: "Plato fuerte"
            },{
                name: "Plato 1",
                price: 100,
                description: "Descripcion del plato 1",
                quantity: 1,
                type: "Plato fuerte"
            },{
                name: "Plato 1",
                price: 100,
                description: "Descripcion del plato 1",
                quantity: 1,
                type: "Plato fuerte"
            },{
                name: "Plato 1",
                description: "Descripcion del plato 1",
                price: 100,
                quantity: 1,
                type: "Plato fuerte"
            }
        ]
        appContext?.setOrder((prevState: any) => {
            let order: IOrder = {
                ...prevState,
                products: products,
                clientName: "Cliente 1",
                discount: 10,
                status: "pending",
                typePayment: "cash",
                tipCash: 0,
                tipPercent: 0,
                subTotal: products.reduce((acc, product) => acc + product.price, 0),
                tip: 10,
                // total: products.reduce((acc, product) => acc + product.price, 0),
            }
            order.tipCash = Math.round(order.subTotal * (order.tip / 100))
            order.discountCash = Math.round(order.subTotal * (order.discount / 100))
            order.subTotalWithDiscount = order.subTotal - order.discountCash
            order.total = order.subTotal - order.discountCash + order.tipCash  


            return order
        })

    }

    return( 
        <SafeAreaView style={[ BaseStyles.safeArea ]}>
            <View style={[ ListDishesStyles.container ]}>
                {/* Secciones de dishes */}
                <View style={[ ListDishesStyles.dishesContainer ]}>
                    <Text>Dishes</Text>
                </View>

                {/* Seccion del total de la orden */}
                <View style={[ ListDishesStyles.detailsContainer ]}>
                    <OrderDetails />
                </View>
            </View>
        </SafeAreaView>
    )
}

export default ListDishes