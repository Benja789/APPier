import { createNativeStackNavigator } from '@react-navigation/native-stack';
import Home from '../pages/home/Home';
import ListTable from '../pages/home/ListTable';
import { HomeStackParamList } from '../interfaces/IRouter';


const AuthStack = createNativeStackNavigator<HomeStackParamList>();

const HomeRouter = () => {
    const baseOptions = {
        headerShown: false
    };

    return (
        <AuthStack.Navigator initialRouteName='ListTable'>
            <AuthStack.Screen name="ListTable" component={ListTable} options={baseOptions} />
            <AuthStack.Screen name="Index" component={Home} options={baseOptions} />
        </AuthStack.Navigator>
    )
}

export default HomeRouter;