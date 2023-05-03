import React, {useEffect, useState} from "react";
import { View, Text, TextInput, Button } from "react-native";
import EncryptedStorage from "react-native-encrypted-storage";
import { GET_USER_INFO, UPDATE_USER_STATS } from "../GQL/queries";
import { useLazyQuery, useMutation } from "@apollo/client";

export default function MyStats () {

    const [username, setUsername] = useState('')

    const [getUser, {data, loading, error}] = useLazyQuery(GET_USER_INFO, {
        variables: {
            username: username
        }
    })
    const [userStats, setUserStats] = useState({
        id: data?.getUser.id,
        date: new Date().toISOString(),
        weight: 0,
        bodyfat: 0,
        muscleMass: 0
    })

    const [updateUser] = useMutation(UPDATE_USER_STATS, {
        onError: ((e: Error) => console.log(e))
    })

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
        getUser()
    }

    const update = () => {
        updateUser({variables: {
            input: userStats
        }})
    }

    useEffect(() => {
        getUserInfo()
    }, [])

    return (
        <View>
            {data && data.getUser && 
            <View>
                <Text>Hi {data.getUser.first_name}</Text>
                <Text>Height {data.getUser.height}</Text>
                <Text>Weight {data.getUser.weight}</Text>
                <Text>Body Fat {data.getUser.bodyfat}</Text>
                <Text>Muscle Mass {data.getUser.muscle_mass}</Text>
            </View>
            }
            <View>
                <Text>
                    Update Stats:
                </Text>
                <TextInput placeholder="Weight" onChangeText={(text: string) => setUserStats({...userStats, weight: Number(text)})}>Weight: </TextInput>
                <TextInput placeholder="Body Fat" onChangeText={(text: string) => setUserStats({...userStats, bodyfat: Number(text)})}>Body Fat: </TextInput>
                <TextInput placeholder="Muscle Mass" onChangeText={(text: string) => setUserStats({...userStats, muscleMass: Number(text)})}>Muscle Mass: </TextInput>
                <Button title="Update" onPress={() => updateUser()} />
            </View>
        </View>
    )
}