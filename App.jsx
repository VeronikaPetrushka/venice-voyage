import React from 'react';
import { enableScreens } from 'react-native-screens';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { MusicProvider } from './src/constants/music';
import MusicPlayer from './src/components/MusicPlayer';
import HomeScreen from './src/screens/HomeScreen';
import DetailsScreen from './src/screens/DetailsScreen';
import CheckInScreen from './src/screens/CheckInScreen';
import StatisticScreen from './src/screens/StatisticScreen';
import QuizScreen from './src/screens/QuizScreen';

enableScreens();

const Stack = createStackNavigator();


const App = () => {
  
    return (
        <MusicProvider>
            <MusicPlayer />
            <NavigationContainer>
                    <Stack.Navigator initialRouteName="HomeScreen">
                        <Stack.Screen 
                            name="HomeScreen" 
                            component={HomeScreen} 
                            options={{ headerShown: false }} 
                        />
                        <Stack.Screen 
                            name="DetailsScreen" 
                            component={DetailsScreen} 
                            options={{ headerShown: false }} 
                        />
                        <Stack.Screen 
                            name="CheckInScreen" 
                            component={CheckInScreen} 
                            options={{ headerShown: false }} 
                        />
                        <Stack.Screen 
                            name="StatisticScreen" 
                            component={StatisticScreen} 
                            options={{ headerShown: false }} 
                        />
                        <Stack.Screen 
                            name="QuizScreen" 
                            component={QuizScreen} 
                            options={{ headerShown: false }} 
                        />
                    </Stack.Navigator>
            </NavigationContainer>
        </MusicProvider>
    );
};

export default App;
