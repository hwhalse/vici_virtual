/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 */

import React, {useEffect, useState} from 'react';
import type {PropsWithChildren} from 'react';
import {
  SafeAreaView,
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  useColorScheme,
  AppRegistry,
  View,
} from 'react-native';

import { ApolloClient, InMemoryCache, ApolloProvider, gql } from '@apollo/client';

import {
  Colors,
  DebugInstructions,
  Header,
  LearnMoreLinks,
  ReloadInstructions,
} from 'react-native/Libraries/NewAppScreen';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import EncryptedStorage from 'react-native-encrypted-storage';
import Home from './components/Home';
import SignIn from './components/SignIn';
import LogWorkout from './components/LogWorkout';
import CreateWorkout from './components/CreateWorkout';
import CreateExercise from './components/CreateExercise';


type SectionProps = PropsWithChildren<{
  title: string;
}>;

function Section({children, title}: SectionProps): JSX.Element {
  const isDarkMode = useColorScheme() === 'dark';
  return (
    <View style={styles.sectionContainer}>
      <Text
        style={[
          styles.sectionTitle,
          {
            color: isDarkMode ? Colors.white : Colors.black,
          },
        ]}>
        {title}
      </Text>
      <Text
        style={[
          styles.sectionDescription,
          {
            color: isDarkMode ? Colors.light : Colors.dark,
          },
        ]}>
        {children}
      </Text>
    </View>
  );
}

const Stack = createNativeStackNavigator()
const client = new ApolloClient({
  uri: 'http://localhost:4000/graphql',
  cache: new InMemoryCache()
});

function App(): JSX.Element {
  const isDarkMode = useColorScheme() === 'dark';

  const backgroundStyle = {
    backgroundColor: isDarkMode ? Colors.darker : Colors.lighter,
  };

  const [authenticationStatus, setAuthenticationStatus] = useState(false)

  const retrieveLoginStatus = async (): Promise<void> => {
    try {
      const session = await EncryptedStorage.getItem("user_session")
      if (session !== undefined) setAuthenticationStatus(true)
    } catch(err) {
      console.log(err)
    }
  }

  useEffect(() => {
    retrieveLoginStatus()
  }, [])

  return (
    <ApolloProvider client={client}>
      <NavigationContainer>
        { authenticationStatus ? 
          <Stack.Navigator>
            <Stack.Screen name="Home" component={Home} options={{title: 'Welcome'}} />
            <Stack.Screen name="LogWorkout" component={LogWorkout} options={{title: 'Log Workout'}} />
            <Stack.Screen name="CreateWorkout" component={CreateWorkout} options={{title: 'Create Workout'}}/>
            <Stack.Screen name="CreateExercise" component={CreateExercise} options={{title: 'Create Exercise'}}/>
          </Stack.Navigator> : 
          <Stack.Navigator>
            <Stack.Screen name="Login" component={SignIn} options={{title: 'Login'}} />
          </Stack.Navigator>
        }
      </NavigationContainer>
    </ApolloProvider>
  );
}

AppRegistry.registerComponent('MyApplication', () => App)

const styles = StyleSheet.create({
  sectionContainer: {
    marginTop: 32,
    paddingHorizontal: 24,
  },
  sectionTitle: {
    fontSize: 24,
    fontWeight: '600',
  },
  sectionDescription: {
    marginTop: 8,
    fontSize: 18,
    fontWeight: '400',
  },
  highlight: {
    fontWeight: '700',
  },
});

export default App;
