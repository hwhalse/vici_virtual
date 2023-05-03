import { useLazyQuery, useQuery } from "@apollo/client";
import { NavigationProp } from "@react-navigation/native";
import React, { useEffect, useState } from "react";
import { Button, Text, TextInput, View, FlatList } from "react-native";
import EncryptedStorage from "react-native-encrypted-storage";
import { GET_USER_INFO, GET_USER_WORKOUTS } from "../GQL/queries";
import WorkoutFeed from "./WorkoutFeed";

interface UserWorkouts {
    name: string;
    created_by: string;
}

export default function Home ({navigation}: any) {

    const [username, setUsername] = useState({username: '', token: ''});
    const [today, setToday] = useState('')
    const [getUser, {data, loading, error}] = useLazyQuery(GET_USER_INFO, {
        variables: {
            username: username.username
        }
    })

    console.log(username.username)

    const todayDate = (): void => {
      const now = new Date();
      const dateString = now.toLocaleDateString()
      setToday(dateString)
    }

    const getUserInfo = async (): Promise<void> => {
        try {
          const info = await EncryptedStorage.getItem("user_session");
          console.log(info)
          if (info !== null) {
            const obj = await JSON.parse(info)
            setUsername(obj)
          }
        } catch(err) {
            console.log(err)
        }
        getUser()
    }

    useEffect(() => {
        getUserInfo()
        todayDate()
    }, [])

    return (
        <View style={{height: '100%', width: '100%', display: 'flex', alignItems: 'center', justifyContent: 'flex-start'}}>
            <Text style={{padding: 20, fontSize: 30, fontWeight: "bold"}}>Profile: {username.username}</Text>
            <Text>Today's Date: {today}</Text>
            <Button title="Create Workout" onPress={() => navigation.navigate('CreateWorkout')}></Button>
            <Button title="Previous Workouts" onPress={() => navigation.navigate('LoggedWorkouts')}/>
            <Button title="My Workouts" onPress={() => navigation.navigate('MyWorkouts', {navigation: navigation})}/>
            {data && 
            <View>
                <Text>
                    Hi: {data.getUser.first_name}
                </Text>
                <Text>
                    weight: {data.getUser.weight}
                </Text>
            </View>}
        </View>
    )
}