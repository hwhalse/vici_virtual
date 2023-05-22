import React, { useEffect, useState } from "react";
import { View, Text, FlatList, Button } from "react-native";
import LoggedWorkoutExercises from "../MainFeed/LoggedWorkoutExercises";
import { useMutation, useLazyQuery, useQuery } from "@apollo/client";
import { GET_WORKOUT_BY_ID, GET_WORKOUT_LIKES, LIKE_WORKOUT, SAVE_WORKOUT } from "../../GQL/queries";
import { TouchableOpacity } from "react-native-gesture-handler";

export default function MainFeedItem ({workout, workoutIds, navigation}: any) {

    if (workout.workout_data.data.length === 0) return <View></View>

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
        <View style={{borderBottomColor: 'pink', borderBottomWidth: 2, flex: 1, marginTop: 5, padding: 12}}>
            <View style={{flexDirection: 'row', justifyContent: 'space-around', marginBottom: 5}}>
                <Text style={{fontWeight: 'bold'}}>
                    @{workout.author_name}
                </Text>
                {/* <Text style={{fontWeight: 'bold'}}>
                    {workout.location}
                </Text> */}
                <Text>
                    {workout.date.slice(0, 10)}
                </Text>
            </View>
            <View style={{flexDirection: 'row', justifyContent: 'center', marginBottom: 5}}>
                <Text style={{fontSize: 15, fontWeight: 'bold'}}>Workout</Text>
            </View>
            {workout.name &&
            <Text>
                Workout: {workout.name}
            </Text>}
            <FlatList data={workout.workout_data.data} keyExtractor={(item: any, index: number) => `${item.name}, ${index}`} renderItem={(({index, item}: any) => <LoggedWorkoutExercises index={index} list={item}/>)} />
            <View style={{flexDirection: 'row', justifyContent: 'space-around', paddingTop: 5, paddingBottom: 5}}>
                {getLikes.data && <Text style={{padding: 5}}>Likes: {getLikes.data.getWorkoutLikes}</Text>}
                <TouchableOpacity activeOpacity={0.6} style={{backgroundColor: 'red', padding: 5, borderRadius: 6}} onPress={log}>
                    <Text>Log workout</Text>
                </TouchableOpacity>
                {saveable && 
                <TouchableOpacity activeOpacity={0.6} style={{backgroundColor: 'red', padding: 5, borderRadius: 6}} onPress={save}>
                    <Text>Save Workout</Text>
                </TouchableOpacity>}
                <TouchableOpacity activeOpacity={0.6} style={{backgroundColor: 'red', padding: 5, borderRadius: 6}} onPress={like}>
                    <Text>Like Workout</Text>
                </TouchableOpacity>
            </View>
        </View>
    )
}