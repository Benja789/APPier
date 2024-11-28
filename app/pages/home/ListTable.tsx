import { ScrollView, Text, View } from "react-native"
import { SafeAreaView } from "react-native-safe-area-context"

//Components
import CardTable from "../../components/home/CardTable"
import IconButton from "../../components/Base/IconButton"

// Estilos
import { BaseStyles } from "../../styles/BaseStyles"
import { ListTableStyle } from "../../styles/pages/ListTableStyle"
import { useNavigation } from "@react-navigation/native"
import AppBar from "../../components/Base/AppBar"
import { useContext, useState } from "react"
import { AppContextProvider } from "../../interfaces/IAppContext"


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
    const [showModalDataClient, setShowModalDataClient] = useState(false)   

    
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
                <AppBar 
                    title="Selecciona la mesa"
                    showReports={true}
                    showLogout={true}/>
                <ScrollView>
                    {
                        TablesExample.map((item, index) => (
                            <CardTable 
                                key={index} 
                                table={item}
                                callBack={()=>navigatToDetailsOrder(item)} />
                        ))
                    }
            </ScrollView>
            </View>
        </SafeAreaView>
    )
}

export default ListTable