import { NavigationProp } from "@react-navigation/native";
import React, { useEffect, useState } from "react";
import { Button, Text, TextInput, View } from "react-native";
import EncryptedStorage from "react-native-encrypted-storage";
import Workout from "./Workout";

export default function Home ({navigation, LogWorkout}: any) {

    const [username, setUsername] = useState({username: '', token: ''});
    const [today, setToday] = useState('')

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
    }

    useEffect(() => {
        getUserInfo()
        todayDate()
    }, [])

    return (
        <View style={{height: '100%', width: '100%', display: 'flex', alignItems: 'center', justifyContent: 'flex-start'}}>
            <Text style={{padding: 20, fontSize: 30, fontWeight: "bold"}}>Profile: {username.username}</Text>
            <Text>Today's Date: {today}</Text>
            <Button title="Log Workout" onPress={() => navigation.navigate('LogWorkout')}></Button>
            <Button title="Create Workout" onPress={() => navigation.navigate('CreateWorkout')}></Button>
            <View style={{marginTop: 20, width: '100%', height: '100%'}}>
                <Text style={{textDecorationLine: 'underline'}}>My Workouts:</Text>
                {/* <Workout/> */}
            </View>
        </View>
    )
}