import React, { useEffect, useState } from "react";
import { FlatList, Text, View, ListRenderItem, Button } from "react-native";

export default function LogWorkout ({route}: any) {
    const {workout} = route.params
    const [count, setCount] = useState(30)
    const [intervalId, setIntervalId] = useState<any | null>(null)
    console.log(workout.exercises)

    const countdown = async () => {
        for (const exercise of workout.exercises) {
            setCount(exercise.duration)
            let counter = exercise.duration
            const newInterval = setInterval(() => {
                if (counter === 0) return stop()
                counter--
                setCount(prev => prev - 1)
            }, 1000)
            setIntervalId(newInterval)
        }
        if (intervalId) {
            clearInterval(intervalId)
            setIntervalId(null)
            return
        }
        // const newInterval = setInterval(() => {
        //     if (counter === 0) return stop()
        //     counter--
        //     setCount(prev => prev - 1)
        // }, 1000)
        // setIntervalId(newInterval)
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