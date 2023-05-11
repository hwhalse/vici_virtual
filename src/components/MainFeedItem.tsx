import React from "react";
import { View, Text, FlatList, Button } from "react-native";
import LoggedWorkoutExercises from "./LoggedWorkoutExercises";
import { useMutation } from "@apollo/client";
import { CREATE_WORKOUT, SAVE_WORKOUT } from "../GQL/queries";

export default function MainFeedItem ({workout}: any) {
    const day = new Date(workout.date.slice(1, -1)).toDateString()
    console.log(workout)
    const [saveWorkout] = useMutation(SAVE_WORKOUT)
    const save = () => {
        saveWorkout({
            variables: {
                input: {
                user_id: 1,
                workout_id: workout.workout_id
              }
            }
        })
    }
    return (
        <View style={{borderColor: 'pink', borderWidth: 2, width: 350, marginTop: 5}}>
            <Text>
                User: {workout.author_name}
            </Text>
            <Text>
                Date posted: {day}
            </Text>
            <Text>
                Location: {workout.location}
            </Text>
            {workout.name &&<Text>
                Workout: {workout.name}
            </Text>}
            <FlatList data={workout.workout_data.data} keyExtractor={(item: any, index: number) => `${item.name}, ${index}`} renderItem={(({item}: any) => <LoggedWorkoutExercises list={item}/>)} />
            <Button title="Save to my workouts" onPress={save} />
        </View>
    )
}