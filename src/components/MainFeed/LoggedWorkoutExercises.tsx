import React from "react";
import { View, Text } from "react-native";
import { FlatList } from "react-native-gesture-handler";

export default function LoggedWorkoutExercises ({list}: any) {
    console.log(list.result)
    return (
        <View>
            <Text>{list.name}</Text>
            <FlatList data={list.result[0].reps} keyExtractor={(item, index) => `${item}, ${index}`} renderItem={({item, index}) => 
            <View>
                <Text>Set #{index + 1}</Text>
                <Text>Reps: {item}</Text>
                <Text>Weight: {list.result[0].weight[index]}</Text>
            </View>}/>
        </View>
    )
}