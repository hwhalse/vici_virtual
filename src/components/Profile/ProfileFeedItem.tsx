import React, { useEffect, useState } from "react";
import { View, Text, FlatList, Button } from "react-native";
import LoggedWorkoutExercises from "../MainFeed/LoggedWorkoutExercises";
import { useMutation, useLazyQuery, useQuery } from "@apollo/client";
import { GET_WORKOUT_BY_ID, GET_WORKOUT_LIKES, LIKE_WORKOUT, SAVE_WORKOUT } from "../../GQL/queries";

export default function MainFeedItem ({workout, navigation}: any) {

    const [saveable, setSaveable] = useState(false)

    const getLikes = useQuery(GET_WORKOUT_LIKES, {
        variables: {
            workout_id: workout.workout_id
        }
    })

    const log = async () => {
        await navigation.navigate('LogWorkout', {workout: workout.id})
    }

    return (
        <View style={{borderColor: 'pink', borderWidth: 2, width: 350, marginTop: 5}}>
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
            </View>
        </View>
    )
}