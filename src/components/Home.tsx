import { useLazyQuery } from "@apollo/client";
import React, { useEffect, useState } from "react";
import { Button, Text, View } from "react-native";
import EncryptedStorage from "react-native-encrypted-storage";
import { GET_USER_INFO } from "../GQL/queries";
import MainFeed from "./MainFeed";

export default function Home ({navigation}: any) {

    const [username, setUsername] = useState({username: '', token: ''});
    const [today, setToday] = useState('')
    const [getUser, {data, loading, error}] = useLazyQuery(GET_USER_INFO, {
        variables: {
            username: username.username
        }
    })

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
            <Button title="Create Workout" onPress={() => navigation.navigate('CreateWorkout')}></Button>
            <Button title="My Previous Workouts" onPress={() => navigation.navigate('LoggedWorkouts')}/>
            <Button title="My Saved Workouts" onPress={() => navigation.navigate('MyWorkouts')}/>
            <Button title="My Stats" onPress={() => navigation.navigate('MyStats')}/>
            <Button title="Following" onPress={() => navigation.navigate('MyFriends')}/>
            <Button title="Find Friends" onPress={() => navigation.navigate('SearchUsers')}/>
            <Button title="Find Workouts" onPress={() => navigation.navigate('FindWorkouts')}/>
            {data && <MainFeed navigation={navigation} userData={data.getUser}/>}
        </View>
    )
}