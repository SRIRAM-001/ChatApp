
import Home from './src/Screens/Home';
import Signin from './src/Screens/Signin';
import SigninContainer from './src/Screens/SigninContainer';
import ChatScreen from './src/Screens/ChatScreen'

import { NavigationContainer } from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack'
import { Provider } from 'react-redux';
import store from './src/store/store';

const Stack = createNativeStackNavigator();

export default function App() {
  return (
    <Provider store={store}>
    <NavigationContainer>

      <Stack.Navigator
        screenOptions={{
          headerStyle: {
            backgroundColor: 'rgba(105, 101, 251, 0.5)', 
          },
          headerTintColor: 'white', 
          headerTitleStyle: {
            fontWeight: 'bold', 
          },
        }}
      >
        <Stack.Screen 
        component={Signin}
        name='signin'
        options={{headerShown:false}}
        />

        <Stack.Screen name='SigninContainer' component={SigninContainer} options={{headerShown:false}}/>
        
        <Stack.Screen name='Home' component={Home} options={{headerShown:false}}/>
        <Stack.Screen name='chatScreen' component={ChatScreen} />
      </Stack.Navigator>

      
    </NavigationContainer>
    </Provider>
  );
}




