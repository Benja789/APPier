import { DrawerLayoutAndroid, FlatList, ScrollView, StyleSheet, Text, View } from "react-native"
import { useNavigation } from "@react-navigation/native"

// Estilos
import { BaseStyles } from "../../styles/BaseStyles"
import { SafeAreaView } from "react-native-safe-area-context"
import { ListDishesStyles } from "../../styles/pages/ListDishesStyles"
import OrderDetails from "../../components/home/OrdersDetails"
import { useEffect, useContext, useRef, useState } from "react"
import { AppContextProvider, IOrder } from "../../interfaces/IAppContext"
import CardTypeDish from "../../components/home/CardTypeDish"
import Button from "../../components/Base/Button"

const TypeDishes = [
    {
        id: "entrance",
        name: "Entradas",
        icon: require("../../assets/icons/entrance.png"),
    },{
        id: "main",
        name: "Platos fuertes",
        icon: require("../../assets/icons/dish.png"),
    },{
        id: "dessert",
        name: "Postres",
        icon: require("../../assets/icons/desserts.png"),
    },{
        id: "drink",
        name: "Bebidas",
        icon: require("../../assets/icons/drinks.png"),
    },{
        id: "extra",
        name: "Extras",
        icon: require("../../assets/icons/extras.png"),
    },{
        id: "alls",
        name: "Todos",
        icon: require("../../assets/icons/tool.png"),
    }
]

const ListDishes = () => {
    const navigation = useNavigation<any>()
    const appContext = useContext(AppContextProvider)
    const ref = useRef<any>(null)
    const [typeDishSelected, setTypeDishSelected] = useState("entrance")
    const [open, setOpen] = useState(false)

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

    const handleChangeTypeDish = (id: string) => {
        setTypeDishSelected(id)
        // ref.current.scrollToIndex({index: 0})
    }

    const openDrawer = () => {
        // drawer.current?.openDrawer()
        appContext.drawer.current?.openDrawer()
    }

    return( 
        <SafeAreaView style={[ BaseStyles.safeArea ]}>
            <View style={[ ListDishesStyles.container ]}>
                {/* Secciones de dishes */}
                <View style={[ ListDishesStyles.dishesContainer ]}>
                    <FlatList 
                        ref={ref}
                        data={TypeDishes}
                        style={{ paddingHorizontal: 30, paddingVertical: 10}}
                        horizontal
                        renderItem={({item}) => <CardTypeDish {...item} dishSelected={typeDishSelected} callBack={handleChangeTypeDish}/>}
                        showsHorizontalScrollIndicator={false}
                        keyExtractor={(item:any) => `${item.id}`} 
                    />
                    <ScrollView>
                    <Button text="Abrir menu" callBack={openDrawer} ></Button>

                    </ScrollView>
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