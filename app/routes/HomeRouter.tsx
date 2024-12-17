import { createNativeStackNavigator } from '@react-navigation/native-stack';
import ListTable from '../pages/home/ListTable';
import ListDishes from '../pages/home/ListDishes';
import AppBar from '../components/Base/AppBar';
import { useContext, useEffect, useState } from 'react';
import { useNavigation } from '@react-navigation/native';
import { BackHandler, DrawerLayoutAndroid, SafeAreaView, StyleSheet } from 'react-native';
import { AppContextProvider } from '../interfaces/IAppContext';
import OrderDetails from '../components/home/OrdersDetails';

const AuthStack = createNativeStackNavigator<any>();

const HomeRouter = () => {
    const navigation = useNavigation();
    const context = useContext(AppContextProvider);
    const [changesApp, setChangesApp] = useState({
        title: "Selecciona una mesa",
        subTitle: `${context.user?.name} - ${context.user?.email}`,
        showMenu: false,
        showReports: false,
        showBackButton: false,
        showChangeDocument: false,
        showLogout: true
    });

    useEffect(() => {
        const unsubscribe = navigation.addListener('state', (e) => {
            const routeName = e.data.state.routes[0].state?.index
            switch (routeName) {
                case 0:
                    setTimeout(() => {
                        setChangesApp({
                            title: "Selecciona una mesa",
                            subTitle: `${context.user?.name} - ${context.user?.email}`,
                            showMenu: false,
                            showReports: false,
                            showChangeDocument: false,
                            showBackButton: false,
                            showLogout: true
                        });
                    }, 100)
                    break;
                case 1:
                    setTimeout(() => {
                        let typeDocument = ''
                        if ( context.order?.typeDocument === 'TKT' ) typeDocument = 'Ticket'
                        if ( context.order?.typeDocument === 'CRF' ) typeDocument = 'Credito Fiscal'
                        if ( context.order?.typeDocument === 'COF' ) typeDocument = 'Consumidor Final'
                        if ( context.order?.typeDocument === 'IVAEXE' ) typeDocument = 'Excento de IVA'
                        setChangesApp({
                            title: "Lista de Platos",
                            subTitle: typeDocument,
                            showMenu: false,
                            showReports: false,
                            showBackButton: true,
                            showChangeDocument: true,
                            showLogout: false
                        });
                    }, 100)
                    break;
                case undefined:
                    setChangesApp({
                        title: "Selecciona una mesa",
                        subTitle: `${context.user?.name} - ${context.user?.email}`,
                        showMenu: false,
                        showReports: false,
                        showChangeDocument: false,
                        showBackButton: false,
                        showLogout: true
                    });
                    break;
                default:
                    setChangesApp({
                        title: "App",
                        subTitle: ``,
                        showMenu: false,
                        showReports: false,
                        showChangeDocument: false,
                        showBackButton: false,
                        showLogout: false
                    });
                    break;
            }
        });

        return unsubscribe;
    }, [navigation]);

    useEffect(() => {
        const backAction = () => {
            if (context.drawer.current && context.drawer.current.state.drawerShown) {
                context.drawer.current.closeDrawer();
                return true; // Previene el comportamiento por defecto (salir de la app)
            }
            return false; // Permite el comportamiento por defecto (salir de la app)
        };

        const backHandler = BackHandler.addEventListener('hardwareBackPress', backAction);

        return () => backHandler.remove();
    }, []);

    const baseOptions = {
        headerShown: true,
        header: () => <AppBar {...changesApp} />
    }

    return (
        <SafeAreaView style={{flex: 1}}>
            {/* <NavigationContainer> */}
            {/* <DrawerLayoutAndroid
                ref={context.drawer}
                drawerWidth={300}
                drawerPosition={'right'}
                renderNavigationView={() => <OrderDetails />}> */}
                <AuthStack.Navigator initialRouteName='ListTable'>
                    <AuthStack.Screen name="ListTable" component={ListTable} options={baseOptions} />
                    <AuthStack.Screen name="ListDishes" component={ListDishes} options={baseOptions} />
                </AuthStack.Navigator>
            {/* </DrawerLayoutAndroid> */}
        </SafeAreaView>
    )
}

export default HomeRouter;