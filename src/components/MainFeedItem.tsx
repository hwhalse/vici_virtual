import React, { useEffect, useState } from "react";
import { View, Text, FlatList, Button } from "react-native";
import LoggedWorkoutExercises from "./LoggedWorkoutExercises";
import { useMutation, useLazyQuery } from "@apollo/client";
import { GET_WORKOUT_BY_ID, SAVE_WORKOUT } from "../GQL/queries";

export default function MainFeedItem ({workout, workoutIds, navigation}: any) {

    const [saveable, setSaveable] = useState(false)

    const day = new Date(workout.date.slice(1, -1)).toDateString()

    const [getWorkout] = useLazyQuery(GET_WORKOUT_BY_ID, {variables: {id: workout.workout_id}})
    
    const [saveWorkout] = useMutation(SAVE_WORKOUT, {
        onError: (error) => console.log(error)
    })

    const canSave = () => {
        for (const id of workoutIds) {
            console.log(id)
            if (id.workout_id === workout.workout_id) return
        }
        setSaveable(true)
    }

    useEffect(() => {
        canSave()
    }, [])

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

    const log = async () => {
        const query = await getWorkout()
        await navigation.navigate('LogWorkout', {workout: query.data.getWorkoutById})
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
            <View>
              <Button title="Log this workout" onPress={log}/>
              {saveable && <Button title="Save to my workouts" onPress={save} />}
            </View>
        </View>
    )
}