import { useLazyQuery } from "@apollo/client";
import React, { useState } from "react";
import { View, Text, TextInput, Button } from 'react-native';
import { GET_WORKOUTS_BY_NAME } from "../../GQL/queries";
import WorkoutFeed from "../MainFeed/WorkoutFeed";
import { FlatList } from "react-native-gesture-handler";

export default function FindWorkouts ({navigation}: any) {

    const [searchString, setSearchString] = useState('');

    const [getByName, {data, loading, error}] = useLazyQuery(GET_WORKOUTS_BY_NAME, {
        variables: {
            searchString: searchString
        }
    })

    return (
        <View>
            <Text>Search by name:</Text>
            <TextInput placeholder="type..." onChangeText={(text: string) => setSearchString(text)}></TextInput>
            <Button title="search" onPress={() => getByName()} />
            {data && <FlatList data={data.searchWorkoutsByName} keyExtractor={(item, index) => `${item.id}, ${index}`} renderItem={({item}) => <WorkoutFeed workout={item}/>} />}
        </View>
    )
}