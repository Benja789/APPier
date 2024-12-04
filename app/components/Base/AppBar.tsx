import { Text, View } from "react-native"
import { CommonActions, DrawerActions, useNavigation } from "@react-navigation/native"

// Componentes
import IconButton from "../../components/Base/IconButton"

// Estilos
import { AppbarStyles } from "../../styles/components/AppbarStyles"
import { BaseStyles } from "../../styles/BaseStyles"

interface IAppBar {
    title: string
    showReports: boolean
    showLogout: boolean
    showMenu: boolean
    children?: any  
}

const AppBar = ( props: IAppBar ) => {
    const { title, showReports, showLogout, showMenu, children } = props

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

    const showDrawer = () => {
        navigate.dispatch(
            DrawerActions.toggleDrawer()
        )
    }

    return (
        <View style={AppbarStyles.content}>
            <View style={[ AppbarStyles.title ]}>
                <Text style={[BaseStyles.textTitleH1, AppbarStyles.text ]}>
                    { title }
                </Text>
                <View style={AppbarStyles.containerIcon }>
                    {
                        showReports &&
                            <IconButton 
                                callBack={()=>{}}
                                icon={require("../../assets/icons/reporte-de-negocios.png")}/>
                    }
                    {
                        showLogout &&
                            <IconButton
                                callBack={logout}
                                icon={require("../../assets/icons/logout.png")}/>
                    }
                    {
                        showMenu &&
                            <IconButton
                                callBack={showDrawer}
                                icon={require("../../assets/icons/burger-bar.png")}/>
                    }
                </View>
            </View>
             { children }

            <View style={BaseStyles.divider}/>
        </View>
    )
}

export default AppBar