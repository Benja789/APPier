import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';


import AuthRouter from './app/routes/AuthRouter';
import HomeRouter from './app/routes/HomeRouter';
import AppContext from './app/context/AppContex';
import { StatusBar } from 'react-native';

const Stack = createNativeStackNavigator();

const App = () => {
	const baseOptions = {
		headerShown: false
	};
	return (
		<AppContext>
            <StatusBar backgroundColor="#FFF" barStyle="dark-content" />
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
