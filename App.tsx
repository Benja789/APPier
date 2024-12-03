import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';


import AuthRouter from './app/routes/AuthRouter';
import HomeRouter from './app/routes/HomeRouter';
import AppContext from './app/context/AppContex';
import { StatusBar } from 'react-native';
import AppBar from './app/components/Base/AppBar';

const Stack = createNativeStackNavigator();

const App = () => {
	const baseOptions = {
		headerShown: false,
		// title: "Ejemplo",
		// header: (props:any) => <AppBar title='Ejemplo' showReports={false} showLogout={true}/>
	};
	return (
		<AppContext>
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
