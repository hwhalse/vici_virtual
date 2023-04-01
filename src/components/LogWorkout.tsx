import React from "react";
import { FlatList, Text, View, ListRenderItem } from "react-native";
import Workout from "./Workout";

export default function LogWorkout () {
    const mockData = [
       {
        focus: 'upper',
        date: 'Weds Feb 21 2023',
        duration: 48
       }
    ]
    return (
        <View>
            <Text>Choose Workout:</Text>
            <FlatList data={mockData} renderItem={(item) => <Workout />}></FlatList>
        </View>
    )
}