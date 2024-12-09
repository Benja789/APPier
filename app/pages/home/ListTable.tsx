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
        const controller = new AbortController()
        getDataInitial(controller.signal)
		return () => controller.abort()
    }, [])

    const getDataInitial = async (signal: AbortSignal) => {
        try {
            let response = await apiGetData({
                url: ENV.API_URL + ENV.ENDPOINTS.tables,
                params: {
                    waiterKey: 'eTqiuoNGyub3kj6WKV62MAM6bCe2',
                    orderTableNum: 'desc'
                },
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MSwibmFtZSI6IkFkbWluaXN0cmFkb3IiLCJsYXN0TmFtZSI6IlNpc3RlbWEiLCJlbWFpbCI6ImFkbWluQHByZW10ZS5jb20iLCJSb2xfaWQiOiJBZG1pbiIsImlzQWN0aXZlIjp0cnVlLCJpc0RlbGV0ZWQiOmZhbHNlLCJvdHBUb2tlbiI6bnVsbCwidHlwZSI6ImxvZ2luIiwiY3JlYXRlZCI6IjIwMjQtMTEtMTFUMjE6MzY6MTAuMjY1WiIsInZhbGlkIjp0cnVlLCJpYXQiOjE3MzEzNjA5NzB9.G5sqkIy8NY_8Ng4w1_DtQ8wRcPZmY-SoJfn-SMuDMDE' 
                },
                signal: signal,
                setLoader: setLoading
            })
    
            if ( !response.error ) {
                setTablesDtata(response.data.data)
            } else {
                console.log('Error al obtener los datos')
            }
            setRefresh(false)

        } catch (error:any) {
            console.log('Error al obtener los datos ', error.message)
        }
    }


    const navigatToDetailsOrder = ( item: any ) => {
        appContext.setOrder({
            tablenumber: item.id,
            products: [],
            clientName: '',
            subTotal: 0,
            discount: 0,
            tip: 0,
            tipCash: 0,
            total: 0,
            discountCash: 0,
            status: '',
            subTotalWithDiscount: 0,
            typePayment: ''
        })
        navigation.navigate('ListDishes')
    }


    const refreshHandle = ( ) => {
        setRefresh(true)
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