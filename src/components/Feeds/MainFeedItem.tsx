import React, { useEffect, useState } from "react";
import { View, Text, FlatList, Button } from "react-native";
import LoggedWorkoutExercises from "../MainFeed/LoggedWorkoutExercises";
import { useMutation, useLazyQuery, useQuery } from "@apollo/client";
import { GET_WORKOUT_BY_ID, GET_WORKOUT_LIKES, LIKE_WORKOUT, SAVE_WORKOUT } from "../../GQL/queries";

export default function MainFeedItem ({workout, workoutIds, navigation}: any) {

    const [saveable, setSaveable] = useState(false)

    const [getWorkout] = useLazyQuery(GET_WORKOUT_BY_ID, {variables: {id: workout.workout_id}})
    const getLikes = useQuery(GET_WORKOUT_LIKES, {
        variables: {
            workout_id: workout.workout_id
        }
    })
    const [likeWorkout] = useMutation(LIKE_WORKOUT, {
        onError: (error) => console.log(error)
    })
    
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

    const like = () => {
        likeWorkout({
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
                Date posted: {workout.date}
            </Text>
            <Text>
                Location: {workout.location}
            </Text>
            {workout.name &&<Text>
                Workout: {workout.name}
            </Text>}
            <FlatList data={workout.workout_data.data} keyExtractor={(item: any, index: number) => `${item.name}, ${index}`} renderItem={(({item}: any) => <LoggedWorkoutExercises list={item}/>)} />
            <View style={{margin: 10}}>
                {getLikes.data && <Text>Likes: {getLikes.data.getWorkoutLikes}</Text>}
            </View>
            <View>
              <Button title="Log this workout" onPress={log}/>
              {saveable && <Button title="Save to my workouts" onPress={save} />}
              <Button title="Like this workout" onPress={like} />
            </View>
        </View>
    )
}