import * as React from 'react';
import { View } from 'react-native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import LogWorkout from '../components/MainFeed/LogWorkout';
import CreateWorkout from '../components/Workouts/CreateWorkout';
import CreateExercise from '../components/Workouts/CreateExercise';
import MyWorkouts from '../components/Workouts/MyWorkouts';
import Profile from '../components/Profile/Profile';
import MyFriends from '../components/Social/MyFriends';


const ProfileStack = createNativeStackNavigator();

export default function ProfileStackScreen() {
    return (
      <ProfileStack.Navigator screenOptions={{headerStyle: {
        backgroundColor: '#f4511e',
      },
      headerTintColor: '#fff',
      headerTitleStyle: {
        fontWeight: 'bold',
      }
    }}>
        <ProfileStack.Screen name="CreateWorkout" component={CreateWorkout} options={{title: 'Create Workout'}}/>
        <ProfileStack.Screen name="CreateExercise" component={CreateExercise} options={{title: 'Create Exercise'}}/>
        <ProfileStack.Screen name="MyWorkouts" component={MyWorkouts} options={{title: "My Workouts"}}/>
        <ProfileStack.Screen name='Profile' component={Profile} options={{title: "Profile"}}/>
        <ProfileStack.Screen name='MyFriends' component={MyFriends} options={{title: "My Friends"}}/>
      </ProfileStack.Navigator>
    );
  }