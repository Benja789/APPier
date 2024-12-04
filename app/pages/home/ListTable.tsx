import { ActivityIndicator, ScrollView, View } from "react-native"
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


const TablesExample = [
    {
        id: 1,
        available: true,
        title: 'Mesa 1',
        desription: 'Mesa para 4 personas'
    },{
        id: 2,
        available: true,
        title: 'Mesa 1',
        desription: 'Mesa para 4 personas'
    },{
        id: 3,
        available: false,
        title: 'Mesa 1',
        desription: 'Mesa para 4 personas'
    },{
        id: 4,
        available: false,
        title: 'Mesa 1',
        desription: 'Mesa para 4 personas'
    },{
        id: 5,
        available: false,
        title: 'Mesa 1',
        desription: 'Mesa para 4 personas'
    },{
        id: 6,
        available: true,
        title: 'Mesa 1',
        desription: 'Mesa para 4 personas'
    },{
        id: 7,
        available: true,
        title: 'Mesa 1',
        desription: 'Mesa para 4 personas'
    },{
        id: 8,
        available: true,
        title: 'Mesa 1',
        desription: 'Mesa para 4 personas'
    },{
        id: 9,
        available: true,
        title: 'Mesa 1',
        desription: 'Mesa para 4 personas'
    },{
        id: 10,
        available: true,
        title: 'Mesa 1',
        desription: 'Mesa para 4 personas'
    },{
        id: 11,
        available: true,
        title: 'Mesa 1',
        desription: 'Mesa para 4 personas'
    }
]

const ListTable = () => {
    const appContext = useContext(AppContextProvider)
    const navigation = useNavigation<any>()
    const [tablesData, setTablesDtata] = useState<any>([])
    const [loading, setLoading] = useState(true)

    useEffect(() => {
        console.log('Obteniendo datos iniciales')
        getDataInitial()
    }, [])

    const getDataInitial = async () => {
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
                setLoader: setLoading
            })
    
            if ( !response.error ) {
                setTablesDtata(response.data)
            } else {
                console.log('Error al obtener los datos')
            }
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
    
    return (
        <SafeAreaView style={[ BaseStyles.safeArea ]}>
            <View style={[ BaseStyles.body ]}>
                <ScrollView>
                    {
                        loading ?
                            <ActivityIndicator style={ BaseStyles.loaderContent } /> 
                            :
                            <>
                                {
                                    tablesData.map((item:any, index:number) => (
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