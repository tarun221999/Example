import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import 'react-native-gesture-handler';

import LoginScreen from './src/screens/AuthScreens/LoginScreen';
import ProfileScreen from './src/screens/ProfileScreen';
import EditProfileScreen from './src/screens/EditProfileScreen';


const Stack = createStackNavigator();

const options= {
  headershown: false
}
function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Home" screenOptions={{
             headerShown: false
         }}>
        <Stack.Screen name="Login" component={LoginScreen} />
        <Stack.Screen name="Profile" component={ProfileScreen}  />
        <Stack.Screen name="Edit-Profile" component={EditProfileScreen}  />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

export default App;