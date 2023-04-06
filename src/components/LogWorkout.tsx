import React, { useEffect, useState } from "react";
import { FlatList, Text, View, ListRenderItem, Button } from "react-native";
import Workout from "./Workout";

export default function LogWorkout ({route}: any) {
    const [count, setCount] = useState(35)
    const [intervalId, setIntervalId] = useState<any | null>(null)
    const {workout} = route.params

    let counter = 35

    const countdown = () => {
        if (intervalId) {
            clearInterval(intervalId)
            setIntervalId(null)
            return
        }
        const newInterval = setInterval(() => {
            if (counter === 0) return stop()
            counter--
            setCount(prev => prev - 1)
        }, 1000)
        setIntervalId(newInterval)
    }

    const stop = () => {
        clearInterval(intervalId)
        setCount(35)
    }
    
    return (
        <View>
            <Text>Choose Workout: {workout.name}</Text>
            <Text>Time: {count}</Text>
            <Button title="start" onPress={countdown}/>
        </View>
    )
}