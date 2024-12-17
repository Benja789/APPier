import { Text, View } from "react-native"
import { CommonActions, DrawerActions, useNavigation } from "@react-navigation/native"

// Componentes
import IconButton from "../../components/Base/IconButton"

// Estilos
import { AppbarStyles } from "../../styles/components/AppbarStyles"
import { BaseStyles } from "../../styles/BaseStyles"
import Button from "./Button"
import { useContext, useEffect, useState } from "react"
import { AppContextProvider } from "../../interfaces/IAppContext"

interface IAppBar {
    title: string
    subTitle?: string
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
        subTitle,
        showReports, 
        showLogout, 
        showBackButton, 
        showMenu, 
        showChangeDocument,
        children 
    } = props
    const appContext = useContext(AppContextProvider)
    const navigate = useNavigation<any>()
    const [typeDocument, setTypeDocument] = useState<string>(appContext.order?.typeDocument ?? '')

    useEffect(()=> {
        if ( appContext.order?.typeDocument === 'TKT' ) setTypeDocument('Ticket')
        if ( appContext.order?.typeDocument === 'CRF' ) setTypeDocument('Credito Fiscal')
        if ( appContext.order?.typeDocument === 'COF' ) setTypeDocument('Consumidor Final')
        if ( appContext.order?.typeDocument === 'IVAEXE' ) setTypeDocument('Excento de IVA')
    }, [appContext.order?.typeDocument])

    // Metodo para cerrar sesion
    const logout = () => {
        appContext.setUser(null)
        appContext.setOrder(null)
        navigate.dispatch(
            CommonActions.reset({
                index: 0,
                routes: [{
                    name: 'Auth'
                }]
            })
        )
    }

    // Posterior, muestra el Drawer o menu lateral
    const showDrawer = () => {
        navigate.dispatch(
            DrawerActions.toggleDrawer()
        )
    }

    // Metodo para devolver a atras
    const goBack = () => {
        navigate.dispatch(
            CommonActions.goBack()
        )
    }

    // Metodo para mostrar el modal de cambio de documento
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
                    <View>
                        <Text style={[BaseStyles.textTitleH1, AppbarStyles.text ]}>
                            { title }
                        </Text>
                        {
                            typeDocument !== ""  ?
                                <View style={{ flexDirection: 'row', alignItems: 'center', alignContent: 'center', gap:10 }}>
                                    <Text style={[BaseStyles.textTitleH3, { textAlign:"left", justifyContent:"flex-start", fontFamily: 'PoppinsRegular' } ]}>
                                        Generando el Documento: 
                                    </Text>
                                    <Text style={[BaseStyles.textTitleH3, { marginTop:5 } ]}>
                                    { typeDocument }
                                    </Text>
                                </View>
                                :
                                <Text style={[BaseStyles.textTitleH3, { fontFamily: 'PoppinsRegular' } ]}>
                                    { subTitle }
                                </Text>
                        }
                    </View>
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