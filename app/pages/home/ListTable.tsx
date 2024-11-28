import { ScrollView, Text, View } from "react-native"
import { SafeAreaView } from "react-native-safe-area-context"

//Components
import CardTable from "../../components/home/CardTable"
import IconButton from "../../components/Base/IconButton"

// Estilos
import { BaseStyles } from "../../styles/BaseStyles"
import { ListTableStyle } from "../../styles/pages/ListTableStyle"

const ListTable = () => {
    
    return (
        <SafeAreaView style={[ BaseStyles.safeArea ]}>
            <View style={[ BaseStyles.body ]}>
                <View style={[ ListTableStyle.titleHeader ]}>
                    <Text style={[BaseStyles.textTitleH1, ListTableStyle.textTable ]}>
                        Seleccione la mesa a la que desea ingresar
                    </Text>
                    <View style={{ flexDirection:"row", gap: 10 }}>
                        <IconButton 
                            callBack={()=>{}}
                            icon={require("../../assets/icons/reporte-de-negocios.png")}/>
                        <IconButton
                            callBack={()=>{}}
                            icon={require("../../assets/icons/logout.png")}/>
                    </View>
                </View>
                <View style={BaseStyles.divider}/>
                <ScrollView>
                    {
                        Array(20).fill(0).map((_, index) => (
                            <CardTable 
                                key={index} 
                                available={index % 2 === 0}
                                title={`Mesa ${index}`} 
                                callBack={()=>{}} />
                        ))
                    }
            </ScrollView>
            </View>
        </SafeAreaView>
    )
}

export default ListTable