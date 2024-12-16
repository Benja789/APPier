import React from "react"
import { ActivityIndicator, RefreshControl, ScrollView, View } from "react-native"
import { SafeAreaView } from "react-native-safe-area-context"

//Components
import CardTable from "../../components/home/CardTable"

// Estilos
import { BaseStyles } from "../../styles/BaseStyles"
import { useNavigation } from "@react-navigation/native"
import { useContext, useEffect, useState } from "react"
import { AppContextProvider } from "../../interfaces/IAppContext"
import { apiGetData } from "../../services/api"
import { ENV } from "../../environment/api"

const ListTable = () => {
    const appContext = useContext(AppContextProvider)
    const navigation = useNavigation<any>()
    const [tablesData, setTablesDtata] = useState<any>([])
    const [loading, setLoading] = useState(true)
    const [refresh, setRefresh] = useState(false)

    useEffect(() => {
        onLoad()
    }, [])

    const getDataInitial = async (signal: AbortSignal) => {
        try {
            let response = await apiGetData({
                url: ENV.API_URL + ENV.ENDPOINTS.orders,
                params: {  orderCreation: 'desc' },
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': 'Bearer ' + appContext.user?.token
                },
                signal: signal,
                setLoader: setLoading
            })
    
            if ( !response.error ) setTablesDtata(response.data.data)
            else {
                appContext.setSnackNotification({
                    open: true,
                    message: response.message ?? "No se lograron obtener las ordenes.",
                    type: "error"
                })
            }
            setRefresh(false)

        } catch (error:any) {
            console.log('Error al obtener los datos ', error.message)
            appContext.setSnackNotification({
                open: true,
                message: "No se pudo completar el proceso de la solicitud de la solicitud inicial, revise la conexion a internet.",
                type: "error"
            })
        }
    }


    const navigatToDetailsOrder = async ( item: any ) => {
        let orderSelected = await apiGetData({
            url: ENV.API_URL + ENV.ENDPOINTS.orders,
            headers: {
                'Content-Type': 'application/json',
                'Authorization': 'Bearer ' + appContext.user?.token
            },
            params: {
                uid: item.uid
            },
            setLoader: appContext.setLoader
        })
        let data = orderSelected.data?.data[0] ?? null
        if ( orderSelected.error || data === null) {
            appContext.setSnackNotification({
                open: true,
                message: orderSelected.message ?? "Orden guardada",
                type: "error"
            })
            return
        }

        appContext.setOrder(()=>({
            tablenumber: item.id,
            products: [],
            clientName: data.clientName ?? "",
            subTotal: 0,
            discount: 0,
            tip: 0,
            tipCash: 0,
            taxes: 0,
            id: data.uid || data.id,
            number: '',
            total: 0,
            typeDocument: "TKT",
            discountCash: 0, 
            status: data.status ?? "",
            subTotalWithDiscount: 0,
            typePayment: ''
        }))
        data.dishes?.map((item:any)=> {
            let dishOrder ={
                area: item.area ?? "",
                visible: item.visible ?? true,
                priceBackup: item.price ?? 0,
                description: item.description ?? "",
                discount: item.discount ?? false,
                canEdit: item.dishStatus !== "delivered" ? true : false,
                status: item.dishStatus ?? "",
                inventory: item.inventory ?? 0,
                uid: item.uid ?? "",
                supplies: item.supplies ?? [],
                name: item.name ?? "",
                time: item.time ?? 0,
                category: item.category ?? "",
                kitchen: item.kitchen ?? "",
                fatherCategory: item.fatherCategory ?? "",
                image: item.image ?? "",
                price: item.price ?? 0,
                id: item.uid ?? "",
                quantity: item.quantity ?? 0,
                totalLine: item.totalLine ?? 0,
                type: item.type ?? "",
                notes: item.notes ?? "",
                extras: item.extras ?? [],
                priceWithTaxes: item.priceWithTaxes ?? 0,
            }
            // Ordenamiento para los tipos de dishes
            if ( item.orderToServe === "plato fuerte" ) dishOrder.type = "dish"
            if ( item.orderToServe === "entrada" ) dishOrder.type = "entrance"
            if ( item.orderToServe === "final" ) dishOrder.type = "dessert"
            // Agrega los productos
            appContext.addDish(dishOrder)
        }) 
        navigation.navigate('ListDishes')
    }


    const refreshHandle = ( ) => {
        setRefresh(true)
        onLoad()
    }

    const onLoad = () => {
        const signal = new AbortController()
        getDataInitial(signal.signal)
        return () => signal.abort()
    }

    return (
        <SafeAreaView style={[ BaseStyles.safeArea ]}>
            <View style={[ BaseStyles.body ]}>
                <ScrollView	refreshControl={<RefreshControl refreshing={refresh} onRefresh={refreshHandle} />}>
                    
                    {
                        (loading && !refresh) ?
                            <ActivityIndicator style={ BaseStyles.loaderContent } /> 
                            :
                            <>
                                {
                                    tablesData?.map((item:any, index:number) => (
                                        <CardTable 
                                            key={index} 
                                            table={item}
                                            callBack={()=>navigatToDetailsOrder(item)} />
                                    ))
                                }
                            </>
                    }
            </ScrollView>
            </View>
        </SafeAreaView>
    )
}

export default ListTable
