import { Text, View } from "react-native"
import { CommonActions, DrawerActions, useNavigation } from "@react-navigation/native"

// Componentes
import IconButton from "../../components/Base/IconButton"

// Estilos
import { AppbarStyles } from "../../styles/components/AppbarStyles"
import { BaseStyles } from "../../styles/BaseStyles"
import Button from "./Button"
import { useContext } from "react"
import { AppContextProvider } from "../../interfaces/IAppContext"

interface IAppBar {
    title: string
    showReports: boolean
    showLogout: boolean
    showMenu: boolean
    showBackButton: boolean
    showChangeDocument: boolean
    children?: any  
}

const AppBar = ( props: IAppBar ) => {
    const { 
        title, 
        showReports, 
        showLogout, 
        showBackButton, 
        showMenu, 
        showChangeDocument,
        children 
    } = props
    const appContext = useContext(AppContextProvider)
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

    const goBack = () => {
        navigate.dispatch(
            CommonActions.goBack()
        )
    }

    const openModalChangeDocument = () => {
        appContext.setOpenModalChangeDocument(true)
    }

    return (
        <View style={AppbarStyles.content}>
            <View style={[ AppbarStyles.title ]}>
                <View style={[AppbarStyles.containerIcon, { alignItems:'center'} ]}>
                    {
                        showBackButton &&
                            <IconButton 
                                callBack={goBack}
                                icon={require("../../assets/icons/arrow-left.png")}/>
                    }
                    <Text style={[BaseStyles.textTitleH1, AppbarStyles.text ]}>
                        { title }
                    </Text>
                </View>
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
                    {
                        showChangeDocument &&
                            <Button 
                                text="Cambiar Documento Fiscal"
                                callBack={openModalChangeDocument}/>
                    }
                </View>
            </View>
             { children }

            <View style={BaseStyles.divider}/>
        </View>
    )
}

export default AppBar