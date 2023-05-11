import React, {useEffect, useState} from "react";
import {View, Text, FlatList} from 'react-native';
import { useQuery } from "@apollo/client";
import { GET_USER_WORKOUTS } from "../GQL/queries";
import EncryptedStorage from "react-native-encrypted-storage";
import WorkoutFeed from "./WorkoutFeed";

export default function MyWorkouts ({navigation}: any) {

    const [username, setUsername] = useState('')

    const { error, loading, data } = useQuery(GET_USER_WORKOUTS, {
        variables: {
            id: 1
        }
    })

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
        getUserInfo()
    }, [])

    return (
        <View>
            <Text>
                Hi
            </Text>
            <View style={{marginTop: 20, width: '100%', height: '100%'}}>
                <Text style={{textDecorationLine: 'underline'}}>My Workouts:</Text>
                {data && <FlatList data={data.getWorkoutsByAuthor} keyExtractor={(item, index) => `${index + 50}`} renderItem={({item}) => {console.log(item);return <WorkoutFeed workout={item} navigation={navigation} />}} />}
            </View>
        </View>
    )
}