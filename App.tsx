import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';


import AuthRouter from './app/routes/AuthRouter';
import HomeRouter from './app/routes/HomeRouter';
import AppContext from './app/context/AppContex';
import { StatusBar } from 'react-native';
import Loader from './app/components/Base/Loader';
// import { getApps } from '@react-native-firebase/app';
import SnackNotification from './app/components/Base/SnackNotification';
import { SafeAreaView } from 'react-native-safe-area-context';


const Stack = createNativeStackNavigator();

const App = () => {
	const baseOptions = {
		headerShown: false,
	};

	return (
		<SafeAreaView style={{flex: 1}}>
			<AppContext>
				<Loader />
				<SnackNotification />
				<StatusBar animated={false} backgroundColor="#FFF" barStyle="dark-content" />
				<NavigationContainer>
					<Stack.Navigator initialRouteName="Auth">
						<Stack.Screen name="Auth" component={AuthRouter} options={baseOptions}/>
						<Stack.Screen name="Home" component={HomeRouter} options={baseOptions}/>
					</Stack.Navigator>
				</NavigationContainer>
			</AppContext>
		</SafeAreaView>
	);
}

export default App;
