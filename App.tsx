import React, { useEffect } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';


import AuthRouter from './app/routes/AuthRouter';
import HomeRouter from './app/routes/HomeRouter';
import AppContext from './app/context/AppContex';
import { StatusBar } from 'react-native';
import Loader from './app/components/Base/Loader';
// import { getApps } from '@react-native-firebase/app';
import SnackNotification from './app/components/Base/SnackNotification';


const Stack = createNativeStackNavigator();

const App = () => {
	const baseOptions = {
		headerShown: false,
	};

	useEffect(()=>{
		// const checkFirebase = () => {
		// 	const apps = getApps(); // Obtiene todas las instancias de Firebase inicializadas
		// 	if (apps.length > 0) {
		// 	  console.log('Firebase está configurado correctamente:', apps[0].name);
		// 	} else {
		// 	  console.error('Firebase no está configurado.');
		// 	}
		//   };
		//   checkFirebase();
	}, [])
	return (
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
	);
}

export default App;
