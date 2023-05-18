import React, { useState } from "react";
import { View, Text, TextInput, Button, FlatList } from "react-native";
import ExerciseList from "./ExerciseList";

interface Exercise {
    equipment: string[];
    name: string;
    reps: number;
    sets: number;
    weight: number;
}

interface Workout {
    name: string;
    date: string;
    created_by: string;
    level: number;
    type: string;
    exercises: Exercise[]
}

export default function WorkoutFeed ({workout, navigation}: any) {
    return (
        <View style={{borderColor: 'blue', borderWidth: 1}}>
            <Text>Name: {workout.name}</Text>
            <Text>Type: {workout.type}</Text>
            <Text>Level: {workout.level}</Text>
            <Text>Created By: {workout.creator_id}</Text>
            <FlatList data={workout.exercises} keyExtractor={(item, index) => `${index + 60}`} renderItem={({item}) => <ExerciseList exercise={item} />} />
            <Button title="Log workout" onPress={() => navigation.navigate('LogWorkout', {workout: workout})} />
        </View>
    )
}