import React from 'react'
import { NavigationContainer} from '@react-navigation/native'
import { createStackNavigator } from '@react-navigation/stack'
import Search from './screens/Search'
import Details from './screens/Details'
import Home from './screens/Home'
import Splash from './screens/Splash'
const Stack = createStackNavigator()

const AppNavigator = () => {

    return (
        <NavigationContainer>
            <Stack.Navigator screenOptions={{ headerShown: false }}>
                <Stack.Screen name='Splash' component={Splash} />
                <Stack.Screen name='Home' component={Home} />
                <Stack.Screen name='Search' component={Search} />
                <Stack.Screen name='Details' component={Details} />
            </Stack.Navigator>
        </NavigationContainer>
    )
}

export default AppNavigator