import React from "react";
import { Text, View, FlatList } from "react-native";
import ExerciseList from "./ExerciseList";

export default function Workout () {

    const date = new Date();
    const time = date.toDateString()

    const dummyData = {
        workoutNo: 1,
        focus: 'Upper Body',
        date: time,
        exercises: [
            {
                name: 'Barbell Row',
                weight: 135,
                sets: 3,
                reps: 10,
            },
            {
                name: 'Barbell Curl',
                weight: 95,
                sets: 3,
                reps: 15
            }
        ],
        rpe: 5,
        duration: 51
    }

    return (
        <View style={{borderColor: 'black', borderWidth: 1, marginTop: 5, marginBottom: 5}}>
            <Text style={{textAlign: 'center', fontWeight: 'bold'}}>{dummyData.date}</Text>
            <Text>Focus: {dummyData.focus}</Text>
            <Text>RPE: {dummyData.rpe}</Text>
            <Text>Duration: {dummyData.duration} mins</Text>
            <View style={{display: 'flex', marginTop: 5, justifyContent: 'space-between', padding: 5}}>
              <View style={{display: 'flex', flexDirection: 'row', justifyContent: 'space-between', padding: 5}}>
                <Text>Exercise</Text>
                <Text>Weight</Text>
                <Text>Sets</Text>
                <Text>Reps</Text>
                <Text>Volume</Text>
              </View>
              {dummyData.exercises.length > 0 ? dummyData.exercises.map((el, i) => <ExerciseList key={i} name={el.name} weight={el.weight} sets={el.sets} reps={el.reps} />) : null}
            </View>
        </View>
    )
}