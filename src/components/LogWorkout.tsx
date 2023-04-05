import React, { useEffect, useState } from "react";
import { FlatList, Text, View, ListRenderItem, Button } from "react-native";
import Workout from "./Workout";

export default function LogWorkout ({route}: any) {
    const [stopwatch, setStopwatch] = useState(35)
    const {workout} = route.params

    const countdown = () => {
        setInterval(() => {
            console.log(stopwatch)
        }, 1000)
    }
    
    return (
        <View>
            <Text>Choose Workout: {workout.name}</Text>
            <Text>Time: {stopwatch}</Text>
            <Button title="start" onPress={countdown}/>
        </View>
    )
}