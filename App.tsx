import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';


import AuthRouter from './app/routes/AuthRouter';
import HomeRouter from './app/routes/HomeRouter';

const Stack = createNativeStackNavigator();

const App = () => {
	const baseOptions = {
		headerShown: false
	};
	return (
		<NavigationContainer>
			<Stack.Navigator initialRouteName="SignIn">
				<Stack.Screen name="SignIn" component={AuthRouter} options={baseOptions}/>
				<Stack.Screen name="Home" component={HomeRouter} options={baseOptions}/>
			</Stack.Navigator>
		</NavigationContainer>
	);
}

export default App;
