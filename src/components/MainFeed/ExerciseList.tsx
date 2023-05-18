import React from "react";
import { Text, View, Button } from "react-native";
import { useQuery } from "@apollo/client";
import { GET_EXERCISES } from "../../GQL/queries";
import { NavigationProp, useNavigation } from "@react-navigation/native";
import LogWorkout from "./LogWorkout";

type ExerciseProp = {
  name: string,
  weight: number,
  sets: number,
  reps: number,
}

export default function ExerciseList ({exercise}: any) {
    return (
    <View style={{display: 'flex', flexDirection: 'row', justifyContent: 'space-between', padding: 5, borderBottomColor: 'black', borderBottomWidth: 1}}>
        <Text>Name: {exercise.name}</Text>
        <Text>Weight: {exercise.weight}</Text>
        <Text>Sets: {exercise.sets}</Text>
        <Text>Reps: {exercise.reps}</Text>
        <Text>Volume: {exercise.sets * exercise.reps * exercise.weight}</Text>
    </View>
    )
}