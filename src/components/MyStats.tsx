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

    const getRMR = () => {
        if (!data.getUser) return 0
        console.log(data.getUser.birth_date.slice(1, 11))
        const today = new Date().toISOString().slice(0, 10)
        console.log(today)
        const height = data.getUser.height;
        const weight = data.getUser.weight / 2.2;
        const gender = data.getUser.gender;
        if (gender === 'Male') {
            return Math.floor((10 * weight) + (6.25 * height) - (5 * 30))
        } else if (gender === 'Female') {
            return Math.floor((10 * weight) + (6.25 * height) - (5 * 30) - 161)
        }
    }

    const update = () => {
        updateUser({variables: {
            input: {
                id: userStats.id,
                date: new Date().getUTCDate(),
                weight: userStats.weight === 0 ? data.getUser.weight : userStats.weight,
                bodyfat: userStats.bodyfat === 0 ? data.getUser.bodyfat : userStats.bodyfat,
                muscleMass: userStats.muscleMass === 0 ? data.getUser.muscle_mass : userStats.muscleMass
            }
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
                <Text>Height: {data.getUser.height}</Text>
                <Text>Weight: {data.getUser.weight}</Text>
                <Text>Bodyfat: {data.getUser.bodyfat}</Text>
                <Text>Muscle Mass: {data.getUser.muscle_mass}</Text>
                <Text>Resting Metabolic Rate: {getRMR()}</Text>
            </View>
            }
            <View>
                <Text>
                    Update Stats:
                </Text>
                <TextInput placeholder="Weight" onChangeText={(text: string) => setUserStats({...userStats, weight: Number(text)})}>Weight: </TextInput>
                <TextInput placeholder="Body Fat" onChangeText={(text: string) => setUserStats({...userStats, bodyfat: Number(text)})}>Body Fat: </TextInput>
                <TextInput placeholder="Muscle Mass" onChangeText={(text: string) => setUserStats({...userStats, muscleMass: Number(text)})}>Muscle Mass: </TextInput>
                <Button title="Update" onPress={() => update()} />
            </View>
        </View>
    )
}