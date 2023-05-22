import * as React from 'react';
import { View } from 'react-native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import Home from '../components/Home';
import LogWorkout from '../components/MainFeed/LogWorkout';
import MyFriends from '../components/Social/MyFriends';
import SearchUsers from '../components/Social/SearchUsers';
import FindWorkouts from '../components/Workouts/FindWorkouts';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import CreateWorkout from '../components/Workouts/CreateWorkout';
import CreateExercise from '../components/Workouts/CreateExercise';

const MakeWorkoutStack = createNativeStackNavigator();

export default function MakeWorkout() {
    return (
      <GestureHandlerRootView style={{height: '100%'}}>
        <MakeWorkoutStack.Navigator screenOptions={{headerShown: true}}>
            <MakeWorkoutStack.Screen name="CreateWorkout" component={CreateWorkout} options={{title: 'Create Workout'}}/>
            <MakeWorkoutStack.Screen name="CreateExercise" component={CreateExercise} options={{title: 'Create Exercise'}}/>
        </MakeWorkoutStack.Navigator>
      </GestureHandlerRootView>
    );
  }