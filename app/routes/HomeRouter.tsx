import { createNativeStackNavigator } from '@react-navigation/native-stack';
import ListTable from '../pages/home/ListTable';
import ListDishes from '../pages/home/ListDishes';
import AppBar from '../components/Base/AppBar';
import { useEffect, useState } from 'react';
import { useNavigation } from '@react-navigation/native';

const AuthStack = createNativeStackNavigator<any>();

const HomeRouter = () => {
    const navigation = useNavigation();
    const [changesApp, setChangesApp] = useState({
        title: "Selecciona una mesa",
        showReports: true,
        showMenu: true,
        showLogout: false
    });

    useEffect(() => {
        const unsubscribe = navigation.addListener('state', (e) => {
            const routeName = e.data.state.routes[0].state?.index
            switch (routeName) {
                case 0:
                    setTimeout(()=>{
                        setChangesApp({
                            title: "Selecciona una mesa",
                            showMenu: false,
                            showReports: false,
                            showLogout: true
                        });
                    }, 100)
                    break;
                case 1:
                    setTimeout(()=>{
                        setChangesApp({
                            title: "Lista de Platos",
                            showMenu: true,
                            showReports: false,
                            showLogout: false
                        });
                    }, 100)
                    break;
                default:
                    setChangesApp({
                        title: "App",
                        showMenu: false,
                        showReports: false,
                        showLogout: false
                    });
                    break;
            }
        });

        return unsubscribe;
    }, [navigation]);

    const baseOptions = {
        headerShown: true,
		header: () => <AppBar {...changesApp}/>
    }

    return (
        <>
            <AuthStack.Navigator initialRouteName='ListTable'>
                <AuthStack.Screen name="ListTable" component={ListTable} options={baseOptions} />
                <AuthStack.Screen name="ListDishes" component={ListDishes} options={baseOptions} />
            </AuthStack.Navigator>
            
        </>
    )
}

export default HomeRouter;