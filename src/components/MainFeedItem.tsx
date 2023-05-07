import React from "react";
import { View, Text, FlatList, Button } from "react-native";
import LoggedWorkoutExercises from "./LoggedWorkoutExercises";

export default function MainFeedItem ({workout}: any) {
    const day = new Date(workout.date.slice(1, -1)).toDateString()
    console.log(workout.workout_data)
    return (
        <View style={{borderColor: 'pink', borderWidth: 2, width: 350, marginTop: 5}}>
            <Text>
                Date posted: {day}
            </Text>
            <Text>
                Location: {workout.location}
            </Text>
            <Text>
                Workout:
            </Text>
            <FlatList data={workout.workout_data.data} keyExtractor={(item: any, index: number) => `${item.name}, ${index}`} renderItem={(({item}: any) => <LoggedWorkoutExercises list={item}/>)} />
            <Button title="Save to my workouts" onPress={() => console.log('hi')} />
        </View>
    )
}