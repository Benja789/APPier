import { createNativeStackNavigator } from '@react-navigation/native-stack';
import ListTable from '../pages/home/ListTable';
import ListDishes from '../pages/home/ListDishes';

const AuthStack = createNativeStackNavigator<any>();

const HomeRouter = () => {
    const baseOptions = {
        headerShown: false
    };

    return (
        <AuthStack.Navigator initialRouteName='ListTable'>
            <AuthStack.Screen name="ListTable" component={ListTable} options={baseOptions} />
            <AuthStack.Screen name="ListDishes" component={ListDishes} options={baseOptions} />
        </AuthStack.Navigator>
    )
}

export default HomeRouter;