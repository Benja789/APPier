import { Text, View } from "react-native"
import { CommonActions, useNavigation } from "@react-navigation/native"

// Componentes
import IconButton from "../../components/Base/IconButton"

// Estilos
import { AppbarStyles } from "../../styles/components/AppbarStyles"
import { BaseStyles } from "../../styles/BaseStyles"

interface IAppBar {
    title: string
    showReports: boolean
    showLogout: boolean
    children?: any  
}

const AppBar = ( props: IAppBar ) => {
    const { title, showReports, showLogout, children } = props

    const navigate = useNavigation<any>()
    const logout = () => {
        navigate.dispatch(
            CommonActions.reset({
                index: 0,
                routes: [{
                    name: 'Auth'
                }]
            })
        )
    }

    return (
        <>
            <View style={[ AppbarStyles.title ]}>
                <Text style={[BaseStyles.textTitleH1, AppbarStyles.text ]}>
                    { title }
                </Text>
                <View style={AppbarStyles.containerIcon }>
                    <IconButton 
                        callBack={()=>{}}
                        icon={require("../../assets/icons/reporte-de-negocios.png")}/>
                    <IconButton
                        callBack={logout}
                        icon={require("../../assets/icons/logout.png")}/>
                </View>
            </View>
             { children }

            <View style={BaseStyles.divider}/>
        </>
    )
}

export default AppBar