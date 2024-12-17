import { ActivityIndicator, FlatList, RefreshControl, View } from "react-native"

// Estilos
import { BaseStyles } from "../../styles/BaseStyles"
import { SafeAreaView } from "react-native-safe-area-context"
import { ListDishesStyles } from "../../styles/pages/ListDishesStyles"
import OrderDetails from "../../components/home/OrdersDetails"
import { useEffect, useContext, useRef, useState } from "react"
import { AppContextProvider, IOrder } from "../../interfaces/IAppContext"
import CardTypeDish from "../../components/home/CardTypeDish"
import { apiGetData } from "../../services/api"
import { ENV } from "../../environment/api"
import DishCard from "../../components/home/DishCard"
import ModalAddDish from "../../components/home/ModalAddDish"
import ModalDishDetails from "../../components/home/DishDetails"
import ModalChangeDocument from "../../components/home/ModalChangeDocument"

const TypeDishes = [
    {
        id: "entrance",
        name: "Entradas",
        icon: require("../../assets/icons/entrance.png"),
    },{
        id: "dish",
        name: "Platos fuertes",
        icon: require("../../assets/icons/dish.png"),
    },{
        id: "desserts",
        name: "Postres",
        icon: require("../../assets/icons/desserts.png"),
    },{
        id: "drinks",
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
    const appContext = useContext(AppContextProvider)
    const ref = useRef<any>(null)
    const [typeDishSelected, setTypeDishSelected] = useState("entrance")

    const [open, setOpen] = useState(false)
    const [openModalDetails, setOpenModalDetails] = useState(false)
    const [dishesData, setDishesData] = useState<any>([])
    const [dishSelected, setDishSelected] = useState<any>({})
    const [loading, setLoading] = useState(true)
    const [refresh, setRefresh] = useState(false)

    useEffect(()=> {
        const controller = new AbortController()
        getData(controller.signal)
        return () => controller.abort()
    }, [])
    

    useEffect(() => {
        const disherController = new AbortController()
        getDishes(disherController.signal)
        return () => disherController.abort()

    }, [typeDishSelected])

    const getData = (signal: AbortSignal) =>{
        let products:any = [ ]
        appContext?.setOrder((prevState: any) => {
            let order: IOrder = {
                ...prevState,
                products: prevState?.products ?? products,
                clientName: "Cliente 1",
                discount: 0,
                status: "pending",
                typePayment: "cash",
                typeDocument: "TKT",
                tipCash: 0,
                tipPercent: 0,
                tip: 10,
            }
            return order
        })
        appContext.calculateTotals()
        setRefresh(false)
    }

    const handleChangeTypeDish = (id: string) => {
        setDishesData(() =>[])
        setTypeDishSelected(() => id)
    }

    const getDishes = async ( signal: AbortSignal ) => {
        let params:any = {
            visible: true,
            FatherCategory: typeDishSelected
        }
        
        if (typeDishSelected === 'alls') delete params.FatherCategory
        let response =  await apiGetData({
            url: ENV.API_URL + ENV.ENDPOINTS.dishes,
            params: params,
            headers: {
                'Content-Type': 'application/json',
                'Authorization': 'Bearer ' + appContext.user?.token 
            },
            signal: signal,
            setLoader: setLoading
        })
        if (!response.error) setDishesData(() => response.data.data)
        else {
            appContext.setSnackNotification({
                open: true,
                message: response.message ?? "No se lograron obtener los platillos.",
                type: "error"
            })
        }
    }

    const refreshHandle = () => {
        const controller = new AbortController()
        const disherController = new AbortController()
        setRefresh(true)
        getData(controller.signal)
        getDishes(disherController.signal)
        return () => {
            controller.abort()
            disherController.abort()
        }
    }
    
    const openModalAddDish = (dish: any) => {
        setOpen(true)
        setDishSelected(()=>{
            let findDish = appContext.order?.products.find((product) => product.uid === dish.uid)
            if ( findDish ) { 
                if ( findDish.status === "delivered" ) {
                    return{
                        ...dish,
                        quantity: 1,
                        totalLine: dish.price
                    }
                } else return findDish
            } else {
                return{
                    ...dish,
                    quantity: 1,
                    totalLine: dish.price
                }
            }
        })
    }

    const handleModalDetails = (dish: any) => {
        setOpenModalDetails(true)
        setDishSelected(dish)
    }

    const renderItem = ({ item }: any) => (
        <View style={ListDishesStyles.gridItem}>
            <DishCard 
                dish={item} 
                callBackDetails={() => handleModalDetails(item)}
                callBack={() =>openModalAddDish(item)}/>
        </View>
    );


    return( 
        <SafeAreaView style={[ BaseStyles.safeArea ]}>
            <ModalAddDish 
                open={ open }
                dish={dishSelected}
                setDish={ setDishSelected }
                setOpen={ setOpen }/>
            <ModalDishDetails
                open={ openModalDetails }
                dish={dishSelected}
                callBackAdd={() => openModalAddDish(dishSelected)}
                setOpen={ setOpenModalDetails }/>
            <ModalChangeDocument />
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
                        keyExtractor={(item: any) => `${item.id}`} />

                     <FlatList
                        data={dishesData}
                        renderItem={renderItem}
                        keyExtractor={(item, index) => index.toString()}
                        numColumns={4}
                        columnWrapperStyle={ListDishesStyles.row}
                        refreshControl={<RefreshControl refreshing={refresh} onRefresh={refreshHandle} />}
                        ListEmptyComponent={loading && !refresh ? <ActivityIndicator style={BaseStyles.loaderContent} /> : null}/>
                </View>

                {/* Seccion del total de la orden */}
                <View style={[ ListDishesStyles.detailsContainer ]}>
                    <OrderDetails loader={loading}/>
                </View>
            </View>
        </SafeAreaView>
    )
}


export default ListDishes