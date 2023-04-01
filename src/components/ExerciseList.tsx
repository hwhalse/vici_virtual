import React from "react";
import { Text, View } from "react-native";
import { useQuery } from "@apollo/client";
import { GET_EXERCISES } from "../GQL/queries";

type ExerciseProp = {
  name: string,
  weight: number,
  sets: number,
  reps: number,
}

export default function ExerciseList (props: ExerciseProp) {

    const {loading, error, data} = useQuery(GET_EXERCISES);

    if (loading) return <Text>Loading...</Text>;
    if (error) return <Text>Error! {error.message}</Text>

    console.log('hi')
    console.log(data.exercises[0].bodypart)

    return (
        <View style={{display: 'flex', flexDirection: 'row', justifyContent: 'space-between', padding: 5, borderBottomColor: 'black', borderBottomWidth: 1}}>
            <Text>{data.exercises[0].bodypart}</Text>
            <Text>{props.weight}</Text>
            <Text>{props.sets}</Text>
            <Text>{props.reps}</Text>
            <Text>{props.sets * props.reps * props.weight}</Text>
        </View>
    )
}