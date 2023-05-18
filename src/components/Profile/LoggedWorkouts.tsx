import { useQuery } from "@apollo/client";
import React, {useEffect, useState} from "react";
import { View, Text } from "react-native";
import EncryptedStorage from "react-native-encrypted-storage";
import { GET_LOGGED_WORKOUTS } from "../../GQL/queries";
import { FlatList } from "react-native-gesture-handler";
import ProfileFeedItem from "../Profile/ProfileFeedItem";


export default function LoggedWorkouts () {

    const [prevWorkouts, setPrevWorkouts] = useState([])
    const [username, setUsername] = useState('')
    const {data, loading, error} = useQuery(GET_LOGGED_WORKOUTS, {
        variables: {
            userId: 1
        }
    });

    console.log(data)
    console.log(error)

    if (loading) return <Text>loading</Text>
    if (error) return <Text>Error</Text>

    return (
        <View>
            <Text>View All Logged Workouts</Text>
            {data && data.getLoggedWorkouts && <FlatList data={data.getLoggedWorkouts} keyExtractor={(item, index) => `${item.date}, ${index}`} renderItem={({item}) => <ProfileFeedItem workout={item} />}/>}
        </View>
    )
}