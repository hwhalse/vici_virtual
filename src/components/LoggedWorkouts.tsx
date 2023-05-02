import { useLazyQuery } from "@apollo/client";
import React, {useEffect, useState} from "react";
import { View, Text } from "react-native";
import EncryptedStorage from "react-native-encrypted-storage";
import { GET_LOGGED_WORKOUTS } from "../GQL/queries";
import { FlatList } from "react-native-gesture-handler";


export default function LoggedWorkouts () {

    const [prevWorkouts, setPrevWorkouts] = useState([])
    const [username, setUsername] = useState('')
    const [loadWorkouts, {data}] = useLazyQuery(GET_LOGGED_WORKOUTS, {
        variables: {
            username: "test"
        }
    });

    console.log(data)

    const getUserInfo = async (): Promise<void> => {
        try {
          const info = await EncryptedStorage.getItem("user_session");
          console.log(info)
          if (info !== null) {
            const obj = await JSON.parse(info)
            setUsername(obj.username)
          }
        } catch(err) {
            console.log(err)
        }
    }

    useEffect(() => {
        loadWorkouts()
        getUserInfo()
    }, [])

    return (
        <View>
            <Text>View All Logged Workouts</Text>
            {data && data.getLoggedWorkouts.length > 0 && <FlatList data={data.getLoggedWorkouts} keyExtractor={(item, index) => `${item.date}, ${index}`} renderItem={({item}) => <View>
                <Text>
                    Date: {item.date}
                </Text>
                <Text>
                    Location: {item.location}
                </Text>
                <Text>
                    Results: 
                </Text>
                <FlatList data={item.workout_data.data} keyExtractor={(item) => item.name} renderItem={({item}) => {console.log(item); return <Text>{item.name}</Text>}}/>
            </View>} />}
        </View>
    )
}