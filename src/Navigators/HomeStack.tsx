import * as React from 'react';
import { View } from 'react-native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import Home from '../components/Home';
import LogWorkout from '../components/MainFeed/LogWorkout';
import MyFriends from '../components/Social/MyFriends';
import SearchUsers from '../components/Social/SearchUsers';
import FindWorkouts from '../components/Workouts/FindWorkouts';
import { GestureHandlerRootView } from 'react-native-gesture-handler';

const HomeStack = createNativeStackNavigator();

export default function HomeStackScreen() {
    return (
        <GestureHandlerRootView style={{height: 1000}}>
      <HomeStack.Navigator screenOptions={{headerShown: false}}>
        <HomeStack.Screen name="Home!" component={Home}/>
        <HomeStack.Screen name="LogWorkout" component={LogWorkout} options={{title: 'Log Workout'}} />
        <HomeStack.Screen name='MyFriends' component={MyFriends} options={{title: "My Friends"}}/>
        <HomeStack.Screen name='SearchUsers' component={SearchUsers} options={{title: "Find Friends"}}/>
        <HomeStack.Screen name='FindWorkouts' component={FindWorkouts} options={{title: "Find Workouts"}}/>
      </HomeStack.Navigator>
      </GestureHandlerRootView>
    );
  }