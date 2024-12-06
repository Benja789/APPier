import { createNativeStackNavigator } from '@react-navigation/native-stack';
import SignIn from '../pages/auth/SignIn';
import Loader from '../components/Base/Loader';


const AuthStack = createNativeStackNavigator<any>();

const AuthRouter = () => {
	const baseOptions = {
		headerShown: false
	};
    return (
        <>
            <AuthStack.Navigator initialRouteName='SignIn'>
                <AuthStack.Screen name="SignIn" component={SignIn} options={baseOptions}/>
            </AuthStack.Navigator>
        </>
    )
}

export default AuthRouter;